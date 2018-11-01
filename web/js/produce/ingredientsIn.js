function getDayDate(date) {
    //获取时间
    var obj = date;
    if (obj == null) return "";
    var year = (parseInt(obj.year) + 1900).toString();
    var mouth = parseInt((obj.month) + 1).toString();
    if (mouth.length != 2) {
        mouth = 0 + mouth;
    }
    var day = parseInt((obj.date)).toString();
    if (day.length != 2) {
        day = 0 + day;
    }
    var time1 = year + "年" + mouth + "月" + day + "日";
    return time1;
}

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
            url: "totalIngredientsInRecord",                  // url
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
            url: "searchIngredientsInTotal",                  // url
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
 * 设置克隆页码
 * */
function setPageClone(result) {
    $(".beforeClone").remove();
    setIngredientsInList(result);
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

/**
 * 点击页数跳转页面
 * @param pageNumber 跳转页数
 * */
function switchPage(pageNumber) {
    console.log("当前页：" + pageNumber);
    if(pageNumber > totalPage()){
        pageNumber = totalPage();
    }
    if(pageNumber > totalPage()){
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
    var page = {};
    page.count = countValue();                        //可选
    page.pageNumber = pageNumber;
    currentPage = pageNumber;          //当前页面
    setPageCloneAfter(pageNumber);      // 大于5页时页码省略显示
    addPageClass(pageNumber);           // 设置页码标蓝
    page.start = (pageNumber - 1) * page.count;
    if (!isSearch) {
        $.ajax({
            type: "POST",                       // 方法类型
            url: "loadPageIngredientsInList",         // url
            async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
            data: JSON.stringify(page),
            dataType: "json",
            contentType: 'application/json;charset=utf-8',
            success: function (result) {
                if (result != undefined) {
                    setIngredientsInList(result.data);
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
            url: "searchIngredientsIn",         // url
            async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
            data: JSON.stringify(data1),
            dataType: "json",
            contentType: 'application/json;charset=utf-8',
            success: function (result) {
                if (result != undefined) {
                    // console.log(result);
                    setIngredientsInList(result.data);
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
    if(pageNumber > totalPage()){
        pageNumber = totalPage();
    }
    $("#current").find("a").text("当前页：" + pageNumber);
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
        setPageCloneAfter(pageNumber);      // 大于5页时页码省略显示
        addPageClass(pageNumber);           // 设置页码标蓝
        var page = {};
        page.count = countValue();//可选
        page.pageNumber = pageNumber;
        page.start = (pageNumber - 1) * page.count;
        if (!isSearch) {
            $.ajax({
                type: "POST",                       // 方法类型
                url: "loadPageIngredientsInList",         // url
                async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
                data: JSON.stringify(page),
                dataType: "json",
                contentType: 'application/json;charset=utf-8',
                success: function (result) {
                    if (result != undefined) {
                        console.log(result);
                        setIngredientsInList(result.data);
                    } else {
                        console.log("fail: " + result);
                    }
                },
                error: function (result) {
                    console.log("error: " + result);
                }
            });
        } else {
            data1['page'] = page;
            $.ajax({
                type: "POST",                       // 方法类型
                url: "searchIngredientsIn",         // url
                async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
                data: JSON.stringify(data1),
                dataType: "json",
                contentType: 'application/json;charset=utf-8',
                success: function (result) {
                    if (result != undefined) {
                        // console.log(result);
                        setIngredientsInList(result.data);
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
function loadPageIngredientsInList() {
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
        type: "POST",                       // 方法类型
        url: "loadPageIngredientsInList",          // url
        async: false,                       // 同步：意思是当有返回值以后才会进行后面的js程序
        data: JSON.stringify(page),
        dataType: "json",
        contentType: 'application/json;charset=utf-8',
        success: function (result) {
            if (result != undefined && result.status == "success") {
                console.log(result);
                setPageClone(result.data);
                setPageCloneAfter(pageNumber);      // 大于5页时页码省略显示
            } else {
                console.log(result.message);
            }
        },
        error: function (result) {
            console.log("error: " + result);
            console.log("失败");
        }
    });
    isSearch = false;
    // 设置高级检索的下拉框数据
    setSeniorSelectedList();
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

function setIngredientsInList(result) {
    // 获取id为cloneTr的tr元素
    var tr = $("#clone");
    tr.siblings().remove();
    var serialNumber = 0;    // 序号
    $.each(result, function (index, item) {
        serialNumber++;
        // 克隆tr，每次遍历都可以产生新的tr
        var clonedTr = tr.clone();
        clonedTr.show();
        // 循环遍历cloneTr的每一个td元素，并赋值
        clonedTr.children("td").each(function (inner_index) {
            var obj = eval(item);
            // 根据索引为部分td赋值
            switch (inner_index) {
                case (1):
                    // 入库单号
                    $(this).html(obj.id);
                    break;
                case (2):
                    // 单位名称
                    $(this).html(obj.companyName);
                    break;
                case (3):
                    // 入库单状态
                    $(this).html(obj.state.name);
                    break;
                case (4):
                    // 总金额
                    $(this).html(obj.totalPrice);
                    break;
                case (5):
                    // 记账人
                    $(this).html(obj.bookkeeper);
                    break;
                case (6):
                    // 审批人
                    $(this).html(obj.approver);
                    break;
                case (7):
                    // 保管人
                    $(this).html(obj.keeper);
                    break;
                case (8):
                    // 验收人
                    $(this).html(obj.acceptor);
                    break;
                case (9):
                    // 经手人
                    $(this).html(obj.handlers);
                    break;
                case (10):
                    // 创建日期
                    $(this).html(getDateStr(obj.creationDate));
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
 * 设置高级检索的下拉框数据
 */
function setSeniorSelectedList() {
    $.ajax({
        type: "POST",                       // 方法类型
        url: "getIngredientsInSeniorSelectedList",                  // url
        async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
        dataType: "json",
        success: function (result) {
            if (result != undefined) {
                var data = eval(result);
                // 高级检索下拉框数据填充
                var state = $("#search-state");
                state.children().remove();
                $.each(data.stateList, function (index, item) {
                    var option = $('<option />');
                    option.val(index);
                    option.text(item.name);
                    state.append(option);
                });
                state.get(0).selectedIndex = -1;
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
 * 导出excel
 * @param e
 */
function exportInExcel() {
    var name = 't_pr_ingredients_in';
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
        sqlWords = "select id,companyName as '单位名称',creationDate as '入库单创建日期',fileId as '文件编号',a.totalPrice as '总额',bookkeeper as '记账人',\n" +
            "approver as '审批人',keeper as '保管人',acceptor as '验收人',handlers as '经手人',state as '入库单状态',serialNumberIn as '序号',\n" +
            "name as '物品名称',unitPrice as '单价',amount as '入库数',b.totalPrice as '物品总额',receiveAmount as '已领用数量',wareHouseName as '仓库',\n" +
            "post as '过账',specification as '规格',unit as '单位', ingredientState as '物品状态',remarks as '附注'\n" +
            "from t_pr_ingredients_in as a join t_pr_ingredients as b where inId = id and id" + sql;
    }else {          // 若无勾选项则导出全部
        sqlWords = "select id,companyName as '单位名称',creationDate as '入库单创建日期',fileId as '文件编号',a.totalPrice as '总额',bookkeeper as '记账人',\n" +
            "approver as '审批人',keeper as '保管人',acceptor as '验收人',handlers as '经手人',state as '入库单状态',serialNumberIn as '序号',\n" +
            "name as '物品名称',unitPrice as '单价',amount as '入库数',b.totalPrice as '物品总额',receiveAmount as '已领用数量',wareHouseName as '仓库',\n" +
            "post as '过账',specification as '规格',unit as '单位', ingredientState as '物品状态',remarks as '附注'\n" +
            "from t_pr_ingredients_in as a join t_pr_ingredients as b where inId = id;";
    }
    console.log("sql:"+sqlWords);
    window.open('exportExcel?name=' + name + '&sqlWords=' + sqlWords);
}

/**
 * 导入模态框
 * */
function importInExcelChoose() {
    $("#importExcelModal").modal('show');
}

/**
 * 下载模板
 * */
function downloadInModal() {
    var filePath = 'Files/Templates/辅料备件入库单模板.xls';
    var r = confirm("是否下载模板?");
    if (r === true) {
        window.open('downloadFile?filePath=' + filePath);
    }
}

/**
 * 导入excel
 */
function importInExcel() {
    document.getElementById("idExcel").click();
    document.getElementById("idExcel").addEventListener("change", function () {
        var eFile = document.getElementById("idExcel").files[0];
        var formFile = new FormData();
        formFile.append("excelFile", eFile);
        formFile.append("excelFile", eFile);
        $.ajax({
            type: "POST",                       // 方法类型
            url: "importIngredientsInExcel",              // url
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
 * 回车查询
 */
function enterSearch(){
    if (event.keyCode === 13) {   // 如果按下键为回车键，即执行搜素
        searchIngredientIn();      //
    }
}

/**
 * 查询功能
 */
function searchIngredientIn() {
    isSearch = true;
    var page = {};
    var pageNumber = 1;                       // 显示首页
    page.pageNumber = pageNumber;
    page.count = countValue();
    page.start = (pageNumber - 1) * page.count;
    var state = null;
    if ($("#search-state").val() == 0) state = "NewBuild";//新建
    if ($("#search-state").val() == 1) state = "Invalid";//已作废
    if ($("#search-state").val() == 2) state = "OutBounded";//已出库
    var keywords = $.trim($("#searchContent").val());
    //模糊查询状态字段转换
    switch(keywords){
        case "新建":keywords = "NewBuild";break;
        case "已作废":keywords = "Invalid";break;
        case "作废":keywords = "Invalid";break;
        case "已出库":keywords = "OutBounded";break;
        case "出库":keywords = "OutBounded";break;
    }
    if ($("#senior").is(':visible')) {
        data1 = {
            startDate: $("#search-startDate").val(),
            endDate: $("#search-endDate").val(),
            id: $.trim($("#search-Id").val()),
            companyName: $.trim($("#search-companyName").val()),
            state: state,
            page: page
        };
    } else {
        data1 = {
            keywords: keywords,
            page: page
        };
    }
    if (data1 == null) alert("请输入查询内容!");
    else {
        $.ajax({
            type: "POST",                            // 方法类型
            url: "searchIngredientsIn",                 // url
            async: false,                           // 同步：意思是当有返回值以后才会进行后面的js程序
            data: JSON.stringify(data1),
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            success: function (result) {
                console.log(result);
                if (result.data != undefined || result.status == "success") {
                    setPageClone(result.data);
                } else {
                    console.log(result.message);
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
 * 获取入库单号(双击)
 * @param item
 * @returns {string}
 */
function getIngredientsInId1(item) {
    return item.firstElementChild.nextElementSibling.innerHTML;
}

/**
 * 获取入库单号（单击）
 * @param item
 * @returns {*}
 */
function getIngredientsInId(item) {
    return item.parentElement.parentElement.firstElementChild.nextElementSibling.innerHTML;
}

/**
 * 单击查看功能
 * @param item
 */
function toViewIngredientsIn(item) {
    var id = getIngredientsInId(item);
    showViewModal(id);
}

/**
 * 双击查看功能
 * @param item
 */
function toViewIngredientsIn1(item) {
    var id = getIngredientsInId1(item);
    showViewModal(id);
}

/**
 * 显示查看模态框
 * @param id
 */
function showViewModal(id) {
    $(".newLine").remove();
    $.ajax({
        type: "POST",
        url: "getIngredientsInById",
        async: false,
        data: {
            id: id
        },
        dataType: "json",
        success: function (result) {
            if (result.status == "success") {
                //设置数据
                var data = eval(result.data);
                console.log(result);
                setViewIngredientsClone(result.data);
                $("#view-id").text(data.id);
                $("#view-companyName").text(data.companyName);
                $("#view-creationDate").text(getDayDate(data.creationDate));
                $("#view-fileId").text(data.fileId);
                $("#view-hundredThousand").text(Math.floor(data.totalPrice / 100000));
                $("#view-tenThousand").text(Math.floor(data.totalPrice % 100000 / 10000));
                $("#view-thousand").text(Math.floor((data.totalPrice % 100000) % 10000 / 1000));
                $("#view-hundred").text(Math.floor((data.totalPrice % 100000) % 10000 % 1000 / 100));
                $("#view-ten").text(Math.floor((data.totalPrice % 100000) % 10000 % 1000 % 100 / 10));
                $("#view-yuan").text(Math.floor((data.totalPrice % 100000) % 10000 % 1000 % 100 % 10));
                var jiao = data.totalPrice % 100000 % 10000 % 1000 % 100 % 10 % 1 * 10;
                $("#view-jiao").text(Math.floor(jiao));
                $("#view-fen").text(Math.floor(jiao % 1 * 10));
                $("#view-bookkeeper").text(data.bookkeeper);
                $("#view-approver").text(data.approver);
                $("#view-keeper").text(data.keeper);
                $("#view-acceptor").text(data.acceptor);
                $("#view-handlers").text(data.handlers);
            } else {
                alert(result.message);
            }
        },
        error: function (result) {
            console.log(result);
            alert("服务器异常!");
        }
    });
    $("#viewModal").modal('show');
}

/**
 * 为查看模态框设置克隆数据
 * @param result
 */
function setViewIngredientsClone(result) {
    // 获取id为cloneTr的tr元素
    var tr = $("#viewClone");
    $.each(result.ingredientsList, function (index, item) {
        // 克隆tr，每次遍历都可以产生新的tr
        var clonedTr = tr.clone();
        clonedTr.show();
        // 循环遍历cloneTr的每一个td元素，并赋值
        clonedTr.children("td").each(function (inner_index) {
            var obj = eval(item);
            var jiao1 = obj.totalPrice % 100000 % 10000 % 1000 % 100 % 10 % 1 * 10;
            // 根据索引为部分td赋值
            switch (inner_index) {
                case (0):
                    // 编号
                    $(this).html(obj.serialNumber);
                    break;
                case (1):
                    // 物品名称
                    $(this).html(obj.name);
                    break;
                case (2):
                    // 规格
                    $(this).html(obj.specification);
                    break;
                case (3):
                    // 单位（KG）
                    $(this).html(obj.unit);
                    break;
                case (4):
                    // 数量
                    $(this).html(obj.amount);
                    break;
                case (5):
                    // 单价
                    $(this).html(obj.unitPrice);
                    break;
                case (6):
                    // 金额 十万
                    $(this).html(Math.floor(obj.totalPrice / 100000));
                    break;
                case (7):
                    // 金额 万
                    $(this).html(Math.floor(obj.totalPrice % 100000 / 10000));
                    break;
                case (8):
                    // 金额 千
                    $(this).html(Math.floor((obj.totalPrice % 100000) % 10000 / 1000));
                    break;
                case (9):
                    // 金额 百
                    $(this).html(Math.floor((obj.totalPrice % 100000) % 10000 % 1000 / 100));
                    break;
                case (10):
                    // 金额 十
                    $(this).html(Math.floor((obj.totalPrice % 100000) % 10000 % 1000 % 100 / 10));
                    break;
                case (11):
                    // 金额 元
                    $(this).html(Math.floor((obj.totalPrice % 100000) % 10000 % 1000 % 100 % 10));
                    break;
                case (12):
                    // 金额 角
                    $(this).html(Math.floor(jiao1));
                    break;
                case (13):
                    // 金额 分
                    $(this).html(Math.floor(jiao1 % 1 * 10));
                    break;
                case (14):
                    // 过账
                    $(this).html(obj.post);
                    break;
                case (15):
                    // 附注
                    $(this).html(obj.remarks);
                    break;
                case (16):
                    // 仓库
                    $(this).html(obj.wareHouseName);
                    break;
                case (17):
                    // 物品状态
                    if (obj.ingredientState != null)
                        $(this).html(obj.ingredientState.name);
                    break;
                case(18):
                    // 处置设备
                    if (obj.equipment != null)
                        $(this).html(obj.equipment.name);
                    break;
            }
        });
        // 把克隆好的tr追加到原来的tr前面
        clonedTr.addClass("newLine");
        clonedTr.removeAttr("id");
        clonedTr.insertBefore(tr);
    });
    // 隐藏无数据的tr
    tr.hide();
}

/**
 * 作废功能
 */
function invalidIngredientsIn(item) {
    var id = getIngredientsInId(item);
    if (confirm("是否作废？")) {
        $.ajax({
            type: "POST",
            url: "invalidIngredientsIn",
            async: false,
            data: {
                id: id
            },
            dataType: "json",
            success: function (result) {
                if (result.status == "success") {
                    alert("作废成功！");
                    window.location.reload();
                } else {
                    alert(result.message);
                }
            },
            error: function (result) {
                console.log(result);
                alert("服务器异常!");
            }
        });
    }
}

/**
 * 提示框自动关闭,待完善
 */
function divFadeAlert() {
    console.log("alert!");
    var hidvalue_str = $('#hidvalue').val();
    var divWidth = 100;
    var divHeight = 100;
    var iLeft = ($(window).width() - divWidth) / 2;
    var iTop = ($(window).height() - divHeight) / 2 + $(document).scrollTop();
    var divhtml = $("<div>" + hidvalue_str + "</div>").css({
        position: 'absolute',
        top: iTop + 'px',
        left: iLeft + 'px',
        display: 'none',
        width: divWidth + 'px',
        height: divHeight + 'px'
    });
    divhtml.appendTo('body').fadeIn();
    divhtml.appendTo('body').fadeOut(3000);
}

///////////////////新增页面///////////////////////////
function getcurrentDaydate() {
    //获取时间
    var obj = new Date();
    var year = obj.getFullYear();
    var month = obj.getMonth() + 1;
    var day = obj.getDate();
    if (day % 7 > 0) var a = 1; else a = 0;
    return year + "年" + month + "月" + day + "日";
}


/**
 * 返回count值
 * */
function countValue1() {
    var mySelect = document.getElementById("count1");
    var index = mySelect.selectedIndex;
    return mySelect.options[index].text;
}

/**
 * 计算总页数
 * */
function totalPage1() {
    var totalRecord = 0;
    if (!isSearch) {
        $.ajax({
            type: "POST",                       // 方法类型
            url: "countProcurementItemList",                  // url
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
            url: "searchIngredientsOutTotal",                  // url
            async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
            data: JSON.stringify(data1),
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            success: function (result) {
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
    var count = countValue1();                         // 可选
    var total = loadPages1(totalRecord, count);
    return total;
}

/**
 * 设置克隆页码
 * */
function setPageClone1(result) {
    $(".beforeClone").remove();
    setProcurementItemList(result);
    var total = totalPage1();
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
            switchPage1(num);
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
function switchPage1(pageNumber) {
    if(pageNumber > totalPage1()){
        pageNumber = totalPage1();
    }
    if (pageNumber == 0) {                 //首页
        pageNumber = 1;
    }
    if (pageNumber == -2) {
        pageNumber = totalPage1();        //尾页
    }
    if (pageNumber == null || pageNumber == undefined) {
        console.log("参数为空,返回首页!");
        pageNumber = 1;
    }
    $("#current").find("a").text("当前页：" + pageNumber);
    if (pageNumber == 1) {
        $("#previous").attr("disabled","true");
        $("#firstPage").attr("disabled","true");
        // $('#previous').removeAttr('href');//去掉a标签中的href属性
        // $('#firstPage').removeAttr('onclick');//去掉a标签中的onclick事件
        $("#next").removeAttr("disabled");
        $("#endPage").removeAttr("disabled");
        // $("#next").addAttr("href");

    }
    if (pageNumber == totalPage1()) {
        $("#next").attr("disabled","true");
        $("#endPage").attr("disabled","true");
        $("#previous").removeAttr("disabled");
        $("#firstPage").removeAttr("disabled");
    }
    if (pageNumber > 1) {
        $("#previous").removeAttr("disabled");
        $("#firstPage").removeAttr("disabled");
    }
    if (pageNumber < totalPage1()) {
        $("#next").removeAttr("disabled");
        $("#endPage").removeAttr("disabled");
    }
    var page = {};
    page.count = countValue1();                        //可选
    page.pageNumber = pageNumber;
    currentPage = pageNumber;          //当前页面
    setPageCloneAfter(pageNumber);        // 重新设置页码
    addPageClass(pageNumber);           // 设置页码标蓝
    page.start = (pageNumber - 1) * page.count;
    if (!isSearch) {
        $.ajax({
            type: "POST",                       // 方法类型
            url: "getProcurementItemList",         // url
            async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
            data: JSON.stringify(page),
            dataType: "json",
            contentType: 'application/json;charset=utf-8',
            success: function (result) {
                if (result != undefined) {
                    setProcurementItemList(result.data);
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
            url: "searchIngredientsOut",         // url
            async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
            data: JSON.stringify(data1),
            dataType: "json",
            contentType: 'application/json;charset=utf-8',
            success: function (result) {
                if (result != undefined) {
                    setProcurementItemList(result.data);
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
function inputSwitchPage1() {
    var pageNumber = $("#pageNumber").val();    // 获取输入框的值
    if(pageNumber > totalPage1()){
        pageNumber = totalPage1();
    }
    $("#current").find("a").text("当前页：" + pageNumber);
    if (pageNumber == null || pageNumber == "") {
        window.alert("跳转页数不能为空！")
    } else {
        if (pageNumber == 1) {
            $("#previous").attr("disabled","true");
            $("#firstPage").attr("disabled","true");
            $("#next").removeAttr("disabled");
            $("#endPage").removeAttr("disabled");
        }
        if (pageNumber == totalPage()) {
            $("#next").attr("disabled","true");
            $("#endPage").attr("disabled","true");

            $("#previous").removeAttr("disabled");
            $("#firstPage").removeAttr("disabled");
        }
        if (pageNumber > 1) {
            $("#previous").removeAttr("disabled");
            $("#firstPage").removeAttr("disabled");
        }
        if (pageNumber < totalPage()) {
            $("#next").removeAttr("disabled");
            $("#endPage").removeAttr("disabled");
        }
        currentPage = pageNumber;
        setPageCloneAfter(pageNumber);        // 重新设置页码
        addPageClass(pageNumber);           // 设置页码标蓝
        var page = {};
        page.count = countValue1();//可选
        page.pageNumber = pageNumber;
        page.start = (pageNumber - 1) * page.count;
        if (!isSearch) {
            $.ajax({
                type: "POST",                       // 方法类型
                url: "getProcurementItemList",         // url
                async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
                data: JSON.stringify(page),
                dataType: "json",
                contentType: 'application/json;charset=utf-8',
                success: function (result) {
                    if (result != undefined) {
                        setList(result.data);
                    } else {
                        console.log("fail: " + result);
                    }
                },
                error: function (result) {
                    console.log("error: " + result);
                }
            });
        } else {
            data1['page'] = page;
            $.ajax({
                type: "POST",                       // 方法类型
                url: "searchIngredientsOut",         // url
                async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
                data: JSON.stringify(data1),
                dataType: "json",
                contentType: 'application/json;charset=utf-8',
                success: function (result) {
                    if (result != undefined) {
                        setList(result.data);
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
 * 计算分页总页数
 * @param totalRecord
 * @param count
 * @returns {number}
 */
function loadPages1(totalRecord, count) {
    if (totalRecord == 0) {
        console.log("总记录数为0，请检查！");
        return 0;
    }
    else if (totalRecord % count == 0)
        return totalRecord / count;
    else
        return parseInt(totalRecord / count) + 1;
}

function loadProcurementItemList() {
    $("#view-id").text(getCurrentIngredientsInId());
    $("#creationDate").text(getcurrentDaydate());
    var pageNumber = 1;               // 显示首页
    $("#current").find("a").text("当前页：1");
    $("#previous").attr("disabled","true");
    $("#firstPage").attr("disabled","true");
    $("#next").removeClass("disabled");            // 移除上一次设置的按钮禁用
    $("#endPage").removeClass("disabled");
    if (totalPage1() == 1) {
        $("#next").attr("disabled","true");
        $("#endPage").attr("disabled","true");
    }
    var page = {};
    page.count = countValue1();                                 // 可选
    page.pageNumber = pageNumber;
    page.start = (pageNumber - 1) * page.count;
    $.ajax({
        type: "POST",                       // 方法类型
        url: "getProcurementItemList",          // url
        async: false,                       // 同步：意思是当有返回值以后才会进行后面的js程序
        data: JSON.stringify(page),
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: function (result) {
            if (result != undefined && result.status == "success") {
                setPageClone1(result);
            } else {
                console.log(result.message);
            }
        },
        error: function (result) {
            console.log("error: " + result);
            console.log("失败");
        }
    });
    setSelectedList();
}

/**
 * 为处置设备设置下拉框数据
 */
function setSelectedList() {
    $.ajax({
        type: "POST",                       // 方法类型
        url: "getEquipmentNameList",                  // url
        async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
        dataType: "json",
        success: function (result) {
            if (result != undefined) {
                var data = eval(result);
                // 高级检索下拉框数据填充
                var state = $("select[name='equipment']");
                state.children().remove();
                $.each(data.equipmentList, function (index, item) {
                    var option = $('<option />');
                    option.val(index);
                    option.text(item.name);
                    state.append(option);
                });
                state.get(0).selectedIndex = -1;
            } else {
                console.log("fail: " + result);
            }
        },
        error: function (result) {
            console.log("error: " + result);
        }
    });
}

//设置月度采购申请表数据
function setProcurementItemList(result) {
    console.log("数据为：");
    console.log(result);
    var tr = $("#cloneTr1");
    tr.siblings().remove();
    $.each(result.data, function (index, item) {
        console.log(item);
        // 克隆tr，每次遍历都可以产生新的tr
        if (item.state == null || item.state.name != "待领料") {
            var clonedTr = tr.clone();
            clonedTr.show();
           // 循环遍历cloneTr的每一个td元素，并赋值
            clonedTr.children("td").each(function (inner_index) {
                //1生成领料单号
                var obj = eval(item);
                // 根据索引为部分td赋值
                switch (inner_index) {
                    // 申请单编号
                    case (1):
                        $(this).html(obj.receiptNumber);
                        break;
                    // 物资名称
                    case (2):
                        $(this).html(obj.suppliesName);
                        break;
                    // 规格型号
                    case (3):
                        $(this).html(obj.specifications);
                        break;
                    // 计量单位
                    case (4):
                        if(obj.unit != null)
                        $(this).html(obj.unit.name);
                        break;
                    // 库存量
                    case (5):
                        $(this).html(obj.inventory);
                        break;
                    // 需求数量
                    case (6):
                        $(this).html(obj.demandQuantity);
                        break;
                    // 备注
                    case (7):
                        $(this).html(obj.note);
                        break;
                }
            });
            // 把克隆好的tr追加到原来的tr前面
            clonedTr.insertBefore(tr);
            clonedTr.removeAttr('id');
        }

    });
    // 隐藏无数据的tr
    tr.hide();
}

/**
 * 双击查看采购单
 * @param item
 */
function toShowView1(item) {
    var id = item.firstElementChild.nextElementSibling.innerHTML;
    viewShow(id);
}

function toShowView(item) {
    var id = item.parentElement.parentElement.firstElementChild.nextElementSibling.innerHTML;
    viewShow(id);
}

/**
 * 显示采购单查看模态框
 */
function viewShow(id) {
    $.ajax({
        type: "POST",                       // 方法类型
        url: "getProcurementListById",          // url
        async: false,                       // 同步：意思是当有返回值以后才会进行后面的js程序
        dataType: "json",
        data: {'receiptNumber': id},
        success: function (result) {
            if (result != undefined && result.status == "success") {
                console.log(result);
                setMonthProcurementListModal(result.data[0].materialList);
            }
            else {
                alert(result.message);
            }
        },
        error: function (result) {
            alert("服务器异常!");
        }
    });
    $('#appointModal2').modal('show');
}

/**
 * 设置月度采购申请表数据模态框数据
 * @param result
 */
function setMonthProcurementListModal(result) {
    var tr = $("#cloneTr2");
    tr.siblings().remove();
    $.each(result, function (index, item) {
        //console.log(item);
        // 克隆tr，每次遍历都可以产生新的tr
        var clonedTr = tr.clone();
        clonedTr.show();
        // 循环遍历cloneTr的每一个td元素，并赋值
        clonedTr.children("td").each(function (inner_index) {
            //1生成领料单号
            var obj = eval(item);
            // 根据索引为部分td赋值
            switch (inner_index) {
                // 物资名称
                case (0):
                    $(this).html(obj.suppliesName);
                    break;
                // 规格型号
                case (1):
                    $(this).html(obj.specifications);
                    break;
                // 单位
                case (2):
                    $(this).html(obj.unit);
                    break;
                // 库存量
                case (3):
                    $(this).html(obj.inventory);
                    break;
                // 需求数量
                case (4):
                    $(this).html(obj.demandQuantity);
                    break;
                // 备注
                case (5):
                    $(this).html(obj.note);
                    break;
                // 采购部门负责人
            }
        });
        // 把克隆好的tr追加到原来的tr前面
        clonedTr.removeAttr("id");
        clonedTr.insertBefore(tr);


    });
    // 隐藏无数据的tr
    tr.hide();
    tr.removeAttr('class');
}

/**
 * 获取当前入库单号
 * @returns {string}
 */
function getCurrentIngredientsInId() {
    var id = "";
    $.ajax({
        type: "POST",                       // 方法类型
        url: "getCurrentIngredientsInId",          // url
        async: false,                       // 同步：意思是当有返回值以后才会进行后面的js程序
        dataType: "json",
        success: function (result) {
            if (result != undefined)
                id = result.id;
        },
        error: function (result) {
            console.log("error: " + result);
            console.log("获取当前入库单号失败！");
        }
    });
    return id;
}

var procurementIdArray = [];
var ingredientsIn = {};

/**
 * 添加入库单
 */
function confirmInsert1() {
// 定义预处理单，存储勾选出库单
    console.log("click");
    $(".newLine").remove();
    ingredientsIn = {};
    procurementIdArray = [];
    var ingredientsList = [];
    ingredientsIn.id = getCurrentIngredientsInId();
    var i = 0;  //序号
    // 遍历采购单表格行，获取勾选的计划列表
    $("#ingredientsInData").children().not("#cloneTr1").each(function () {
        var isCheck = $(this).find("input[name='select']").prop('checked');
        if (isCheck) {
            var procurementId1 = $(this).find("td[name='receiptNumber']").text();
            if ($.inArray(procurementId1, procurementIdArray) == -1) {
                procurementIdArray.push(procurementId1);
                //根据Id查找数据并进行赋值
                $.ajax({
                    type: "POST",                       // 方法类型
                    url: "getProcurementListById",          // url
                    async: false,                       // 同步：意思是当有返回值以后才会进行后面的js程序
                    data: {
                        receiptNumber: procurementId1
                    },
                    dataType: "json",
                    success: function (result) {
                        if (result != undefined && result.status == "success") {
                            //遍历存储物品数组
                            $.each(result.data[0].materialList, function (index, data) {
                                i++;
                                //将数据存到数组中，然后统一赋值
                                var ingredients = {};
                                ingredients.serialNumber = i;                    // 序号
                                ingredients.name = data.suppliesName;            // 物品名称
                                ingredients.specification = data.specifications; // 规格
                                ingredients.unit = data.unit;                     // 单位
                                ingredients.amount = data.demandQuantity;         // 入库数量
                                ingredients.remarks = data.note;                  // 备注
                                ingredients.id = ingredientsIn.id;
                                ingredientsList.push(ingredients);
                            });
                        } else {
                            console.log(result.message);
                        }
                    },
                    error: function (result) {
                        console.log("获取数据失败！");
                    }
                });
            }
        }
    });
    //保存采购单编号列表
    ingredientsIn.procurementIdList = procurementIdArray;
    //将数据遍历赋值到入库单中
    var tr = $("#clone3");
    var num = 0;
    $.each(ingredientsList, function (index, item) {
        num++;
        var obj = eval(item);
        var clonedTr = tr.clone();
        //更新id
        clonedTr.children().find("input,span,select").each(function () {
            var id = $(this).prop('id');
            var newId = id.replace(/[0-9]\d*/, num);
            $(this).prop('id', newId);
        });
        clonedTr.show();
        clonedTr.find("td[name='serialNumber']").text(obj.serialNumber);
        clonedTr.find("td[name='name']").text(obj.name);
        clonedTr.find("td[name='specification']").text(obj.specification);
        clonedTr.find("td[name='unit']").text(obj.unit);
        clonedTr.find("span[name='amount']").text(obj.amount);
        clonedTr.find("td[name='remarks']").text(obj.remarks);
        // 把克隆好的tr追加到原来的tr前面
        clonedTr.removeAttr("id");
        clonedTr.insertBefore(tr);
        clonedTr.addClass("newLine");
    });
    tr.hide();
    ingredientsIn.ingredientsList = ingredientsList;
}

/**
 * 单价输入框输入完成后自动计算总金额并显示
 */
function totalCalculate() {
    var ListCount = $("input[name^='unitPrice']").length;
    var allTotalPrice = null;
    for (var i = 1; i < ListCount; i++) {
        var $i = i;
        var amount = $("#amount" + $i).text();
        var unitPrice = $("#unitPrice" + $i).val();
        if (amount != null && unitPrice != null && amount != "" && unitPrice != "") {
            var totalPrice = parseFloat(amount) * parseFloat(unitPrice);
            $("#hundredThousand" + $i).text(Math.floor(totalPrice / 100000));
            $("#tenThousand" + $i).text(Math.floor(totalPrice % 100000 / 10000));
            $("#thousand" + $i).text(Math.floor((totalPrice % 100000) % 10000 / 1000));
            $("#hundred" + $i).text(Math.floor((totalPrice % 100000) % 10000 % 1000 / 100));
            $("#ten" + $i).text(Math.floor((totalPrice % 100000) % 10000 % 1000 % 100 / 10));
            $("#yuan" + $i).text(Math.floor((totalPrice % 100000) % 10000 % 1000 % 100 % 10));
            var jiao1 = totalPrice % 100000 % 10000 % 1000 % 100 % 10 % 1 * 10;
            $("#jiao" + $i).text(Math.floor(jiao1));
            $("#fen" + $i).text(Math.floor(jiao1 % 1 * 10));
            allTotalPrice += totalPrice;
        }
    }
    if (allTotalPrice != null && allTotalPrice != undefined && allTotalPrice != NaN && allTotalPrice != "") {
        $("#total-hundredThousand").text(Math.floor(allTotalPrice / 100000));
        $("#total-tenThousand").text(Math.floor(allTotalPrice % 100000 / 10000));
        $("#total-thousand").text(Math.floor((allTotalPrice % 100000) % 10000 / 1000));
        $("#total-hundred").text(Math.floor((allTotalPrice % 100000) % 10000 % 1000 / 100));
        $("#total-ten").text(Math.floor((allTotalPrice % 100000) % 10000 % 1000 % 100 / 10));
        $("#total-yuan").text(Math.floor((allTotalPrice % 100000) % 10000 % 1000 % 100 % 10));
        var jiao = allTotalPrice % 100000 % 10000 % 1000 % 100 % 10 % 1 * 10;
        $("#total-jiao").text(Math.floor(jiao));
        $("#total-fen").text(Math.floor(jiao % 1 * 10));
    }
}

/**
 * 保存
 */
function save() {
    //获取输入的数据
    var totalPrice = 0;
    var wareHouseState = false;
    var unitPriceState = false;
    for (var i = 0; i < ingredientsIn.ingredientsList.length; i++) {
        var $i = i + 1;
        ingredientsIn.ingredientsList[i].unitPrice = $("#unitPrice" + $i).val();
        ingredientsIn.ingredientsList[i].post = $("#post" + $i).val();
        ingredientsIn.ingredientsList[i].wareHouseName = $("#wareHouseName" + $i).val();
        ingredientsIn.ingredientsList[i].totalPrice = ingredientsIn.ingredientsList[i].unitPrice * ingredientsIn.ingredientsList[i].amount;
        ingredientsIn.ingredientsList[i].equipment = $("#equipment" + $i).val();
        // //单位换算成吨
        // if(ingredientsIn.ingredientsList[i].unit === "千克" || ingredientsIn.ingredientsList[i].unit === "kg" ||ingredientsIn.ingredientsList[i].unit === "KG")
        //     ingredientsIn.ingredientsList[i].amount = ingredientsIn.ingredientsList[i].amount / 1000;
        if ($("#wareHouseName" + $i).val() == null || $("#wareHouseName" + $i).val() == "") wareHouseState = true;
        if ($("#unitPrice" + $i).val() == null || $("#unitPrice" + $i).val() == "") unitPriceState = true;
        totalPrice += ingredientsIn.ingredientsList[i].totalPrice;
    }
    if (unitPriceState) {
        alert("单价不能为空，请完善数据！");
        return;
    }
    if (wareHouseState) {
        alert("仓库不能为空，请完善数据！");
        return;
    }
    ingredientsIn.totalPrice = totalPrice;
    ingredientsIn.companyName = $("#companyName").val();
    ingredientsIn.fileId = $("#fileId").val();
    ingredientsIn.bookkeeper = $("#bookkeeper").val();
    ingredientsIn.approver = $("#approver").val();
    ingredientsIn.keeper = $("#keeper").val();
    ingredientsIn.acceptor = $("#acceptor").val();
    ingredientsIn.handlers = $("#handlers").val();
    for (var j = 0; j < ingredientsIn.ingredientsList.length; j++) {
        var ingredients = ingredientsIn.ingredientsList[j];
        $.ajax({
            type: "POST",
            url: "getItemsAmoutsExist",
            async: false,
            data: JSON.stringify(ingredients),
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            success: function (result) {
                if (result.status == "success") {
                    if (result.data != 0) ingredientsIn.ingredientsList[j].aid = "exist";
                    else ingredientsIn.ingredientsList[j].aid = "notExist";
                } else alert(result.message);
            },
            error: function (result) {
                console.log(result.message);
                alert("服务器错误！");
            }
        });
    }
    console.log(ingredientsIn);
    if (confirm("确认保存？")) {
        //将入库单数据插入到数据库
        $.ajax({
            type: "POST",
            url: "addIngredientsIn",
            async: false,
            data: JSON.stringify(ingredientsIn),
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            success: function (result) {
                if (result.status == "success") {
                    console.log(result.message);
                    if (confirm("入库单添加成功，是否返回主页面？"))
                        window.location.href = "ingredientsIn.html";
                    else window.location.reload();
                } else alert(result.message);
            },
            error: function (result) {
                console.log(result.message);
                alert("入库单添加失败！");
            }
        });
    }
}

/**
 * 回车查询
 */
function enterSearch1(){
    if(event.keyCode === 13){
        search1();
    }
}

/**
 * 延时自动查询
 */
$(document).ready(function () {//页面载入是就会进行加载里面的内容
    var last;
    // 新增页面
    $('#searchContent1').keyup(function (event) { //给Input赋予onkeyup事件
        last = event.timeStamp;//利用event的timeStamp来标记时间，这样每次的keyup事件都会修改last的值，注意last必需为全局变量
        setTimeout(function () {
            if(last-event.timeStamp=== 0){
                search1();
            }else if (event.keyCode === 13) {   // 如果按下键为回车键，即执行搜素
                search1();      //
            }
        },600);
    });
    // 主页
    $('#searchContent').keyup(function (event) { //给Input赋予onkeyup事件
        last = event.timeStamp;//利用event的timeStamp来标记时间，这样每次的keyup事件都会修改last的值，注意last必需为全局变量
        setTimeout(function () {
            if(last-event.timeStamp=== 0){
                searchIngredientIn();
            }else if (event.keyCode === 13) {   // 如果按下键为回车键，即执行搜素
                searchIngredientIn();      //
            }
        },600);
    });
});

/**
 * 新增页面查询功能
 */
function search1() {
    var procurement;
    if ($("#senior1").is(':visible')) {
        procurement = {
            receiptNumber: $.trim($("#search1-receiptNumber").val()),
            applyMouth: $("#search1-applyMouth option:selected").text().replace(/[^0-9]/ig, ""),
            suppliesCategory: $.trim($("#search1-suppliesCategory").val()),
            applyDepartment: $.trim($("#search1-applyDepartment").val())
        };
    } else {
        procurement = {
            keywords: $.trim($("#searchContent1").val())
        };
    }
    if (procurement == null) alert("请输入查询内容!");
    else {
        $.ajax({
            type: "POST",
            url: "searchProcurement",
            async: false,
            data: JSON.stringify(procurement),
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            success: function (result) {
                if (result.status == "success") {
                    setProcurementList(result);
                } else console.log(result.message);
            },
            error: function (result) {
                console.log(result.message);
            }
        });
    }

}