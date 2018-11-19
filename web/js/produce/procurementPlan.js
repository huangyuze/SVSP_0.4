/***
 * 采购计划单主页脚本文件
 * */
var currentPage = 1;                          //当前页数
var isSearch = false;
var data1;


/**
 * 返回count值
 * */
function countValue() {
    var mySelect = document.getElementById("count");
    var index = mySelect.selectedIndex;
    return mySelect.options[index].text;
}

/**
 * 计算总页数
 * */
function totalPage() {
    var totalRecord = 0;
    if (!isSearch) {
        $.ajax({
            type: "POST",                       // 方法类型
            url: "totalProcurementPlanRecord",                  // url
            async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            success: function (result) {
                if (result > 0) {
                    totalRecord = result;
                } else {
                    console.log("fail: " + result);
                    totalRecord = 0;
                }
            },
            error: function (result) {
                console.log("error: " + result);
                totalRecord = 0;
            }
        });
    }
    else {
        $.ajax({
            type: "POST",                       // 方法类型
            url: "searchProcurementPlanCount",                  // url
            async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
            data: JSON.stringify(data1),
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            success: function (result) {
                // console.log(result);
                if (result > 0) {
                    totalRecord = result;
                    console.log("总记录数为:" + result);
                } else {
                    console.log("fail: " + result);
                    totalRecord = 0;
                }
            },
            error: function (result) {
                console.log("error: " + result);
                totalRecord = 0;
            }
        });
    }


    var count = countValue();                         // 可选
    var total = loadPages(totalRecord, count);
    return total;
}



/**
 * 点击页数跳转页面
 * @param pageNumber 跳转页数
 * */
function switchPage(pageNumber) {
    console.log("当前页：" + pageNumber);
    if (pageNumber > totalPage()) {
        pageNumber = totalPage();
    }
    if (pageNumber == 0) {                 //首页
        pageNumber = 1;
    }
    if (pageNumber == -2) {
        pageNumber = totalPage();        //尾页
    }
    if (pageNumber == null || pageNumber == undefined) {
        console.log("参数为空,返回首页!");
        pageNumber = 1;
    }
    $("#current").find("a").text("当前页：" + pageNumber);
    if (pageNumber == 1) {
        $("#previous").addClass("disabled");
        $("#firstPage").addClass("disabled");
        $("#next").removeClass("disabled");
        $("#endPage").removeClass("disabled");
    }
    if (pageNumber == totalPage()) {
        $("#next").addClass("disabled");
        $("#endPage").addClass("disabled");
        $("#previous").removeClass("disabled");
        $("#firstPage").removeClass("disabled");
    }
    if (pageNumber > 1) {
        $("#previous").removeClass("disabled");
        $("#firstPage").removeClass("disabled");
    }
    if (pageNumber < totalPage()) {
        $("#next").removeClass("disabled");
        $("#endPage").removeClass("disabled");
    }
    addPageClass(pageNumber);           // 设置页码标蓝
    var page = {};
    page.count = countValue();                        //可选
    page.pageNumber = pageNumber;
    currentPage = pageNumber;          //当前页面
    setPageCloneAfter(pageNumber);        // 重新设置页码
    addPageClass(pageNumber);           // 设置页码标蓝
    //addClass("active");
    page.start = (pageNumber - 1) * page.count;
    if (!isSearch) {
        $.ajax({
            type: "POST",                       // 方法类型
            url: "getList1",         // url
            async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
            data: JSON.stringify(page),
            dataType: "json",
            contentType: 'application/json;charset=utf-8',
            success: function (result) {
                if (result != undefined) {
                    setCompatibility(result);
                } else {
                    console.log("fail: " + result);
                }
            },
            error: function (result) {
                console.log("error: " + result);
            }
        });
    }
    else {
        $.ajax({
            type: "POST",                       // 方法类型
            url: "searchProcurementPlanCount",                  // url
            async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
            data: JSON.stringify(data1),
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            success: function (result) {
                // console.log(result);
                if (result > 0) {
                    totalRecord = result;
                    console.log("总记录数为:" + result);
                } else {
                    console.log("fail: " + result);
                    totalRecord = 0;
                }
            },
            error: function (result) {
                console.log("error: " + result);
                totalRecord = 0;
            }
        });
    }
}

