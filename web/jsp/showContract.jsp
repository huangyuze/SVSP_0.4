<%--
  Created by IntelliJ IDEA.
  User: Administrator
  Date: 2018/7/4/004
  Time: 10:23
  To change this template use File | Settings | File Templates.
--%>
<!DOCTYPE html>
<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8" isELIgnored="false"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://java.sun.com/jstl/fmt_rt" prefix="fmt" %>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>合同新增</title>
    <script src="js/jquery/2.0.0/jquery.min.js"></script>
    <script src="js/jquery/2.0.0/jquery.serializejson.js"></script>
    <link href="css/bootstrap/3.3.6/bootstrap.min.css" rel="stylesheet">
    <link href="css/bootstrap/bootstrap-datetimepicker.min.css" rel="stylesheet" media="screen">
    <link href="css/bootstrap/bootstrap-select.min.css" type="text/css" rel="stylesheet">
    <link href="css/dashboard.css" rel="stylesheet">
    <script type="text/javascript" src="js/bootstrap/bootstrap-datetimepicker.js" charset="UTF-8"></script>
    <script src="js/bootstrap/3.3.6/bootstrap.min.js"></script>
    <script src="js/bootstrap/bootstrap-datetimepicker.zh-CN.js"></script>
    <script src="js/bootstrap/bootstrap-select.min.js"></script>
    <script src="js/bootstrap/defaults-zh_CN.min.js"></script>
    <link href="css/dropdown-submenu.css" rel="stylesheet">
    <script src="js/ckeditor/ckeditor.js"></script>
    <link href="css/bootstrap/navbar.css" rel="stylesheet">
    <script src="js/bootstrap/navbar.js"></script>
