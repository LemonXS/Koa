const router = require('koa-router')()
const log4js = require('../../Logs/log4js'); 
const jwt = require('jsonwebtoken')
const secret = require("../../Config/Config.js").secret;//私钥


router.prefix('/api') //很重要，可以在当前地址前面添加一个 前缀 /xxx


//测试token是否成功
router.get('/logininfo', async (ctx) => {
  let token = ctx.cookies.get('uid');
  let payload
  if (true) {
    payload = await jwt.verify(token, secret, function (err, decoded) {
      if (!err) {
        console.log(decoded); //会输出123，如果过了60秒，则有错误。
        return decoded;
      } else {
        console.log("【Token-err】：" + err)
        log4js.logway("错误","error","【Token-err】"+err)
        ctx.app.emit('error', err, ctx);
        return false;
      }
    })
    ctx.body = {
      payload
    }
  } else {
    ctx.body = {
      message: 'token 错误',
      code: -1
    }
  }
})



module.exports = router