/**
 * 输入页数跳转页面
 * */
function inputSwitchPage() {
    var pageNumber = $("#pageNumber").val();    // 获取输入框的值
    $("#current").find("a").text("当前页：" + pageNumber);
    if (pageNumber > totalPage()) {
        pageNumber = totalPage();
    }
    if (pageNumber == null || pageNumber == "") {
        window.alert("跳转页数不能为空！")
    } else {
        if (pageNumber == 1) {
            $("#previous").addClass("disabled");
            $("#firstPage").addClass("disabled");
            $("#next").removeClass("disabled");
            $("#endPage").removeClass("disabled");
        }
        if (pageNumber == totalPage()) {
            $("#next").addClass("disabled");
            $("#endPage").addClass("disabled");

            $("#previous").removeClass("disabled");
            $("#firstPage").removeClass("disabled");
        }
        if (pageNumber > 1) {
            $("#previous").removeClass("disabled");
            $("#firstPage").removeClass("disabled");
        }
        if (pageNumber < totalPage()) {
            $("#next").removeClass("disabled");
            $("#endPage").removeClass("disabled");
        }
        currentPage = pageNumber;
        setPageCloneAfter(pageNumber);        // 重新设置页码
        addPageClass(pageNumber);           // 设置页码标蓝
        var page = {};
        page.count = countValue();//可选
        page.pageNumber = pageNumber;
        page.start = (pageNumber - 1) * page.count;
        if (!isSearch) {
            $.ajax({
                type: "POST",                       // 方法类型
                url: "getList1",         // url
                async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
                data: JSON.stringify(page),
                dataType: "json",
                contentType: 'application/json;charset=utf-8',
                success: function (result) {
                    if (result != undefined) {
                        console.log(result);
                        setCompatibility(result);
                    } else {
                        console.log("fail: " + result);
                    }
                },
                error: function (result) {
                    console.log("error: " + result);
                }
            });
        }  else {
            $.ajax({
                type: "POST",                       // 方法类型
                url: "searchProcurementPlanCount",                  // url
                async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
                data: JSON.stringify(data1),
                dataType: "json",
                contentType: "application/json; charset=utf-8",
                success: function (result) {
                    // console.log(result);
                    if (result > 0) {
                        totalRecord = result;
                        console.log("总记录数为:" + result);
                    } else {
                        console.log("fail: " + result);
                        totalRecord = 0;
                    }
                },
                error: function (result) {
                    console.log("error: " + result);
                    totalRecord = 0;
                }
            });
        }
    }
}

/**
 * 计算分页总页数
 * @param totalRecord
 * @param count
 * @returns {number}
 */
function loadPages(totalRecord, count) {
    if (totalRecord == 0) {
        console.log("总记录数为0，请检查！");
        return 0;
    }
    else if (totalRecord % count == 0)
        return totalRecord / count;
    else
        return parseInt(totalRecord / count) + 1;
}

/**页面加载*/
function loadPage() {
    var pageNumber = 1;               // 显示首页
    $("#current").find("a").text("当前页：1");
    $("#previous").addClass("disabled");
    $("#firstPage").addClass("disabled");
    $("#next").removeClass("disabled");            // 移除上一次设置的按钮禁用
    $("#endPage").removeClass("disabled");
    if (totalPage() == 1) {
        $("#next").addClass("disabled");
        $("#endPage").addClass("disabled");
    }
    var page = {};
    page.count = countValue();                                 // 可选
    page.pageNumber = pageNumber;
    page.start = (pageNumber - 1) * page.count;
     $.ajax({
         type: "POST",
         url: "getProcurementPlanList",
         async: false,                       // 同步：意思是当有返回值以后才会进行后面的js程序
         data:JSON.stringify(page),
         dataType: "json",
         contentType: 'application/json;charset=utf-8',
         success:function (result) {
             if (result != undefined && result.status == "success"){
                 console.log(result)
                 setPageClone(result)
                 setPageCloneAfter(pageNumber);        // 重新设置页码
             }
                 },
         error:function (result) {
             
         }
     })
    isSearch = false;
}


