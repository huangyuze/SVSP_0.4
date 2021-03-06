package com.jdlink.service;

import com.jdlink.domain.*;
import com.jdlink.domain.Produce.Assessment;

import java.util.Date;
import java.util.List;

/**
 * Created by matt on 2018/5/18.
 */
public interface ContractService {
    void updateEm(Contract contract);
    void add(Contract contract);
    void delete(Contract contract);
    List<Contract> getByKeyword(String keyword,String nameBykey);
    Contract getByContractId(String contractId);
    void update(Contract contract);
    void setCheckStateToExamine(Contract contract);
    void setCheckStateKeeping(Contract contract);
    void setCheckStateInvalid(Contract contract);
    int countTemplate();
    int countManage(int contractIndex);
    int count();
    List<Contract> listPageTemplate(Page page);
    List<Contract> listPageManege(Page page);
    List<Contract> list();
    List<Contract> list1(String name);
    List<Contract> list2(String name,String index2);
    List getContractIdList();
    void toSubmit(String id);
     void updateFreight1(String id);
    void updateFreight2(String id);
    List listRate1();
    List listRate2();
    Contract getModel(String contractId);
    Contract getModel2(String modelName);
    void addEm(Contract contract);
    void cancel(String contractId,String nowTime);
    void cancel1(String modelName);
    void approval(String contractId);
    List<String> modelName(String key);
    void back(String contractId,String backContent,String nowTime);
    void opinion(String contractId,String opinion,String nowTime);
    String getContent(String contractId);
    Client getByClientId(String clientId);
    List<String> getNewestContractId();
    Supplier getSupplierListById(String supplierId);
    /**
     * 根据合同中的客户信息筛选出业务员列表
     * @return 业务员列表
     */
    List<Salesman> listSalesmanByContract(Page page);

    /**
     * 根据合同中的客户信息筛选出业务员列表，获取其业务员数量
     * @return 业务员数量
     */
    int countSalesmanByContract();

    /**
     * 根据业务员的编号和年月份筛选出所有的合同
     * @param salesmanId 业务员编号
     * @return 合同列表
     */
    List<Contract> getContractBySalesman(String salesmanId,String month);
    List<Contract> search(Contract contract);
    List<Contract> searchModel(Contract contract);
    List<Contract> getContractList(String year);
    List<Contract> getContractListByMonth(String month);
    List<Contract> searchMonthData(Assessment assessment);
    List<Contract> getAllContractBySalesmanId(Contract contract);
    List<Contract> getContractByCompanyName(String companyName);
    int getAllContractCountBySalesmanId(String salesmanId);
    void addQuotationItem(QuotationItem quotationItem);
    void updateContract(Contract contract);
    void deleteQuotationItem(String contractId);
    List<Contract> getContractByClientId(String id);
    List<Contract> getContractByMonth(String month);
    int getNewestContractId1();
    Contract getWastesInfoByCompanyName(String companyName,Date creationDate);

    List<QuotationItem> ContractList(Page page);

    int contractVolume();

    void setFilePath(QuotationItem quotationItem);

    void setContractFilePath(Contract contract);

    void updatePictureUrl(String wastesCode,String wastesName,int contractId,String url);

    List<QuotationItem> searchContractVolume(QuotationItem quotationItem);

    void approvalModel(String contractId);

    void signContract(String contractId);
}
