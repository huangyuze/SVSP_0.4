package com.jdlink.service;

import com.jdlink.domain.Page;
import com.jdlink.domain.Produce.Pretreatment;
import com.jdlink.domain.Produce.PretreatmentItem;
import com.jdlink.domain.Wastes;

import java.util.List;

public interface PretreatmentService {
    int count();
    void add(Pretreatment pretreatment);
    void update(Pretreatment pretreatment);
    List<Pretreatment> listPage(Page page);
    List<Pretreatment> list();
    Pretreatment getById(String id);
    List<Pretreatment> search(Pretreatment pretreatment);
    int searchCount(Pretreatment pretreatment);
    int countById(String id);
    void invalid(Pretreatment pretreatment);
    void adjust(Pretreatment pretreatment);
    String getCurrentPretreatmentId();
    int getCurrentItemId();
    PretreatmentItem getItemsById(int id);
    void confirm(String id);

}
