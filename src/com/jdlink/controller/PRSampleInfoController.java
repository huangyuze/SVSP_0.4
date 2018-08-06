package com.jdlink.controller;

import com.jdlink.domain.*;
import com.jdlink.domain.Produce.SampleInformation;
import com.jdlink.service.SampleInformationService;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.ArrayList;
import java.util.List;

@Controller
public class PRSampleInfoController {

    @Autowired
    SampleInformationService sampleInformationService;

    /**
     * 增加样品登记预约单
     * @param sampleInformation 样品信息预约单
     * @return 成功与否
     */
    @RequestMapping("addSampleInfo")
    @ResponseBody
    public String addSampleAppoint(@RequestBody SampleInformation sampleInformation) {
        JSONObject res = new JSONObject();
        try {
            sampleInformation.setApplyState(ApplyState.Appointed);
            // 添加预约登记表
            sampleInformationService.add(sampleInformation);
            res.put("status", "success");
            res.put("message", "增加成功");
        } catch (Exception e) {
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "增加失败");
            res.put("exception", e.getMessage());
        }
        return res.toString();
    }

    /**
     * 获取总记录数
     * @return
     */
    @RequestMapping("totalSampleInformationRecord")
    @ResponseBody
    public int totalSampleInformationRecord(){
        try {
            return sampleInformationService.count();
        }catch(Exception e){
            e.printStackTrace();
            return 0;
        }
    }

    @RequestMapping("loadPageSampleInformationList")
    @ResponseBody
    public  String loadPageSampleInformationList(@RequestBody Page page){
        JSONObject res = new JSONObject();
        try {
            // 取出查询客户
            List<SampleInformation> samplesInformationList = sampleInformationService.listPage(page);
            // 计算最后页位置
            JSONArray array = JSONArray.fromArray(samplesInformationList.toArray(new SampleInformation[samplesInformationList.size()]));
            res.put("data", array);
            res.put("status", "success");
            res.put("message", "分页数据获取成功!");
        } catch (Exception e) {
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "分页数据获取失败！");
        }
        // 返回结果
        return res.toString();
    }

    @RequestMapping("getSampleInformation")
    @ResponseBody
    public String getSampleInformation(String companyCode){
        JSONObject res = new JSONObject();
        try {
            //根据公司代码查询出相应的对象信息
            SampleInformation sampleInformation = sampleInformationService.getByCode(companyCode);
            //新建一个对象并给它赋值为sampleInformation
            JSONObject data = JSONObject.fromBean(sampleInformation);
            res.put("data", data);
            res.put("status", "success");
            res.put("message", "查看数据成功");
        }catch(Exception e){
            e.printStackTrace();
            res.put("status","fail");
            res.put("message","查看数据失败");
        }
        return res.toString();
    }

    @RequestMapping("addSampleInformationCheck")
    @ResponseBody
    public String addSampleInformationCheck(String companyCode){
        JSONObject res = new JSONObject();
        try{
            sampleInformationService.addCheck(companyCode);
            res.put("status","success");
            res.put("message","确认登记成功！");
        }catch (Exception e){
            e.printStackTrace();
            res.put("status","fail");
            res.put("message","确认登记失败！");
        }
        return res.toString();
    }

    @RequestMapping("updateSampleInformation")
    @ResponseBody
    public String updateSampleInformation(SampleInformation sampleInformation){
        JSONObject res = new JSONObject();
        try{
            sampleInformationService.update(sampleInformation);
            res.put("status","success");
            res.put("message","登记单修改成功！");
        }catch (Exception e){
            e.printStackTrace();
            res.put("status","fail");
            res.put("message","登记单修改失败！");
        }
        return res.toString();
    }

    /**
     * 模糊查询 已整合  暂时不用
     * @param keyword
     * @return
     */
    @RequestMapping("searchSampleInformation")
    @ResponseBody
    public String searchSampleInformation(String keyword){
           JSONObject res = new JSONObject();
           try{
               List<SampleInformation> sampleInformationList = sampleInformationService.listByKeyword(keyword);
               JSONArray data = JSONArray.fromArray(sampleInformationList.toArray(new SampleInformation[sampleInformationList.size()]));
               res.put("data",data);
               res.put("status","success");
               res.put("message","查询数据获取成功！");
           }catch (Exception e){
               e.printStackTrace();
               res.put("status","fail");
               res.put("message","查询数据获取失败！");
           }
           return res.toString();
    }

    @RequestMapping("cancelSampleInformation")
    @ResponseBody
    public String cancelSampleInformation(String companyCode){
        JSONObject res = new JSONObject();
        try{
            sampleInformationService.updateSampleInfo(companyCode);
            res.put("status","success");
            res.put("message","作废数据成功！");
        }catch (Exception e){
            e.printStackTrace();
            res.put("status","fail");
            res.put("message","作废数据失败！");
        }
        return res.toString();
    }

    @RequestMapping("searchSampleInfoTotal")
    @ResponseBody
    public int searchsampleInfoTotal(@RequestBody SampleInformation sampleInformation) {
        try {
            return sampleInformationService.searchCount(sampleInformation);
        }catch(Exception e){
            e.printStackTrace();
            return 0;
        }
    }

    /**
     * 查询功能
     * @param sampleInformation
     * @return
     */
    @RequestMapping("searchSampleInfo")
    @ResponseBody
    public String searchSampleInfo(@RequestBody SampleInformation sampleInformation) {
        JSONObject res = new JSONObject();
        try {
            List<SampleInformation> sampleInformationList = sampleInformationService.search(sampleInformation);
            JSONArray data = JSONArray.fromArray(sampleInformationList.toArray(new SampleInformation[sampleInformationList.size()]));
            res.put("status", "success");
            res.put("message", "查询成功");
            res.put("data", data);
        } catch (Exception e) {
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "查询失败");
        }
        return res.toString();
    }

    @RequestMapping("getSampleInfoSeniorSelectedList")
    @ResponseBody
    public String getSampleInfoSeniorSelectedList() {
        JSONObject res = new JSONObject();
        // 获取枚举
        ApplyState[] applyStates = new ApplyState[] { ApplyState.Appointed,ApplyState.Canceld,ApplyState.SampleTaked,ApplyState.Invalid };
        JSONArray applyStateList = JSONArray.fromArray(applyStates);
        res.put("applyStateList", applyStateList);
        return res.toString();
    }
}