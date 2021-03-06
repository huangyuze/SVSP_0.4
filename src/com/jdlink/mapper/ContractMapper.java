package com.jdlink.mapper;

import com.jdlink.domain.*;
import com.jdlink.domain.Produce.Assessment;
import org.apache.ibatis.annotations.Param;

import java.util.Date;
import java.util.List;
import java.util.concurrent.CopyOnWriteArrayList;

/**
 * Created by matt on 2018/4/23.
 */
public interface ContractMapper {

    void add(Contract contract);
    void addEm(Contract contract);
    void delete(Contract contract);
    List<Contract> getByKeyword(String keyword,String nameBykey);
    Contract getByContractId(String contractId);
    void update(Contract contract);
    void updateEm(Contract contract);
    void setCheckStateToExamine(Contract contract);
    void setCheckStateKeeping(Contract contract);
    void setCheckStateInvalid(Contract contract);
    int countTemplate();
    int countManage(@Param("contractIndex")int contractIndex);
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
    void cancel(String contractId,String nowTime);
    void cancel1(String modelName);
    void approval(String contractId);
    List<String> modelName(String key);
    void back(String contractId,String backContent,String nowTime);
    void opinion(String contractId,String opinion,String nowTime);
    Contract getModel2(String modelName);
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
     * 根据业务员的编号筛选出所有的合同
     * @param salesmanId 业务员编号
     * @return 合同列表
     */
    List<Contract> getContractBySalesman(@Param("salesmanId")String salesmanId,@Param("month")String month);
    /**
     * 获取合同列表数据
     * @return
     */
    List<Contract> getContractList(String year);

    /**
     * 查询合同数据
     * @param assessment
     * @return
     */
    List<Contract> searchMonthData(Assessment assessment);
    /**
     * 合同列表的高级查询
     */
    List<Contract> search(Contract contract);
    List<Contract> searchModel(Contract contract);
    List<Contract> getContractListByMonth(String month);

    List<Contract> getAllContractBySalesmanId(Contract contract);
    int getAllContractCountBySalesmanId(String salesmanId);
    /**
     * 添加合同中的报价单明细
     */
    void addQuotationItem(QuotationItem quotationItem);

    /**
     * 合同主表更新
     */
    void updateContract(Contract contract);

    /**
     * 删除字表明细
     * @param contractId
     */
    void deleteQuotationItem(String contractId);

    List<Contract> getContractByClientId(String id);

    List<Contract> getContractByMonth(String month);
    List<Contract> getContractByCompanyName(String companyName);
   int getNewestContractId1();

   Contract getWastesInfoByCompanyName(@Param("companyName") String companyName,@Param("creationDate") Date creationDate);


   List<QuotationItem> ContractList(Page page);

   int contractVolume();

    void setFilePath(QuotationItem quotationItem);

    void setContractFilePath(Contract contract);

    void updatePictureUrl(String wastesCode,String wastesName,int contractId,String url);

    List<QuotationItem> searchContractVolume(QuotationItem quotationItem);

    void approvalModel(String contractId);

    void signContract(String contractId);
}