</head>
<script type="text/javascript">
    CKEDITOR.editorConfig = function( config ) {
        config.toolbarGroups = [
            { name: 'clipboard', groups: [ 'clipboard', 'undo' ] },
            { name: 'links', groups: [ 'links' ] },
            { name: 'editing', groups: [ 'find', 'selection', 'spellchecker', 'editing' ] },
            { name: 'insert', groups: [ 'insert' ] },
            { name: 'forms', groups: [ 'forms' ] },
            { name: 'tools', groups: [ 'tools' ] },
            { name: 'document', groups: [ 'mode', 'document', 'doctools' ] },
            { name: 'others', groups: [ 'others' ] },
            '/',
            { name: 'basicstyles', groups: [ 'basicstyles', 'cleanup' ] },
            { name: 'paragraph', groups: [ 'list', 'indent', 'blocks', 'align', 'bidi', 'paragraph' ] },
            { name: 'styles', groups: [ 'styles' ] },
            { name: 'colors', groups: [ 'colors' ] },
            { name: 'about', groups: [ 'about' ] }
        ];
        config.removeButtons = 'Underline,Subscript,Superscript';
        config.pasteFromWordRemoveFontStyles = false;
        config.pasteFromWordRemoveStyles = false;
        config.removePlugins='elementspath';
    };
    /**
     * 装载下拉框列表
     */
    function loadContractSelectList() {
        var contractType=$('#contractType');
        contractType.hide();
        $('.selectpicker').selectpicker({
            language: 'zh_CN',
            size: 4
        });
        var b='${contract.contractVersion}';
        console.log(b);
        if(b=="companyContract"){
            //执行方法
            $('#contractVersion').click();
        }
        if(b=="customerContract"){
            //执行方法
            $('#contractVersion2').click();
        }
      //取得下拉菜单的选项
        $.ajax({
            type: "POST",                            // 方法类型
            url: "getContractList",                  // url
            dataType: "json",
            data:{'key':"危废"},
            success: function (result) {
                var data=eval(result);
                var begin='${contract.beginTime}';//String类型
                if(begin!=''){
                    var beginTime=getTime(begin);
                    $('#beginTime').prop("value",beginTime);
                }
            else {
                    $('#beginTime').prop("value"," ");
                }
                var end='${contract.endTime}';
                if(end!=''){
                    var endTime=getTime(end);
                    $('#endTime').prop("value",endTime);
                }
               else {
                    $('#endTime').prop("value"," ");
                }
                var freight='${contract.freight}';
                if(freight=='false'){
                 $('#isFreight').removeAttr("checked");
                 $('#isFreight').prop("checked",false);
                 $('#isFreight').prop("value",false);
             }
                if(freight=='true'){
                    $('#isFreight').removeAttr("checked");
                    $('#isFreight').prop("checked",true);
                    $('#isFreight').prop("value",true);
                }
                var contractVersion='${contract.contractVersion}';
                $(":radio[name='contractVersion'][value='" +contractVersion+"']").prop("checked", "checked");
                if('${contract.contractName}'!=null){
                    $('#contractName').prop("value", '${contract.contractName}');
                }
                else {
                    $('#contractName').prop("value", " ");
                }
                var s='${contract.contactName}';
                if(s!=""){
                    $('#contactName').prop("value","${contract.contactName}");
                }
                else {
                    $('#contactName').prop("value","");
                }
              //赋值开户行名称
                $('#bankName').prop("value",'${contract.bankName}');
                //赋值开户行账号
                $('#bankAccount').prop("value",'${contract.bankAccount}');

               if (result != undefined) {
                    // 各下拉框数据填充
                    var province = $("#province");
                    province.children().remove();
                    $.each(data.provinceStrList, function (index, item) {
                        var option = $('<option />');
                        option.val(index);
                        option.text(item.name);
                        province.append(option);
                    });
                    province.get(0).selectedIndex = ${contract.province.index-1};
                    var provinceId=${contract.province.index-1}+1;
                   $('.selectpicker').selectpicker('refresh');
                   // console.log(provinceId);//省市ID
                   //获取相应的市级
                   $.ajax({
                       type: "POST",                            // 方法类型
                       url: "getCityList",                  // url
                       dataType: "json",
                       data:{
                           'provinceId': provinceId
                       },
                       success: function (result) {
                           if (result != undefined) {
                               var data = eval(result);
                               //console.log(data);
                               //var contractName = $("#contractName");
                               //下拉框填充
                               var city=$("#city");
                               city.children().remove();
                               cityIndex="";
                               $.each(data, function (index, item) {
                                //  console.log(item);
                                   var option1 = $('<option />');
                                   option1.val(item.cityname);
                                   option1.text(item.cityname);
                                   if(item.cityname=='${contract.city}'){
                                       cityIndex=index;

                                   }
                                   city.append(option1);
                               });
                               $('.selectpicker').selectpicker('refresh');
                               city.get(0).selectedIndex = cityIndex;

                           } else {
                               console.log(result);
                           }
                       },
                       error:function (result) {
                           console.log(result);
                       }
                   });
                   var clientName=$('#companyName');
                    clientName.children().remove();
                    index1="";
                    var s='${contract.company1}';
                    $.each(data.companyNameList, function (index, item) {
                        var option = $('<option />');
                        option.val(index);
                        option.text(item.companyName);
                        if(item.companyName==s){
                            index1=index;
                        }
                        clientName.append(option);
                    });
                    clientName.get(0).selectedIndex =index1;
                   $('.selectpicker').selectpicker('refresh');
                   //赋值客户名称
                   //供应商名称
                   if('${contract.company1}'!=""){
                       $('#company1').prop("value",'${contract.company1}');
                   }
                   else {
                       var options1=$("#companyName option:selected").val(); //获取选中的项
                       //  console.log(options1);
                       var company=data.companyNameList[options1];//取得被选中供应商的信息
                       $('#company1').prop("value",company.companyName);
                   }
                    // (function (index1){
                    //   changeSelect(index1);
                    // })(index1);
                   var contractType1=$('#contractType1');
                   contractType1.children().remove();
                   index2="";
                   $.each(data.modelNameList, function (index, item) {
                       var option = $('<option />');
                       option.val(item.modelName);
                       option.text(item.modelName);
                       if(item.modelName=='${contract.modelName}'){
                           index2=index;
                       }
                       contractType1.append(option);
                   });
                   contractType1.get(0).selectedIndex =index2;
                   //开票税率1下拉框
                   var taxRate1=$('#taxRate1');
                   taxRate1.children().remove();
                   //var s='${contract.ticketRate1}';//Rate3
                   $.each(data.ticketRateStrList1, function (index, item) {
                       //看具体的item 在指定val
                       //console.log(item);
                       var option = $('<option />');
                       option.val(index);
                       option.text(item.name);
                       taxRate1.append(option);
                   });
                   taxRate1.get(0).selectedIndex = ${contract.ticketRate1.index}-1;
                   //开票税率2下拉框
                   <%--var taxRate2=$('#taxRate2');--%>
                   <%--taxRate2.children().remove();--%>
                   <%--var s1='${contract.ticketRate2}';--%>
                   <%--$.each(data.ticketRateStrList2, function (index, item) {--%>
                       <%--// console.log(s1)--%>
                       <%--var option = $('<option />');--%>
                       <%--option.val(index);--%>
                       <%--option.text(item.name);--%>
                       <%--taxRate2.append(option);--%>
                   <%--});--%>
                   <%--taxRate2.get(0).selectedIndex =${contract.ticketRate2.index}-1;--%>
                }
                else {
                    console.log(result);
                }
            },
            error:function (result) {
                console.log(result);
            }
        });
    }
    function changeSelect(index) {
        var index1=index+1;//获得province_id
        //console.log(index1);
        //调用ajax
        $.ajax({
            type: "POST",                            // 方法类型
            url: "getCityList",                  // url
            dataType: "json",
            data:{
                'provinceId': index1
            },
            success: function (result) {
                if (result != undefined) {
                    var data = eval(result);
                    //console.log(data);
                    //var contractName = $("#contractName");
                    //下拉框填充
                    var city=$("#city");
                    city.children().remove();
                    $.each(data, function (index, item) {
                        var option1 = $('<option />');
                        option1.val(item.cityname);
                        option1.text(item.cityname);
                        city.append(option1);
                    });
                    city.get(0).selectedIndex = -1;
                    $('.selectpicker').selectpicker('refresh');
                } else {
                    console.log(result);
                }
            },
            error:function (result) {
                console.log(result);
            }
        });

    }
    /*提交*/
    function contractSubmit(){
        // if(){
        //
        // }

           //console.log(s);
        $.ajax({
            type: "POST",                            // 方法类型
            url: "submitContract",                       // url
            async: false,                           // 同步：意思是当有返回值以后才会进行后面的js程序
            data: JSON.stringify($('#contractInfoForm1').serializeJSON()),
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            success: function (result) {
                if (result != undefined) {
                   // console.log(eval(result));
                    console.log("success: " + result);
                    alert("提交成功!");
                    $(location).attr('href', 'contractManage.html');//跳转
                } else {
                    console.log("fail: " + result);
                    alert("保存失败!");
                }
            },
            error: function (result) {
                console.log("error: " + result);
                alert("服务器异常!");
            }
        });
    }
    //获取时间
   function getTime(time) {
       var date=new Date(time);//转成Date
       var year=date.getFullYear();
       var mouth=date.getMonth()+1;
       var day=date.getDate();
       if(mouth.length!=2){
           mouth="0"+mouth;

       }
       if(day.length<2){
           day="0"+day;
       }
       return year+"-"+mouth+"-"+day;
   }