/**
 * 设置克隆页码
 * */
function setPageClone(result) {
    $(".beforeClone").remove();
    setProcurementPlan(result);
    var total = totalPage();
    $("#next").prev().hide();
    var st = "共" + total + "页";
    $("#totalPage").text(st);
    var myArray = new Array();
    for (var i = 0; i < total; i++) {
        var li = $("#next").prev();
        myArray[i] = i + 1;
        var clonedLi = li.clone();
        clonedLi.show();
        clonedLi.find('a:first-child').text(myArray[i]);
        clonedLi.find('a:first-child').click(function () {
            var num = $(this).text();
            switchPage(num);
            addAndRemoveClass(this);
        });
        clonedLi.addClass("beforeClone");
        clonedLi.removeAttr("id");
        clonedLi.insertAfter(li);
    }
    $("#previous").next().next().eq(0).addClass("active");       // 将首页页面标蓝
    $("#previous").next().next().eq(0).addClass("oldPageClass");

}

//设置采购单数据
function setProcurementPlan(result) {
    var tr = $('#cloneTr');

    tr.siblings().remove();

    $.each(result.data, function (index, item) {
        var data = eval(item);
        // console.log(data)
        var clonedTr = tr.clone();
        clonedTr.attr('class','myclass');
        clonedTr.show();

        clonedTr.children("td").each(function (inner_index) {

            // 根据索引为部分td赋值
            switch (inner_index) {
                // 序号
                case (1):
                    $(this).html(index + 1);
                    break;

                //月度采购计划单号
                case (2):
                    $(this).html(data.procurementPlanId);
                    break;

                // 创建人
                case (3):
                    $(this).html(data.createName);
                    break;

                //创建日期
                case (4):
                    $(this).html(getDateStr(data.createDate));
                    break;

                // 修改人
                case (5):
                    $(this).html((data.adjustName));
                    break;

                //修改日期
                case (6):
                    $(this).html(getDateStr(data.adjustDate));
                    break;

                // 审批人
                case (7):
                    $(this).html(data.approvalName);
                    break;

                // 状态
                case (8):
                    if(data.checkState!=null){
                        $(this).html(data.checkState.name);
                    }

                    break;


            }
            clonedTr.removeAttr("id");
            if(clonedTr.children('td').eq(8).html()=='已作废'){
                $(clonedTr).hide();
            }
            clonedTr.insertBefore(tr);
        });
        //把克隆好的tr追加到原来的tr前面
        // 隐藏无数据的tr

        tr.hide();




    });
}

//查看
function viewProcurementPlan(item) {
    var procurementPlanId=$(item).parent().parent().children('td').eq(2).html();
    $('#appointModal2').modal('show')
    $.ajax({
        type: "POST",
        url: "getProcurementPlanById",
        async: false,                       // 同步：意思是当有返回值以后才会进行后面的js程序
        data:{"procurementPlanId":procurementPlanId},
        dataType: "json",
        //contentType: 'application/json;charset=utf-8',
        success:function (result) {
            if (result != undefined && result.status == "success"){
                  console.log(result)
                setViewModal(result.data)
            }
        },
        error:function (result) {
            
        }
        
    })
}
//设置查看模态框数据
function setViewModal(result) {

    var tr = $('#cloneTr2');

    tr.siblings().remove();

    $.each(result.procurementPlanItemList,function (index,item) {

        var obj = eval(item);

        var clonedTr = tr.clone();

        clonedTr.show();

            //序号
            $(clonedTr).children('td').eq(0).html(index+1)
        //物资名称
          $(clonedTr).children('td').eq(1).html(obj.suppliesName)
        //规格型号
        $(clonedTr).children('td').eq(2).html(obj.specifications)
        //申购部门
        $(clonedTr).children('td').eq(3).html(obj.proposer)
        //需求数量
        $(clonedTr).children('td').eq(4).html(obj.demandQuantity)
        //单位
        if(obj.unit!=null){
            $(clonedTr).children('td').eq(5).html(obj.unit.name)
        }
        //单价
        $(clonedTr).children('td').eq(6).html(obj.price.toFixed(2))
        //统计金额
        $(clonedTr).children('td').eq(7).html(obj.priceTotal.toFixed(2))
        //备注
        $(clonedTr).children('td').eq(8).html(obj.remarks)
            clonedTr.removeAttr('id');
            clonedTr.insertBefore(tr);


        tr.hide();
    })
    
    
}

