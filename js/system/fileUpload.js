/**
 * Created by yzsoft on 16/3/18.
 */
const pageHelper=require('./pageHelper.js');
const pubSub=require('pubsub-js');
const $=require('jquery');
const systemConfig=require('./systemConfig.js');
const messageModal=require('./messageModal.js');
const apiHelper=require('./apiHelper.js');
let loadView,
    showModal,
    getFileExt;
    loadView=function() {
       // debugger;
        //把文件上传的 Modal 的html加载到页面中
        if ($("#fileUploadModal").length == 0) {
            pageHelper.appendHtml("fileUpload",null, function() {
                $("#fileToUpload").bind("change", function (e) {
                    //每当 选择了文件，发布一个事件，以便改变页面上的 显示信息
                    pubSub.publish("fileToUploadChanged", e.target);
                });
            });
        }

        $("#uploadFileTitle").val("");
        console.log("fileUploadModal 已经加载到 页面 中");
    };
    //显示文件上传的modal，必须传入上传成功后的 回调
    showModal = function (newOption) {
        var option = {
            //onSelected: function () { },
            fileType: [],
            url: "",
            afterSelect: function () {
            },
            onSuccess: function () {
            },
            onError: function () {
            }
        };

        var theOption = $.extend(option, newOption);
        if (theOption.url.length == 0) {
            messageModal.show("错误", "必须指定接收文件的Url", null, messageModal.close);
            return;
        }
        //订阅 事件 。用于改变 选中的文件名
        pubSub.subscribe("fileToUploadChanged", function (msg, fileObj) {
            var tmp = fileObj.files;
            if (tmp.length > 0) {
                var val = tmp[0].name;
                theOption.afterSelect(val);
            }
        });

        $("#fileUploadModal").modal("show");

        $("#uploadBtn").unbind('click').bind('click',function () {

            var fileColl = document.getElementById("fileToUpload").files;
            if (fileColl.length == 0) {
                messageModal.show("错误", "必须选择一个文件", null, messageModal.close);
                return;
            }
            var formData = new FormData();
            var file = fileColl[0];
            //如果指定了 文件类型， 那么就要检查选择的文件是否符合指定的扩展名。必须要有扩展名才行。
            if (theOption.fileType.length > 0) {
                var ft = getFileExt(file.name);
                if (ft.length == 0) {//未获取到扩展名的情况。
                    messageModal.show("错误", "未获取到文件扩展名。<br />文件类型必须是：" + theOption.fileType.join(" , "), null, messageModal.close);
                    return;
                }
                if ($.inArray(ft, theOption.fileType) == -1) {
                    messageModal.show("错误", "文件类型必须是：" + theOption.fileType.join(" , "), null, messageModal.close);
                    return;
                }
            }

            var title = $("#uploadFileTitle").val();
            var token = systemConfig.handleToken.get();
            formData.append('title', title);
            formData.append('file', file);
            formData.append('token', token);
            var url = theOption.url || apiHelper.getApiUrl("上传文件");
            var xhr = new XMLHttpRequest();
            xhr.open('post', url, true);
            //必须在 open 之后，设置 token 的 httpHead

            xhr.setRequestHeader('token', token);
            xhr.onreadystatechange = function () {
                if (xhr.readyState == 4) {
                    switch (xhr.status) {
                        case 200:
                            var res = xhr.responseText;
                            res = JSON.parse(res);
                            console.log(res);
                            if (!res.isError) {
                                // this.log(res);
                                theOption.onSuccess(res);
                                setTimeout(function () {
                                    $('#fileUploadModal').modal('hide');
                                }, 500);
                            } else {
                                messageModal.show("错误", res.errorDesc, null, messageModal.close);
                            }
                            break;
                        case 403:
                            messageModal.show("错误", "当前登录票据已经过期，请刷新页面后重新登录", null, messageModal.close);
                            break;
                    }
                }
            };
            xhr.send(formData);
        });
    };
    //获取文件的扩展名
     getFileExt=function(fileName) {
         var idx = fileName.lastIndexOf(".") + 1;
         if (idx == -1) {
             return "";
         }
         return fileName.substr(idx, fileName.length - idx);
     };
module.exports={loadView, showModal};