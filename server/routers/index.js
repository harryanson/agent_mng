/**
 * 整合所有子路由
 */

const router = require("koa-router")();
const agent = require("./agent"),
  agentCtr = require(ROOT_DIR + "/controllers/agent");
router.use(async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    ctx.status = err.status || 500;
    ctx.body = {code: errs.internal_server_error};
    ctx.app.emit('error', err, ctx);
  }
});
router.use("/agent", agentCtr.checkUser, agent.routes(), agent.allowedMethods());
module.exports = router;


