var inboundPlanOrderIdArray = [];
var itemIndex = 0;

/**
 * 读取入库计划单数据
 */
function loadInboundPlanOrder() {
    loadNavigationList();   // 设置动态菜单
    var data1 = {};
    $.ajax({
        type: "POST",                       // 方法类型
        url: "listInboundPlanOrder",   // url
        async: false,                       // 同步：意思是当有返回值以后才会进行后面的js程序
        dataType: "json",
        data: JSON.stringify(data1),
        contentType: "application/json; charset=utf-8",
        success: function (result) {
            if (result !== undefined && result.status === "success") {
                console.log(result);
                setDataList(result.data);
            } else {
                console.log("fail: " + result);
            }
        },
        error: function (result) {
            console.log("error: " + result);
            console.log("失败");
        }
    });
}

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
 * 设置数据
 * @param result
 */
function setDataList(result) {
    // 获取id为cloneTr的tr元素
    var tr = $("#planClonedTr");
    tr.siblings().remove();
    $.each(result, function (index, item) {
        // 克隆tr，每次遍历都可以产生新的tr
        var clonedTr = tr.clone();
        clonedTr.show();
        // 循环遍历cloneTr的每一个td元素，并赋值
        clonedTr.children("td").each(function (inner_index) {
            var obj = eval(item);
            // 根据索引为部分td赋值
            switch (inner_index) {
                case (1):
                    $(this).html(obj.inboundPlanOrderId);
                    break;
                case (2):
                    $(this).html(obj.transferDraftId);
                    break;
                case (3):
                    $(this).html(getDateStr(obj.planDate));
                    break;
                case (4):
                    if (obj.produceCompany != null)
                        $(this).html(obj.produceCompany.companyName);
                    break;
                case (5):
                    if (obj.acceptCompany != null)
                        $(this).html(obj.acceptCompany.companyName);
                    break;
                case (6):
                    $(this).html(getDateStr(obj.transferDate));
                    break;
                case (7):
                    $(this).html(obj.transferCount);
                    break;
                case (8):
                    $(this).html(obj.poundsCount);
                    break;
                case (9):
                    $(this).html(obj.storageCount);
                    break;
                case (10):
                    $(this).html(obj.leftCount);
                    break;
                case (11):
                    $(this).html(obj.prepareTransferCount);
                    break;
                case (12):
                    if (obj.wastes != null)
                        $(this).html(obj.wastes.name);
                    break;
                case (13):
                    if (obj.wastes != null)
                        $(this).html(obj.wastes.wastesId);
                    break;
                case (14):
                    if (obj.wastes != null)
                        $(this).html(obj.wastes.category);
                    break;
                case (15):
                    $(this).html(obj.unitPriceTax);
                    break;
            }
        });
        // 把克隆好的tr追加到原来的tr前面
        clonedTr.removeAttr("id");
        clonedTr.insertBefore(tr);
    });
    // 隐藏无数据的tr
    tr.hide();
}

/**
 * 增加计划单到入库单中
 */
