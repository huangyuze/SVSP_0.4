package com.jdlink.domain.Produce;

public class SecondarySampleItem {

    private String wastesCode;//代码

    private String wastesName;//名称

    private String sampleinformationId;//主表编号

    private int water; // PH值

    private int scorchingRate;


    public String getWastesCode() {
        return wastesCode;
    }

    public void setWastesCode(String wastesCode) {
        this.wastesCode = wastesCode;
    }

    public String getWastesName() {
        return wastesName;
    }

    public void setWastesName(String wastesName) {
        this.wastesName = wastesName;
    }

    public String getSampleinformationId() {
        return sampleinformationId;
    }

    public void setSampleinformationId(String sampleinformationId) {
        this.sampleinformationId = sampleinformationId;
    }

    public int getWater() {
        return water;
    }

    public void setWater(int water) {
        this.water = water;
    }

    public int getScorchingRate() {
        return scorchingRate;
    }

    public void setScorchingRate(int scorchingRate) {
        this.scorchingRate = scorchingRate;
    }

    @Override
    public String toString() {
        return "SecondarySampleItem{" +
                "wastesCode='" + wastesCode + '\'' +
                ", wastesName='" + wastesName + '\'' +
                ", sampleinformationId=" + sampleinformationId +
                ", water=" + water +
                ", scorchingRate=" + scorchingRate +
                '}';
    }
}