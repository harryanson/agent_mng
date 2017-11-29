/**
 * 管理员用户子路由
 */
let ctrls = {};
const router = require("koa-router")(),
  util = require(ROOT_DIR + "/lib/util"),
  fs = require("fs"),
  path = require('path'),
  dir = ROOT_DIR + '/controllers',
  tempRroutes = util.walkSync(dir).forEach(file => {
    let ctrl = require(file);
    ctrls[ctrl.name] = ctrl;
  });

const routers = router.post("/login", ctrls.Agent.login)//后台登录
  .post("/logout", ctrls.Agent.logout)//退出后台
  .get("/find", ctrls.Agent.agentlist)//代理列表
  .get("/children", ctrls.Agent.agentlist)//下级代理列表
  .post("/add", ctrls.Agent.addagent)//添加代理
  .post("/edit", ctrls.Agent.addagent)//修改代理
  .post("/enable", ctrls.Agent.editEnable)//启用/禁用代理
  .post("/checkpwd", ctrls.Agent.checkPwd)//代理密码
  .post("/editpwd", ctrls.Agent.editpwd)//修改代理密码
  .get("/user/myusers", ctrls.User.myUsers)//我的会员
  .get("/user/search", ctrls.User.search)//查询会员
  .get("/bill/list", ctrls.Agent.billist)//账单列表
  .post("/bill/cash", ctrls.Agent.cash)//取款
  .get("/index", ctrls.Agent.myInfo)//我的信息
  .post("/binding", ctrls.User.binding_agent)//用户绑定代理商


module.exports = routers;