</script>
<body onload="loadContractSelectList();">
<nav class="navbar navbar-inverse navbar-fixed-top float" id="navbar1" style="height: 50px;">
    <div class="main-title">
        <ul class="nav navbar-nav navbar-left navbar-side">
            <li>
                <a href="#" onclick="$('body').toggleClass('sidebar-collapse');" style="width: 50px">
                    <span class="glyphicon glyphicon-menu-hamburger"></span>
                </a>
            </li>
        </ul>
    </div>
    <div class="container navbar-left" style="width: 900px;">
        <div class="navbar-header">
            <a class="navbar-brand" href="#"><img src="image/logo2.png"></a>
        </div>
        <div id="navbar" class="collapse navbar-collapse" style="margin-left: 150px;">
            <ul class="nav navbar-nav">
                <li><a href="businessModel.html">首页</a></li>
                <li class="dropdown active">
                    <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">产废单位管理<span class="caret"></span></a>
                    <ul class="dropdown-menu">
                        <li><a href="clientBackup.html" id="function_48" onclick="checkAuthority($(this))">产废单位备案</a></li>
                        <li role="separator" class="divider"></li>
                        <li class="dropdown-submenu">
                            <a href="#">业务员分配管理</a>
                            <ul class="dropdown-menu">
                                <li><a href="salesManage.html" id="function_80" onclick="checkAuthority($(this))">业务员管理</a></li>
                                <li role="separator" class="divider"></li>
                                <li><a href="clientSalesManage.html" id="function_81" onclick="checkAuthority($(this))">产废单位分配管理</a></li>
                            </ul>
                        </li>
                        <li role="separator" class="divider"></li>
                        <li><a href="questionnaireManage.html" id="function_50" onclick="checkAuthority($(this))">危废数据调查表管理</a></li>
                        <li role="separator" class="divider"></li>
                        <li><a href="sampleInfo.html" id="function_51" onclick="checkAuthority($(this))">产废单位样品登记</a></li>
                        <li role="separator" class="divider"></li>
                        <li><a href="wayBill1.html" id="function_52" onclick="checkAuthority($(this))">接运单管理</a></li>
                    </ul>
                </li>
                <li class="dropdown">
                    <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">处置单位管理<span class="caret"></span></a>
                    <ul class="dropdown-menu">
                        <li><a href="supplierBackup.html" id="function_15" onclick="checkAuthority($(this))">处置单位备案</a></li>
                    </ul>
                </li>
                <li class="dropdown">
                    <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">合同管理<span class="caret"></span></a>
                    <ul class="dropdown-menu">
                        <li><a href="contractManage.html" id="function_54" onclick="checkAuthority($(this))">合同列表</a></li>
                        <li role="separator" class="divider"></li>
                        <li><a href="contractTemplate.html" id="function_55" onclick="checkAuthority($(this))">合同模板</a></li>
                    </ul>
                </li>
                <!--<li class="dropdown">-->
                <!--<a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">价格管理<span class="caret"></span></a>-->
                <!--<ul class="dropdown-menu">-->
                <!--<li><a href="quotation.html" id="function_57" onclick="checkAuthority($(this))">报价管理</a></li>-->
                <!--<li role="separator" class="divider"></li>-->
                <!--<li><a href="cost.html" id="function_58" onclick="checkAuthority($(this));">成本管理</a></li>-->
                <!--</ul>-->
                <!--</li>-->
                <li><a href="archivesManage.html" id="function_18" onclick="checkAuthority($(this));">一企一档</a></li>
                <li><a href="stockManage.html" id="function_19" onclick="checkAuthority($(this));">库存申报</a></li>
            </ul>
        </div><!--/.nav-collapse -->
    </div>
    <ul class="nav navbar-nav navbar-right">
        <li><a href="#" title="提醒"><span class="glyphicon glyphicon-bell"></span></a></li>
        <li><a href="#" title="事项"><span class="glyphicon glyphicon-envelope"></span></a></li>
        <li class="dropdown">
            <a href="#" title="我的" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false"><span class="glyphicon glyphicon-user"></span></a>
            <ul class="dropdown-menu">
                <li><a href="#">个人信息</a></li>
                <li><a href="#">待办事项</a></li>
                <li><a href="#" onclick="showLog();">登录日志</a></li>
                <li><a href="index.html">注销</a></li>
            </ul>
        </li>
    </ul>