//修改
function procurementPlanModify(item) {

    var checkState=$(item).parent().parent().children('td').eq(8).html();
    if(checkState=='待提交'){
        var procurementPlanId=$(item).parent().parent().children('td').eq(2).html();
        $('#appointModal3').modal('show')
        $.ajax({
            type: "POST",
            url: "getProcurementPlanById",
            async: false,                       // 同步：意思是当有返回值以后才会进行后面的js程序
            data:{"procurementPlanId":procurementPlanId},
            dataType: "json",
            //contentType: 'application/json;charset=utf-8',
            success:function (result) {
                if (result != undefined && result.status == "success"){
                    console.log(result)
                    setAdjustModal(result.data)
                    $('#adjustName').val(result.data.adjustName);
                    $('#adjustDate').val(getDateStr(result.data.adjustDate));
                }
            },
            error:function (result) {

            }

        })
    }
    else {alert("只可修改待提交的数据！")}

}

//设置修改模态框数据
function setAdjustModal(result) {

    var tr = $('#cloneTr3');

    tr.siblings().remove();

    $.each(result.procurementPlanItemList,function (index,item) {

        var obj = eval(item);

        var clonedTr = tr.clone();

        clonedTr.show();

        clonedTr.attr('class','myclass3')
        //序号
        $(clonedTr).children('td').eq(0).html(index+1)
        //物资名称
        $(clonedTr).children('td').eq(1).html(obj.suppliesName)
        //规格型号
        $(clonedTr).children('td').eq(2).html(obj.specifications)
        //申购部门
        $(clonedTr).children('td').eq(3).html(obj.proposer)
        //需求数量
        $(clonedTr).children('td').eq(4).find('input').val(obj.demandQuantity)
        //单位
        if(obj.unit!=null){
            $(clonedTr).children('td').eq(5).html(obj.unit.name)
        }
        //单价
        $(clonedTr).children('td').eq(6).find('input').val(obj.price.toFixed(2))
        //统计金额
        $(clonedTr).children('td').eq(7).html(obj.priceTotal.toFixed(2))
        //备注
        $(clonedTr).children('td').eq(8).html(obj.remarks)

        $(clonedTr).children('td').eq(9).html(obj.id)

        $('#procurementPlanId').val(obj.procurementPlanId);
        clonedTr.removeAttr('id');
        clonedTr.insertBefore(tr);


        tr.hide();
    })


}

//需求数量输入框的计算
function Cal(item) {

    var demandQuantity=$(item).val();
    if(demandQuantity.length<0){
        demandQuantity=0;
    }
    if(isNaN(demandQuantity)){
        demandQuantity=0
    }
    if(!isNaN(demandQuantity)){
        var price=$(item).parent().next().next().find('input').val();
        if(price.length<0){
            price=0;
        }
        if(isNaN(price)){
            price=0
        }
        if(!isNaN(price)){
            var priceTotal=parseFloat(demandQuantity)*parseFloat(price);
            $(item).parent().next().next().next().html(parseFloat(priceTotal).toFixed(2))
        }

    }


}

//单价输入框计算
function Cal2(item) {
    var price=$(item).val();
    if(price.length<0){
        price=0;
    }
    if(isNaN(price)){
        price=0
    }
    if(!isNaN(price)){
        var demandQuantity=$(item).parent().prev().prev().find('input').val();

        if(demandQuantity.length<0){
            demandQuantity=0;
        }
        if(isNaN(demandQuantity)){
            demandQuantity=0
        }
        if(!isNaN(demandQuantity)){
            var priceTotal=parseFloat(demandQuantity)*parseFloat(price);
            $(item).parent().next().html(parseFloat(priceTotal).toFixed(2))
        }


    }


}

