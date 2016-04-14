/**
 * Created by yzsoft on 16/3/16.
 */
const systemConfig = require('./systemConfig.js');
const dataStore = require('./dataStore.js');
const logger=require('./logger.js');
const messageModal=require('./messageModal.js');
let
    apiHostUrl = systemConfig.handleApiHost.get(),
    getAllApiDefine,
    getApi,
    getApiUrl,
    callApi,
    loadApi;
    //调用接口，获取接口的定义
    loadApi=function(){
        $.ajax({
            url: apiHostUrl + "/siteapi/api",
            async: false,
            headers: {token: ''},
            success: function (res) {
                dataStore.handleMemory.set("apiDefine", res);
            },
            error: function (err, req) {
                //logger.log(err);
            }
        });
    };


    //获取所有的接口定义
    getAllApiDefine = function () {
        var apiDefine;
        apiDefine = dataStore.handleMemory.get("apiDefine");
        //console.log(apiDefine);
        return apiDefine;
    };


    //根据 key 获取一个api定义
     getApi=function(key) {
        var apiDefine;
        apiDefine = getAllApiDefine();
        var item;
        for (var i = 0; i < apiDefine.length; i++) {
            item = apiDefine[i];
            if (item.key == key) {
                return item;
            }
        }
        logger.error("Key：【" + key + "】 对应的功能点不存在。");
        return false;
    };

    //根据 key 获取 api 对应的 url
     getApiUrl=function(key) {
        var obj = getApi(key);
        var url = systemConfig.handleApiHost.get() + obj.url;
        return url;
    };

    //封装的 api 请求方法。其中，会对进行全局的 错误处理
    callApi=function(key, data, succ, err) {
        var api = getApi(key);
        //   log(api);
        if (!api) {
            logger.error(" api 未调用");
            return;
        }
        var token = systemConfig.handleToken.get();
        $.ajax({
            url: getApiUrl(key),
            type: api.method,
            data: data,
            beforeSend: function (xhr) {
                xhr.setRequestHeader("token", token);
            },
            success: function (res) {
                //debugger;
                if (res.isError) {
                    logger.error(res.errorDesc);
                    messageModal.show("错误", res.errorDesc, null, function () { });
                    if (err) {
                        err(res);
                    }
                } else {
                    succ(res);
                }
            },
            error: function (req, status, errinfo) {
                logger.error(req);
                logger.log(req.status);

                if (err) {
                    console.log(req);
                    err();
                }
                //debugger;
                if (req.status == '403') {
                    messageModal.show("登陆超时", "登陆票据已经超时，点击确定重新登陆.", function () {
                        //debugger;
                        //todo 暂时注释sessionData的调用
                        //sessionData.removeSessionData();
                        dataStore.handleSession.remove('isLogined');
                        window.location.href = "../../index.html";
                    }, messageModal.close);
                } else {
                    //if(status.indexOf("5") == 0)
                    logger.error("接口程序错误。", errinfo);
                    messageModal.show("接口程序错误", "技术信息：" + errinfo, null, function () { });
                }
            }
        });
    };

module.exports={callApi,loadApi,getApiUrl,getAllApiDefine};