</nav>
<div class="container-fluid">
    <div class="row">
        <div class="sidebar">
            <ul class="sidenav animated fadeInUp">
                <!--<li><a href="#"><span class="glyphicon glyphicon-backward" aria-hidden="true"></span></a></li>-->
                <li><a class="withripple" href="wastesPlatform.html"id="function_1" onclick="checkAuthority($(this))"><span class="glyphicon glyphicon-list" aria-hidden="true"></span><span class="sidespan">&nbsp;&nbsp;系统概览 </span><span class="iright pull-right">&gt;</span><span class="sr-only">(current)</span></a></li>
                <li class="active"><a class="withripple" href="businessModel.html"id="function_2" onclick="checkAuthority($(this))"><span class="glyphicon glyphicon-user" aria-hidden="true"></span><span class="sidespan">&nbsp;&nbsp;商务管理 </span><span class="iright pull-right">&gt;</span></a></li>
                <li><a class="withripple" href="compatibilityPlan.html"id="function_3" onclick="checkAuthority($(this))"><span class="glyphicon glyphicon-list" aria-hidden="true"></span><span class="sidespan">&nbsp;&nbsp;配伍计划 </span><span class="iright pull-right">&gt;</span></a></li>
                <li><a class="withripple" href="receiveManagement.html"id="function_4" onclick="checkAuthority($(this))"><span class="glyphicon glyphicon-log-in" aria-hidden="true"></span><span class="sidespan">&nbsp;&nbsp;接收管理 </span><span class="iright pull-right">&gt;</span></a></li>
                <li><a class="withripple" href="storageManagement.html"id="function_5" onclick="checkAuthority($(this))"><span class="glyphicon glyphicon-save" aria-hidden="true"></span><span class="sidespan">&nbsp;&nbsp;贮存管理 </span><span class="iright pull-right">&gt;</span></a></li>
                <li><a class="withripple" href="preprocessingManagement.html"id="function_6" onclick="checkAuthority($(this))"><span class="glyphicon glyphicon-sort-by-attributes-alt" aria-hidden="true"></span><span class="sidespan">&nbsp;&nbsp;预备管理 </span><span class="iright pull-right">&gt;</span></a></li>
                <li><a class="withripple" href="dispositionManagement.html"id="function_7" onclick="checkAuthority($(this))"><span class="glyphicon glyphicon-retweet" aria-hidden="true"></span><span class="sidespan">&nbsp;&nbsp;处置管理 </span><span class="iright pull-right">&gt;</span></a></li>
                <li><a class="withripple" href="secondaryManagement.html"id="function_8" onclick="checkAuthority($(this))"><span class="glyphicon glyphicon-tags" aria-hidden="true"></span><span class="sidespan">&nbsp;&nbsp;次生管理 </span><span class="iright pull-right">&gt;</span></a></li>
                <li><a class="withripple" href="procurementManagement.html"id="function_9" onclick="checkAuthority($(this))"><span class="glyphicon glyphicon-indent-right" aria-hidden="true"></span><span class="sidespan">&nbsp;&nbsp;采购管理 </span><span class="iright pull-right">&gt;</span></a></li>
                <li><a class="withripple" href="reportManagement.html"id="function_10" onclick="checkAuthority($(this))"><span class="glyphicon glyphicon-edit" aria-hidden="true"></span><span class="sidespan">&nbsp;&nbsp;报表管理 </span><span class="iright pull-right">&gt;</span></a></li>
                <li><a class="withripple" href="basicData.html" id="function_11" onclick="checkAuthority($(this))"><span class="glyphicon glyphicon-signal" aria-hidden="true"></span><span class="sidespan">&nbsp;&nbsp;基础数据 </span><span class="iright pull-right">&gt;</span></a></li>
                <li><a class="withripple" href="#" id="function_12" onclick="checkAuthority($(this))"><span class="glyphicon glyphicon-cog" aria-hidden="true"></span><span class="sidespan">&nbsp;&nbsp;系统设置 </span><span class="iright pull-right">&gt;</span></a></li>
            </ul>
        </div>
    </div>
    <div class="col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2 main">
        <div class="row">
            <ol class="breadcrumb">
                <li><a href="businessModel.html">商务管理</a></li>
                <li><a href="#">合同管理</a></li>
                <li><a href="contractManage.html">合同列表</a></li>
            </ol>
        </div>
        <h4 class="sub-header">危废合同申请表修改</h4>
        <form method="post" id="contractInfoForm1" enctype="multipart/form-data" >
            <div class="row">
                <div class="form-horizontal col-md-4">
                    <div class="form-group">
                        <label class="col-sm-6 control-label" for="submitName">送审人员</label>
                        <div class="col-xs-6">
                            <input type="text" class="form-control"  name="reviewer" id="submitName" placeholder="***" readonly>
                        </div>
                    </div>
                </div>
                <div class="form-horizontal col-md-4" >
                    <div class="form-group"  >
                        <label class="col-sm-6 control-label" for="submitDate"> 送审日期</label>
                        <div class="col-xs-6">
                            <input type="text" class="form-control"  name="reviewDate" id="submitDate" placeholder="***" readonly>
                        </div>
                    </div>
                </div>
                <div class="form-horizontal col-md-4" >
                    <div class="form-group">
                        <label class="col-sm-6 control-label" for="submitDep"> 送审部门</label>
                        <div class="col-xs-6">
                            <input type="text" class="form-control"  name="reviewDepartment" id="submitDep" placeholder="***" readonly>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="form-horizontal col-md-6">
                    <div class="form-group" >
                        <label  class="col-sm-4 control-label" for="companyName">客户名称</label>
                        <div class="col-xs-4">
                            <select class="selectpicker input-sm form-control" data-live-search="true" data-live-search-placeholder="搜索..." id="companyName" name="companyName" onchange="findClient();">
                            </select>
                        </div>
                    </div>
                    <div class="form-group" >
                        <label class="col-sm-4 control-label" for="province">所属区域 </label>
                        <form name="form1" method="post" action="">
                            <div class="form-inline">
                                <div class="form-group col-xs-3">
                                    <select class="selectpicker input-xlarge form-control" data-live-search="true" data-live-search-placeholder="搜索..." id="province"  name="province" onchange="changeSelect(this.selectedIndex)">
                                    </select>
                                </div>
                                <div class="form-group col-xs-3">
                                    <select class="selectpicker input-xlarge form-control" data-live-search="true" data-live-search-placeholder="搜索..." id="city" name="city">
                                    </select>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div class="form-group" >
                        <label  for="contractName" class="col-sm-4 control-label">合同名称</label>
                        <div class="col-xs-4" id="contractName1" >
                            <input type="text" class="form-control" id="contractName" name="contractName">
                        </div>
                        <div class="col-xs-5 form-inline" id="contractType2">
                            <select class="form-control"  type="text" id="contractType1" name="modelName"  >
                            </select>
                            <input type="button" class="form-control" value="查看" onclick="check1(this)">
                        </div>
                    </div>
                    <div class="form-group" >
                        <label  for="contactName" class="col-sm-4 control-label">联系人</label>
                        <div class="col-xs-4" >
                            <input type="text" class="form-control" id="contactName" name="contactName"  >
                        </div>
                    </div>
                    <div class="form-group" >
                        <label  for="bankName" class="col-sm-4 control-label">开户行名称</label>
                        <div class="col-xs-4" >
                            <input type="text" class="form-control" id="bankName" name="bankName" placeholder="">
                        </div>
                    </div>
                    <div class="form-group" >
                        <label for="taxRate1" class="col-sm-4 control-label">开票税率</label>
                        <div class="col-xs-5">
                            <select class="form-control" id="taxRate1" name="ticketRate1">
                            </select>
                        </div>
                    </div>
                    <div class="form-group ">
                        <label class="col-sm-4 control-label sr-only" > 1111111</label>
                        <label class="checkbox-inline col-xs-5" for="isFreight">
                            是否包含运费<input type="checkbox" id="isFreight"  class="col-xs-3" name="freight" onclick="is()" >
                        </label>
                    </div>
                    <div class="form-group" >
                        <label for="contractType" class="col-sm-3 control-label"></label>
                        <div class="col-xs-5">
                            <input class="form-control"  type="text" id="contractType" name="contractType" value="Wastes" >
                            </input>
                        </div>
                    </div>
                    <div class="form-group" >
                        <div class="col-xs-4" >
                            <input type="hidden" class="form-control" id="company1" name="company1" placeholder="">
                        </div>
                    </div><!--隐藏域保存客户名称-->
                </div>
                <div class="form-horizontal col-md-6">
                    <div class="form-group" >
                        <label  class="col-sm-3 control-label" for="contractVersion" >合同版本</label>
                        <div class="col-xs-8" >
                            <label class="radio-inline">
                                <input type="radio" name="contractVersion" id="contractVersion" value="companyContract" onclick="Appear()"> 公司合同
                            </label>
                            <label class="radio-inline">
                                <input type="radio" name="contractVersion" id="contractVersion2" value="customerContract" onclick="Appear1()"> 客户合同
                            </label>
                        </div>
                    </div>
                    <div class="form-group" >
                        <label class="col-sm-3 control-label">合同有效期 </label>
                        <div class="input-group date">
                            <input type="text" class="input-sm form-control form_datetime1" name="beginTime" id="beginTime"/>
                            <span class="input-group-addon"><span class="glyphicon glyphicon-calendar"></span></span>
                            <span class="input-group-addon">to</span>
                            <input type="text" class="input-sm form-control form_datetime2" name="endTime" id="endTime"/>
                            <span class="input-group-addon"><span class="glyphicon glyphicon-calendar"></span></span>
                        </div>
                    </div>
                    <div class="form-group" >
                        <label for="order1" class="col-sm-3 control-label">预计处置费</label>
                        <div class="col-xs-5" >
                            <input type="text" class="form-control" id="order1" name="order1" value="${contract.order1}" >
                        </div>
                        <h4>元</h4>
                    </div>
                    <div class="form-group" >
                        <label for="telephone" class="col-sm-3 control-label">联系电话</label>
                        <div class="col-xs-5" >
                            <input type="text" class="form-control" id="telephone" name="telephone" value="${contract.telephone}" >
                        </div>
                    </div>
                    <div class="form-group" >
                        <label  for="bankAccount" class="col-sm-3 control-label">开户行账号</label>
                        <div class="col-xs-5" >
                            <input type="text" class="form-control" id="bankAccount" name="bankAccount" placeholder="">
                        </div>
                    </div>
                    <%--<div class="form-group" >--%>
                        <%--<label for="taxRate2" class="col-sm-3 control-label">开票税率2</label>--%>
                        <%--<div class="col-xs-5">--%>
                            <%--<select class="form-control" id="taxRate2" name="ticketRate2">--%>
                            <%--</select>--%>
                        <%--</div>--%>
                    <%--</div>--%>
                    <div class="form-group" >
                        <label for="contractId" class="col-sm-3 control-label">合同编号</label>
                        <div class="col-xs-5" >
                            <input type="text" class="form-control" id="contractId" name="contractId" value="${contract.contractId}" readonly >
                        </div>
                    </div>
                </div>
            </div>
            <div class="row text-center">
                <a class="btn btn-success" onclick="contractAdjustSave()">保存修改</a>
                <a class="btn btn-primary" onclick="contractAdjustSave()">提交修改</a>
                <a class="btn btn-danger " id="back">返回</a>
            </div>
        </form>
    </div>
