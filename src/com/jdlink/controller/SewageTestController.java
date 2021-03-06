package com.jdlink.controller;

import com.jdlink.domain.Page;
import com.jdlink.domain.Produce.*;
import com.jdlink.service.produce.SewageTestService;
import com.jdlink.util.DBUtil;
import com.jdlink.util.ImportUtil;
import net.sf.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.List;

@Controller
public class SewageTestController {
    @Autowired
    SewageTestService sewageTestService;

    /**
     * 导入污水化验单数据
     */
    @RequestMapping("importSewageTestExcel")
    @ResponseBody
    public String importSewageTestExcel(MultipartFile excelFile){
        JSONObject res=new JSONObject();
        List<Object[][]> data = ImportUtil.getInstance().getExcelFileData(excelFile);
        System.out.println(data.size()+"页数");
        try {
      for(int i=0;i<data.size();i++){//分页遍历

          for(int j=2;j<data.get(i).length;j++){
                if(data.get(i)[j][0]!="null"){ //有数据
                   //创建污水化验对象
                    SewageTest sewageTest=new SewageTest();

                    //1化验单号
                    if(data.get(i)[j][1]!="null"){
                        sewageTest.setId(data.get(i)[j][1].toString());
                    }
                    if(data.get(i)[j][1]=="null"){
                        sewageTest.setId(null);//
                    }
                    //2采样点
                    if(data.get(i)[j][2]!="null"){
                        sewageTest.setAddress(data.get(i)[j][2].toString());
                    }
                    if(data.get(i)[j][2]=="null"){
                        sewageTest.setAddress("");//
                    }
                    //3ph
                    if(data.get(i)[j][3]!="null"){
                        sewageTest.setPh(Float.parseFloat(data.get(i)[j][3].toString()));
                    }
                    if(data.get(i)[j][3]=="null"){
                        sewageTest.setPh(0);
                    }
                    //4COD
                    if(data.get(i)[j][4]!="null"){
                        sewageTest.setCOD(Float.parseFloat(data.get(i)[j][4].toString()));
                    }
                    if(data.get(i)[j][4]=="null"){
                        sewageTest.setCOD(0);
                    }
                    //5BOD
                    if(data.get(i)[j][5]!="null"){
                        sewageTest.setBOD5(Float.parseFloat(data.get(i)[j][5].toString()));
                    }
                    if(data.get(i)[j][5]=="null"){
                        sewageTest.setBOD5(0);
                    }
                    //6氨氮
                    if(data.get(i)[j][6]!="null"){
                        sewageTest.setN2(Float.parseFloat(data.get(i)[j][6].toString()));
                    }
                    if(data.get(i)[j][6]=="null"){
                        sewageTest.setN2(0);
                    }
                    //碳酸盐碱度Cao
                    if(data.get(i)[j][7]!="null"){
                        sewageTest.setAlkalinity(Float.parseFloat(data.get(i)[j][7].toString()));
                    }
                    if(data.get(i)[j][7]=="null"){
                        sewageTest.setAlkalinity(0);
                    }
                    //碳酸盐碱度CaCo3
                    if(data.get(i)[j][8]!="null"){
                        sewageTest.setAlkalinityCaCo3(Float.parseFloat(data.get(i)[j][8].toString()));
                    }
                    if(data.get(i)[j][8]=="null"){
                        sewageTest.setAlkalinityCaCo3(0);
                    }
                    //碳酸盐碱度HCO3-
                    if(data.get(i)[j][9]!="null"){
                        sewageTest.setAlkalinityHCO3(Float.parseFloat(data.get(i)[j][9].toString()));
                    }
                    if(data.get(i)[j][9]=="null"){
                        sewageTest.setAlkalinityHCO3(0);
                    }
                    //重碳酸盐碱度Cao
                    if(data.get(i)[j][10]!="null"){
                        sewageTest.setBicarbonate(Float.parseFloat(data.get(i)[j][10].toString()));
                    }
                    if(data.get(i)[j][10]=="null"){
                        sewageTest.setBicarbonate(0);
                    }
                    //重碳酸盐碱度CaCo3
                    if(data.get(i)[j][11]!="null"){
                        sewageTest.setBicarbonateCaCo3(Float.parseFloat(data.get(i)[j][11].toString()));
                    }
                    if(data.get(i)[j][11]=="null"){
                        sewageTest.setBicarbonateCaCo3(0);
                    }
                    //重碳酸盐碱度HCO3-
                    if(data.get(i)[j][12]!="null"){
                        sewageTest.setBicarbonateHCO3(Float.parseFloat(data.get(i)[j][12].toString()));
                    }
                    if(data.get(i)[j][12]=="null"){
                        sewageTest.setBicarbonateHCO3(0);
                    }


                    //总氮
                    if(data.get(i)[j][13]!="null"){
                        sewageTest.setNitrogen(Float.parseFloat(data.get(i)[j][13].toString()));
                    }
                    if(data.get(i)[j][13]=="null"){
                        sewageTest.setNitrogen(0);
                    }
                    //总磷
                    if(data.get(i)[j][14]!="null"){
                        sewageTest.setPhosphorus(Float.parseFloat(data.get(i)[j][14].toString()));
                    }
                    if(data.get(i)[j][14]=="null"){
                        sewageTest.setPhosphorus(0);
                    }
                    //备注
                    if(data.get(i)[j][15]!="null"){
                        sewageTest.setRemarks((data.get(i)[j][15].toString()));
                    }
                    if(data.get(i)[j][15]=="null"){
                        sewageTest.setRemarks("");
                    }
                    //判断化验单是否存在 存在就更新
                    //存在就更新
                    if(sewageTestService.getSewageTestById(data.get(i)[j][1].toString())!=null){
                         sewageTestService.updateSewageTestById(sewageTest);
                    }
                    //添加化验单对象
                    if(sewageTestService.getSewageTestById(data.get(i)[j][1].toString())==null){
                        sewageTestService.addSewageTest(sewageTest);
                    }

                }

          }

      }
            res.put("status", "success");
            res.put("message", "污水化验单添加成功");
        }
        catch (Exception e){
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "污水化验单添加失败");
        }

