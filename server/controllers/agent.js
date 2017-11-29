const logger = require(ROOT_DIR + "/lib/logger")("agent", __filename),
  fs = require("fs"),
  config = require(ROOT_DIR + "/config"),
  util = require(ROOT_DIR + "/lib/util"),
  redisTe = require(ROOT_DIR + "/db/redisTe"),
  accessToken = require(ROOT_DIR + "/lib/accessToken"),
  dbcall = require(ROOT_DIR + "/db/pgsql").dbcall,
  treeSource = require(ROOT_DIR + "/config/treeSource"),
  noTokenLimit = ["/agent/login", "/agent/binding"],
whiteLimit = ["/agent/logout", "/agent/agent/editpwd"];
let uid_obj={};
module.exports = class Agent {
  static setUid(uuid,domain,loginname){
    uid_obj[uuid]={domain:domain,loginname:loginname};
  }
  static uidExist(uuid){
    console.log(uid_obj)
    let ret=false,val=uid_obj[uuid];
    if(val){
      ret=true;
    }
    return ret;
  }
  static getUid(uuid){
    let ret=uid_obj[uuid];
    delete uid_obj[uuid];
    return ret;
  }
  /**
   * 校验系统用户
   * @param ctx
   * @param next
   * @returns {Promise.<*|{type, alias, describe}|{encode, decode, is, equals, pattern}>}
   */
  static async checkUser(ctx, next) {
    if (noTokenLimit.join().indexOf(ctx.path) == -1) {
      let ret, params = util.wrapParams(ctx);
      if (!params.accessToken) {
        ret = {code: errs.bad_request};//缺少accessToken
      }
      let data = await accessToken.exists({
        appid: config.appid,
        uip: params.uip,
        accessToken: params.accessToken
      });
      if (data.code != 0) {
        await util.respone(ctx, data);
      } else {
        params.agentno = data.userno;
      }
      if (whiteLimit.join().indexOf(params.path) == -1) {
        let bool = await Agent.checkLimit(params);
        if (bool) {
          return next();
        } else {
          await util.respone(ctx, {code: errs.unauthorized});
        }
      } else {
        return next();
      }
    } else {
      return next();
    }
  }

  /**
   * 后台登录
   * @param ctx
   * @returns {Promise.<void>}
   */
  static async login(ctx) {
    let params = util.wrapParams(ctx);
    if(params.uuid){//轮寻检查是否登录
      if(!Agent.uidExist(params.uuid)){
        return await util.respone(ctx, {code:errs.uuid_not_found});
      }else{
        params=Object.assign(params,Agent.getUid(params.uuid));
        console.log('======weixin login===========',params)
      }
    }
    let ret = await dbcall("pkg_agent.agent_login",params);
    if (ret.code === 0) {
      ret.data.uip = params.uip;
      ret.data.limits=JSON.parse(JSON.stringify(treeSource.limits));
      //三级代理没下级
      if(ret.data.agentLevel==3){
        ret.data.limits=ret.data.limits.filter(id=>{
          if(!/^0102/.test(id)&&!/^02/.test(id)){
            return id;
          }
        });
      }
      let val = await accessToken.createToken({appid:config.appid,agentLevel:ret.data.agentLevel,userno:ret.data.agentno,limits:ret.data.limits});
      if (val.code == 0) {
        ret.data.accessToken = val.accessToken;
        await util.respone(ctx, ret);
      } else {
        await util.respone(ctx, val);
      }
    } else {
      await util.respone(ctx, ret);
    }
  }

  /**
   * 退出 删除app token
   * @param ctx
   * @returns {Promise.<void>}
   */
  static async logout(ctx) {
    let params = util.wrapParams(ctx);
    let ret = await accessToken.removeToken({
      appid: config.appid,
      uip: params.uip,
      userno: params.agentno,
      accessToken: params.accessToken
    });
    await util.respone(ctx, ret);
  }

  /**
   * 获取帐号信息
   * @param data
   * @param cb
   * @returns {Promise.<void>}
   */
  static async checkLimit(data) {
    let val = await accessToken.accessToken({appid: config.appid, uip: data.uip, userno: data.agentno});
    let limit=treeSource.pathTree[data.path];
    if (val.code==0&&val.data &&val.data.limits&&limit) {
      let ret = val.data.limits.includes(limit.id);
      data.agentLevel=val.data.agentLevel;
      return ret;
    } else {
      return false;
    }
  }
  /**
   * 代理列表
   * @param ctx
   * @returns {Promise.<void>}
   */
  static async agentlist(ctx) {
    let params = util.wrapParams(ctx);
    let ret = await dbcall("pkg_agent.agent_list", params);
    await util.respone(ctx, ret);
  }

  /**
   * 增加
   * @param ctx
   * @returns {Promise.<void>}
   */
  static async addagent(ctx) {
    let params = util.wrapParams(ctx);
    let ret = await dbcall("pkg_agent.agent_add_edit", params);
    await util.respone(ctx, ret);
  }
  static async editEnable(ctx) {
    let params = util.wrapParams(ctx);
    let ret =await dbcall("pkg_agent.enable", params);
    await util.respone(ctx, ret);
  }
  /**
   * 编辑密码
   * @param ctx
   * @returns {Promise.<void>}
   */
  static async editpwd(ctx) {
    let params = util.wrapParams(ctx);
    let ret = await dbcall("pkg_agent.agent_update_pwd", params);
    await util.respone(ctx, ret);
  }

  /**
   * 校验密码
   * @param ctx
   * @returns {Promise.<void>}
   */
  static async checkPwd(ctx) {
    let params = util.wrapParams(ctx);
    let ret = await dbcall("pkg_agent.agent_check_pwd", params);
    await util.respone(ctx, ret);
  }
  /**
   * 账单列表
   * @param ctx
   * @returns {Promise.<void>}
   */
  static async billist(ctx) {
    let params = util.wrapParams(ctx);
    let ret = await dbcall("pkg_bill.agent_bill_list", params);
    await util.respone(ctx, ret);
  }
  /**
   * 取款
   * @param ctx
   * @returns {Promise.<void>}
   */
  static async cash(ctx) {
    let params = util.wrapParams(ctx);
    let ret = await dbcall("pkg_bill.apply_draw_money", params);
    await util.respone(ctx, ret);
  }
  /**
   * 我的信息
   * @param ctx
   * @returns {Promise.<void>}
   */
  static async myInfo(ctx) {
    let params = util.wrapParams(ctx),token=params.accessToken;
    let ret = await dbcall("pkg_agent.agent_info", params);
    ret.data.limits=JSON.parse(JSON.stringify(treeSource.limits));
    ret.data.accessToken = token;
    await util.respone(ctx, ret);
  }
};