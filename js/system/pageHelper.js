/**
 * Created by yzsoft on 16/3/16.
 */
const dataStore=require('./dataStore.js');
const logger=require('./logger.js');
let
    load,
    getPageDefine,
    getAllPage,
    getPageUrl,
    htmlDir,
    isHtmlUseCache,
    appendHtml;

    htmlDir = "html/";    //页面的存放目录
    isHtmlUseCache = false;
    //调用接口获取页面的定义
    load=function(){
        $.ajax({
            url: "permissionDefine.json",    //todo: 在模板 中，使用静态文件
            async: false,
            success: function (res) {
                dataStore.handleMemory.set("pageDefine", res);
            },
            error: function (err, req) {
                logger.error(err);
            }
        });
    };

    //获取页面的定义
     getPageDefine=function() {
        var pageDefine;
        pageDefine=dataStore.handleMemory.get("pageDefine");
        return pageDefine;
    };

    //获取页面定义中页面信息
    getAllPage=function() {
        var define = getPageDefine();
        return define.pages;
    };

    //根据 key 获取页面的 url
     getPageUrl = function (key) {
        var allDefine = getAllPage();
        var p;
        for (var i = 0; i < allDefine.length; i++) {
            p = allDefine[i];
            if (p.key == key)
                return htmlDir + p.url;
        }
        return null;
    };
    //把key指定的页面，append到指定的容器中。 不指定容器Id，默认append到 #content 的div中
     appendHtml=function(key, container, callback) {
        var pageUrl = getPageUrl(key);
        //logger.log("key:", key, "pageUrl:", pageUrl);
        if (pageUrl == undefined) {
            logger.error("未获取到页面的Url.key:" + key);
            return;
        }
        $.ajax({
            url: pageUrl,
            //cache: isHtmlUseCache,

            success: function (html) {
                var containerId = container == undefined ? "content" : container;
                $("#" + containerId).append(html);
                if (callback)
                    callback(html);
            }
        });
    };
module.exports={load,getPageDefine,getPageUrl,appendHtml};