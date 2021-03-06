package com.jdlink.domain;

import com.jdlink.domain.Dictionary.FormTypeItem;
import com.jdlink.domain.Dictionary.HandleCategoryItem;
import com.jdlink.domain.Dictionary.PackageTypeItem;
import com.jdlink.domain.Dictionary.ProcessWayItem;
import com.jdlink.domain.Produce.HandleCategory;
import com.jdlink.domain.Produce.ProcessWay;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

/**
 * Created by matt on 2018/7/4.
 * 危废信息
 */
public class Wastes {
    /**
     * 编号
     */
    private String id;
    /**
     * 客户
     */
    private Client client;
    /**
     * 危废名称
     */
    private String name;
    /**
     * 状态
     */
    private FormType formType;
    /**
     * 物质形态数据字典
     */
    private FormTypeItem formTypeItem;
    /**
     * 包装方式
     */
    private PackageType packageType;
    /**
     * 包装方式数据字典
     */
    private PackageTypeItem packageTypeItem;
    /**
     * 进料方式
     */
    private HandleCategory handleCategory;
    /**
     * 处理方式（处置方式）
     */
    private ProcessWay processWay;
    /**
     * 危废编码
     */
    private String wastesId;
    /**
     * 样品预约状态
     */
    private ApplyState applyState;
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
     * 税额
     */
    private float tax;
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
     * 氯
     */
    private float chlorinePercentage;
    /**
     * 磷
     */
    private float phosphorusPercentage;
    /**
     * 氟
     */
    private float fluorinePercentage;
    /**
     * 闪点
     */
    private float flashPoint;
    /**
     * 废物成分
     */
    private String component;
    /**
     * 备注
     */
    private String remarks;
    /**
     * 和库存申报表存在一对多联系
     */
    private String stockId;
    /**
     * 危废类别(8位)
     */
    private String code;
    /**
     * 拟转移量
     */
    private float prepareTransferCount;
    /**
     * 转移量
     */
    private float transferCount;
    /**
     * 签收量
     */
    private float signCount;
    /**
     * 危废特性
     */
    private String wastesCharacter;
    /**
     * 类别
     */
    private String category;
    /**
     * 废物数量
     */
    private double wasteAmount;
    /**
     * 单个危废合计
     */
    private Float wastesTotal;
    /**
     * 运费
     */
    private Float freight;
    /**
     * 重量
     */
    private float weight;
    /**
     * 计量单位
     */
    private String unit;
    /**
     * 配伍编号
     */
    private  String compatibilityId;
    /**
     * 挥发份(挥发程度%)
     */
    private Float volatileNumber;

    private boolean isPH; // PH值

    private boolean isAsh;  // 灰分

    private boolean isWater;  // 水分

    private boolean isHeat;   // 热值

    private boolean isSulfur;  // 硫

    private boolean isChlorine;  // 氯

    private boolean isFluorine;  // 氟

    private boolean isPhosphorus;  // 磷

    private boolean isFlashPoint;  // 闪点

    private boolean isViscosity;  // 黏度

    private boolean isHotMelt;   // 热融试验

    /**
     * 取样日期
     */
    private Date samplingDate;
    /**
     * 取样号
     */
    private String samplingNumber;

    /**
     * 参数列表
     */
    private List<MixingElement> parameterList = new ArrayList<>();

    /**
     * 重金属列表
     */
    private  List<MixingElement> heavyMetalList = new ArrayList<>();

    /**
     * 生产线上取样
     */
    private boolean isProductionLine;
    /**
     * 储存区取样
     */
    private boolean isStorageArea;
    /**
     * 检测日期
     */
    private Date testDate;

    private String id1;
    /**
     * 运输计划单编号
     */
    private String transportPlanItemId;
    /**
     * 转移联单编号（送样用）
     */
    private String transferId;

    /**
     * 进料方式数据字典
     */
    private HandleCategoryItem handleCategoryItem;

    /**
     * 处置方式数据字典
     */
    private ProcessWayItem processWayItem;

    public HandleCategoryItem getHandleCategoryItem() {
        return handleCategoryItem;
    }

    public void setHandleCategoryItem(HandleCategoryItem handleCategoryItem) {
        this.handleCategoryItem = handleCategoryItem;
    }

    public ProcessWayItem getProcessWayItem() {
        return processWayItem;
    }

    public void setProcessWayItem(ProcessWayItem processWayItem) {
        this.processWayItem = processWayItem;
    }

    public ApplyState getApplyState() {
        return applyState;
    }

    public void setApplyState(ApplyState applyState) {
        this.applyState = applyState;
    }

    public String getTransferId() {
        return transferId;
    }

    public void setTransferId(String transferId) {
        this.transferId = transferId;
    }

    public String getId1() {
        return id1;
    }

    public void setId1(String id1) {
        this.id1 = id1;
    }

