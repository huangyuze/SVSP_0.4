package com.jdlink.mapper;

import com.jdlink.domain.MixingElement;
import com.jdlink.domain.Produce.MaterialRequire;
import com.jdlink.domain.Wastes;

import java.util.List;

public interface MaterialRequireMapper {
    int total();
     void  addMix(MaterialRequire materialRequire);
      List<String> check();//ch查找最新的配伍编号
     List<MaterialRequire> list(String materialRequireId);
   MaterialRequire getByMrId(String materialRequireId );
    void  approval(String id,String remarks);
    void submit(String id);
    void cancel(String id);
    void  back(String id,String remarks);
}