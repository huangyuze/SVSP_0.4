package com.jdlink.domain;

/**
 * Created by matt on 2018/7/4.
 */
public class Wastes {

    private String id;
    /**
     * 危废名称
     */
    private String name;
    /**
     * 状态
     */
    private FormType formType;
    /**
     * 危废编码
     */
    private String wastesId;
    /**
     * 合约量
     */
    private int contractAmount;
    /**
     * 含税单价
     */
    private float unitPriceTax;
    /**
     * 去税单价
     */
    private float unitPrice;
    /**
     * 税率
     */
    private float taxRate;
    /**
     * ph值
     */
    private float ph;
    /**
     * 灰分
     */
    private float ashPercentage;
    /**
     * 水分
     */
    private float wetPercentage;
    /**
     * 热值
     */
    private float calorific;
    /**
     * 卤素
     */
    private float halogenPercentage;
    /**
     * 硫
     */
    private float sulfurPercentage;
    /**
     * 闪点
     */
    private float flashPoint;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public FormType getFormType() {
        return formType;
    }

    public void setFormType(FormType formType) {
        this.formType = formType;
    }

    public String getWastesId() {
        return wastesId;
    }

    public void setWastesId(String wastesId) {
        this.wastesId = wastesId;
    }

    public int getContractAmount() {
        return contractAmount;
    }

    public void setContractAmount(int contractAmount) {
        this.contractAmount = contractAmount;
    }

    public float getUnitPriceTax() {
        return unitPriceTax;
    }

    public void setUnitPriceTax(float unitPriceTax) {
        this.unitPriceTax = unitPriceTax;
    }

    public float getUnitPrice() {
        return unitPrice;
    }

    public void setUnitPrice(float unitPrice) {
        this.unitPrice = unitPrice;
    }

    public float getTaxRate() {
        return taxRate;
    }

    public void setTaxRate(float taxRate) {
        this.taxRate = taxRate;
    }

    public float getPh() {
        return ph;
    }

    public void setPh(float ph) {
        this.ph = ph;
    }

    public float getAshPercentage() {
        return ashPercentage;
    }

    public void setAshPercentage(float ashPercentage) {
        this.ashPercentage = ashPercentage;
    }

    public float getWetPercentage() {
        return wetPercentage;
    }

    public void setWetPercentage(float wetPercentage) {
        this.wetPercentage = wetPercentage;
    }

    public float getCalorific() {
        return calorific;
    }

    public void setCalorific(float calorific) {
        this.calorific = calorific;
    }

    public float getHalogenPercentage() {
        return halogenPercentage;
    }

    public void setHalogenPercentage(float halogenPercentage) {
        this.halogenPercentage = halogenPercentage;
    }

    public float getSulfurPercentage() {
        return sulfurPercentage;
    }

    public void setSulfurPercentage(float sulfurPercentage) {
        this.sulfurPercentage = sulfurPercentage;
    }

    public float getFlashPoint() {
        return flashPoint;
    }

    public void setFlashPoint(float flashPoint) {
        this.flashPoint = flashPoint;
    }

    @Override
    public String toString() {
        return "Wastes{" +
                "name='" + name + '\'' +
                ", formType=" + formType +
                ", wastesId='" + wastesId + '\'' +
                ", contractAmount=" + contractAmount +
                ", unitPriceTax=" + unitPriceTax +
                ", unitPrice=" + unitPrice +
                ", taxRate=" + taxRate +
                ", ph=" + ph +
                ", ashPercentage=" + ashPercentage +
                ", wetPercentage=" + wetPercentage +
                ", calorific=" + calorific +
                ", halogenPercentage=" + halogenPercentage +
                ", sulfurPercentage=" + sulfurPercentage +
                ", flashPoint=" + flashPoint +
                '}';
    }
}