//确认修改
function confirmAdjust() {
  //先更新主表
    var data={
        procurementPlanId:$('#procurementPlanId').val(),
        adjustName:$('#adjustName').val(),
        adjustDate:$('#adjustDate').val(),
    }
    $.ajax({
        type: "POST",
        url: "adjustProcurementPlan",
        async: false,                       // 同步：意思是当有返回值以后才会进行后面的js程序
        data:JSON.stringify(data),
        dataType: "json",
        contentType: 'application/json;charset=utf-8',
        success:function (result) {
            if (result != undefined && result.status == "success"){
                $('.myclass3').each(function () {
                    var dataItem={
                        id:$(this).children('td').eq(9).html(),
                        demandQuantity:$(this).children('td').eq(4).find('input').val(),
                        price:$(this).children('td').eq(6).find('input').val(),
                        priceTotal:$(this).children('td').eq(7).html(),
                    }

                   $.ajax({
                       type: "POST",
                       url: "adjustProcurementPlanItem",
                       async: false,                       // 同步：意思是当有返回值以后才会进行后面的js程序
                       data:JSON.stringify(dataItem),
                       dataType: "json",
                       contentType: 'application/json;charset=utf-8',
                       success:function (result) {

                       },
                       error:function (result) {

                       }
                   })


                })
                alert("修改成功")
                window.location.reload()
            }
        },
        error:function (result) {
            
        }
    })
    console.log(data)


}


//提交
function submitProcurementPlan(item) {
    if(confirm("确认提交?")){
        //点击确定后操作
        var procurementPlanId=$(item).parent().parent().children('td').eq(2).html();
        $.ajax({
            type: "POST",
            url: "submitProcurementPlan",
            async: false,                       // 同步：意思是当有返回值以后才会进行后面的js程序
            data:{"procurementPlanId":procurementPlanId},
            dataType: "json",
            //contentType: 'application/json;charset=utf-8',
               success:function (result) {
                   if (result != undefined && result.status == "success"){
                       alert(result.message)
                       window.location.reload()
                   }
                   else {
                       alert(result.message)
                   }
               },
            error:function (result) {
                alert('服务器异常')
            }
        })


    }
}

//审批模态框显示
function approvalProcurementPlan(item) {

    var procurementPlanId=$(item).parent().parent().children('td').eq(2).html();

    $('#procurementPlanId2').text(procurementPlanId)

    $.ajax({
        type: "POST",
        url: "getProcurementPlanById",
        async: false,                       // 同步：意思是当有返回值以后才会进行后面的js程序
        data:{"procurementPlanId":procurementPlanId},
        dataType: "json",
        //contentType: 'application/json;charset=utf-8',
        success:function (result) {
            if (result != undefined && result.status == "success"){
                console.log(result)
                $('#approvalName').val(result.data.approvalName);
                $('#advice').val(result.data.advice)
            }
        },
        error:function (result) {

        }

    })


    $('#contractInfoForm2').modal('show');




}

//审批通过
function confirmProcurementPlan() {

    var procurementPlanId= $('#procurementPlanId2').text();

    var approvalName =$('#approvalName').val();

    var advice=$('#advice').val();


    $.ajax({
        type: "POST",
        url: "approvalProcurementPlan",
        async: false,                       // 同步：意思是当有返回值以后才会进行后面的js程序
        data:{"procurementPlanId":procurementPlanId,'approvalName':approvalName,'advice':advice},
        dataType: "json",
        //contentType: 'application/json;charset=utf-8',
        success:function (result) {
            if (result != undefined && result.status == "success"){
                alert(result.message)
                window.location.reload()
            }
            else {
                alert(result.message);

            }
        },
        error:function (result) {
            alert('服务器异常！');
        }
    })

}

//驳回模态框显示
function backProcurementPlan(item) {
    var procurementPlanId=$(item).parent().parent().children('td').eq(2).html();

    $('#procurementPlanId3').text(procurementPlanId)

    $.ajax({
        type: "POST",
        url: "getProcurementPlanById",
        async: false,                       // 同步：意思是当有返回值以后才会进行后面的js程序
        data:{"procurementPlanId":procurementPlanId},
        dataType: "json",
        //contentType: 'application/json;charset=utf-8',
        success:function (result) {
            if (result != undefined && result.status == "success"){
                console.log(result)
                // $('#approvalName').val(result.data.approvalName);
                $('#advice2').val(result.data.advice)
            }
        },
        error:function (result) {

        }

    })


    $('#contractInfoForm3').modal('show');
}

