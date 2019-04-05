const router = require('koa-router')()
const log4js = require('../../Logs/log4js');
// router.prefix('/users') //很重要，可以在当前地址前面添加一个 前缀 /xxx
const Susers = require("../service/users.js");
const jwt = require('jsonwebtoken')
// const util = require('util')
// const verify = util.promisify(jwt.verify) // 解密
const secret = require("../../Config/Config.js").secret; //私钥
const toolway = require("../../util/tool.js"); //拓展方法池
const timeway = require("../../util/timeway.js"); //拓展方法池
const ipaddress = require("../../util/ip.js"); //拓展方法池


router.get('/login', async (ctx) => {
  await ctx.render('login');
})


//【登录】
router.post('/login', async (ctx) => {
  var username = ctx.request.body.username;
  var pwd = ctx.request.body.pwd;
  let data = await Susers.login({
    "username": username,
    "pwd": pwd
  });
  var nowdate = timeway.nowdateway(0).date1;
  var random16 = toolway.randomWord(false, 16);
  var ipstr=ipaddress.getClientIP(ctx);
  // console.log("【random16】 " + random16)
  // console.log("【登陆数量】");
  // console.log(data)
  if (data.length > 0) {
    let deltrackdata = await Susers.del('tracklog', {
      uid: data[0]._id
    });
    // console.log("【删除登录key】")
    // console.log(deltrackdata.result)
    let addtrackdata = await Susers.add('tracklog', {
      uid: data[0]._id,
      username: data[0].username,
      randomkey: random16,
      logintime: nowdate,
      ip:ipstr
    });
    // console.log(trackdata)  result: { n: 1, ok: 1 }
    try {
      if (addtrackdata.result.ok) {
          const token = jwt.sign({
            randomkey: random16,
            ukey: data[0]._id,
            name: username,
            ip:ipstr
          }, secret, {
            expiresIn: '1h'
          }) //token签名 有效期为1小时
          // ctx.session.guid = token;
          ctx.cookies.set('guid', token, {
            signed: false,
            // domain: '127.0.0.1', // 写cookie所在的域名 
            path: '/', // 写cookie所在的路径 
            maxAge: 2 * 60 * 60 * 1000, // cookie有效时长 
            //  expires:new Date('2019-03-28'), // cookie失效时间 
            httpOnly: false, // 是否只用于http请求中获取 
            overwrite: false // 是否允许重写 
          });

          ctx.body = {
            success: true,
            data: [],
            message: '登录成功',
            code: 1
          };
      } else {
        ctx.body = {
          success: true,
          data: [],
          message: '登录成功',
          code: 1
        };
      }
    } catch (err) {
      console.log("【登录异常】"+JSON.stringify(err));
      log4js.logway("【登录异常】", "error", "【err】:" + JSON.stringify(err))
      ctx.body = {
        success: false,
        data: [],
        message: '登录异常',
        code: 2
      };
    }
  } else {
    ctx.body = {
      success: false,
      data: [],
      message: '用户名密码错误',
      code: -1
    };
  }
})

//【退出登录】
router.post('/logout', async (ctx) => {
  console.log("【退出登录】")
  ctx.cookies.set('guid', '', {
    signed: false,
    maxAge: 0
  })
  await ctx.redirect("/login");
})




module.exports = router