    public Float getWastesTotal() {
        return wastesTotal;
    }

    public void setWastesTotal(Float wastesTotal) {
        this.wastesTotal = wastesTotal;
    }

    public Float getFreight() {
        return freight;
    }

    public void setFreight(Float freight) {
        this.freight = freight;
    }

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

    public PackageType getPackageType() {
        return packageType;
    }

    public void setPackageType(PackageType packageType) {
        this.packageType = packageType;
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

    public float getTax() {
        return tax;
    }

    public void setTax(float tax) {
        this.tax = tax;
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

    public double getWasteAmount() {
        return wasteAmount;
    }

    public void setWasteAmount(double wasteAmount) {
        this.wasteAmount = wasteAmount;
    }

    public String getComponent() {
        return component;
    }

    public void setComponent(String component) {
        this.component = component;
    }

    public String getRemarks() {
        return remarks;
    }

    public void setRemarks(String remarks) {
        this.remarks = remarks;
    }

    public String getStockId() {
        return stockId;
    }

    public void setStockId(String stockId) {
        this.stockId = stockId;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public float getPrepareTransferCount() {
        return prepareTransferCount;
    }

    public void setPrepareTransferCount(float prepareTransferCount) {
        this.prepareTransferCount = prepareTransferCount;
    }

    public float getTransferCount() {
        return transferCount;
    }

    public void setTransferCount(float transferCount) {
        this.transferCount = transferCount;
    }

    public float getSignCount() {
        return signCount;
    }

    public void setSignCount(float signCount) {
        this.signCount = signCount;
    }

    public String getWastesCharacter() {
        return wastesCharacter;
    }

    public void setWastesCharacter(String wastesCharacter) {
        this.wastesCharacter = wastesCharacter;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public boolean getIsPH() {
        return isPH;
    }

    public void setIsPH(boolean PH) {
        isPH = PH;
    }

    public boolean getIsAsh() {
        return isAsh;
    }

    public void setIsAsh(boolean ash) {
        isAsh = ash;
    }

    public boolean getIsWater() {
        return isWater;
    }

    public void setIsWater(boolean water) {
        isWater = water;
    }

    public boolean getIsHeat() {
        return isHeat;
    }

    public void setIsHeat(boolean heat) {
        isHeat = heat;
    }

    public boolean getIsSulfur() {
        return isSulfur;
    }

    public void setIsSulfur(boolean sulfur) {
        isSulfur = sulfur;
    }

    public boolean getIsChlorine() {
        return isChlorine;
    }

    public void setIsChlorine(boolean chlorine) {
        isChlorine = chlorine;
    }

    public boolean getIsFluorine() {
        return isFluorine;
    }

    public void setIsFluorine(boolean fluorine) {
        isFluorine = fluorine;
    }

    public boolean getIsPhosphorus() {
        return isPhosphorus;
    }

    public void setIsPhosphorus(boolean phosphorus) {
        isPhosphorus = phosphorus;
    }

    public boolean getIsFlashPoint() {
        return isFlashPoint;
    }

    public void setIsFlashPoint(boolean flashPoint) {
        isFlashPoint = flashPoint;
    }

    public boolean getIsViscosity() {
        return isViscosity;
    }

    public void setIsViscosity(boolean viscosity) {
        isViscosity = viscosity;
    }

    public float getWeight() {
        return weight;
    }

    public void setWeight(float weight) {
        this.weight = weight;
    }

    public ProcessWay getProcessWay() {
        return processWay;
    }

    public void setProcessWay(ProcessWay processWay) {
        this.processWay = processWay;
    }

    public String getUnit() {
        return unit;
    }

    public void setUnit(String unit) {
        this.unit = unit;
    }

    public Date getSamplingDate() {
        return samplingDate;
    }

    public void setSamplingDate(Date samplingDate) {
        this.samplingDate = samplingDate;
    }

    public String getSamplingNumber() {
        return samplingNumber;
    }

    public void setSamplingNumber(String samplingNumber) {
        this.samplingNumber = samplingNumber;
    }

    public List<MixingElement> getParameterList() {
        return parameterList;
    }

    public void setParameterList(List<MixingElement> parameterList) {
        this.parameterList = parameterList;
    }

    public List<MixingElement> getHeavyMetalList() {
        return heavyMetalList;
    }

    public void setHeavyMetalList(List<MixingElement> heavyMetalList) {
        this.heavyMetalList = heavyMetalList;
    }

    public boolean getIsProductionLine() {
        return isProductionLine;
    }

    public void setIsProductionLine(boolean productionLine) {
        isProductionLine = productionLine;
    }

    public boolean getIsStorageArea() {
        return isStorageArea;
    }

    public void setIsStorageArea(boolean storageArea) {
        isStorageArea = storageArea;
    }

    public Date getTestDate() {
        return testDate;
    }

    public void setTestDate(Date testDate) {
        this.testDate = testDate;
    }

    public Client getClient() {
        return client;
    }

    public void setClient(Client client) {
        this.client = client;
    }

    public float getChlorinePercentage() {
        return chlorinePercentage;
    }

    public void setChlorinePercentage(float chlorinePercentage) {
        this.chlorinePercentage = chlorinePercentage;
    }

    public float getPhosphorusPercentage() {
        return phosphorusPercentage;
    }

    public void setPhosphorusPercentage(float phosphorusPercentage) {
        this.phosphorusPercentage = phosphorusPercentage;
    }

    public float getFluorinePercentage() {
        return fluorinePercentage;
    }

    public void setFluorinePercentage(float fluorinePercentage) {
        this.fluorinePercentage = fluorinePercentage;
    }

    public String getCompatibilityId() {
        return compatibilityId;
    }

    public HandleCategory getHandleCategory() {
        return handleCategory;
    }

    public void setHandleCategory(HandleCategory handleCategory) {
        this.handleCategory = handleCategory;
    }

    public void setCompatibilityId(String compatibilityId) {
        this.compatibilityId = compatibilityId;
    }

    public Float getVolatileNumber() {
        return volatileNumber;
    }

    public void setVolatileNumber(Float volatileNumber) {
        this.volatileNumber = volatileNumber;
    }

    public String getTransportPlanItemId() {
        return transportPlanItemId;
    }

    public void setTransportPlanItemId(String transportPlanItemId) {
        this.transportPlanItemId = transportPlanItemId;
    }

    public boolean getIsHotMelt() {
        return isHotMelt;
    }

    public void setIsHotMelt(boolean HotMelt) {
        isHotMelt = HotMelt;
    }

    public FormTypeItem getFormTypeItem() {
        return formTypeItem;
    }

    public void setFormTypeItem(FormTypeItem formTypeItem) {
        this.formTypeItem = formTypeItem;
    }

    public PackageTypeItem getPackageTypeItem() {
        return packageTypeItem;
    }

    public void setPackageTypeItem(PackageTypeItem packageTypeItem) {
        this.packageTypeItem = packageTypeItem;
    }

    @Override
    public String toString() {
        return "Wastes{" +
                "id='" + id + '\'' +
                ", client=" + client +
                ", name='" + name + '\'' +
                ", formType=" + formType +
                ", packageType=" + packageType +
                ", handleCategory=" + handleCategory +
                ", wastesId='" + wastesId + '\'' +
                ", contractAmount=" + contractAmount +
                ", unitPriceTax=" + unitPriceTax +
                ", unitPrice=" + unitPrice +
                ", taxRate=" + taxRate +
                ", tax=" + tax +
                ", ph=" + ph +
                ", ashPercentage=" + ashPercentage +
                ", wetPercentage=" + wetPercentage +
                ", calorific=" + calorific +
                ", halogenPercentage=" + halogenPercentage +
                ", sulfurPercentage=" + sulfurPercentage +
                ", chlorinePercentage=" + chlorinePercentage +
                ", phosphorusPercentage=" + phosphorusPercentage +
                ", fluorinePercentage=" + fluorinePercentage +
                ", flashPoint=" + flashPoint +
                ", component='" + component + '\'' +
                ", remarks='" + remarks + '\'' +
                ", stockId='" + stockId + '\'' +
                ", code='" + code + '\'' +
                ", prepareTransferCount=" + prepareTransferCount +
                ", transferCount=" + transferCount +
                ", signCount=" + signCount +
                ", wastesCharacter='" + wastesCharacter + '\'' +
                ", category='" + category + '\'' +
                ", wasteAmount=" + wasteAmount +
                ", wastesTotal=" + wastesTotal +
                ", freight=" + freight +
                ", weight=" + weight +
                ", unit='" + unit + '\'' +
                ", processWay=" + processWay +
                ", compatibilityId='" + compatibilityId + '\'' +
                ", volatileNumber=" + volatileNumber +
                ", isPH=" + isPH +
                ", isAsh=" + isAsh +
                ", isWater=" + isWater +
                ", isHeat=" + isHeat +
                ", isSulfur=" + isSulfur +
                ", isChlorine=" + isChlorine +
                ", isFluorine=" + isFluorine +
                ", isPhosphorus=" + isPhosphorus +
                ", isFlashPoint=" + isFlashPoint +
                ", isViscosity=" + isViscosity +
                ", samplingDate=" + samplingDate +
                ", samplingNumber='" + samplingNumber + '\'' +
                ", parameterList=" + parameterList +
                ", heavyMetalList=" + heavyMetalList +
                ", isProductionLine=" + isProductionLine +
                ", isStorageArea=" + isStorageArea +
                ", testDate=" + testDate +
                ", id1='" + id1 + '\'' +
                '}';
    }
}
