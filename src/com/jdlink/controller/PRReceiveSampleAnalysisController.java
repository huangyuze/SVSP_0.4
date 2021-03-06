package com.jdlink.controller;

import com.jdlink.domain.CheckState;
import com.jdlink.domain.Client;
import com.jdlink.domain.FormType;
import com.jdlink.domain.Page;
import com.jdlink.domain.Produce.ReceiveSampleAnalysis;
import com.jdlink.domain.Produce.SampleInfoAnalysis;
import com.jdlink.service.ClientService;
import com.jdlink.service.produce.ReceiveSampleAnalysisService;
import com.jdlink.service.produce.SampleInfoAnalysisService;
import com.jdlink.util.DBUtil;
import com.jdlink.util.DateUtil;
import com.jdlink.util.ImportUtil;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;

@Controller
public class PRReceiveSampleAnalysisController {

    @Autowired
    ReceiveSampleAnalysisService receiveSampleAnalysisService;
    @Autowired
    ClientService clientService;

    /**
     * 获取市场部化验单的
     * @param receiveSampleAnalysis 市场部化验单的查询参数
     * @return 查询所得数据
     */
    @RequestMapping("getReceiveSampleAnalysis")
    @ResponseBody
    public String getReceiveSampleAnalysis(@RequestBody ReceiveSampleAnalysis receiveSampleAnalysis) {
        JSONObject res = new JSONObject();
        try {
            List<ReceiveSampleAnalysis> receiveSampleAnalysisList = receiveSampleAnalysisService.get(receiveSampleAnalysis.getPage(), receiveSampleAnalysis);
            JSONArray data = JSONArray.fromArray(receiveSampleAnalysisList.toArray(new ReceiveSampleAnalysis[receiveSampleAnalysisList.size()]));
            res.put("status", "success");
            res.put("message", "市场部化验单获取数据成功");
            res.put("data", data);
        } catch (Exception e) {
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "市场部化验单获取数据失败");
        }
        return res.toString();
    }

    /**
     * 通过编号获取化验单
     * @param id 编号
     * @return 化验单数据
     */
    @RequestMapping("getReceiveSampleAnalysisById")
    @ResponseBody
    public String getReceiveSampleAnalysisById(String id) {
        JSONObject res = new JSONObject();
        try {
            ReceiveSampleAnalysis receiveSampleAnalysis = receiveSampleAnalysisService.getById(id);
            res.put("status", "success");
            res.put("message", "市场部化验单获取数据成功");
            res.put("data", receiveSampleAnalysis);
        } catch (Exception e) {
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "市场部化验单获取数据失败");
        }
        return res.toString();
    }

    /**
     * 更新市场部化验单
     * @param receiveSampleAnalysis 市场部化验单
     * @return 成功与否
     */
    @RequestMapping("updateReceiveSampleAnalysisById")
    @ResponseBody
    public String updateReceiveSampleAnalysisById(@RequestBody ReceiveSampleAnalysis receiveSampleAnalysis) {
        JSONObject res = new JSONObject();
        try {
            receiveSampleAnalysisService.update(receiveSampleAnalysis);
            res.put("status", "success");
            res.put("message", "更新成功");
        } catch (Exception e) {
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "更新失败");
        }
        return res.toString();
    }

    /**
     * 获取市场部化验单的数量
     * @param receiveSampleAnalysis 市场部化验单的查询参数
     * @return 市场部化验单的数量
     */
    @RequestMapping("countReceiveSampleAnalysis")
    @ResponseBody
    public String countReceiveSampleAnalysis(@RequestBody ReceiveSampleAnalysis receiveSampleAnalysis) {
        JSONObject res = new JSONObject();
        try {
            int count = receiveSampleAnalysisService.count(receiveSampleAnalysis);
            res.put("status", "success");
            res.put("message", "市场部化验单获取数据成功");
            res.put("data", count);
        } catch (Exception e) {
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "市场部化验单获取数据失败");
        }
        return res.toString();
    }

    /**
     * 导入市场部化验单
     * @param excelFile
     * @return
     */
    @RequestMapping("importReceiveSampleAnalysis")
    @ResponseBody
    public String importReceiveSampleAnalysis(MultipartFile excelFile) {
        JSONObject res = new JSONObject();
        try {
            // 获取危废入库的表格数据
            Object[][] data = ImportUtil.getInstance().getExcelFileData(excelFile).get(0);

            for (int i = 2; i < data.length; i++) {
                ReceiveSampleAnalysis receiveSampleAnalysis = new ReceiveSampleAnalysis();
                receiveSampleAnalysis.setFinishDate(DateUtil.getDateFromStr(data[i][0].toString()));
                receiveSampleAnalysis.setId(data[i][1].toString()+"R");
                receiveSampleAnalysis.setSampleId(data[i][1].toString());
                // 设置产废单位，若不存在则添加单位
                Client produceCompany = clientService.getByName(data[i][2].toString());
                if (produceCompany == null) {
                    produceCompany = new Client();
                    produceCompany.setClientId(clientService.getCurrentId());
                    produceCompany.setCompanyName(data[i][2].toString());
                    clientService.add(produceCompany);
                }
                receiveSampleAnalysis.setProduceCompany(produceCompany);
                receiveSampleAnalysis.setWastesName(data[i][3].toString());
                receiveSampleAnalysis.setWastesCode(data[i][4].toString());
                // 设置废物形态
                if (data[i][5].toString().contains("固") && !data[i][5].toString().contains("不")) {
                    receiveSampleAnalysis.setFormType(FormType.Solid);
                } else if (data[i][5].toString().contains("半固")) {
                    receiveSampleAnalysis.setFormType(FormType.HalfSolid);
                } else if (data[i][5].toString().contains("液")) {
                    receiveSampleAnalysis.setFormType(FormType.Liquid);
                }
                receiveSampleAnalysis.setSender(data[i][6].toString());
                receiveSampleAnalysis.setPH(Float.parseFloat(data[i][7].toString()));
                receiveSampleAnalysis.setHeat(Float.parseFloat(data[i][8].toString()));
                receiveSampleAnalysis.setAsh(Float.parseFloat(data[i][9].toString()));
                receiveSampleAnalysis.setWater(Float.parseFloat(data[i][10].toString()));
                receiveSampleAnalysis.setFluorine(Float.parseFloat(data[i][11].toString()));
                receiveSampleAnalysis.setChlorine(Float.parseFloat(data[i][12].toString()));
                receiveSampleAnalysis.setSulfur(Float.parseFloat(data[i][13].toString()));
                receiveSampleAnalysis.setPhosphorus(Float.parseFloat(data[i][14].toString()));
                receiveSampleAnalysis.setFlashPoint(Float.parseFloat(data[i][15].toString()));
                receiveSampleAnalysis.setViscosity(data[i][16].toString());
                receiveSampleAnalysis.setHotMelt(data[i][17].toString());
                receiveSampleAnalysis.setRemark(data[i][18].toString());
                receiveSampleAnalysis.setCheckState(CheckState.NewBuild);
                receiveSampleAnalysisService.add(receiveSampleAnalysis);
            }

            res.put("status", "success");
            res.put("message", "导入成功");
        } catch (DuplicateKeyException e) {
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "编号重复，导入失败");
        } catch (Exception e) {
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "导入失败");
        }
            return res.toString();
    }

    @RequestMapping("setReceiveSampleAnalysisInvalid")
    @ResponseBody
    public String setReceiveSampleAnalysisInvalid(String id) {
        JSONObject res = new JSONObject();
        try {
            receiveSampleAnalysisService.setState(id, CheckState.Invalid);
            res.put("status", "success");
            res.put("message", "作废成功");
        } catch (Exception e) {
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "作废失败");
        }
        return res.toString();
    }

    /**
     * 增加市场部化验单
     * @param receiveSampleAnalysis 市场部化验单
     * @return 成功与否
     */
    @RequestMapping("addReceiveSampleAnalysis")
    @ResponseBody
    public String addReceiveSampleAnalysis(@RequestBody ReceiveSampleAnalysis receiveSampleAnalysis){
        JSONObject res = new JSONObject();
        try {
            // 新增
            receiveSampleAnalysis.setSampleId(receiveSampleAnalysis.getId());
            receiveSampleAnalysis.setCheckState(CheckState.NewBuild);
            receiveSampleAnalysisService.add(receiveSampleAnalysis);
            res.put("status", "success");
            res.put("message", "增加成功");
        } catch (Exception e) {
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "增加失败");
        }
        return res.toString();
    }

    /**
     * 导出(带表头字段)
     *
     * @param name
     * @param response
     * @param sqlWords
     * @return
     */
    @RequestMapping("exportExcelReceiveSampleAnalysis")
    @ResponseBody
    public String exportExcel(String name, HttpServletResponse response, String sqlWords) {
        JSONObject res = new JSONObject();
        try {
            DBUtil db = new DBUtil();
            // 设置表头
            String tableHead = "样品编号/产废单位/危废名称/危废代码/完成日期/PH/灰分/水分/热值/硫/氯/氟/磷/闪点/黏度/热融";
            if(name.equals("1")){
                name = "市场部化验结果";   // 重写文件名
            }else {
                name = "危废预准入分析日报";   // 重写文件名
            }
            db.exportExcel2(name, response, sqlWords, tableHead);//HttpServletResponse response
            res.put("status", "success");
            res.put("message", "导出成功");
        } catch (IOException ex) {
            ex.printStackTrace();
            res.put("status", "fail");
            res.put("message", "导出失败，请重试！");
        }
        return res.toString();
    }

}
