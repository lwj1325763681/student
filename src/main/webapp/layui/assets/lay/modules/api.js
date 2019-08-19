/**
 * api接口列表
 * Created by gameloft9 on 2018/7/19.
 */
layui.define(['$tool','jquery'], function (exports) {

    var $tool = layui.$tool,
        $ = layui.jquery;// 拿到模块变量

    /**
     * 封装一个post
     * */
    function doPost(url,req,successCallback,errorCallback) {
        $.ajax({
            url:url,
            data:req,
            method:"post",
            success:function (data) {
                successCallback(data);
            },
            error:function (error) {
                errorCallback(error);
            }
        });
    }

    /**
     * 封装一个get
     * */
    function doGet(url,req,successCallback,errorCallback) {
        $.ajax({
            url:url,
            data:req,
            method:"get",
            success:function (data) {
                successCallback(data);
            },
            error:function (error) {
                errorCallback(error);
            }
        });
    }

    /**
     * 封装一个支持更多参数的post
     * */
    function doComplexPost(url,req,config,successCallback,errorCallback) {
        var defaultConfig = {
            url:url,
            data:req,
            method:"post",
            success:function (data) {
                successCallback(data);
            },
            error:function (error) {
                errorCallback(error);
            }
        };
        var ajaxConfig = $.extend({},config,defaultConfig); // 合并参数

        $.ajax(ajaxConfig);
    }

    // API列表,工程庞大臃肿后可以将API拆分到单独的模块中
    var API = {
        Login: function(req,successCallback,errorCallback){ // 登录
            doPost($tool.getContext() + "login",req,successCallback,errorCallback);
        },
        LogOut:function(req,successCallback,errorCallback){ // 登出
            doPost($tool.getContext() + 'logout.do',req,successCallback,errorCallback);
        },
        ChangePwd:function(req,successCallback,errorCallback){ // 更改密码
            doPost($tool.getContext() + 'personCenter/changePwd.do',req,successCallback,errorCallback);
        },
        DeleteStudent:function(req,successCallback,errorCallback){
            doPost($tool.getContext() + 'student/delete.do',req,successCallback,errorCallback);
        },
        addStudent:function(req,config,successCallback,errorCallback){
            doComplexPost($tool.getContext()+'student/add.do',req,config,successCallback,errorCallback);
        },
        findByIdStudent:function(req,successCallback,errorCallback){
            doPost($tool.getContext()+'student/findById.do',req,successCallback,errorCallback);
        },
        editStudent:function(req,config,successCallback,errorCallback){
            doComplexPost($tool.getContext()+'student/update.do',req,config,successCallback,errorCallback);
        },
        findByLike:function(req,successCallback,errorCallback){
            doPost($tool.getContext()+'student/findAll.do',req,successCallback,errorCallback);
        },
    };




    //输出扩展模块
    exports('$api', API);
});


