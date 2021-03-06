package com.jdlink.mapper;

import com.jdlink.domain.Page;
import com.jdlink.domain.Produce.*;

import java.util.Date;
import java.util.List;

public interface ProcurementMapper {
    void add(Procurement procurement);
    List<String> getNewestId();
    void addMaterial(Material material);
    List<Procurement> getProcurementList(Page page);
    List<Procurement> getEmergencyProcurementList(Page page);
    List<Procurement> getProcurementListById(String receiptNumber);
    List<Procurement> searchProcurement(Procurement procurement);
    List<String> getIngredientsList();
    void setProcurementListCancel(String receiptNumber);
    void  setProcurementListSubmit(String receiptNumber);
    int totalMouth();
    int totalEmc();
    List<Date>getNewestMouth();
    List<Date>getNewestEm();
    List<Material> getProcurementItemList(Page page);
    List<Material> searchMaterial(Material material);
    Material getMaterialById(String id);
    int searchMaterialTotal(Material material);
    int countProcurementItemList();
    void submitProcurementListById(String receiptNumber);
    void updateMaterial(Material material);
     List<Material> getProcurement();
    List<Material>  searchNewProcurementPlan(Material material);
    int getPrefixCount(String prefix);
    void addProcurementPlan(ProcurementPlan procurementPlan);
    String getApplyDepartmentByReceiptNumber(String id);
    void addProcurementPlanItem(ProcurementPlanItem procurementPlanItem);
    List<ProcurementPlan>getProcurementPlanList(Page page);
    void updateProcurementState(String id);
    List<ProcurementPlan>getProcurementPlanById(String id);
    List<ProcurementPlanItem> searchAdjust(ProcurementPlanItem procurementPlanItem);
    void adjustProcurementPlan(ProcurementPlan procurementPlan);
    void adjustProcurementPlanItem(ProcurementPlanItem procurementPlanItem);
    void submitProcurementPlan(String id);
    void approvalProcurementPlan(String procurementPlanId,String approvalName,String advice);
    void backProcurementPlan(String procurementPlanId,String advice);
    void cancelProcurementPlanById(String id);
    int totalProcurementPlanRecord();
    List<ProcurementPlan>searchProcurementPlan(ProcurementPlan procurementPlan);
    int searchProcurementPlanCount(ProcurementPlan procurementPlan);
    void updateMaterialState(int id);
    void updateMaterialCategoryItemForProcurementPlan(String procurementPlanId,int MaterialCategoryId);

}
