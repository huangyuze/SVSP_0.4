package com.jdlink.domain;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

/**
 * Created by matt on 2018/5/14.
 */
public class SampleCheck {
    /**
     * 签收单编号
     * 例：2018052001R
     */
    private String checkId;
    /**
     * 预约单编号
     * 例：2018052001
     */
    private String appointId;
    /**
     * 客户编号
     */
    private String clientId;
    /**
     * 公司名称
     */
    private String companyName;
    /**
     * 联系人
     */
    private String contactName;
    /**
     * 联系方式
     */
    private String telephone;
    /**
     * 制单日期，登记单创建日期，不可修改
     */
    private Date createTime;
    /**
     * 接收人
     */
    private String recipient;
    /**
     * 样品列表
     */
    private List<Sample> sampleList = new ArrayList<>();
    /**
     * 主要成分
     */
    private String mainComponent;
    /**
     * 当前时间
     */
    private Date nowTime;

    @Override
    public String toString() {
        return "SampleCheck{" +
                "checkId='" + checkId + '\'' +
                ", appointId='" + appointId + '\'' +
                ", clientId='" + clientId + '\'' +
                ", companyName='" + companyName + '\'' +
                ", contactName='" + contactName + '\'' +
                ", telephone='" + telephone + '\'' +
                ", createTime=" + createTime +
                ", recipient='" + recipient + '\'' +
                ", sampleList=" + sampleList +
                ", mainComponent='" + mainComponent + '\'' +
                ", nowTime=" + nowTime +
                '}';
    }

    public Date getNowTime() {
        return nowTime;
    }

    public void setNowTime(Date nowTime) {
        this.nowTime = nowTime;
    }

    public String getClientId() {
        return clientId;
    }

    public void setClientId(String clientId) {
        this.clientId = clientId;
    }

    public String getCheckId() {
        return checkId;
    }

    public void setCheckId(String checkId) {
        this.checkId = checkId;
    }

    public String getAppointId() {
        return appointId;
    }

    public void setAppointId(String appointId) {
        this.appointId = appointId;
    }

    public String getCompanyName() {
        return companyName;
    }

    public void setCompanyName(String companyName) {
        this.companyName = companyName;
    }

    public String getContactName() {
        return contactName;
    }

    public void setContactName(String contactName) {
        this.contactName = contactName;
    }

    public String getTelephone() {
        return telephone;
    }

    public void setTelephone(String telephone) {
        this.telephone = telephone;
    }

    public Date getCreateTime() {
        return createTime;
    }

    public void setCreateTime(Date createTime) {
        this.createTime = createTime;
    }

    public String getRecipient() {
        return recipient;
    }

    public void setRecipient(String recipient) {
        this.recipient = recipient;
    }

    public List<Sample> getSampleList() {
        return sampleList;
    }

    public void setSampleList(List<Sample> sampleList) {
        this.sampleList = sampleList;
    }

    public String getMainComponent() {
        return mainComponent;
    }

    public void setMainComponent(String mainComponent) {
        this.mainComponent = mainComponent;
    }

}
