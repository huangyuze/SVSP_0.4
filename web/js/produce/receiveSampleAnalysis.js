/**
 * Created by matt on 2018/8/2.
 */
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
        var obj = {};
        $.ajax({
            type: "POST",                       // 方法类型
            url: "countReceiveSampleAnalysis",                  // url
            async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
            dataType: "json",
            data: JSON.stringify(obj),
            contentType: "application/json; charset=utf-8",
            success: function (result) {
                if (result != undefined && result.status == "success") {
                    if (result.data > 0) {
                        totalRecord = result.data;
                    } else {
                        console.log("fail: " + result.data);
                        totalRecord = 0;
                    }
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
            url: "countReceiveSampleAnalysis",                  // url
            async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
            data: JSON.stringify(data),
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            success: function (result) {
                if (result != undefined && result.status == "success") {
                    if (result.data > 0) {
                        totalRecord = result.data;
                    } else {
                        console.log("fail: " + result.data);
                        totalRecord = 0;
                    }
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
    setDataList(result);
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
    $("#previous").next().next().eq(0).addClass("active");       // 将首页页面标蓝
    $("#previous").next().next().eq(0).addClass("oldPageClass");
}

/**
 * 点击页数跳转页面
 * @param pageNumber 跳转页数
 * */
function switchPage(pageNumber) {
    if(pageNumber > totalPage()){
        pageNumber = totalPage();
    }
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
    addPageClass(pageNumber);           // 设置页码标蓝
    var page = {};
    page.count = countValue();                        //可选
    page.pageNumber = pageNumber;
    currentPage = pageNumber;          //当前页面
    //addClass("active");
    page.start = (pageNumber - 1) * page.count;
    if (!isSearch) {
        var data1 = {};
        data1.page = page;
        $.ajax({
            type: "POST",                       // 方法类型
            url: "getReceiveSampleAnalysis",         // url
            async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
            data: JSON.stringify(data1),
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            success: function (result) {
                if (result !== undefined && result.status === "success") {
                    setDataList(result.data);
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
            url: "getReceiveSampleAnalysis",         // url
            async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
            data: JSON.stringify(data),
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            success: function (result) {
                if (result !== undefined && result.status === "success") {
                    setDataList(result.data);
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
    if(pageNumber > totalPage()){
        pageNumber = totalPage();
    }
    $("#current").find("a").text("当前页：" + pageNumber);
    if (pageNumber == null || pageNumber === undefined) {
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
        addPageClass(pageNumber);           // 设置页码标蓝
        var page = {};
        page.count = countValue();//可选
        page.pageNumber = pageNumber;
        page.start = (pageNumber - 1) * page.count;
        if (!isSearch) {
            var data1 = {};
            data1.page = page;
            $.ajax({
                type: "POST",                       // 方法类型
                url: "getReceiveSampleAnalysis",         // url
                async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
                data: JSON.stringify(data1),
                dataType: "json",
                contentType: "application/json; charset=utf-8",
                success: function (result) {
                    if (result != undefined && result.status == "success") {
                        console.log(result);
                        setDataList(result.data);
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
                url: "getReceiveSampleAnalysis",         // url
                async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
                data: JSON.stringify(data),
                dataType: "json",
                contentType: "application/json; charset=utf-8",
                success: function (result) {
                    if (result != undefined && result.status == "success") {
                        // console.log(result);
                        setDataList(result.data);
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
    loadNavigationList(); // 设置动态菜单
    $("#current").find("a").text("当前页：1");
    $("#previous").addClass("disabled");
    $("#firstPage").addClass("disabled");
    $("#next").removeClass("disabled");            // 移除上一次设置的按钮禁用
    $("#endPage").removeClass("disabled");
    var page = {};
    var pageNumber = 1;                       // 显示首页
    page.count = countValue();                                 // 可选
    page.pageNumber = pageNumber;
    page.start = (pageNumber - 1) * page.count;
    var data1 = {};
    data1.page = page;
    $.ajax({
        type: "POST",                       // 方法类型
        url: "getReceiveSampleAnalysis",   // url
        async: false,                       // 同步：意思是当有返回值以后才会进行后面的js程序
        data: JSON.stringify(data1),
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: function (result) {
            if (result !== undefined && result.status === "success") {
                console.log(result);
                setPageClone(result.data);
                setPageCloneAfter(pageNumber);        // 重新设置页码
            } else {
                console.log("fail: " + result);
            }
        },
        error: function (result) {
            console.log("error: " + result);
            console.log("失败");
        }
    });
    isSearch = false;
    // getCheckState();
}

/**
 * 设置数据
 * @param result
 */
function setDataList(result) {
    // 获取id为cloneTr的tr元素
    var tr = $("#cloneTr");
    tr.siblings().remove();
    $.each(result, function (index, item) {
        var obj = eval(item);
        // 克隆tr，每次遍历都可以产生新的tr
        var clonedTr = tr.clone();
        clonedTr.show();
        // 循环遍历cloneTr的每一个td元素，并赋值
        clonedTr.find("td[name='id']").text(obj.id);
        clonedTr.find("td[name='finishDate']").text(getDateStr(obj.finishDate));
        if (obj.produceCompany != null) clonedTr.find("td[name='produceCompanyName']").text(obj.produceCompany.companyName);
        clonedTr.find("td[name='wastesName']").text(obj.wastesName);
        clonedTr.find("td[name='sampleId']").text(obj.sampleId);
        if (obj.formType != null) clonedTr.find("td[name='formType']").text(obj.formType.name);
        if (obj.handleCategory != null) clonedTr.find("td[name='handleCategory']").text(obj.handleCategory.name);
        clonedTr.find("td[name='sender']").text(obj.sender);
        clonedTr.find("td[name='ph']").text(setNumber2Line(parseFloat(obj.PH).toFixed(0)));
        clonedTr.find("td[name='heat']").text(setNumber2Line(parseFloat(obj.heat).toFixed(0)));
        clonedTr.find("td[name='ash']").text(setNumber2Line(parseFloat(obj.ash).toFixed(2)));
        clonedTr.find("td[name='water']").text(setNumber2Line(parseFloat(obj.water).toFixed(2)));
        clonedTr.find("td[name='fluorine']").text(setNumber2Line(parseFloat(obj.fluorine).toFixed(2)));
        clonedTr.find("td[name='chlorine']").text(setNumber2Line(parseFloat(obj.chlorine).toFixed(2)));
        clonedTr.find("td[name='sulfur']").text(setNumber2Line(parseFloat(obj.sulfur).toFixed(2)));
        clonedTr.find("td[name='phosphorus']").text(setNumber2Line(parseFloat(obj.phosphorus).toFixed(2)));
        clonedTr.find("td[name='flashPoint']").text(setNumber2Line(parseFloat(obj.flashPoint).toFixed(0)));
        clonedTr.find("td[name='viscosity']").text(setNumber2Line(obj.viscosity));
        clonedTr.find("td[name='hotMelt']").text(setNumber2Line(obj.hotMelt));
        clonedTr.find("td[name='signer']").text(obj.signer);
        clonedTr.find("td[name='remark']").text(obj.remark);
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
            sampleId: $.trim($("#search-sampleId").val()),
            finishDate: $.trim($("#search-finishDate").val()),
            produceCompany:{
                 companyName: $.trim($("#search-produceCompany").val())
            },
            wastesName: $.trim($("#search-wastesName").val()),
            page: page
        };
        console.log(data);
        // 模糊查询
    } else {
        data = {
            keyword: $.trim($("#searchContent").val()),
            page: page
        };
    }
    $.ajax({
        type: "POST",                       // 方法类型
        url: "getReceiveSampleAnalysis",                  // url
        async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
        data: JSON.stringify(data),
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: function (result) {
            if (result != undefined && result.status == "success") {
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
 * 增加数据
 */
function showAddModal() {
    // 设置物质形态
    $.ajax({
        type: "POST",                       // 方法类型
        url: "getFormTypeAndPackageType",                  // url
        async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
        dataType: "json",
        success: function (result) {
            if (result !== undefined) {
                var data = eval(result);
                // 高级检索下拉框数据填充
                var formType = $("#formType");
                formType.children().remove();
                $.each(data.formTypeList, function (index, item) {
                    var option = $('<option />');
                    option.val(index);
                    option.text(item.name);
                    formType.append(option);
                });
                formType.get(0).selectedIndex = -1;
            } else {
                console.log("fail: " + result);
            }
        },
        error: function (result) {
            console.log("error: " + result);
        }
    });
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
                var produceCompany = $("#produceCompany");
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
                var wastesCode = $("#wastesCode");
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

/**
 * 增加仓储化验单
 */
function addData() {
    var data = {
        id: $("#id").val(),
        finishDate: $("#finishDate").val(),
        sender: $("#sender").val(),
        wastesName: $("#wastesName").val(),
        formType: $("#formType").val(),
        ph: $("#PH").val(),
        ash: $("#ash").val(),
        fluorine: $("#fluorine").val(),
        sulfur: $("#sulfur").val(),
        flashPoint: $("#flashPoint").val(),
        hotMelt: $("#hotMelt").val(),
        produceCompany: {
            clientId: $("#produceCompany").val()
        },
        wastesCode: $("#wastesCode").val(),
        remark: $("#remark").val(),
        heat: $("#heat").val(),
        water: $("#water").val(),
        chlorine: $("#chlorine").val(),
        phosphorus: $("#phosphorus").val(),
        viscosity: $("#viscosity").val()
    };
    $.ajax({
        type: "POST",                       // 方法类型
        url: "addReceiveSampleAnalysis",                  // url
        async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
        data: JSON.stringify(data),
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: function (result) {
            if (result != undefined && result.status == "success") {
                alert(result.message);
                window.location.reload();
            } else {
                alert(result.message);
            }
        },
        error: function (result) {
            console.log(result);
        }
    });
}

/**
 * 设置高级查询的审核状态数据
 */
function getCheckState() {
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
                    if (item.index >= 1 && item.index <= 5) {
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
}

/**
 * 作废转移联单
 */
function setInvalid(e) {    //已作废
    var r = confirm("确认作废该化验单吗？");
    if (r) {
        var id = getIdByMenu(e);
        $.ajax({
            type: "POST",
            url: "setReceiveSampleAnalysisInvalid",
            async: false,
            dataType: "json",
            data: {
                id: id
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
 * 提交转移联单
 */
function setSubmit(e) {    //已提交
    var r = confirm("确认提交该联单吗？");
    if (r) {
        var id = getIdByMenu(e);
        $.ajax({
            type: "POST",
            url: "setTransferDraftToExamine",
            async: false,
            dataType: "json",
            data: {
                id: id
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

var editId;
/**
 * 修改数据
 * @param e
 */
function showEditModal(e) {
    // 获取编号
    var id = getIdByMenu(e);
    editId = id;
    // 设置物质形态
    $.ajax({
        type: "POST",                       // 方法类型
        url: "getFormTypeAndPackageType",                  // url
        async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
        dataType: "json",
        success: function (result) {
            if (result !== undefined) {
                var data = eval(result);
                // 高级检索下拉框数据填充
                var formType = $("#editFormType");
                formType.children().remove();
                $.each(data.formTypeList, function (index, item) {
                    var option = $('<option />');
                    option.val(index);
                    option.text(item.name);
                    formType.append(option);
                });
                formType.get(0).selectedIndex = -1;
            } else {
                console.log("fail: " + result);
            }
        },
        error: function (result) {
            console.log("error: " + result);
        }
    });
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
                var produceCompany = $("#editProduceCompany");
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
                var wastesCode = $("#editWastesCode");
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
    $.ajax({
        type: "POST",
        url: "getReceiveSampleAnalysisById",
        async: false,
        dataType: "json",
        data: {
            "id": id
        },
        success: function (result) {
            if (result != undefined && result.status == "success") {
                console.log(result);
                var obj = eval(result.data);
                $("#editId").val(obj.sampleId);
                $("#editFinishDate").val(getDateStr(obj.finishDate));
                if (obj.produceCompany != null)
                    $("#editProduceCompany").selectpicker('val', obj.produceCompany.clientId);
                $("#editWastesName").val(obj.wastesName);
                $("#editWastesCode").selectpicker('val', obj.wastesCode);
                if (obj.formType != null) $("#editFormType").val(obj.formType.index - 1);
                $("#editRemark").val(obj.remark);
                var ph = setNumber2Line(parseFloat(obj.PH).toFixed(0));
                if (ph == "--") {
                    $("#editPH").attr("disabled","disabled");
                    $("#editPH").val("");
                }
                else {
                    $("#editPH").removeAttr("disabled");
                    $("#editPH").val(ph);
                }
                var ash = setNumber2Line(parseFloat(obj.ash).toFixed(2));
                if (ash == "--") {
                    $("#editAsh").attr("disabled","disabled");
                    $("#editAsh").val("");
                }
                else {
                    $("#editAsh").removeAttr("disabled");
                    $("#editAsh").val(ash);
                }
                var water = setNumber2Line(parseFloat(obj.water).toFixed(2));
                if (water == "--") {
                    $("#editWater").attr("disabled","disabled");
                    $("#editWater").val("");
                }
                else {
                    $("#editWater").removeAttr("disabled");
                    $("#editWater").val(water);
                }
                var heat = setNumber2Line(parseFloat(obj.heat).toFixed(0));
                if (heat == "--") {
                    $("#editHeat").attr("disabled","disabled");
                    $("#editHeat").val("");
                }
                else {
                    $("#editHeat").removeAttr("disabled");
                    $("#editHeat").val(heat);
                }
                var fluorine = setNumber2Line(parseFloat(obj.fluorine).toFixed(2));
                if (fluorine == "--") {
                    $("#editFluorine").attr("disabled","disabled");
                    $("#editFluorine").val("");
                }
                else {
                    $("#editFluorine").removeAttr("disabled");
                    $("#editFluorine").val(fluorine);
                }
                var chlorine = setNumber2Line(parseFloat(obj.chlorine).toFixed(2));
                if (chlorine == "--") {
                    $("#editChlorine").attr("disabled","disabled");
                    $("#editChlorine").val("");
                }
                else {
                    $("#editChlorine").removeAttr("disabled");
                    $("#editChlorine").val(chlorine);
                }
                var sulfur = setNumber2Line(parseFloat(obj.sulfur).toFixed(2));
                if (sulfur == "--") {
                    $("#editSulfur").attr("disabled","disabled");
                    $("#editSulfur").val("");
                }
                else {
                    $("#editSulfur").removeAttr("disabled");
                    $("#editSulfur").val(sulfur);
                }
                var phosphorus = setNumber2Line(parseFloat(obj.phosphorus).toFixed(2));
                if (phosphorus == "--") {
                    $("#editPhosphorus").attr("disabled","disabled");
                    $("#editPhosphorus").val("");
                }
                else {
                    $("#editPhosphorus").removeAttr("disabled");
                    $("#editPhosphorus").val(phosphorus);
                }
                var flashPoint = setNumber2Line(parseFloat(obj.flashPoint).toFixed(0));
                if (flashPoint == "--") {
                    $("#editFlashPoint").attr("disabled","disabled");
                    $("#editFlashPoint").val("");
                }
                else {
                    $("#editFlashPoint").removeAttr("disabled");
                    $("#editFlashPoint").val(flashPoint);
                }
                var viscosity = setNumber2Line(obj.viscosity);
                if (viscosity == "--") {
                    $("#editViscosity").attr("disabled","disabled");
                    $("#editViscosity").val("");
                }
                else {
                    $("#editViscosity").removeAttr("disabled");
                    $("#editViscosity").val(viscosity);
                }
                var hotMelt = setNumber2Line(obj.hotMelt);
                if (hotMelt == "--") {
                    $("#editHotMelt").attr("disabled","disabled");
                    $("#editHotMelt").val("");
                }
                else {
                    $("#editHotMelt").removeAttr("disabled");
                    $("#editHotMelt").val(hotMelt);
                }
                $("#editSender").val(obj.sender);
            } else {
                alert(result.message);
            }
        },
        error: function (result) {
            console.log(result);
            alert("服务器异常");
        }
    });

    // 显示编辑模态框
    $("#editModal").modal("show");
}

/**
 * 修改数据
 */
function editData() {
    var data = {
        id: editId,
        sampleId: $("#editId").val(),
        finishDate: $("#editFinishDate").val(),
        produceCompany: {
            clientId: $("#editProduceCompany").val()
        },
        sender: $("#editSender").val(),
        ph: $("#editPH").val(),
        ash: $("#editAsh").val(),
        fluorine: $("#editFluorine").val(),
        sulfur: $("#editSulfur").val(),
        flashPoint: $("#editFlashPoint").val(),
        hotMelt: $("#editHotMelt").val(),
        wastesName: $("#editWastesName").val(),
        wastesCode: $("#editWastesCode").val(),
        formType: $("#editFormType").val(),
        remark: $("#editRemark").val(),
        heat: $("#editHeat").val(),
        water: $("#editWater").val(),
        chlorine: $("#editChlorine").val(),
        phosphorus: $("#editPhosphorus").val(),
        viscosity: $("#editViscosity").val()
    };
    $.ajax({
        type: "POST",
        url: "updateReceiveSampleAnalysisById",
        async: false,
        dataType: "json",
        data: JSON.stringify(data),
        contentType: "application/json; charset=utf-8",
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
 * 根据编号来获取对应的联单信息
 */
function loadData() {
    var id = localStorage.transferDraftId;
    if (id != null) {
        $.ajax({
            type: "POST",
            url: "getTransferDraftById",
            async: false,
            dataType: "json",
            data: {
                id: id
            },
            success: function (result) {
                if (result != undefined && result.status == "success") {
                    console.log(result);
                    var data = eval(result.data);
                    if (data.produceCompany != null) {
                        $("#produceCompany").val(data.produceCompany.clientId);
                        $("#produceCompanyPhone").val(data.produceCompany.phone);
                        $("#produceCompanyLocation").val(data.produceCompany.location);
                        $("#produceCompanyPostcode").val(data.produceCompany.postCode);
                    }
                    if (data.transportCompany != null) {
                        $("#transportCompany").val(data.transportCompany.supplierId);
                        $("#transportCompanyPhone").val(data.transportCompany.phone);
                        $("#transportCompanyLocation").val(data.transportCompany.location);
                        $("#transportCompanyPostcode").val(data.transportCompany.postCode);
                    }
                    if (data.acceptCompany != null) {
                        $("#acceptCompany").val(data.acceptCompany.clientId);
                        $("#acceptCompanyPhone").val(data.acceptCompany.phone);
                        $("#acceptCompanyLocation").val(data.acceptCompany.location);
                        $("#acceptCompanyPostcode").val(data.acceptCompany.postCode);
                    }
                    if (data.wastes != null) {
                        $("#wastesName").val(data.wastes.name);
                        $("#wastesPrepareTransferCount").val(data.wastes.prepareTransferCount);
                        $("#wastesCharacter").val(data.wastes.wastesCharacter);
                        if (data.wastes.handleCategory != null)
                            $("#wastesCategory").val(data.wastes.handleCategory.index-1);
                        $("#wastesTransferCount").val(data.wastes.transferCount);
                        $("#wastesCode").val(data.wastes.wastesId);
                        $("#wastesSignCount").val(data.wastes.signCount);
                        if (data.wastes.formType != null)
                            $("#wastesFormType").val(data.wastes.formType.index-1);
                        if (data.wastes.packageType != null)
                            $("#wastesPackageType").val(data.wastes.packageType.index-1);
                    }
                    $("#outwardIsTransit").prop('checked', data.outwardIsTransit);
                    $("#outwardIsUse").prop('checked', data.outwardIsUse);
                    $("#outwardIsDeal").prop('checked', data.outwardIsDeal);
                    $("#outwardIsDispose").prop('checked', data.outwardIsDispose);
                    $("#mainDangerComponent").val(data.mainDangerComponent);
                    $("#dangerCharacter").val(data.dangerCharacter);
                    $("#emergencyMeasure").val(data.emergencyMeasure);
                    $("#emergencyEquipment").val(data.emergencyEquipment);
                    $("#dispatcher").val(data.dispatcher);
                    $("#destination").val(data.destination);
                    $("#transferTime").val(getTimeStr(data.transferTime));
                    $("#firstCarrier").val(data.firstCarrier);
                    $("#firstCarryTime").val(getTimeStr(data.firstCarryTime));
                    $("#firstModel").val(data.firstModel);
                    $("#firstBrand").val(data.firstBrand);
                    $("#firstTransportNumber").val(data.firstTransportNumber);
                    $("#firstOrigin").val(data.firstOrigin);
                    $("#firstStation").val(data.firstStation);
                    $("#firstDestination").val(data.firstDestination);
                    $("#firstCarrierSign").val(data.firstCarrierSign);
                    $("#secondCarrier").val(data.firstCarrier);
                    $("#secondCarryTime").val(getTimeStr(data.firstCarryTime));
                    $("#secondModel").val(data.secondModel);
                    $("#secondBrand").val(data.secondBrand);
                    $("#secondTransportNumber").val(data.secondTransportNumber);
                    $("#secondOrigin").val(data.secondOrigin);
                    $("#secondStation").val(data.secondStation);
                    $("#secondDestination").val(data.secondDestination);
                    $("#secondCarrierSign").val(data.secondCarrierSign);
                    $("#acceptCompanyLicense").val(data.acceptCompanyLicense);
                    $("#recipient").val(data.recipient);
                    $("#acceptDate").val(getDateStr(data.acceptDate));
                    $("#disposeIsUse").prop('checked', data.disposeIsUse);
                    $("#disposeIsStore").prop('checked', data.disposeIsStore);
                    $("#disposeIsBurn").prop('checked', data.disposeIsBurn);
                    $("#disposeIsLandFill").prop('checked', data.disposeIsLandFill);
                    $("#disposeIsOther").prop('checked', data.disposeIsOther);
                    $("#headSign").val(data.headSign);
                    $("#signDate").val(getDateStr(data.signDate));
                } else {
                    alert(result.message);
                }
            },
            error: function (result) {
                console.log(result);
                alert("服务器异常");
            }
        });
    } else {
        // 设置三个单位的数据
        getSelectedInfo();
    }

}

function getSelectedInfo() {
    // 生产单位和接收单位的信息
    $.ajax({
        type: "POST",                       // 方法类型
        url: "listClient",                  // url
        async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
        dataType: "json",
        success: function (result) {
            if (result !== undefined) {
                var data = eval(result);
                // 高级检索下拉框数据填充
                var produceCompany = $("#produceCompany");
                produceCompany.children().remove();
                $.each(data, function (index, item) {
                    var option = $('<option />');
                    option.val(item.clientId);
                    option.text(item.companyName);
                    produceCompany.append(option);
                });
                produceCompany.get(0).selectedIndex = -1;

                var acceptCompany = $("#acceptCompany");
                acceptCompany.children().remove();
                $.each(data, function (index, item) {
                    var option = $('<option />');
                    option.val(item.clientId);
                    option.text(item.companyName);
                    acceptCompany.append(option);
                });
                acceptCompany.get(0).selectedIndex = -1;
            } else {
                console.log("fail: " + result);
            }
        },
        error: function (result) {
            console.log("error: " + result);
        }
    });
    // 运输单位的信息
    $.ajax({
        type: "POST",                       // 方法类型
        url: "listSupplier",                  // url
        async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
        dataType: "json",
        success: function (result) {
            if (result !== undefined) {
                var data = eval(result);
                // 高级检索下拉框数据填充
                var transportCompany = $("#transportCompany");
                transportCompany.children().remove();
                $.each(data, function (index, item) {
                    var option = $('<option />');
                    option.val(item.supplierId);
                    option.text(item.companyName);
                    transportCompany.append(option);
                });
                transportCompany.get(0).selectedIndex = -1;
            } else {
                console.log("fail: " + result);
            }
        },
        error: function (result) {
            console.log("error: " + result);
        }
    });
    // 设置物质形态和包装方式的枚举信息
    $.ajax({
        type: "POST",                       // 方法类型
        url: "getFormTypeAndPackageType",                  // url
        async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
        dataType: "json",
        success: function (result) {
            if (result !== undefined) {
                var data = eval(result);
                // 高级检索下拉框数据填充
                var wastesFormType = $("#wastesFormType");
                wastesFormType.children().remove();
                $.each(data.formTypeList, function (index, item) {
                    var option = $('<option />');
                    option.val(index);
                    option.text(item.name);
                    wastesFormType.append(option);
                });
                wastesFormType.get(0).selectedIndex = -1;
                var wastespackagetype = $("#wastesPackageType");
                wastespackagetype.children().remove();
                $.each(data.packageTypeList, function (index, item) {
                    var option = $('<option />');
                    option.val(index);
                    option.text(item.name);
                    wastespackagetype.append(option);
                });
                wastespackagetype.get(0).selectedIndex = -1;
            } else {
                console.log("fail: " + result);
            }
        },
        error: function (result) {
            console.log("error: " + result);
        }
    });
    // 进料方式
    $.ajax({
        type: "POST",                       // 方法类型
        url: "getHandleCategory",                  // url
        async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
        dataType: "json",
        success: function (result) {
            if (result !== undefined) {
                var data = eval(result);
                // 高级检索下拉框数据填充
                var wastesCategory = $("#wastesCategory");
                wastesCategory.children().remove();
                $.each(data.handleCategoryList, function (index, item) {
                    var option = $('<option />');
                    option.val(index);
                    option.text(item.name);
                    wastesCategory.append(option);
                });
                wastesCategory.get(0).selectedIndex = -1;
            } else {
                console.log("fail: " + result);
            }
        },
        error: function (result) {
            console.log("error: " + result);
        }
    });
    // 八位码
    $.ajax({
        type: "POST",                       // 方法类型
        url: "getWastesInfoList",              // url
        cache: false,
        async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: function (result) {
            if (result != undefined) {
                var data = eval(result.data);
                // 各下拉框数据填充
                var wastesInfoList = $("#wastesCode");
                // 清空遗留元素
                wastesInfoList.children().remove();
                $.each(data, function (index, item) {
                    var option = $('<option />');
                    option.val(item.code);
                    option.text(item.code);
                    wastesInfoList.append(option);
                });
                $('.selectpicker').selectpicker('refresh');
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
 * 查看数据
 * @param e
 */
function viewData(e) {
    $("#viewAppointModal").find('td').text('');
    var id = getIdByMenu(e);
    $.ajax({
        type: "POST",
        url: "getReceiveSampleAnalysisById",
        async: false,
        dataType: "json",
        data: {
            "id": id
        },
        success: function (result) {
            if (result != undefined && result.status == "success") {
                console.log(result);
                var obj = eval(result.data);
                $("#viewId").text(obj.sampleId);
                $("#viewFinishDate").text(getDateStr(obj.finishDate));
                if (obj.produceCompany != null)
                $("#viewProduceCompanyName").text(obj.produceCompany.companyName);
                $("#viewWastesName").text(obj.wastesName);
                $("#viewWastesCode").text(obj.wastesCode);
                if (obj.formType != null) $("#viewFormType").text(obj.formType.name);
                $("#viewRemark").text(obj.remark);
                $("#viewPH").text(setNumber2Line(parseFloat(obj.PH).toFixed(0)));
                $("#viewAsh").text(setNumber2Line(parseFloat(obj.ash).toFixed(2)));
                $("#viewWater").text(setNumber2Line(parseFloat(obj.water).toFixed(2)));
                $("#viewHeat").text(setNumber2Line(parseFloat(obj.heat).toFixed(0)));
                $("#viewFluorine").text(setNumber2Line(parseFloat(obj.fluorine).toFixed(2)));
                $("#viewChlorine").text(setNumber2Line(parseFloat(obj.chlorine).toFixed(2)));
                $("#viewSulfur").text(setNumber2Line(parseFloat(obj.sulfur).toFixed(2)));
                $("#viewPhosphorus").text(setNumber2Line(parseFloat(obj.phosphorus).toFixed(2)));
                $("#viewFlashPoint").text(setNumber2Line(parseFloat(obj.flashPoint).toFixed(0)));
                $("#viewViscosity").text(setNumber2Line(obj.viscosity));
                $("#viewHotMelt").text(setNumber2Line(obj.hotMelt));
                $("#viewSender").text(setNumber2Line(obj.sender));
            } else {
                alert(result.message);
            }
        },
        error: function (result) {
            console.log(result);
            alert("服务器异常");
        }
    });
    $("#viewAppointModal").modal("show");
}

/**
 * 通过操作菜单来获取编号
 * @param e 点击的按钮
 * @returns {string} 联单编号
 */
function getIdByMenu(e) {
    return $(e).parent().parent().find("td[name='id']").text();
}

/**
 * 化验结果导出excel
 * @param e
 */
function exportExcel() {
    var name = '1';
    // 获取勾选项
    var idArry = [];
    $.each($("input[name='select']:checked"),function(index,item){
        idArry.push(item.parentElement.parentElement.nextElementSibling.innerHTML);        // 将选中项的编号存到集合中
    });
    var sqlWords = '';
    var sql = ' in (';
    if (idArry.length > 0) {
        for (var i = 0; i < idArry.length; i++) {          // 设置sql条件语句
            if (i < idArry.length - 1) sql += "'" + idArry[i] + "'" + ",";
            else if (i == idArry.length - 1) sql += "'" + idArry[i] + "'" + ");";
        }
        sqlWords = "select sampleId,(select companyName from client where clientId = produceCompanyId),wastesName,wastesCode,\n" +
            "finishDate,replace(PH,-9999,''),replace(ash,-9999,''),replace(water,-9999,''),replace(heat,-9999,''),replace(sulfur,-9999,''),\n" +
            "replace(chlorine,-9999,''),replace(fluorine,-9999,''),replace(phosphorus,-9999,''),replace(flashPoint,-9999,''),replace(viscosity,'-9999',''),\n" +
            "replace(hotMelt,'-9999','') from t_pr_receivesampleanalysis where sampleId" + sql;
    }else {          // 若无勾选项则导出全部
        sqlWords = "select sampleId,(select companyName from client where clientId = produceCompanyId),wastesName,wastesCode,\n" +
            "finishDate,replace(PH,-9999,''),replace(ash,-9999,''),replace(water,-9999,''),replace(heat,-9999,''),replace(sulfur,-9999,''),\n" +
            "replace(chlorine,-9999,''),replace(fluorine,-9999,''),replace(phosphorus,-9999,''),replace(flashPoint,-9999,''),replace(viscosity,'-9999',''),\n" +
            "replace(hotMelt,'-9999','') from t_pr_receivesampleanalysis;";
    }
    console.log("sql:"+sqlWords);
    window.open('exportExcelReceiveSampleAnalysis?name=' + name + '&sqlWords=' + sqlWords);
}

/**
 * 日报导出excel
 * @param e
 */
function exportExcel1() {
    var name = '2';
    // 获取勾选项
    var idArry = [];
    $.each($("input[name='select']:checked"),function(index,item){
        idArry.push(item.parentElement.parentElement.nextElementSibling.innerHTML);        // 将选中项的编号存到集合中
    });
    var sqlWords = '';
    var sql = ' in (';
    if (idArry.length > 0) {
        for (var i = 0; i < idArry.length; i++) {          // 设置sql条件语句
            if (i < idArry.length - 1) sql += "'" + idArry[i] + "'" + ",";
            else if (i == idArry.length - 1) sql += "'" + idArry[i] + "'" + ");";
        }
        sqlWords = "select sampleId,(select companyName from client where clientId = produceCompanyId),wastesName,wastesCode,\n" +
            "finishDate,replace(PH,-9999,''),replace(ash,-9999,''),replace(water,-9999,''),replace(heat,-9999,''),replace(sulfur,-9999,''),\n" +
            "replace(chlorine,-9999,''),replace(fluorine,-9999,''),replace(phosphorus,-9999,''),replace(flashPoint,-9999,''),replace(viscosity,'-9999',''),\n" +
            "replace(hotMelt,'-9999','') from t_pr_receivesampleanalysis where sampleId" + sql;
    }else {          // 若无勾选项则导出全部
        sqlWords = "select sampleId,(select companyName from client where clientId = produceCompanyId),wastesName,wastesCode,\n" +
            "finishDate,replace(PH,-9999,''),replace(ash,-9999,''),replace(water,-9999,''),replace(heat,-9999,''),replace(sulfur,-9999,''),\n" +
            "replace(chlorine,-9999,''),replace(fluorine,-9999,''),replace(phosphorus,-9999,''),replace(flashPoint,-9999,''),replace(viscosity,'-9999',''),\n" +
            "replace(hotMelt,'-9999','') from t_pr_receivesampleanalysis;";
    }
    console.log("sql:"+sqlWords);
    window.open('exportExcelReceiveSampleAnalysis?name=' + name + '&sqlWords=' + sqlWords);
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
    var filePath = 'Files/Templates/市场部化验结果模板.xlsx';
    var r = confirm("是否下载模板?");
    if (r) {
        window.open('downloadFile?filePath=' + filePath);
    }
}

/**
 * 导入
 */
function importExcel() {
    document.getElementById("idExcel").click();
    document.getElementById("idExcel").addEventListener("change", function () {
        var eFile = document.getElementById("idExcel").files[0];
        var formFile = new FormData();
        formFile.append("excelFile", eFile);
        $.ajax({
            type: "POST",                       // 方法类型
            url: "importReceiveSampleAnalysis",              // url
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