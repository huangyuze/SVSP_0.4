var inboundPlanOrderIdArray = [];
var itemIndex = 0;


/**
 * 入库计划单查询
 */
function searchPlan() {
    // 查询数据源
    var data = {
        inboundPlanOrderId: $("#search-inboundPlanOrderId").val(),
        transferDraftId: $("#search-transferDraftId").val(),
        departmentId: $("#search-planDate").val(),
        companyId: $("#search-transferDate").val(),
        produceCompany: {
            companyName: $("#search-produceCompanyName").val()
        },
        acceptCompany: {
            companyName: $("#search-acceptCompany").val()
        },
        wastes: {
            name: $("#search-wastesName").val(),
            wastesId: $("#search-wastesCode").val()
        }
    };
    
    $.ajax({
        type: "POST",
        url: "searchInboundPlanOrder",
        async: false,
        dataType: "json",
        data: JSON.stringify(data),
        contentType: "application/json; charset=utf-8",
        success: function (result) {
            if (result !== undefined && result.status === "success") {
                console.log(result);
                setDataList(result.data);
            } else {
                alert(result.message);
            }
        },
        error: function (result) {
            console.log(result);
            alert("服务器异常");
        }
    });

}

/**
 * 设置下拉框数据
 */
function setSelectItem() {
    $.ajax({
        type: "POST",                       // 方法类型
        url: "getProcessWay",                  // url
        async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
        dataType: "json",
        success: function (result) {
            if (result !== undefined && result.status == "success") {
                var data = eval(result);
                // 高级检索下拉框数据填充
                var processWayArray = $("select[name='processWay']");
                for (var i = 0; i < processWayArray.length; i++) {
                    var processWay = $(processWayArray[i]);
                    // console.log(processWay);
                    processWay.children().remove();
                    $.each(data.processWayList, function (index, item) {
                        var option = $('<option />');
                        option.val(index);
                        option.text(item.name);
                        processWay.append(option);
                    });
                    processWay.get(0).selectedIndex = -1;
                }
            } else {
                console.log(result);
            }
        },
        error: function (result) {
            console.log(result);
        }
    });

    $.ajax({
        type: "POST",                       // 方法类型
        url: "getHandleCategory",                  // url
        async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
        dataType: "json",
        success: function (result) {
            if (result !== undefined && result.status == "success") {
                var data = eval(result);
                // 高级检索下拉框数据填充
                var handleCategoryArray = $("select[name='handleCategory']");
                for (var i = 0; i < handleCategoryArray.length; i++) {
                    var handleCategory = $(handleCategoryArray[i]);
                    handleCategory.children().remove();
                    $.each(data.handleCategoryList, function (index, item) {
                        var option = $('<option />');
                        option.val(index);
                        option.text(item.name);
                        handleCategory.append(option);
                    });
                    handleCategory.get(0).selectedIndex = -1;
                }
            } else {
                console.log(result);
            }
        },
        error: function (result) {
            console.log(result);
        }
    });
}

/**
 * 增加入库单
 */
function addInboundOrder(type) {
    var inboundOrderItemList = [];
    $("#inboundOrderData").children().not("#inboundClonedTr").each(function () {
        var inboundOrder = {};
        inboundOrder.inboundPlanOrderId = $(this).find("td[name='inboundPlanOrderId']").text();
        inboundOrder.transferDraftId = $(this).find("td[name='transferDraftId']").text();
        var produceCompany = {};
        produceCompany.companyName = $(this).find("td[name='produceCompanyName']").text();
        inboundOrder.produceCompany = produceCompany;
        var wastes = {};
        wastes.name = $(this).find("td[name='wastesName']").text();
        wastes.wastesId = $(this).find("td[name='wastesCode']").text();
        inboundOrder.wastes = wastes;
        inboundOrder.wastesAmount = $(this).find("td[name='wastesAmount']").text();
        inboundOrder.unitPriceTax = $(this).find("td[name='unitPriceTax']").text();
        inboundOrder.totalPrice = $(this).find("td[name='totalPrice']").text();
        inboundOrder.processWay = $(this).find("select[name='processWay']").val();
        inboundOrder.handleCategory = $(this).find("select[name='handleCategory']").val();
        inboundOrder.remarks = $(this).find("input[name='remarks']").val();
        inboundOrder.warehouseArea = $(this).find("input[name='warehouseArea']").val();
        inboundOrderItemList.push(inboundOrder);
    });
    var data = {};
    data.inboundOrderItemList = inboundOrderItemList;

    $.ajax({
        type: "POST",                       // 方法类型
        url: "addInboundOrder",                  // url
        async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
        data: JSON.stringify(data),
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: function (result) {
            if (result !== undefined && result.status == "success") {
                alert(result.message);
                $(location).prop('href', 'warehouseManage.html');
            } else {
                alert(result.message);
            }
        },
        error: function (result) {
            console.log(result);
        }
    });
}


