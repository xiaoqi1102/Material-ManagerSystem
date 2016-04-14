/**
 * Created by yzsoft on 16/3/16.
 */
require('bootstrap');

let
    show,
    close;
    //显示 消息的 弹出层
    show=function(title, content, okCallBack, cancelCallBack) {
        $("#msgTitle").html(title||'温馨提示');

        $("#messageContent").html(content);

        if (okCallBack) {
            $("#msgOkBtn").show();
            $("#msgOkBtn").click(function () { okCallBack(); });
        }
        else {
            $("#msgOkBtn").unbind();
            $("#msgOkBtn").hide();
        }

        if (cancelCallBack) {
            $("#msgCancelBtn").show();
            $("#msgCancelBtn").click(function () { cancelCallBack(); });
        } else {
            $("#msgCancelBtn").unbind();
            $("#msgCancelBtn").hide();
        }

        $("#messageModal").modal("show");
    };

    //默认的关闭 消息 弹出层的方法
    close =function(time) {
        var t=time||500;
        setTimeout(function(){
            $("#messageModal").modal("hide");
        },t);
        //var t = 500;
        //if (time) {
        //    t = time;
        //}
        //setTimeout(function () {
        //    $("#messageModal").modal("hide");
        //}, t);
    };

module.exports={show,close};