function addPlan2Order() {
    // 定义计划列表，存储勾选的计划
    var planList = [];
    // 遍历计划单表格行，获取勾选的计划列表
    $("#planOrderData").children().not("#planClonedTr").each(function () {
        var isCheck = $(this).find("input[name='select']").prop('checked');
        if (isCheck) {
            var inboundPlanOrderId = $(this).find("td[name='inboundPlanOrderId']").text();
            if ($.inArray(inboundPlanOrderId, inboundPlanOrderIdArray) == -1) {
                inboundPlanOrderIdArray.push(inboundPlanOrderId);
                var plan = {};
                plan.inboundPlanOrderId = inboundPlanOrderId;
                plan.transferDraftId = $(this).find("td[name='transferDraftId']").text();
                plan.planDate = $(this).find("td[name='planDate']").text();
                plan.produceCompanyName = $(this).find("td[name='produceCompanyName']").text();
                plan.acceptCompanyName = $(this).find("td[name='acceptCompanyName']").text();
                plan.transferDate = $(this).find("td[name='transferDate']").text();
                plan.transferCount = $(this).find("td[name='transferCount']").text();
                plan.poundsCount = $(this).find("td[name='poundsCount']").text();
                plan.storageCount = $(this).find("td[name='storageCount']").text();
                plan.leftCount = $(this).find("td[name='leftCount']").text();
                plan.prepareTransferCount = $(this).find("td[name='prepareTransferCount']").text();
                plan.wastesName = $(this).find("td[name='wastesName']").text();
                plan.wastesCode = $(this).find("td[name='wastesCode']").text();
                plan.wastesCategory = $(this).find("td[name='wastesCategory']").text();
                plan.unitPriceTax = $(this).find("td[name='unitPriceTax']").text();
                planList.push(plan);
            }
        }
    });
    // 遍历js对象数组列表，循环增加入库单条目列表
    for (var i = 0; i < planList.length; i++) {
        var tr = $("#inboundClonedTr");
        // 克隆tr，每次遍历都可以产生新的tr
        var clonedTr = tr.clone();
        clonedTr.show();
        // 循环遍历cloneTr的每一个td元素，并赋值
        clonedTr.find("td[name='index']").text(++itemIndex);
        clonedTr.find("td[name='inboundPlanOrderId']").text(planList[i].inboundPlanOrderId);
        clonedTr.find("td[name='transferDraftId']").text(planList[i].transferDraftId);
        clonedTr.find("td[name='produceCompanyName']").text(planList[i].produceCompanyName);
        clonedTr.find("td[name='wastesName']").text(planList[i].wastesName);
        clonedTr.find("td[name='wastesCode']").text(planList[i].wastesCode);
        clonedTr.find("td[name='wastesAmount']").text(planList[i].poundsCount);
        clonedTr.find("td[name='unitPriceTax']").text(planList[i].unitPriceTax);
        clonedTr.find("td[name='totalPrice']").text(planList[i].poundsCount * planList[i].unitPriceTax);
        // 把克隆好的tr追加到原来的tr前面
        clonedTr.removeAttr("id");
        clonedTr.insertBefore(tr);
    }
    // 设置下拉框数据
    setSelectItem();
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
    var totalRecord = 0;
    if (!isSearch) {
        $.ajax({
            type: "POST",                       // 方法类型
            url: "countInboundOrder",                  // url
            async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
            dataType: "json",
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
    } else {
        $.ajax({
            type: "POST",                       // 方法类型
            url: "searchInboundOrderCount",                  // url
            async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
            data: JSON.stringify(data),
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
            url: "listInboundOrder",         // url
            async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
            data: JSON.stringify(page),
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
            url: "searchInboundOrder",         // url
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
        page.count = countValue();//可选
        page.pageNumber = pageNumber;
        page.start = (pageNumber - 1) * page.count;
        if (!isSearch) {
            $.ajax({
                type: "POST",                       // 方法类型
                url: "listInboundOrder",         // url
                async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
                data: JSON.stringify(page),
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
                url: "searchInboundOrder",         // url
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
    page.count = countValue();                                 // 可选
    page.pageNumber = pageNumber;
    page.start = (pageNumber - 1) * page.count;
    $.ajax({
        type: "POST",                       // 方法类型
        url: "listInboundOrder",   // url
        async: false,                       // 同步：意思是当有返回值以后才会进行后面的js程序
        data: JSON.stringify(page),
        dataType: "json",
        contentType: 'application/json;charset=utf-8',
        success: function (result) {
            if (result !== undefined && result.status === "success") {
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
    getSelectedInfo();
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
        clonedTr.find("td[name='inboundOrderId']").text(data.inboundOrderId);
        clonedTr.find("td[name='inboundDate']").text(getDateStr(data.inboundDate));
        if (data.wareHouse != null)
        clonedTr.find("td[name='wareHouseName']").text(data.wareHouse.wareHouseName);
        if (data.boundType != null)
        clonedTr.find("td[name='creatorId']").text(data.creatorId);
        // clonedTr.find("td[name='keeperId']").text(data.keeperId);
        // clonedTr.find("td[name='directorId']").text(data.directorId);
        // clonedTr.find("td[name='approverId']").text(data.approverId);
        if (data.boundType != null)
        clonedTr.find("td[name='boundType']").text(data.boundType.name);
        if (data.recordState != null)
        clonedTr.find("td[name='recordState']").text(data.recordState.name);
        if (data.checkState != null)
        clonedTr.find("td[name='checkState']").text(data.checkState.name);
        clonedTr.find("td[name='remarks']").text(data.remarks);
        // 把克隆好的tr追加到原来的tr前面
        clonedTr.removeAttr("id");
        clonedTr.insertBefore(tr);
    });
    // 隐藏无数据的tr
    tr.hide();
}

/**
 * 查找
 */
function searchData() {
    var page = {};
    var pageNumber = 1;                       // 显示首页
    page.pageNumber = pageNumber;
    page.count = countValue();
    page.start = (pageNumber - 1) * page.count;
    // 精确查询
    if ($("#senior").is(':visible')) {
        data = {
            inboundOrderId: $("#inboundOrderId").val(),
            wareHouse: {
                wareHouseName: $("#search-warehouseName").val()
            },
            recordState: $("#search-recordState").val(),
            checkState: $("#search-checkState").val(),
            companyId: $("#search-beginTime").val(), // 起始时间
            modifierId: $("#search-endTime").val(),   // 结束时间
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
        url: "searchInboundOrder",                  // url
        async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
        data: JSON.stringify(data),
        dataType: "json",
        contentType: "application/json; charset=utf-8",
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
 * 作废转移联单
 */
function setInvalid(e) {    //已作废
    var r = confirm("确认作废该入库单吗？");
    if (r) {
        var id = getIdByMenu(e);
        $.ajax({
            type: "POST",
            url: "setInboundOrderStateInvalid",
            async: false,
            dataType: "json",
            data: {
                inboundOrderId: id
            },
            success: function (result) {
                if (result !== undefined && result.status === "success") {
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
        url: "getInboundOrderById",
        async: false,
        dataType: "json",
        data: {"inboundOrderId": id},
        success: function (result) {
            if (result !== undefined && result.status === "success") {
                console.log(result);
                setItemDataList(result.data);
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

    /**
     * 设置数据
     * @param result
     */
    function setItemDataList(result) {
        // 获取id为cloneTr的tr元素
        var tr = $("#itemClonedTr");
        tr.siblings().remove();
        $.each(result.inboundOrderItemList, function (index, item) {
            var data = eval(item);
            // 克隆tr，每次遍历都可以产生新的tr
            var clonedTr = tr.clone();
            clonedTr.show();
            // 循环遍历cloneTr的每一个td元素，并赋值
            clonedTr.find("td[name='index']").text(index + 1);
            // clonedTr.find("td[name='inboundPlanOrderId']").text(data.inboundPlanOrderId);
            clonedTr.find("td[name='transferDraftId']").text(data.transferDraftId);
            if (data.produceCompany != null)
                clonedTr.find("td[name='produceCompanyName']").text(data.produceCompany.companyName);
            if (data.wastes != null) {
                clonedTr.find("td[name='wastesName']").text(data.wastes.name);
                clonedTr.find("td[name='wastesCode']").text(data.wastes.wastesId);
            }
            clonedTr.find("td[name='wastesAmount']").text(parseFloat(data.wastesAmount).toFixed(3));
            clonedTr.find("td[name='unitPriceTax']").text(data.unitPriceTax);
            clonedTr.find("td[name='totalPrice']").text(data.totalPrice);
            if (data.processWay != null)
                clonedTr.find("td[name='processWay']").text(data.processWay.name);
            if (data.handleCategory != null)
                clonedTr.find("td[name='handleCategory']").text(data.handleCategory.name);
            clonedTr.find("td[name='remarks']").text(data.remarks);
            clonedTr.find("td[name='warehouseArea']").text(data.warehouseArea);
            clonedTr.find("td[name='inboundOrderItemId']").text(data.inboundOrderItemId);
            // 把克隆好的tr追加到原来的tr前面
            clonedTr.removeAttr("id");
            clonedTr.insertBefore(tr);
        });
        // 隐藏无数据的tr
        tr.hide();
    }
}

/**
 * 属性调整
 * @param e
 */
function changeAttribute(e) {
    // 获取条目编号
    var itemId = getItemId(e);
    // 获取条目进料方式
    var itemHandleCategory = getItemHandleCategory(e);
    // 选中的旧属性单元格
    var oldHandleCategory = e.parent().parent().find("td[name='handleCategory']");

    $.ajax({
        type: "POST",
        url: "getHandleCategory",
        async: false,
        dataType: "json",
        success: function (result) {
            if (result !== undefined && result.status === "success") {
                var data = eval(result);
                var handleCategory = $("#modal-handleCategory");
                handleCategory.children().remove();
                $.each(data.handleCategoryList, function (index, item) {
                    var option = $('<option />');
                    option.val(index);
                    option.text(item.name);
                    handleCategory.append(option);
                });
                $("#modal-handleCategory option:contains("+handleCategory+")").attr("selected", true);
            } else {
                alert(result.message);
            }
        },
        error: function (result) {
            console.log(result);
            alert("服务器异常");
        }
    });

    $("#attributeModal").modal("show");

    // 点击事件
    $("#saveBtn").unbind();
    $("#saveBtn").click(function () {
        $.ajax({
            type: "POST",
            url: "updateItemHandleCategory",
            async: false,
            dataType: "json",
            data: JSON.stringify({
                inboundOrderItemId: itemId,
                handleCategory: $("#modal-handleCategory").val()
            }),
            contentType: "application/json; charset=utf-8",
            success: function (result) {
                if (result !== undefined && result.status === "success") {
                    alert(result.message);
                    oldHandleCategory.text($("#modal-handleCategory").find("option:selected").text());
                } else {
                    alert(result.message);
                }
            },
            error: function (result) {
                console.log(result);
                alert("服务器异常");
            }
        });
    });

    /**
     * 获取条目编号
     * @param e
     * @returns {*}
     */
    function getItemId(e) {
        return e.parent().parent().find("td[name='inboundOrderItemId']").text();
    }

    function getItemHandleCategory(e) {
        return e.parent().parent().find("td[name='handleCategory']").text();
    }
}

/**
 * 通过操作菜单来获取编号
 * @param e 点击的按钮
 * @returns {string} 联单编号
 */
function getIdByMenu(e) {
    return e.parent().parent().find("td[name='inboundOrderId']").text();
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