/************入库单管理页面脚本*********/

var isSearch = false;
var currentPage = 1;                          //当前页数
var data;
/**********************客户部分**********************/
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
    var data = {};
    var totalRecord = 0;
    var page = {};
    page.count = 0;
    page.start = 0;
    data.page = page;
    if (!isSearch) {
        $.ajax({
            type: "POST",                       // 方法类型
            url: "countInboundPlanOrder",                  // url
            async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
            data: JSON.stringify(data),
            dataType: "json",
            contentType: 'application/json;charset=utf-8',
            success: function (result) {
                if (result.data > 0) {
                    totalRecord = result.data;
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
    } else {
        $.ajax({
            type: "POST",                       // 方法类型
            url: "countInboundPlanOrder",                  // url
            async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
            data: JSON.stringify(data),
            dataType: "json",
            contentType: 'application/json;charset=utf-8',
            success: function (result) {
                if (result.data > 0) {
                    totalRecord = result.data;
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
    return loadPages(totalRecord, count);
}
/**
 * 计算分页总页数
 * @param totalRecord
 * @param count
 * @returns {number}
 */
function loadPages(totalRecord, count) {
    if (totalRecord === 0) {
        console.log("总记录数为0，请检查！");
        return 0;
    }
    else if (totalRecord % count === 0)
        return totalRecord / count;
    else
        return parseInt(totalRecord / count) + 1;
}

/**
 * 克隆页码
 * @param result
 */
function setPageClone(result) {
    $(".beforeClone").remove();
    setInboundOrderDataList(result);
    var total = totalPage();
    $("#next").prev().hide();
    var st = "共" + total + "页";
    $("#totalPage").text(st);
    var myArray = [];
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
}

/**
 * 点击页数跳转页面
 * @param pageNumber 跳转页数
 * */
function switchPage(pageNumber) {
    if (pageNumber === 0) {                 //首页
        pageNumber = 1;
    }
    if (pageNumber === -2) {
        pageNumber = totalPage();        //尾页
    }
    if (pageNumber == null || pageNumber === undefined) {
        console.log("参数为空,返回首页!");
        pageNumber = 1;
    }
    $("#current").find("a").text("当前页：" + pageNumber);
    if (pageNumber === 1) {
        $("#previous").addClass("disabled");
        $("#firstPage").addClass("disabled");
        $("#next").removeClass("disabled");
        $("#endPage").removeClass("disabled");
    }
    if (pageNumber === totalPage()) {
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
    var data = {};
    var page = {};
    page.count = countValue();                        //可选
    page.pageNumber = pageNumber;
    currentPage = pageNumber;          //当前页面
    setPageCloneAfter(pageNumber);        // 重新设置页码
    addPageClass(pageNumber);           // 设置页码标蓝
    //addClass("active");
    page.start = (pageNumber - 1) * page.count;
    data.page = page;
    if (!isSearch) {
        $.ajax({
            type: "POST",                       // 方法类型
            url: "listInboundPlanOrder",         // url
            async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
            data: JSON.stringify(data),
            dataType: "json",
            contentType: 'application/json;charset=utf-8',
            success: function (result) {
                if (result != undefined && result.status == "success") {
                    setInboundOrderDataList(result.data);
                } else {
                    console.log(result);
                }
            },
            error: function (result) {
                console.log("error: " + result);
            }
        });
    } else {
        data['page'] = page;
        $.ajax({
            type: "POST",                       // 方法类型
            url: "listInboundPlanOrder",         // url
            async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
            data: JSON.stringify(data),
            dataType: "json",
            contentType: 'application/json;charset=utf-8',
            success: function (result) {
                if (result != undefined && result.status == "success") {
                    setInboundOrderDataList(result.data);
                } else {
                    console.log("fail: " + result);
                }
            },
            error: function (result) {
                console.log("error: " + result);
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
    if (pageNumber == null || pageNumber == undefined) {
        window.alert("跳转页数不能为空！")
    } else {
        if (pageNumber === 1) {
            $("#previous").addClass("disabled");
            $("#firstPage").addClass("disabled");
            $("#next").removeClass("disabled");
            $("#endPage").removeClass("disabled");
        }
        if (pageNumber === totalPage()) {
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
        var data = {};
        page.count = countValue();//可选
        page.pageNumber = pageNumber;
        page.start = (pageNumber - 1) * page.count;
        data.page = page;
        if (!isSearch) {
            $.ajax({
                type: "POST",                       // 方法类型
                url: "listInboundPlanOrder",         // url
                async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
                data: JSON.stringify(data),
                dataType: "json",
                contentType: 'application/json;charset=utf-8',
                success: function (result) {
                    if (result != undefined && result.status == "success") {
                        console.log(result);
                        setInboundOrderDataList(result.data);
                    } else {
                        console.log("fail: " + result);
                    }
                },
                error: function (result) {
                    console.log("error: " + result);
                }
            });
        } else {
            data['page'] = page;
            $.ajax({
                type: "POST",                       // 方法类型
                url: "listInboundPlanOrder",         // url
                async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
                data: JSON.stringify(data),
                dataType: "json",
                contentType: 'application/json;charset=utf-8',
                success: function (result) {
                    if (result !== undefined && result.status === "success") {
                        // console.log(result);
                        setInboundOrderDataList(result.data);
                    } else {
                        console.log("fail: " + result);
                    }
                },
                error: function (result) {
                    console.log("error: " + result);
                }
            });
        }
    }
}

/**
 * 分页 获取首页内容
 * */
function loadPageList() {
    loadNavigationList();   // 设置动态菜单
    $("#current").find("a").text("当前页：1");
    $("#previous").addClass("disabled");
    $("#firstPage").addClass("disabled");
    var page = {};
    var pageNumber = 1;                       // 显示首页
    var data = {};
    page.count = countValue();                                 // 可选
    page.pageNumber = pageNumber;
    page.start = (pageNumber - 1) * page.count;
    data.page = page;
    $.ajax({
        type: "POST",                       // 方法类型
        url: "listInboundPlanOrder",   // url
        async: false,                       // 同步：意思是当有返回值以后才会进行后面的js程序
        data: JSON.stringify(data),
        dataType: "json",
        contentType: 'application/json;charset=utf-8',
        success: function (result) {
            if (result != undefined && result.status == "success") {
                console.log(result);
                setPageClone(result.data);
                setPageCloneAfter(pageNumber);        // 重新设置页码
            } else {
                console.log(result);
            }
        },
        error: function (result) {
            console.log("error: " + result);
            console.log("失败");
        }
    });
    isSearch = false;
    // getSelectedInfo();
}

/**
 * 设置数据
 * @param result
 */
function setInboundOrderDataList(result) {
    // 获取id为cloneTr的tr元素
    var tr = $("#cloneTr");
    tr.siblings().remove();
    $.each(result, function (index, item) {
        var data = eval(item);
        // 克隆tr，每次遍历都可以产生新的tr
        var clonedTr = tr.clone();
        clonedTr.show();
        // 循环遍历cloneTr的每一个td元素，并赋值
        clonedTr.find("td[name='inboundPlanOrderId']").text(data.inboundPlanOrderId);
        clonedTr.find("td[name='planDate']").text(getDateStr(data.planDate));
        if (data.produceCompany != null) clonedTr.find("td[name='produceCompanyName']").text(data.produceCompany.companyName);
        clonedTr.find("td[name='transferDate']").text(getDateStr(data.transferDate));
        clonedTr.find("td[name='transferDate']").text(getDateStr(data.transferDate));
        clonedTr.find("td[name='transferDraftId']").text(data.transferDraftId);
        if (data.wastes != null) {
            clonedTr.find("td[name='wastesName']").text(data.wastes.name);
            clonedTr.find("td[name='wastesCode']").text(data.wastes.wastesId);
        }
        clonedTr.find("td[name='prepareTransferCount']").text(data.prepareTransferCount);
        clonedTr.find("td[name='transferCount']").text(data.transferCount);
        clonedTr.find("td[name='storageCount']").text(data.storageCount);
        clonedTr.find("td[name='storageCount']").text(data.storageCount);
        clonedTr.find("td[name='leftCount']").text(data.leftCount);
        clonedTr.find("td[name='poundsCount']").text(data.poundsCount);
        if (data.checkState != null) clonedTr.find("td[name='checkState']").text(data.checkState.name);
        // 把克隆好的tr追加到原来的tr前面
        clonedTr.removeAttr("id");
        clonedTr.insertBefore(tr);
    });
    // 隐藏无数据的tr
    tr.hide();
}

/**
 * 显示增加模态框
 */
function showAddModal() {
    // 设置产废单位
    $.ajax({
        type: "POST",                       // 方法类型
        url: "getAllClients",                  // url
        async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
        dataType: "json",
        success: function (result) {
            if (result !== undefined) {
                var data = eval(result);
                // 高级检索下拉框数据填充
                var produceCompany = $("#addProduceCompany");
                produceCompany.children().remove();
                $.each(data, function (index, item) {
                    var option = $('<option />');
                    option.val(item.clientId);
                    option.text(item.companyName);
                    produceCompany.append(option);
                });
                produceCompany.selectpicker("refresh");
                produceCompany.selectpicker('val', '');
            } else {
                console.log("fail: " + result);
            }
        },
        error: function (result) {
            console.log("error: " + result);
        }
    });
    // 设置危废代码
    $.ajax({
        type: "POST",                       // 方法类型
        url: "getWastesInfoList",                  // url
        async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
        dataType: "json",
        success: function (result) {
            if (result !== undefined) {
                var data = eval(result);
                // 高级检索下拉框数据填充
                var wastesCode = $("#addWastesCode");
                wastesCode.children().remove();
                $.each(data.data, function (index, item) {
                    var option = $('<option />');
                    option.val(item.code);
                    option.text(item.code);
                    wastesCode.append(option);
                });
                wastesCode.selectpicker("refresh");
                wastesCode.selectpicker('val', '');
            } else {
                console.log("fail: " + result);
            }
        },
        error: function (result) {
            console.log("error: " + result);
        }
    });
    $("#addModal").modal("show");
}

function addInboundPlanOrder() {
    var data = {
        planDate: $("#addPlanDate").val(),
        produceCompany: {
            clientId: $("#addProduceCompany").val()
        },
        transferDate: $("#addTransferDate").val(),
        transferDraftId: $("#addTransferDraftId").val(),
        wastes: {
            name: $("#addWastesName").val(),
            code: $("#addWastesCode").val()
        },
        prepareTransferCount: $("#addPrepareTransferCount").val(),
        transferCount: $("#addTransferCount").val(),
        storageCount: $("#addStorageCount").val(),
        poundsCount: $("#addPoundsCount").val(),
        leftCount: $("#addLeftCount").val()
    };
    console.log(data);
    $.ajax({
        type: "POST",                      // 方法类型
        url: "addInboundPlanOrder",              // url
        async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
        data: JSON.stringify(data),
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: function (result) {
            if (result != undefined && result.status == "success") {
                alert(result.message);
                window.location.reload();
            } else {
                console.log("fail: " + result);
            }
        },
        error: function (result) {
            console.log("error: " + result);
        }
    });
}

/**
 * 查找
 */
function searchData() {
    var page = {};
    var pageNumber = 1;                       // 显示首页
    var data = {};
    page.pageNumber = pageNumber;
    page.count = countValue();
    page.start = (pageNumber - 1) * page.count;
    // 精确查询
   var wastes = {};
   wastes.name = $.trim($("#search-wastesName").val());
   wastes.wastesId = $.trim($("#search-wastesCode").val());
   var produceCompany = {};
    produceCompany.companyName = $.trim($("#search-companyName").val());
    if ($("#senior").is(':visible')) {
        data = {
            inboundPlanOrderId: $.trim($("#search-inboundPlanOrderId").val()),
            transferDraftId:$.trim($("#search-transferDraftId").val()),
            wastes : wastes,
            produceCompany : produceCompany,
            page: page
        };
        console.log(data);
        // 模糊查询
    } else {
        data = {
            keyword: $("#searchContent").val(),
            page: page
        };
    }
    $.ajax({
        type: "POST",                       // 方法类型
        url: "listInboundPlanOrder",                  // url
        async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
        data: JSON.stringify(data),
        dataType: "json",
        contentType: 'application/json;charset=utf-8',
        success: function (result) {
            if (result !== undefined && result.status === "success") {
                console.log(result);
                setPageClone(result.data);
            } else {
                alert(result.message);
            }
        },
        error: function (result) {
            console.log(result);
        }
    });
    isSearch = true;
}

/**
 * 设置高级查询的审核状态数据
 */
function getSelectedInfo() {
    $.ajax({
        type: "POST",                       // 方法类型
        url: "getCheckState",                  // url
        async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
        dataType: "json",
        success: function (result) {
            if (result !== undefined) {
                var data = eval(result);
                // 高级检索下拉框数据填充
                var checkState = $("#search-checkState");
                checkState.children().remove();
                $.each(data.checkStateList, function (index, item) {
                    if (item.index == 13 || item.index == 7) {
                        var option = $('<option />');
                        option.val(index);
                        option.text(item.name);
                        checkState.append(option);
                    }
                });
                checkState.get(0).selectedIndex = -1;
            } else {
                console.log("fail: " + result);
            }
        },
        error: function (result) {
            console.log("error: " + result);
        }
    });

    $.ajax({
        type: "POST",                       // 方法类型
        url: "getRecordState",                  // url
        async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
        dataType: "json",
        success: function (result) {
            if (result !== undefined) {
                var data = eval(result);
                // 高级检索下拉框数据填充
                var recordState = $("#search-recordState");
                recordState.children().remove();
                $.each(data.recordStateList, function (index, item) {
                    var option = $('<option />');
                    option.val(index);
                    option.text(item.name);
                    recordState.append(option);
                });
                recordState.get(0).selectedIndex = -1;
            } else {
                console.log("fail: " + result);
            }
        },
        error: function (result) {
            console.log("error: " + result);
        }
    });
}

/**
 * 作废
 */
function setInvalid(e) {    //已作废
    var r = confirm("确认作废该入库单吗？");
    if (r) {
        var id = getIdByMenu(e);
        $.ajax({
            type: "POST",
            url: "setInboundPlanOrderInvalid",
            async: false,
            dataType: "json",
            data: {
                inboundPlanOrderId: id
            },
            success: function (result) {
                if (result != undefined && result.status == "success") {
                    console.log(result);
                    alert(result.message);
                    window.location.reload();
                } else {
                    alert(result.message);
                }
            },
            error: function (result) {
                console.log(result);
                alert("服务器异常");
            }
        });
    }
}

/**
 * 确认收样
 * @param e
 */
function setSignIn(e) {
    var r = confirm("确认收样该入库单吗？");
    if (r) {
        var id = getIdByMenu(e);
        $.ajax({
            type: "POST",
            url: "setInboundPlanOrderSignIn",
            async: false,
            dataType: "json",
            data: {
                inboundPlanOrderId: id
            },
            success: function (result) {
                if (result != undefined && result.status == "success") {
                    console.log(result);
                    alert(result.message);
                    window.location.reload();
                } else {
                    alert(result.message);
                }
            },
            error: function (result) {
                console.log(result);
                alert("服务器异常");
            }
        });
    }
}

/**
 * 查看数据
 * @param e
 */
function viewData(e) {
    var id = getIdByMenu(e);
    $.ajax({
        type: "POST",
        url: "getInboundPlanOrder",
        async: false,
        dataType: "json",
        data: {"inboundPlanOrderId": id},
        success: function (result) {
            if (result != undefined && result.status == "success") {
                console.log(result);
                setViewData(result.data);
            } else {
                alert(result.message);
            }
        },
        error: function (result) {
            console.log(result);
            alert("服务器异常");
        }
    });
    $("#viewModal").modal("show");

    function setViewData(result) {
        var obj = eval(result);
        $("#inboundPlanOrderId").val(obj.inboundPlanOrderId);
        $("#transferDraftId").val(obj.transferDraftId);
        if (obj.produceCompany != null) $("#produceCompany").val(obj.produceCompany.companyName);
        $("#prepareTransferCount").val(obj.prepareTransferCount);
        $("#transferCount").val(obj.transferCount);
        $("#storageCount").val(obj.storageCount);
        $("#planDate").val(getDateStr(obj.planDate));
        $("#transferDate").val(getDateStr(obj.transferDate));
        if (obj.wastes != null) {
            $("#wastesName").val(obj.wastes.name);
            $("#wastesCode").val(obj.wastes.wastesId);
        }
        $("#poundsCount").val(obj.poundsCount);
        $("#leftCount").val(obj.leftCount);
    }
}
var inboundPlanOrder = {};
/**
 * 显示预约送样的模态框
 * @param e
 */
function showSampleInfo(e) {
    // 获取编号
    var id = getIdByMenu(e);
    $.ajax({
        type: "POST",
        url: "getInboundPlanOrder",
        async: false,
        dataType: "json",
        data: {"inboundPlanOrderId": id},
        success: function (result) {
            if (result != undefined && result.status == "success") {
                console.log(result);
                // 为全局对象赋值
                inboundPlanOrder = result.data;
                var obj = eval(result.data);
                // 页面赋值
                $("#model-companyName").text(obj.produceCompany.companyName);
                $("#model-companyName").text(obj.produceCompany.companyName);
                $("#model-companyName").text(obj.produceCompany.companyName);
                $("#model-wastesName").text(obj.wastes.name);
                $("#model-wastesCode").text(obj.wastes.wastesId);
                $("#model-wastesCategory").text(obj.wastes.category);
                if (obj.wastes.formType != null) $("#model-wastesFormType").text(obj.wastes.formType.name);
                $("#model-transferId").text(obj.transferDraftId);

            } else {
                console.log(result.message);
            }
        },
        error: function (result) {
            console.log(result);
        }
    });
    // 显示模态框
    $("#appointModal").modal("show");
}

/**
 * 增加预约送样
 */
function addAppoint() {
    // 创建
    var sampleInformation = {};
    sampleInformation.inboundPlanOrderId = inboundPlanOrder.inboundPlanOrderId;
    sampleInformation.companyCode = inboundPlanOrder.produceCompany.clientId;
    sampleInformation.companyName = inboundPlanOrder.produceCompany.companyName;
    sampleInformation.sendingPerson = $("#model-sendingPerson").val();
    sampleInformation.id = $("#model-id").val();
    sampleInformation['wastesList'] = [];
    var wastes = {};
    wastes.id = sampleInformation.id + '0001';
    wastes.code = inboundPlanOrder.wastes.wastesId;
    wastes.name = inboundPlanOrder.wastes.name;
    wastes.transferId = inboundPlanOrder.transferDraftId;
    wastes.formType = inboundPlanOrder.wastes.formType;
    wastes.category = inboundPlanOrder.wastes.category;
    wastes.isPH = $("#model-isPH").prop('checked');
    wastes.isAsh = $("#model-isAsh").prop('checked');
    wastes.isWater = $("#model-isWater").prop('checked');
    wastes.isHeat = $("#model-isHeat").prop('checked');
    wastes.isSulfur = $("#model-isS").prop('checked');
    wastes.isChlorine = $("#model-isCl").prop('checked');
    wastes.isFluorine = $("#model-isF").prop('checked');
    wastes.isPhosphorus = $("#model-isP").prop('checked');
    wastes.isFlashPoint = $("#model-isFlashPoint").prop('checked');
    wastes.isViscosity = $("#model-isViscosity").prop('checked');
    sampleInformation.wastesList.push(wastes);

    $.ajax({
        type: "POST",                            // 方法类型
        url: "addSampleInfoWareHouse",                 // url
        async: false,                           // 同步：意思是当有返回值以后才会进行后面的js程序
        data: JSON.stringify(sampleInformation),
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: function (result) {
            console.log(result);
            if (result != undefined) {
                var data = eval(result);
                if (data.status == "success") {
                    alert(data.message);
                    window.location.reload();
                } else {
                    alert(data.message + ", 预约单号未填写或重复！");
                }
            }
        },
        error: function (result) {
            console.dir(result);
            alert("服务器异常!");
        }
    });
}

var rejectId;

/**
 * 显示拒收框
 * @param e
 */
function showReject(e) {
    // 获取编号
    var id = getIdByMenu(e);
    rejectId = id;
    $("#rejectModal").modal("show");
}

/**
 * 拒收
 */
function reject() {
    var advice = $("#advice").val();
    var data = {
        inboundPlanOrderId: rejectId,
        advice: advice
    };

    $.ajax({
        type: "POST",
        url: "setInboundPlanOrderReject",
        async: false,
        dataType: "json",
        data: data,
        success: function (result) {
            if (result != undefined && result.status == "success") {
                console.log(result);
                alert(result.message);
                window.location.reload();
            } else {
                alert(result.message);
            }
        },
        error: function (result) {
            console.log(result);
            alert("服务器异常");
        }
    });
}

/**
 * 通过操作菜单来获取编号
 * @param e 点击的按钮
 * @returns {string} 联单编号
 */
function getIdByMenu(e) {
    console.log(e.parent().html());
    return e.parent().parent().find("td[name='inboundPlanOrderId']").text();
}

// 覆盖Modal.prototype的hideModal方法
$.fn.modal.Constructor.prototype.hideModal = function () {
    var that = this;
    this.$element.hide();
    this.backdrop(function () {
        //判断当前页面所有的模态框都已经隐藏了之后body移除.modal-open，即body出现滚动条。
        $('.modal.fade.in').length === 0 && that.$body.removeClass('modal-open');
        that.resetAdjustments();
        that.resetScrollbar();
        that.$element.trigger('hidden.bs.modal');
    })
};

// 页面变黑
$(document).on('show.bs.modal', '.modal', function(event) {
    $(this).appendTo($('body'));
}).on('shown.bs.modal', '.modal.in', function(event) {
    setModalsAndBackdropsOrder();
}).on('hidden.bs.modal', '.modal', function(event) {
    setModalsAndBackdropsOrder();
});

function setModalsAndBackdropsOrder() {
    var modalZIndex = 1040;
    $('.modal.in').each(function(index) {
        var $modal = $(this);
        modalZIndex++;
        $modal.css('zIndex', modalZIndex);
        $modal.next('.modal-backdrop.in').addClass('hidden').css('zIndex', modalZIndex - 1);
    });
    $('.modal.in:visible:last').focus().next('.modal-backdrop.in').removeClass('hidden');
}

/**
 * 导出excel
 * @param e
 */
function exportExcel() {
    console.log("export");
    var name = 't_pl_inboundorder';
    var sqlWords = "select t_pl_inboundorder.inboundOrderId, inboundDate, warehouseId, boundType, transferDraftId, (select companyName from client where clientId=produceCompanyId) as 'companyName', wastesName, wastesCode, wastesAmount, unitPriceTax, totalPrice, processWay, handleCategory, t_pl_inboundorderitem.remarks, warehouseArea from t_pl_inboundorder join t_pl_inboundorderitem where t_pl_inboundorderitem.inboundOrderId=t_pl_inboundorder.inboundOrderId and boundType='WasteInbound';";
    window.open('exportExcel?name=' + name + '&sqlWords=' + sqlWords);
}

/**
 * 导入模态框
 * */
function importExcelChoose() {
    $("#importExcelModal").modal('show');
}

/**
 * 下载模板
 * */
function downloadModal() {
    var filePath = 'Files/Templates/危废入库单导入模板.xlsx';
    var r = confirm("是否下载模板?");
    if (r == true) {
        window.open('downloadFile?filePath=' + filePath);
    }
}

/**
 * 导入excel
 */
function importExcel() {
    document.getElementById("idExcel").click();
    document.getElementById("idExcel").addEventListener("change", function () {
        var eFile = document.getElementById("idExcel").files[0];
        var formFile = new FormData();
        formFile.append("excelFile", eFile);
        formFile.append("excelFile", eFile);
        $.ajax({
            type: "POST",                       // 方法类型
            url: "importWastesInboundExcel",              // url
            async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
            dataType: "json",
            data: formFile,
            processData: false,
            contentType: false,
            success: function (result) {
                if (result != undefined) {
                    console.log(result);
                    if (result.status == "success") {
                        alert(result.message);
                        window.location.reload();         //刷新
                    } else {
                        alert(result.message);
                        window.location.reload();
                    }
                }
            },
            error: function (result) {
                console.log(result);
            }
        });
    });
}
/**
 * 延时搜索及回车搜索功能
 */
$(document).ready(function () {//页面载入是就会进行加载里面的内容
    var last;
    $('#searchContent').keyup(function (event) { //给Input赋予onkeyup事件
        last = event.timeStamp;//利用event的timeStamp来标记时间，这样每次的keyup事件都会修改last的值，注意last必需为全局变量
        setTimeout(function () {
            if(last-event.timeStamp == 0){
                searchData();
            }else if (event.keyCode === 13) {   // 如果按下键为回车键，即执行搜素
                searchData();      //
            }
        },400);
    });
});