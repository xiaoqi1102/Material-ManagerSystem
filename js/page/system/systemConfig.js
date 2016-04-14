/**
 * Created by yzsoft on 16/3/16.
 */
const dataStore =require('./dataStore.js');
const logger=require('./logger.js');
const  apiHelper =require('./apiHelper.js');
let
    handleToken,
    handleSysConfig,
    handleMediaHost,
    handleApiHost,
    handleRoles,
    handleProductCategory;
    handleProductCategory={
        getAll(){
            "use strict";
            let allProductCategory=dataStore.handleSession.get('productCategoryKV');
            allProductCategory=JSON.parse(allProductCategory);
            return allProductCategory;
        },
        get(key){
            "use strict";
            let result='未知';
            let allProductCategory=handleProductCategory.getAll();
            $.each(allProductCategory,function(index,content){
                    if(key==content.k){
                        result=content.v;
                    }
            });
            return result;
        },
        load(){
            "use strict";
            let url =handleApiHost.get()+'/siteapi/productcategory/getallcategorykvp';
          $.ajax({
              url:url,
              type:'get',
              async:false,
              headers:{
                  token:handleToken.get()
              },
              success(res){
                  console.log(res);
                  dataStore.handleSession.set('productCategoryKV',JSON.stringify(res.data));
              },
              error(res){

              }
          })
        }
    };
    handleToken = {
        set: function (value) {
            dataStore.handleSession.set('token', value);
        },
        get: function () {
            var result;
            result = dataStore.handleSession.get('token');
            return result;
        }
    };
    handleRoles={
        get:function(){
            var result;
            result=dataStore.handleSession.get('roles');
            return result;
        }
    };
    handleMediaHost={
		//mediaHost :'http://192.168.1.142:1402',
        mediaHost :'http://192.168.1.109:1402',
        //获取mediaHost
        get:function(){
            return handleMediaHost.mediaHost
        }
    };

    handleApiHost={
		apiHostUrl : 'http://192.168.1.122:1402',
        //apiHostUrl : 'http://192.168.1.131:1402',
        //获取apiHost
        get:function(){
            var result=null;
            result=handleApiHost.apiHostUrl;
            return result;
        }
    };
    handleSysConfig = {
        //获取系统配置
        set: function (value) {
            dataStore.handleLocalStorage.set('sysConfig', value);
        },
        //缓存系统配置
        get: function (configName) {
            var result;
            //console.log(configName);
            result = dataStore.handleLocalStorage.get('sysConfig')[configName];
            return result;
        },
        //从服务器端加载系统配置的值
        load:function(){
            //调用接口，获取系统配置
            $.ajax({
                url: handleApiHost.get() + "/siteapi/sys/config",
                async: false,
                headers: {
                    token: handleToken.get()
                },
                success: function (res) {
                    console.log(res);
                    handleSysConfig.set(res.data);
                    //ep.emit('loadSysConfig', res);

                    //setSysConfig(res);
                },
                error: function (err, req) {
                    logger.error(err);
                }
            });
        }
    };

module.exports={handleApiHost,handleMediaHost,handleRoles,handleSysConfig,handleToken,handleProductCategory};