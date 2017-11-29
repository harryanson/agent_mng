const logger = require(ROOT_DIR + "/lib/logger")("user", __filename),
  fs = require("fs"),
  config = require(ROOT_DIR + "/config"),
  util = require(ROOT_DIR + "/lib/util"),
  redisTe = require(ROOT_DIR + "/db/redisTe"),
  accessToken = require(ROOT_DIR + "/lib/accessToken"),
  dbcall = require(ROOT_DIR + "/db/pgsql").dbcall
module.exports = class User {
  /**
   * 我的会员
   * @param ctx
   * @returns {Promise.<void>}
   */
  static async myUsers(ctx) {
    let params = util.wrapParams(ctx);
    let ret = await dbcall("pkg_user.my_users", params);
    await util.respone(ctx, ret);
  }
  /**
   * 查询会员
   * @param ctx
   * @returns {Promise.<void>}
   */
  static async search(ctx) {
    let params = util.wrapParams(ctx);
    let ret = await dbcall("pkg_user.search", params);
    await util.respone(ctx, ret);
  }
  /**
   * 绑定用户
   * @param ctx
   * @returns {Promise.<void>}
   */
  static async binding_agent(ctx) {
    let params = util.wrapParams(ctx),msg='绑定成功！';
    let ret = await dbcall("pkg_user.get_userno", {agentno:params.agentno,alias:params.openid,domain:params.domain,uip:params.uip});
    let data=ret.data;
    if(ret.code==0&&data){
      if(data.userno){//没注册
        msg='还没注册，请下载我们的APP！';
      }else if(data.agentCount==0){//代理不存在
        msg='代理商不存在！';
      }else if(data.agentno){//已绑定代理了
        msg='该账号已绑定过代理商！';
      }else{
        params.userno=data.userno;
        ret = await dbcall("pkg_agent.binding_agent", {agentno:params.agentno,userno:data.userno,uip:params.uip});
        if(ret.code!=0){//绑定成功
          msg='绑定失败！';
        }
      }
    }
    await util.respone(ctx, {msg:msg});
  }
}