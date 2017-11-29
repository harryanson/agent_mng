/*
 * 所有工具方法
 * */
var commonObj = {};
var currentUser={};
var mng_uri=location.protocol+'//'+location.hostname;
var gridOptions={
  exporterMenuCsv: false,
  enableGridMenu: true,
  enableHighlighting : false,
  useExternalPagination: true,
  useExternalSorting: true,
  paginationPageSizes: [25, 50, 75],
  paginationPageSize: 25
};
var storage_url='https://api.cdyzrs.com/storage/upload';
var user_orders =null;

if(location.hostname=='localhost'){
    mng_uri='http://127.0.0.1';
}
if((location.port!=80&&location.port!='')&&mng_uri.indexOf(':3200')==-1){
    mng_uri+=':3200';
}
console.log(mng_uri);
//初始化操作按钮
function initOperates(id,text,callback){
    //if(userLimits && userLimits.length > 0 && userLimits.indexOf(id) != -1 && $('#oper'+id).length == 0){
        var css = "";
        if(text.match(/(添加)/)){
            css = "glyphicon glyphicon-plus";
        }else if(text.match(/(修改)/)){
            css = "glyphicon glyphicon-pencil";
        }else if(text.match(/(删除)/)){
            css = "glyphicon glyphicon-minus";
        }else if(text.match(/(确认)/)){
            css = "glyphicon glyphicon-ok";
        }else if(text.match(/(拒绝)/)){
            css = "glyphicon glyphicon-ban-circle";
        }else if(text.match(/(未)/)){
            css = "glyphicon glyphicon-ban-circle";
        }else{
            css = "";
        }
        $("#mytool").append('<button id="oper'+id+'" type="button" class="btn btn-default btn-sm" style="margin:0 10px"><span class="'+css+'"></span>'+text+'</button>');
        if(!!callback){$('#oper'+id).click(function(){callback(this);});}
    //}
}
function addEditOper(type){
    if(type==1){$("#myModalLabel").html("添加");}else{$("#myModalLabel").html("修改");}
    $("#tableContent").hide();
    $("#addEditForm").parent().show();
    $.each($("#addEditContent").children(".input-group"),function(i,dom){$(dom).removeClass("has-error");})
    $.each($("#addEditContent").children(".has-error"),function(i,dom){$(dom).children(".help-block").html("");})
}
/**
 * 页面上部淡出消息
 * msg 淡出消息 string
 */
function showNotice(msg) {
    if (msg!=null||msg!=undefined) {
        if(typeof msg=='number'){
            msg=errcode[msg]['message'];
        }else if(typeof msg=='object'&&msg.code>=0){
          msg=errcode[msg.code]['message'];
        }
        qiao.bs.msg({msg: msg, type: 'danger', time: 10000});
    }
}

//弹出提醒
function showMsg(title,msg){
    if(!!title || !!msg){
        if(!msg){ msg = title;title = "提示"; }
        qiao.bs.alert({"title":title,"msg":msg,backdrop:true,"okbtn":"知道了"});
        setTimeout(function(){if($("#bsmodal").length > 0){$("#bsmodal").find("button").click();}},2000);
    }
}
//弹出提醒-确认
function showConfirm(title,msg,ok){
    if(typeof msg == "function"){ ok = msg;msg = ""; }
    if(!!title || !!msg){
        if(!msg){ msg = title;title = "确认操作"; }
        qiao.bs.confirm({"title":title,"msg":msg,backdrop:true},function(){
            if(!!ok){ok();}//点击“确认”后调用方法
        });
    }
}
/**
 * 弹出可输入对话框
 * title 标题 string
 * callFun 点击确认后回调方法
 */
function showDialog(title,callFun){
    if(typeof title === "function"){
        callFun = title;
        title = "请输入：";
    }
    $('#modalBootstrap .modal-title').html(title);
    //弹出前清空输入框
    $('#modalBootstrap .text-center input').val('');
    $('#modalBootstrap').modal({
        keyboard: true
    });
    //防止事件重复绑定，先清除掉按钮所绑定的事件
    $('#modalBootstrap .modal-footer button').unbind();
    //确认
    $('#modalBootstrap .modal-footer .btn-primary').click(function(){
        callFun();
    });
}

/**
 * get方式获取?后的参数
 * @param name 参数名
 * @returns {*}
 */
function getUrlParam(name) {
    var hash = location.hash; //获取url中"?"符后的字串
    var theRequest = {};
    if (hash.indexOf("?") != -1) {
        var str = hash.substr(hash.indexOf("?")+1,hash.length);
        var strs = str.split("&");
        for(var i = 0; i < strs.length; i ++) {
            theRequest[strs[i].split("=")[0]]=unescape(strs[i].split("=")[1]);
        }
    }
    return theRequest[name];
}
//改变url中的参数值
function setUrlParam(uri, key, value)
{
    var re = new RegExp("([?&])" + key + "=.*?(&|$)", "i");
    var separator = uri.indexOf('?') !== -1 ? "&" : "?";
    if (uri.match(re)) {
        return uri.replace(re, '$1' + key + "=" + value + '$2');
    }
    else {
        return uri + separator + key + "=" + value;
    }
}
/**
 * 数组转object，如果没有key就用编号做key
 * @returns {{}}
 */
Array.prototype.toObject = function() {
    var obj={},key,id;
    if(arguments.length==1){
        id=arguments[0];
    }
    for (var i = 0,len = this.length;i<len;i++){
        if(typeof this[i] != "function") {
            if(!id){
                key=i;
            }else{
                key=this[i][id];
            }
            obj[key]=this[i];
            obj[key].index=i;
        }
    }
    return obj;
}