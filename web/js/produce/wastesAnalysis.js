/**
 * 危废入场分析日报
 * */
function reset() {
    $("#senior").find("input").val("");
    $("#searchContent").val("");
}
var currentPage = 1;                          //当前页数
var isSearch = false;
var data1;
/**
 * 计算总页数
 * */
function totalPage() {
    var totalRecord = 0;
    if (!isSearch) {
        $.ajax({
            type: "POST",                       // 方法类型
            url: "totalWasteIntoRecord",                  // url
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
            url: "searchSewageTotal",                  // url
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
    setWasteIntoList(result);
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
        });
        clonedLi.addClass("beforeClone");
        clonedLi.removeAttr("id");
        clonedLi.insertAfter(li);
    }

}
/**
 * 返回count值
 * */
function countValue() {
    var mySelect = document.getElementById("count");
    var index = mySelect.selectedIndex;
    return mySelect.options[index].text;
}
/**
 * 点击页数跳转页面
 * @param pageNumber 跳转页数
 * */
function switchPage(pageNumber) {
    console.log("当前页：" + pageNumber);
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
    //addClass("active");
    page.start = (pageNumber - 1) * page.count;
    if (!isSearch) {
        $.ajax({
            type: "POST",                       // 方法类型
            url: "getWasteIntoList",                  // url
            data:JSON.stringify(page),
            async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
            dataType: "json",
            contentType: 'application/json;charset=utf-8',
            success:function (result) {
                if (result != undefined && result.status == "success"){
                    console.log(result);
                    setWasteIntoList(result);
                }
                else {
                    alert(result.message);

                }
            },
            error:function (result) {
                alert("服务器异常！")
            }
        });
    } else {
        data['page'] = page;
        $.ajax({
            type: "POST",                       // 方法类型
            url: "searchSewage",         // url
            async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
            data: JSON.stringify(data1),
            dataType: "json",
            contentType: 'application/json;charset=utf-8',
            success: function (result) {
                if (result != undefined) {
                    // console.log(result);
                    setSewageList(result.data);
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
function inputSwitchPage()  {
    var pageNumber = $("#pageNumber").val();    // 获取输入框的值
    $("#current").find("a").text("当前页：" + pageNumber);
    if (pageNumber == null || pageNumber == undefined) {
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
        var page = {};
        page.count = countValue();//可选
        page.pageNumber = pageNumber;
        page.start = (pageNumber - 1) * page.count;
        if (!isSearch) {
            $.ajax({
                type: "POST",                       // 方法类型
                url: "getWasteIntoList",         // url
                async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
                data: JSON.stringify(page),
                dataType: "json",
                contentType: 'application/json;charset=utf-8',
                success: function (result) {
                    if (result != undefined) {
                        console.log(result);
                        setWasteIntoList(result.data);
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
                url: "searchSewage",         // url
                async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
                data: JSON.stringify(data1),
                dataType: "json",
                contentType: 'application/json;charset=utf-8',
                success: function (result) {
                    if (result != undefined) {
                        // console.log(result);
                        setSewageList(result.data);
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
function loadPages(totalRecord, count) {
    if (totalRecord == 0) {
        window.alert("总记录数为0，请检查！");
        return 0;
    }
    else if (totalRecord % count == 0)
        return totalRecord / count;
    else
        return parseInt(totalRecord / count) + 1;
}
//加载危废入场分析日报数据列表
function loadWasteIntoList() {
    $("#current").find("a").text("当前页：1");
    $("#previous").addClass("disabled");
    $("#firstPage").addClass("disabled");
    if (totalPage() == 1) {
        $("#next").addClass("disabled");
        $("#endPage").addClass("disabled");
    }
    var page = {};
    var pageNumber = 1;                       // 显示首页
    page.count = countValue();                                 // 可选
    page.pageNumber = pageNumber;
    page.start = (pageNumber - 1) * page.count;
    $.ajax({
        type: "POST",                       // 方法类型
        url: "getWasteIntoList",                  // url
        data:JSON.stringify(page),
        async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
        dataType: "json",
        contentType: 'application/json;charset=utf-8',
        success:function (result) {
            if (result != undefined && result.status == "success"){
                console.log(result);
                setPageClone(result);
                //setWasteIntoList(result);
            }
            else {
                alert(result.message);

            }
        },
        error:function (result) {
             alert("服务器异常！")
        }
    });
}
//设置危废入场分析日报数据
function setWasteIntoList(result) {
    var tr = $("#cloneTr");
    tr.siblings().remove();
    $.each(result.data,function (index,item) {
        var clonedTr = tr.clone();
        clonedTr.show();
        clonedTr.children("td").each(function (inner_index) {
            var obj = eval(item);
            switch (inner_index) {
                // 序号
                case (0):
                    $(this).html(index+1);
                    break;
                // 收样日期
                case (1):
                    if(obj.laboratoryTest!=null){
                        $(this).html(getDateStr(obj.laboratoryTest.samplingDate));
                    }
                    break;
                // 联单号码
                case (2):
                    $(this).html(obj.transferDraftId);
                    break;
                // 产废单位
                case (3):
                    if(obj.client!=null){
                        $(this).html(obj.client.companyName);
                    }

                    break;
                // 废物名称
                case (4):
                    if(obj.laboratoryTest!=null){
                        $(this).html(obj.laboratoryTest.wastesName);

                    }
                    break;
                // 废物类别
                case (5):
                        $(this).html(obj.wastesCategory);
                    break;
                // 废物形态
                case (6):
                    if(obj.handleCategory!=null){
                        $(this).html(obj.handleCategory.name);
                    }
                    break;
                    //PH
                case (7):
                    if(obj.laboratoryTest!=null){
                        $(this).html(obj.laboratoryTest.phAverage);
                    }

                    break;
                    //热值
                case (8):
                    if(obj.laboratoryTest!=null){
                        $(this).html(obj.laboratoryTest.heatAverage);
                    }
                    break;
                    //水分
                case (9):
                    if(obj.laboratoryTest!=null){
                        $(this).html(obj.laboratoryTest.waterContentAverage);
                    }
                    break;
                    //灰分
                case (10):
                    if(obj.laboratoryTest!=null) {
                        $(this).html(obj.laboratoryTest.ashAverage);
                    }
                    break;
                    //氟含量

                case (11):
                    if(obj.laboratoryTest!=null) {
                        $(this).html(obj.laboratoryTest.fluorineContentAverage);
                    }
                    break;
                    //氯含量
                case (12):
                    if(obj.laboratoryTest!=null) {
                        $(this).html(obj.laboratoryTest.chlorineContentAverage);
                    }
                    break;
                    //硫含量
                case (13):
                    if(obj.laboratoryTest!=null) {
                        $(this).html(obj.laboratoryTest.sulfurContentAverage);
                    }
                    break;
                    //磷含量
                case (14):
                    if(obj.laboratoryTest!=null) {
                        $(this).html(obj.laboratoryTest.phosphorusContentAverage);
                    }
                    break;
                    //闪点
                case (15):
                    if(obj.laboratoryTest!=null) {
                        $(this).html(obj.laboratoryTest.flashPointAverage);
                    }
                    break;
                    //粘度
                case (16):
                    if(obj.laboratoryTest!=null) {
                        $(this).html(obj.laboratoryTest.viscosityAverage);
                    }
                    break;
                    //熔融温度
                case (17):
                    if(obj.laboratoryTest!=null) {
                        $(this).html(obj.laboratoryTest.meltingPointAverage);
                    }
                    break;
                    //备注
                case (18):
                    $(this).html(obj.remarks);
                    break;
            }
        })
        // 把克隆好的tr追加到原来的tr前面
        clonedTr.removeAttr("id");
        clonedTr.insertBefore(tr);
    });
    tr.hide();
}
array=[];//存放所有的tr
array1=[];//存放目标的tr
//危废入场的高级查询
function searchWasteInto() {

    $('.myclass').each(function () {
        $(this).show();
    });
    array.length=0;//清空数组
    array1.length=0;//清空数组
    //1分页模糊查询
    for(var i=1;i<=totalPage();i++){
        switchPage(parseInt(i))
        array.push($('.myclass'));
    }
    //1产废单位
    var companyName=$('#search-receiveDate').val();
    //2收样日期
    var date=$('#search-sewageName').val();
    //3联单号码
    var number=$('#search-remarks').val();

    for(var j=0;j<array.length;j++){
        $.each(array[j],function () {
            //console.log(this);
            if(!($(this).children('td').eq(3).text().indexOf(companyName)!=-1&&$(this).children('td').eq(1).text().indexOf(date)!=-1
                &&$(this).children('td').eq(2).text().indexOf(number)!=-1
            )){
                $(this).hide();
            }
            if(($(this).children('td').eq(4).text().indexOf(companyName)!=-1&&$(this).children('td').eq(1).text().indexOf(date)!=-1
                &&$(this).children('td').eq(2).text().indexOf(number)!=-1)){
                array1.push($(this));
            }
        });
    }

    for(var i=0;i<array1.length;i++){
        $.each(array1[i],function () {
            $('#tbody1').append(this) ;
        });
    }

    if(companyName.length<=0&&date.length<=0&&number.length<0){
        switchPage(1);
        $('.myclass').each(function () {
            $(this).show();
        })
    }


}