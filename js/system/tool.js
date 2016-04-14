/**
 * Created by yzsoft on 16/3/17.
 */
const moment=require('moment');
const apiHelper = require('./apiHelper.js');
const messageModal = require('./messageModal.js');
let createTool;
let Tool=function(){

};
createTool=function(){
    var tool;
    tool=new Tool();
    return tool;
};
Tool.prototype={
    openModel:function(id,callback){
        $("#"+id).modal('show');
        this.formClear(id);
        if(callback){
            callback();
        }
    },
    hideModel:function(id){
        $("#"+id).modal('hide');
    },
    formClear:function(id){
        $('#'+id).find('textarea,input,select').val('');
    },
    getMoment:function(date,format){
        if (!date) {
            //return '';
            date=new Date();
        }
        var result;
        result=moment(date).format(format);
        return result;
    },
    getYMD:function(date){
        if(!date){
            return '';
        }
        var result;
        result=moment(date).format('YYYY-MM-DD');
        return result;
    },
    getTodayYMD:function(){
        var d=new Date();
        var result=this.getYMD(d);
        return result;
    },
    getDateValue:function(id){
        //获取页面的input(date) 的值  如果值为空  则返回默认的日期
        var defaultDate=sysConfig.getSysConfig('defaultDateTime');
        var value=$('#'+id).val();
        if(value==''){
            return defaultDate
        }
        return value;
    },
    setHash:function(value){
        window.location.hash=value;
    },
    objToArray:function(obj){
        var result=[];
        $.each(obj,function(index,content){
            result.push(content);
        });
        return result;
    },
    getKeyValue(key,sourse){
        "use strict";
        let result='未知';
        $.each(sourse,function(index,content){
            if(key==content.k){
                result=content.v;
                //找到立即跳出循环
                return false;
            }
        });
        return result;
    },
    checkPhone(func,obj){
        let phone=obj.mobile;
        let reg=/^1[3|4|5|7|8]\d{9}$/;
        let result=reg.test(phone);
        if(!result){
            messageModal.show('错误提示', '手机号码格式有误！', null, function () {});
            return false;
        }
        apiHelper.callApi("检查手机号是否已存在",obj,function (res) {
            func();
        },function (error) {});
    }
};
module.exports={createTool};