//确认驳回
function back() {

    var procurementPlanId= $('#procurementPlanId3').text();


    var advice=$('#advice2').val();


    $.ajax({
        type: "POST",
        url: "backProcurementPlan",
        async: false,                       // 同步：意思是当有返回值以后才会进行后面的js程序
        data:{"procurementPlanId":procurementPlanId,'advice':advice},
        dataType: "json",
        //contentType: 'application/json;charset=utf-8',
        success:function (result) {
            if (result != undefined && result.status == "success"){
                alert(result.message)
                window.location.reload()
            }
            else {
                alert(result.message);

            }
        },
        error:function (result) {
            alert('服务器异常！');
        }
    })


}

//作废采购计划单
function cancelProcurementPlan(item) {
    var procurementPlanId=$(item).parent().parent().children('td').eq(2).html();

    if(confirm("确定作废该计划单?")){
        //点击确定后操作
         $.ajax({
             type: "POST",
             url: "cancelProcurementPlanById",
             async: false,                       // 同步：意思是当有返回值以后才会进行后面的js程序
             data:{"procurementPlanId":procurementPlanId},
             dataType: "json",
             //contentType: 'application/json;charset=utf-8',
             success:function (result) {
                 if (result != undefined && result.status == "success"){
                     console.log(result)
                 }
             },
             error:function (result) {

             }
         })
    }
}


$(document).ready(function () {//页面载入是就会进行加载里面的内容
    var last;
    $('#searchContent').keyup(function (event) { //给Input赋予onkeyup事件
        last = event.timeStamp;//利用event的timeStamp来标记时间，这样每次的keyup事件都会修改last的值，注意last必需为全局变量
        setTimeout(function () {
            if(last-event.timeStamp==0){
                searchData();
            }else if (event.keyCode === 13) {   // 如果按下键为回车键，即执行搜素
                searchData();      //
            }
        },600);
    });
});

//查询
function searchData() {
    isSearch = true;
    var page = {};
    var pageNumber = 1;                       // 显示首页
    page.pageNumber = pageNumber;
    page.count = countValue();
    page.start = (pageNumber - 1) * page.count;
    if ($("#senior").is(':visible')) {
        var  checkState=$('#search-checkState').val()
        if(checkState.length<=0){
            checkState=null;
        }
        data1 = {
            procurementPlanId:$('#search-procurementPlanId').val(),
            adjustName:$('#search-adjustName').val(),
            approvalName:$('#search-approvalName').val(),
            createName:$('#search-createName').val(),
            page: page,
            checkState:checkState,
            createDateStart:$('#search-createDateStart').val(),
            createDateEnd:$('#search-createDateEnd').val(),
            adjustDateStart:$('#search-adjustDateStart').val(),
            adjustDateEnd:$('#search-adjustDateEnd').val(),


        };
    }
    else{
        var keywords = $.trim($("#searchContent").val());
        if(keywords=='已提交'){
            keywords='Submitted'
        }
        if(keywords=='待提交'){
            keywords='ToSubmit'
        }
        if(keywords=='审批通过'){
            keywords='Approval'
        }
        if(keywords=='已驳回'){
            keywords='Backed'
        }

        data1 = {
            page: page,
            keywords: keywords
        }
    }
    if (data1 == null) alert("请点击'查询设置'输入查询内容!");
    else {
        $.ajax({
            type: "POST",                            // 方法类型
            url: "searchProcurementPlan",                 // url
            async: false,                           // 同步：意思是当有返回值以后才会进行后面的js程序
            data: JSON.stringify(data1),
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            success: function (result) {
                if (result != undefined && result.status == "success"){
                    console.log(result)
                    setPageClone(result)
                } else {
                    alert(result.message);

                }
            },
            error: function (result) {
                console.log(result);
                alert("服务器错误！");
            }
        });
    }
}

/**
 * 回车查询
 */
function enterSearch() {
    if (event.keyCode === 13) {   // 如果按下键为回车键，即执行搜素
        searchData();      //
    }
}