</div>
<div class="modal fade bs-example-modal-lg" id="modelInfoForm" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel">
    <div class="modal-dialog modal-lg" role="document" style="height:150%">
        <div class="modal-content">
            <div class="client_style">
                <h2 class="sub-header text-center">模板信息</h2>
                <form method="post" id="modelInfoForm1" enctype="multipart/form-data">
                    <div class="row">
                        <div class="form-horizontal col-md-6">
                            <div class="form-group">
                                <label for="modal3_modelName" class="col-sm-4 control-label">模板名称 </label>
                                <div class="col-xs-5">
                                    <input type="text" class="form-control focus" id="modal3_modelName" name="modelName"style="box-shadow:none">
                                </div>
                            </div>
                            <div class="form-group" >
                                <label for="modelVersion" class="col-sm-4 control-label">版本</label>
                                <div class="col-xs-5" >
                                    <input type="text" class="form-control focus" id="modelVersion" name="modelVersion"  style="box-shadow:none">
                                </div>
                            </div>
                        </div>
                        <div class="form-horizontal col-md-6">
                            <div class="form-group">
                                <label for="modal3_year" class="col-sm-4 control-label">年份</label>
                                <div class="col-xs-5">
                                    <input type="text" class="form-control focus" id="modal3_year" name="year" style="box-shadow:none">
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="modal3_period" class="col-sm-4 control-label">适用期限</label>
                                <div class="col-xs-5">
                                    <input type="text" class="form-control focus" id="modal3_period" name="period" style="box-shadow:none">
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-horizontal col-md-12">
                            <label for="modal3_contractContent" class="control-label col-sm-6">合同正文 </label>
                            <textarea class="form-control"  id="modal3_contractContent" rows="40" name="contractContent"  ></textarea>
                        </div>
                        <div class="row text-center">
                            <a class="btn btn-primary" onclick="" id="btn">打印</a>
                            <a class="btn btn-danger" data-dismiss="modal">关闭</a>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>
