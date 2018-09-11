package com.jdlink.mapper;

import com.jdlink.domain.Page;
import com.jdlink.domain.Produce.*;
import org.apache.ibatis.annotations.Param;

import java.util.Date;
import java.util.List;

public interface IngredientsMapper {
    ///入库单///
    int countInById(String id);
    IngredientsIn getInById(String id);
    void addIn(IngredientsIn ingredientsIn);
    List<IngredientsIn> listPageIn(Page page);
    int countIn();
    int searchInCount(IngredientsIn ingredientsIn);
    List<IngredientsIn> searchIn(IngredientsIn ingredientsIn);
    void invalidIn(String id);
    void updateIn(IngredientsIn ingredientsIn);
    List<IngredientsIn> getIngredientsInItemByRange(@Param("startDate") Date startDate, @Param("endDate") Date endDate, @Param("equipment")Equipment equipment);
    /**
     * 用于判断库存表中该物品在某仓库中是否存在库存
     * @param ingredients
     * @return
     */
    int getAmountItems(Ingredients ingredients);

    /////领料单///////
    int countReceiveById(String id);
    IngredientsReceive getReceiveById(String id);
    void addReceive(IngredientsReceive ingredientsReceive);
    void addAllReceive(IngredientsReceive ingredientsReceive);
    List<IngredientsReceive> listPageReceive(Page page);
    int countReceive();
    int searchReceiveCount(IngredientsReceive ingredientsReceive);
    List<IngredientsReceive> searchReceive(IngredientsReceive ingredientsReceive);
    void invalidReceive(String id);
    void updateReceive(IngredientsReceive ingredientsReceive);
    List<Ingredients> getAmountAndReceive(Ingredients ingredients);
    List<Ingredients> getInventoryList();
    List<Ingredients> searchInventory(Ingredients ingredients);
    void updateReceiveState(String id);

    ///出库单///
    int countOutById(String id);
    IngredientsOut getOutById(String id);
    void addOut(IngredientsOut ingredientsOut);
    List<IngredientsOut> listPageOut(Page page);
    int countOut();
    int searchOutCount(IngredientsOut ingredientsOut);
    List<IngredientsOut> searchOut(IngredientsOut ingredientsOut);
    void invalidOut(String id);
    void updateOut(IngredientsOut ingredientsOut);
    List<IngredientsOut> getIngredientsOutItemByRange(@Param("startDate") Date startDate, @Param("endDate") Date endDate, @Param("equipment")Equipment equipment);
}