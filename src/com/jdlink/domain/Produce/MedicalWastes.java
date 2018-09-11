package com.jdlink.domain.Produce;

import java.util.Date;

/**
 * 医废出入库
 *
 */
public class MedicalWastes {
    /**
     * 登记单号
     */
    private String medicalWastesId;
    /**
     *
     * 登记部门
     */
    private String department;
    /**
     * 登记人
     */
    private String departmentName;
    /**
     * 修改人
     */
    private String adjustName;
    /**
     * 修改时间
     */
    private Date adjustDate;
    /**
     *登记时间
     */
    private Date dateTime;
    /**
     * 本日进厂危废
     */
    private float thisMonthWastes;
    /**
     * 本日直接转外处置量
     */
    private float directDisposal;
    /**
     * 本日蒸煮医废
     */
    private float cookingWastes;
    /**
     * 蒸煮后重量
     */
    private  float afterCookingNumber;
    /**
     * 蒸煮后入库量
     */
    private  float  afterCookingInbound;
    /**
     * 本日蒸煮后外送量
     *
     */
    private float thisMonthSendCooking;
    /**
     * 误差量
     */
    private float errorNumber;
    /**
     * 水分含量
     *
     */
    private float wetNumber;

    public String getDepartment() {
        return department;
    }

    public void setDepartment(String department) {
        this.department = department;
    }

    public String getDepartmentName() {
        return departmentName;
    }

    public void setDepartmentName(String departmentName) {
        this.departmentName = departmentName;
    }

    public String getAdjustName() {
        return adjustName;
    }

    public void setAdjustName(String adjustName) {
        this.adjustName = adjustName;
    }

    public Date getAdjustDate() {
        return adjustDate;
    }

    public void setAdjustDate(Date adjustDate) {
        this.adjustDate = adjustDate;
    }


    public Date getDateTime() {
        return dateTime;
    }

    public void setDateTime(Date dateTime) {
        this.dateTime = dateTime;
    }

    public float getThisMonthWastes() {
        return thisMonthWastes;
    }

    public void setThisMonthWastes(float thisMonthWastes) {
        this.thisMonthWastes = thisMonthWastes;
    }

    public float getDirectDisposal() {
        return directDisposal;
    }

    public void setDirectDisposal(float directDisposal) {
        this.directDisposal = directDisposal;
    }

    public float getCookingWastes() {
        return cookingWastes;
    }

    public void setCookingWastes(float cookingWastes) {
        this.cookingWastes = cookingWastes;
    }

    public float getAfterCookingNumber() {
        return afterCookingNumber;
    }

    public void setAfterCookingNumber(float afterCookingNumber) {
        this.afterCookingNumber = afterCookingNumber;
    }

    public float getAfterCookingInbound() {
        return afterCookingInbound;
    }

    public void setAfterCookingInbound(float afterCookingInbound) {
        this.afterCookingInbound = afterCookingInbound;
    }

    public float getThisMonthSendCooking() {
        return thisMonthSendCooking;
    }

    public void setThisMonthSendCooking(float thisMonthSendCooking) {
        this.thisMonthSendCooking = thisMonthSendCooking;
    }

    public float getErrorNumber() {
        return errorNumber;
    }

    public void setErrorNumber(float errorNumber) {
        this.errorNumber = errorNumber;
    }

    public float getWetNumber() {
        return wetNumber;
    }

    public void setWetNumber(float wetNumber) {
        this.wetNumber = wetNumber;
    }

    public String getMedicalWastesId() {
        return medicalWastesId;
    }

    public void setMedicalWastesId(String medicalWastesId) {
        this.medicalWastesId = medicalWastesId;
    }

    @Override
    public String toString() {
        return "MedicalWastes{" +
                "medicalWastesId='" + medicalWastesId + '\'' +
                ", department='" + department + '\'' +
                ", departmentName='" + departmentName + '\'' +
                ", adjustName='" + adjustName + '\'' +
                ", adjustDate=" + adjustDate +
                ", dateTime=" + dateTime +
                ", thisMonthWastes=" + thisMonthWastes +
                ", directDisposal=" + directDisposal +
                ", cookingWastes=" + cookingWastes +
                ", afterCookingNumber=" + afterCookingNumber +
                ", afterCookingInbound=" + afterCookingInbound +
                ", thisMonthSendCooking=" + thisMonthSendCooking +
                ", errorNumber=" + errorNumber +
                ", wetNumber=" + wetNumber +
                '}';
    }
}