</body>
<script>
    CKEDITOR.replace('modal3_contractContent',{toolbarCanCollapse: true, toolbarStartupExpanded: false});
    $('.form_datetime1').datetimepicker({
        format: 'yyyy-mm-dd',
        language:  'zh-CN',
        weekStart: 1,
        todayBtn:  1,
        autoclose: 1,
        todayHighlight: 1,
        startView: 2,
        minView: 2,
        forceParse: 0
    });
    $('.form_datetime2').datetimepicker({
        format: 'yyyy-mm-dd',
        language:  'zh-CN',
        weekStart: 1,
        todayBtn:  1,
        autoclose: true,
        todayHighlight: 1,
        startView: 2,
        minView: 2,
        forceParse: 0
    });
    /**
     * 保存修改
     */
    function contractAdjustSave() {
        var companyName=$("#companyName option:selected").text();//获取客户名称
        var province=$("#province option:selected").text();//获得省名称
        var city=$('#city option:selected').text();//获得市
        var contractName=$('#contactName option:selected').text();
        var beginTime=$("#beginTime").val();
        var endTime=$("#endTime").val();// 截止日期
        var contactName=$('#contactName').text();//联系人
        var isFreight=$('#isFreight').prop("checked");//是否需要运费
        var order1=$('#order1').val();
        var telephone=$('#telephone').val();
        var contractVersion=$('input:radio:checked').val();
        contractId='${contract.contractId}';
       // console.log("合同编号为"+contractId);
        $.ajax({
            type: "POST",                            // 方法类型
            url: "saveAdjustContract",                       // url
            async: false,                           // 同步：意思是当有返回值以后才会进行后面的js程序
            data: JSON.stringify($('#contractInfoForm1').serializeJSON()),
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            success: function (result) {
                if (result != undefined) {
                  // console.log(eval(result));
                    console.log("success: " + result);
                    alert("保存修改成功!");
                    $(location).attr('href', 'contractManage.html');
                    localStorage.name="Wastes";
                    location.href="contractManage.html";
                } else {
                    console.log("fail: " + result);
                    alert("保存失败!");
                }
            },
            error: function (result) {
                console.log("error: " + result);
                alert("服务器异常!");
            }
        });
    }
    function is() {
       var isFreight= new String($('#isFreight').prop("checked"));//是否需要运费
        var   gettype=Object.prototype.toString
        console.log(gettype.call(isFreight));
        var id=$("#contractId").val();
        console.log(isFreight+id);
        $.ajax({
            type: "POST",                     // 方法类型
            url: "isF",                  // url
            dataType: "json",
            data:{
                'isFreight':isFreight,
                'id':id,
            },
            success: function (result) {


            },
            error: function (result) {

            }
        });
    }
    $('#back').click(function () {
        $(location).attr('href', 'contractManage.html');
        localStorage.name="Wastes";
        location.href="contractManage.html";
    });
    function Appear() {
        $("#contractName1").hide();
        $('#contractType2').show();
    }
    function Appear1() {
        $('#contractType2').hide();
        $("#contractName1").show();
    }
    /**
     *
     * 合同正文查看
     */

    function check1(item) {
        var modelName=item.previousElementSibling.value;
        //console.log(modelName);
        $.ajax({
            type:"POST",
            url:"getContractBymodelName1",
            async: false,
            dataType: "json",
            data: {
                'modelName': modelName
            },
            success:function (result) {
                if(result!=undefined){
                    var obj=eval(result);
                    //console.log(obj);
                    //$('input').prop("readonly",true);
                    // $('textarea').prop("readonly",true);
                    $('#modal3_modelName').val(obj.modelName);
                    $('#modal3_contractType').val(obj.contractType.name);
                    $('#modal3_year').val(obj.year);
                    $('#modal3_period').val(obj.period);
                    $('#modelVersion').val(obj.modelVersion);
                    var text=obj.contractContent;
                    //console.log(text);
                    //$('#modal3_contractContent').val($(text).text());//有换行的格式
                    CKEDITOR.instances.modal3_contractContent.setData(text);//获取值
                }
            },
            error:function (result) {

            }
        });
        $('#modelInfoForm').modal('show');
    }
    function findClient() {
        options=$("#companyName option:selected").val(); //获取选中的项
        $.ajax({
            type:"POST",
            url:"getContractList",
            dataType: "json",
            success:function (result) {
                var obj=eval(result);
                var company=(obj.companyNameList[options]);//获取供应商的信息
                console.log(company);
                //2赋值
                //赋值联系人
                //客户名称
                $('#company1').prop("value",company.companyName);
                $('#contactName').prop("value",company.contactName);
                //赋值联系方式
                if(company.mobile!=""&&company.phone==""){
                    $('#telephone').prop("value",company.mobile);
                }
                if(company.mobile==""&&company.phone!=""){
                    $('#telephone').prop("value",company.phone);
                }
                if(company.mobile==""&&company.phone==""){
                    $('#telephone').prop("value","");
                }
                if(company.mobile!=""&&company.phone!=""){
                    $('#telephone').prop("value",company.mobile);
                }
                //赋值开户行名称
                $('#bankName').prop("value",company.bankName);
                //赋值开户行账号
                $('#bankAccount').prop("value",company.bankAccount);
                $("#telephone").prop("value",company.phone);//电话
                //赋值开票税率
                var taxRate1=$('#taxRate1');
                index1=""
                taxRate1.children().remove();
                $.each(obj.ticketRateStrList1, function (index, item) {
                    //console.log(obj.ticketRateStrList1);
                    var option = $('<option />');
                    if(company.ticketType!=null){
                        if(company.ticketType.name==item.name){
                            index1=index;
                        }
                    }
                    else {
                        index1=-1;
                    }
                    option.val(index);
                    option.text(item.name);
                    taxRate1.append(option);
                });
                taxRate1.get(0).selectedIndex =index1;
            },
            error:function (result) {

            }
        });
    }
</script>
</html>