        return res.toString();


    }

    /**
     * 加载初始化页面
     */
    @RequestMapping("loadSewageTestResultsList")
    @ResponseBody
    public String loadSewageTestResultsList(@RequestBody Page page){
        JSONObject res=new JSONObject();
        try {
        List<SewageTest> sewageTestList=sewageTestService.loadSewageTestResultsList(page);
            res.put("status", "success");
            res.put("message", "查询成功");
            res.put("data", sewageTestList);
        }
        catch (Exception e){
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "更新失败");
        }



        return res.toString();
    }

    /**
     * 获取总数==>污水
     *
     */
    @RequestMapping("totalSewageTestRecord")
    @ResponseBody
    public  int totalSewageTestRecord(){

        return sewageTestService.totalSewageTestRecord();
    }

    /**
     * 导入软水化验单
     */
    @RequestMapping("importSoftTestExcel")
    @ResponseBody
    public String importSoftTestExcel(MultipartFile excelFile){
        JSONObject res=new JSONObject();
        List<Object[][]> data = ImportUtil.getInstance().getExcelFileData(excelFile);
        try {

            for(int i=0;i<data.size();i++){//页数遍历

                for(int j=2;j<data.get(i).length;j++){

                    if(data.get(i)[j][1]!="null"){
                        SoftTest softTest=new SoftTest();

                        //设置化验单号
                        softTest.setId(data.get(i)[j][1].toString());

                        if(data.get(i)[j][2]!="null"){
                            softTest.setAddress(data.get(i)[j][2].toString());
                        }
                        if(data.get(i)[j][2]=="null"){
                            softTest.setAddress("");
                        }
                        //浊度
                        if(data.get(i)[j][3]!="null"){
                            softTest.setTurbidity(Float.parseFloat(data.get(i)[j][3].toString()));
                        }
                        if(data.get(i)[j][3]=="null"){
                            softTest.setTurbidity(0);
                        }
                        //硬度
                        if(data.get(i)[j][4]!="null"){
                            softTest.setHardness((data.get(i)[j][4].toString()));
                        }
                        if(data.get(i)[j][4]=="null"){
                            softTest.setHardness("");
                        }
                        //ph
                        if(data.get(i)[j][5]!="null"){
                            softTest.setPH(Float.parseFloat(data.get(i)[j][5].toString()));
                        }

                        if(data.get(i)[j][5]=="null"){
                            softTest.setPH(0);
                        }

                        //电导率
                        if(data.get(i)[j][6]!="null"){
                            softTest.setElectricalConductivity(Float.parseFloat(data.get(i)[j][6].toString()));
                        }
                        if(data.get(i)[j][6]=="null"){
                            softTest.setElectricalConductivity(0);
                        }

                        //全碱度
                        if(data.get(i)[j][7]!="null"){
                            softTest.setBasicity(Float.parseFloat(data.get(i)[j][7].toString()));
                        }
                        if(data.get(i)[j][7]=="null"){
                            softTest.setBasicity(0);
                        }
                        //酚酞碱度
                        if(data.get(i)[j][8]!="null"){
                            softTest.setPhenolphthalein(Float.parseFloat(data.get(i)[j][8].toString()));
                        }
                        if(data.get(i)[j][8]=="null"){
                            softTest.setPhenolphthalein(0);
                        }
                        //备注
                        if(data.get(i)[j][9]!="null"){
                            softTest.setRemarks((data.get(i)[j][9].toString()));
                        }
                        if(data.get(i)[j][9]=="null"){
                            softTest.setRemarks("");
                        }
                        //根据化验单号查询对象 如果存在就更新 不存在就添加
                        if(sewageTestService.getSoftTestById(data.get(i)[j][1].toString())==null){
                            sewageTestService.addSoftTest(softTest);
                        }
                        if(sewageTestService.getSoftTestById(data.get(i)[j][1].toString())!=null){
                            sewageTestService.updateSoftTest(softTest);
                        }
                    }

                }
            }
            res.put("status", "success");
            res.put("message", "软水化验单导入成功");
        }
        catch (Exception e){
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "软水化验单导入失败");
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
    @RequestMapping("exportExcelSoftWater")
    @ResponseBody
    public String exportExcelSoftWater(String name, HttpServletResponse response, String sqlWords) {
        JSONObject res = new JSONObject();
        try {
            DBUtil db = new DBUtil();
            // 设置表头
            String tableHead = "序号/采样点/浊度/硬度/PH/电导率/全碱度/酚酞碱度/备注";
            if(name.equals("1")){
                name = "软水化验单";   // 重写文件名
            }else{
                name = "软水分析日报";   // 重写文件名
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

    /**
     * 软水化验的总数
     */
    @RequestMapping("totalSoftTestRecord")
    @ResponseBody
    public int totalSoftTestRecord(){

        return sewageTestService.totalSoftTestRecord();
    }

    /**
     * 软食化验单初始化数据
     */
    @RequestMapping("loadSoftTestResultsList")
    @ResponseBody
    public String loadSoftTestResultsList(@RequestBody Page page){
        JSONObject res=new JSONObject();
        try {
            List<SoftTest> softTestList=sewageTestService.loadSoftTestResultsList(page);
            res.put("status", "success");
            res.put("message", "查询成功");
            res.put("data", softTestList);
        }
        catch (Exception e){
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "查询失败");
        }

        return res.toString();

    }

    //修改污水信息
    @RequestMapping("updateSewaGeregistration")
    @ResponseBody
    public String updateSewaGeregistration(@RequestBody Sewageregistration sewageregistration){
        JSONObject res=new JSONObject();
        try {
            //1更新主表
            sewageTestService.updateSewaGeregistration(sewageregistration);
            //2删除字表
            sewageTestService.deleteSewaGeregistrationById(sewageregistration.getId());
            res.put("status", "success");
            res.put("message", "主表更新成功,字表删除成功");
        }
        catch (Exception e){
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "主表更新失败,字表删除失败");
        }


        return res.toString();


    }

    //修改软水信息
    @RequestMapping("updateSoftGeregistration")
    @ResponseBody
    public String updateSoftGeregistration(@RequestBody Sewageregistration sewageregistration){
        JSONObject res=new JSONObject();


        try {
            //1更新主表
            sewageTestService.updateSoftGeregistration(sewageregistration);
            //2删除字表
            sewageTestService.deleteSoftGeregistrationById(sewageregistration.getId());
            res.put("status", "success");
            res.put("message", "主表更新成功,字表删除成功");
        }
        catch (Exception e){
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "主表更新失败,字表删除失败");

        }

        return res.toString();


    }

   //更新次生送样信息
    @RequestMapping("updateSecondarySample")
    @ResponseBody
    public String updateSecondarySample(@RequestBody SecondarySample secondarySample){
        JSONObject res=new JSONObject();

        try {
            //删除字表
            sewageTestService.deleteSecondarySampleItem(secondarySample.getId());
            //更新完成
        sewageTestService.updateSecondarySample(secondarySample);

            res.put("status", "success");
            res.put("message", "更新主表,删除字表完成");

        }

        catch (Exception e){
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "更新失败");
        }


        return res.toString();


    }



    //次生化验导入
    @RequestMapping("importSecondaryTestResultsExcel")
    @ResponseBody
    public String importSecondaryTestResultsExcel(MultipartFile excelFile){
        JSONObject res=new JSONObject();
        Object[][] data = ImportUtil.getInstance().getExcelFileData(excelFile).get(0);
        try {
         for(int i=2;i<data.length;i++){

             if(data[i][0]!="null"){
                 SecondaryTest secondaryTest=new SecondaryTest();
                 //1化验单号
                 secondaryTest.setId(data[i][0].toString());

                 //2日期
                 if(data[i][1].toString().indexOf("/")!=-1){
                     String  datestr=data[i][1].toString().replace("/","-");
                     SimpleDateFormat simpleDateFormat=new SimpleDateFormat("yyyy-MM-dd");
                     secondaryTest.setDateTime(simpleDateFormat.parse(datestr));
                 }

                 //3废物名称
                 secondaryTest.setWastesName(data[i][2].toString());

                 //4热灼减率
                 secondaryTest.setScorchingRate(Float.parseFloat(data[i][3].toString()));

                 //5水分
                 secondaryTest.setWater(Float.parseFloat(data[i][4].toString()));

                 //6备注
                 secondaryTest.setRemarks(data[i][5].toString());

                 //更加化验单号查询化验单信息
                 if(sewageTestService.getSecondaryTestById(data[i][0].toString())!=null){
                     //更新
                     sewageTestService.updateSecondaryTestById(secondaryTest);
                 }
                 if(sewageTestService.getSecondaryTestById(data[i][0].toString())==null){
                     //添加
                     sewageTestService.addSecondaryTest(secondaryTest);
                 }


             }

         }
            res.put("status", "success");
            res.put("message", "导入成功");
        }
        catch (Exception e){
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "导入失败");

        }



        return res.toString();

    }

    //次生化验显示
    @RequestMapping("loadPageSecondaryTestResultsList")
    @ResponseBody
    public String loadPageSecondaryTestResultsList(@RequestBody Page page){
        JSONObject res=new JSONObject();
       try{
           List<SecondaryTest> secondaryTestList=sewageTestService.loadPageSecondaryTestResultsList(page);
           res.put("status", "success");
           res.put("message", "更新成功");
           res.put("data", secondaryTestList);
       }
       catch (Exception e){
           e.printStackTrace();
           res.put("status", "fail");
           res.put("message", "更新失败");
       }

        return res.toString();


    }

    //查询次生化验的数量
    @RequestMapping("totalSecondaryTestRecord")
    @ResponseBody
    public int totalSecondaryTestRecord(){

        return sewageTestService.totalSecondaryTestRecord();

    }

    //次生化验添加
    @RequestMapping("addSecondaryTest")
    @ResponseBody
    public String addSecondaryTest(@RequestBody SecondaryTest secondaryTest){
        JSONObject res=new JSONObject();

        try {
         sewageTestService.addSecondaryTest(secondaryTest);
           res.put("status", "success");
            res.put("message", "添加成功");

        }
        catch (Exception e){
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "添加失败");
        }

        return res.toString();

    }

    //污水化验添加
    @RequestMapping("addSewageTest")
    @ResponseBody
    public String addSewageTest(@RequestBody SewageTest sewageTest){
        JSONObject res=new JSONObject();
        try {
            sewageTestService.addSewageTest(sewageTest);
            res.put("status", "success");
            res.put("message", "添加成功");
        }
        catch (Exception e){
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "添加失败");
        }

        return res.toString();
    }

    //添加软水化验
    @RequestMapping("addSoftTest")
    @ResponseBody
    public String addSoftTest(@RequestBody SoftTest softTest){
        JSONObject res=new JSONObject();
        try {
            sewageTestService.addSoftTest(softTest);
            res.put("status", "success");
            res.put("message", "添加成功");
        }

        catch (Exception e){
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "添加失败");
        }


        return res.toString();

    }

    //提交污水化验单
    @RequestMapping("submitSewageTest")
    @ResponseBody
    public String submitSewageTest(String id){
        JSONObject res=new JSONObject();
        try {
        sewageTestService.submitSewageTest(id);
            res.put("status", "success");
            res.put("message", "提交成功");
        }
        catch (Exception e){
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "提交失败");

        }

        return res.toString();

    }

    //签收污水化验单
    @RequestMapping("confirmSewageTest")
    @ResponseBody
    public String confirmSewageTest(String id){
        JSONObject res=new JSONObject();


        try {
            sewageTestService.confirmSewageTest(id);
            res.put("status", "success");
            res.put("message", "已确认");
        }

        catch (Exception e){
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "确认失败");
        }

        return res.toString();
    }

    //作废污水化验单
    @RequestMapping("cancelSewageTest")
    @ResponseBody
    public String cancelSewageTest(String id){
        JSONObject res=new JSONObject();

        try {
           sewageTestService.cancelSewageTest(id);
          //污水收样状态为待收样
            sewageTestService.cancelSewageTestAfter(id);
            res.put("status", "success");
            res.put("message", "已作废");
        }
        catch (Exception e){
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "作废失败");

        }

        return res.toString();
    }

    //根据编号获取污水化验单信息
    @RequestMapping("getSewageTestById")
    @ResponseBody
    public String getSewageTestById(String id){
        JSONObject res=new JSONObject();


        try {
             SewageTest sewageTest=sewageTestService.getSewageTestById(id);
             res.put("status", "success");
             res.put("message", "查询成功");
             res.put("data", sewageTest);
        }
        catch (Exception e){
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "查询失败");
        }
        return  res.toString();

    }

    //修改污水化验单
    @RequestMapping("updateSewageTestById")
    @ResponseBody
    private String updateSewageTestById(@RequestBody SewageTest sewageTest){
        JSONObject res=new JSONObject();


        try {
            sewageTestService.updateSewageTestById(sewageTest);
            res.put("status", "success");
            res.put("message", "修改成功");
        }
        catch (Exception e){
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "修改失败");
        }

        return res.toString();


    }

    //提交软水化验单
    @RequestMapping("submitSoftTest")
    @ResponseBody
    public String submitSoftTest(String id){
        JSONObject res=new JSONObject();

        try {
     sewageTestService.submitSoftTest(id);
            res.put("status", "success");
            res.put("message", "提交成功");
        }
        catch (Exception e){
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "提交失败");

        }


        return res.toString();


    }

    //签收软水化验单
    @RequestMapping("confirmSoftTest")
    @ResponseBody
    public String confirmSoftTest(String id){
        JSONObject res=new JSONObject();

        try {
  sewageTestService.confirmSoftTest(id);
            res.put("status", "success");
            res.put("message", "已签收");
        }
        catch (Exception e){
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "签收失败");
        }

        return res.toString();


    }

    //作废软水化验单
    @RequestMapping("cancelSoftTest")
    @ResponseBody
    public String cancelSoftTest(String id){
        JSONObject res=new JSONObject();

        try {
            sewageTestService.cancelSoftTest(id);
            sewageTestService.cancelSoftTestAfter(id);
            res.put("status", "success");
            res.put("message", "已作废");
        }
        catch (Exception e){
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "作废失败");

        }

        return res.toString();
    }

    //根据编号查询软水化验
    @RequestMapping("getSoftTestById")
    @ResponseBody
    public String getSoftTestById(String id){
        JSONObject res=new JSONObject();

        try {
            SoftTest softTest=sewageTestService.getSoftTestById(id);
            res.put("status", "success");
            res.put("message", "查询成功");
            res.put("data", softTest);
        }
        catch (Exception e){
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "更新失败");

        }


        return res.toString();
    }

    //更新软水化验
    @RequestMapping("updateSoftTestById")
    @ResponseBody
    public String updateSoftTestById(@RequestBody SoftTest softTest){
        JSONObject res=new JSONObject();

        try {
              sewageTestService.updateSoftTest(softTest);
            res.put("status", "success");
            res.put("message", "更新成功");
        }
        catch (Exception e){
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "更新失败");

        }

        return res.toString();

    }

    //提交次生化验单
    @RequestMapping("submitSecondaryTest")
    @ResponseBody
    public String submitSecondaryTest(String id){
        JSONObject res=new JSONObject();


        try {
            sewageTestService.submitSecondaryTest(id);
            res.put("status", "success");
            res.put("message", "提交成功");
        }
        catch (Exception e){
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "提交失败");
        }
        return res.toString();
    }


    //签收次生化验单
    @RequestMapping("confirmSecondaryTest")
    @ResponseBody
    public String confirmSecondaryTest(String id){
        JSONObject res=new JSONObject();

        try {
            sewageTestService.confirmSecondaryTest(id);
            res.put("status", "success");
            res.put("message", "已签收");
        }
        catch (Exception e){
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "签收失败");
        }

        return res.toString();


    }


    //作废次生化验单
    @RequestMapping("cancelSecondaryTest")
    @ResponseBody
    public String cancelSecondaryTest(String id){
        JSONObject res=new JSONObject();

        try {
            sewageTestService.cancelSecondaryTest(id);
            //次生送样待收样
            sewageTestService. cancelSecondaryTestAfter(id);

            res.put("status", "success");
            res.put("message", "已作废");
        }
        catch (Exception e){
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "作废失败");

        }

        return res.toString();
    }

    //根据编号查找次生化验信息
    @RequestMapping("getSecondaryTestById")
    @ResponseBody
    public String getSecondaryTestById(String id){
        JSONObject res=new JSONObject();

        try {
            SecondaryTest secondaryTest=sewageTestService.getSecondaryTestById(id);
            res.put("status", "success");
            res.put("message", "查询成功");
            res.put("data", secondaryTest);
        }
        catch (Exception e){
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "更新失败");

        }


        return res.toString();
    }

    //更新次生化验单
    @RequestMapping("updateSecondaryTestById")
    @ResponseBody
    public String updateSecondaryTestById(@RequestBody SecondaryTest secondaryTest){
        JSONObject res=new JSONObject();

        try {
              sewageTestService.updateSecondaryTestById(secondaryTest);
            res.put("status", "success");
            res.put("message", "更新成功");
        }
        catch (Exception e){
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "更新失败");
        }
        return res.toString();

    }


    //检测污水预约单号是否存在
    @RequestMapping("testingSewageId")
    @ResponseBody
    public String testingSewageId(String id){
        JSONObject res=new JSONObject();

        try {
           List<String> sewageIdList=sewageTestService.getAllSewageId();
            boolean bool = sewageIdList.contains(id);
            res.put("status", "success");
            res.put("message", "检验完毕");
            res.put("data", bool);
        }
        catch (Exception e){
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "检验失败");

        }

        return res.toString();

    }

    //检测软水预约单号是否存在
    @RequestMapping("testingSoftId")
    @ResponseBody
    public String testingSoftId(String id){
        JSONObject res=new JSONObject();

        try {
            List<String> softIdList=sewageTestService.getAllSoftId();
            boolean bool = softIdList.contains(id);
            res.put("status", "success");
            res.put("message", "检验完毕");
            res.put("data", bool);
        }
        catch (Exception e){
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "检验失败");

        }

        return res.toString();

    }

    //检测次生预约单号是否存在
    @RequestMapping("testingSecondaryId")
    @ResponseBody
    public String testingSecondaryId(String id){
        JSONObject res=new JSONObject();

        try {
            List<String> secondaryIdList=sewageTestService.getAllSecondaryId();
            boolean bool = secondaryIdList.contains(id);
            res.put("status", "success");
            res.put("message", "检验完毕");
            res.put("data", bool);
        }
        catch (Exception e){
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "检验失败");

        }

        return res.toString();

    }

    //检测污水化验单号
    @RequestMapping("testingSewageTestId")
    @ResponseBody
    public String testingSewageTestId(String  id){

        JSONObject res=new JSONObject();

        try {
            List<String> sewageTestIdList=sewageTestService.getAllSewageTestId();
            boolean bool = sewageTestIdList.contains(id);
            res.put("status", "success");
            res.put("message", "检验完毕");
            res.put("data", bool);
        }
        catch (Exception e){
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "检验失败");

        }

        return res.toString();

    }

    //检测软水化验单号
    @RequestMapping("testingSoftTestId")
    @ResponseBody
    public String testingSoftTestId(String  id){

        JSONObject res=new JSONObject();

        try {
            List<String> softTestIdList=sewageTestService.getAllSoftTestId();
            boolean bool = softTestIdList.contains(id);
            res.put("status", "success");
            res.put("message", "检验完毕");
            res.put("data", bool);
        }
        catch (Exception e){
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "检验失败");

        }

        return res.toString();

    }


    //检测次生化验单号
    @RequestMapping("testingSecondaryTestId")
    @ResponseBody
    public String testingSecondaryTestId(String  id){

        JSONObject res=new JSONObject();

        try {
            List<String> secondaryTestIdList=sewageTestService.getAllSecondaryTestId();
            boolean bool = secondaryTestIdList.contains(id);
            res.put("status", "success");
            res.put("message", "检验完毕");
            res.put("data", bool);
        }
        catch (Exception e){
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "检验失败");

        }

        return res.toString();

    }


    //作废污水送样
    @RequestMapping("cancelSewaGeregistration")
    @ResponseBody
    public String cancelSewaGeregistration(String id){
        JSONObject res=new JSONObject();

        try {
            sewageTestService.cancelSewaGeregistration(id);
            res.put("status", "success");
            res.put("message", "作废成功");
        }
        catch (Exception e){
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "作废失败");

        }

        return res.toString();

    }

    //作废软水送样
    @RequestMapping("cancelSoftGeregistration")
    @ResponseBody
    public String cancelSoftGeregistration(String id){
        JSONObject res=new JSONObject();

        try {
            sewageTestService.cancelSoftGeregistration(id);
            res.put("status", "success");
            res.put("message", "作废成功");
        }
        catch (Exception e){
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "作废失败");

        }


        return res.toString();
    }

    //次生送样作废
    @RequestMapping("cancelSecondaryGeregistration")
    @ResponseBody
    public String cancelSecondaryGeregistration(String id){
        JSONObject res=new JSONObject();

        try {
            sewageTestService.cancelSecondaryGeregistration(id);
            res.put("status", "success");
            res.put("message", "作废成功");
        }
        catch (Exception e){
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "作废失败");

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
    @RequestMapping("exportExcelSewage")
    @ResponseBody
    public String exportExcel(String name, HttpServletResponse response, String sqlWords) {
        JSONObject res = new JSONObject();
        try {
            DBUtil db = new DBUtil();
            // 设置表头
            String tableHead = "样品编号/采样点/PH/COD/BOD5/氨氮/碳酸盐碱度(Cao)/碳酸盐碱度(CaCo3)/碳酸盐碱度(HCo3-)/重碳酸盐碱度(Cao)/" +
                    "重碳酸盐碱度(CaCo3)/重碳酸盐碱度(HCo3-)/总氮/总磷/备注";
            if(name.equals("1")){
                  name = "污水化验结果";
            }else{
                name = "污水分析日报";
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


    //污水送样导出
    @RequestMapping("exportSewageregistration")
    @ResponseBody
    public String exportSewageregistration(String name, HttpServletResponse response, String sqlWords){
        JSONObject res = new JSONObject();

        try {
            DBUtil db = new DBUtil();
            String tableHead = "预约单号/采样点/送样人/签收人/状态/PH/COD/BOD5/氨氮/总氮/总磷/碱度";
            name = "污水送样";   //重写文件名
            db.exportExcel2(name, response, sqlWords, tableHead);//HttpServletResponse response
            res.put("status", "success");
            res.put("message", "导出成功");

        }
        catch (Exception e){
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "导出失败，请重试！");

        }


        return res.toString();
    }

    //软水送样导出
    @RequestMapping("exportSoftregistration")
    @ResponseBody
    public String exportSoftregistration(String name, HttpServletResponse response, String sqlWords){
        JSONObject res = new JSONObject();

        try {
            DBUtil db = new DBUtil();
            String tableHead = "预约单号/采样点/送样人/签收人/状态/浊度/硬度/PH/酚酞碱度/全碱度/电导率";
            name = "软水送样";   //重写文件名
            db.exportExcel2(name, response, sqlWords, tableHead);//HttpServletResponse response
            res.put("status", "success");
            res.put("message", "导出成功");

        }
        catch (Exception e){
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "导出失败，请重试！");

        }


        return res.toString();
    }


    //次生送样导出
    @RequestMapping("exportSecondarySample")
    @ResponseBody
    public String exportSecondarySample(String name, HttpServletResponse response, String sqlWords){
        JSONObject res = new JSONObject();

        try {
            DBUtil db = new DBUtil();
            String tableHead = "预约单号/危废名称/送样人/签收人/采样点/状态/水分/热灼减率";
            name = "次生送样";   //重写文件名
            db.exportExcel2(name, response, sqlWords, tableHead);//HttpServletResponse response
            res.put("status", "success");
            res.put("message", "导出成功");

        }
        catch (Exception e){
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "导出失败，请重试！");

        }


        return res.toString();
    }
}


