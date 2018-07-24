/**
 * Created by matt on 2018/7/20.
 */
/**
 * 更新版本号
 * @param versionId
 * @returns {*}
 */
function updateVersion(versionId) {
    if (versionId == "") return "V1.0";
    var id = versionId.split(/[vV]/)[1];
    var num = parseFloat(id);
    console.log(num);
    num = (num + 0.1).toFixed(1);
    console.log(num);
    if (isNaN(num)) return "V1.0";
    return "V"+num;
}
/**
 * 显示日志
 */
function showLog() {
    $.ajax({
        type: "POST",                            // 方法类型
        url: "getLog",                           // url
        async : false,                           // 同步：意思是当有返回值以后才会进行后面的js程序
        dataType: "json",
        success: function (result) {
            console.log(result);
            if (result != undefined) {
                var data = eval(result);
                if (data.status == "success") {
                    setDataList(result);
                    $('#logModal').modal('show');
                } else {
                    alert(data.message);
                }
            }
        },
        error:function (result) {
        }
    });
    function setDataList(result) {
        // 获取id为cloneTr的tr元素
        var id = 1;
        var tr = $("#clonedTr2");
        tr.siblings().remove();
        $.each(result.data, function (index, item) {
            // 克隆tr，每次遍历都可以产生新的tr
            var clonedTr = tr.clone();
            clonedTr.show();
            // 循环遍历cloneTr的每一个td元素，并赋值
            clonedTr.children("td").each(function (inner_index) {
                var obj = eval(item);
                // 根据索引为部分td赋值
                switch (inner_index) {
                    case (0):
                        $(this).html(id++);
                        break;
                    // 样品预约号
                    case (1):
                        $(this).html(obj.username);
                        break;
                    //样品状态
                    case (2):
                        $(this).html(obj.ip);
                        break;
                    // 公司名称
                    case (3):
                        $(this).html(getTimeStr(obj.time));
                        break;
                }
            });
            // 把克隆好的tr追加到原来的tr前面
            clonedTr.removeAttr("id");
            clonedTr.insertBefore(tr);
        });
        tr.hide();
    }
}