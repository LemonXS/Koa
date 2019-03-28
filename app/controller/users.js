const router = require('koa-router')()
const log4js = require('../../Logs/log4js'); 
// log4js.logway("logtitle","logtype","logcontent")

// router.prefix('/users') //很重要，可以在当前地址前面添加一个 前缀 /xxx
// const DB = require("../Config/DBConfig.js");
const Susers = require("../service/users.js");


const jwt = require('jsonwebtoken')
const util = require('util')
const verify = util.promisify(jwt.verify) // 解密
const secret = require("../../Config/Config.js").secret;//私钥
const toolway=require("../../util/tool.js");//拓展方法池


router.get('/login', async (ctx) => {
  await ctx.render('login');
})



//【登录】
router.post('/login', async (ctx) => {
  var username = ctx.request.body.username;
  var pwd = ctx.request.body.pwd;
  console.log(ctx.request.body)
  let data = await Susers.login({
    "username": username,
    "pwd": pwd
  }); // DB.find('user',{"username":username,"pwd":pwd});
  console.log("【登陆数量】");
  console.log(data)
  if (data.length > 0) {
    const token = jwt.sign({
      guid:toolway.randomWord(false, 16),
      name: username
    }, secret, {
      expiresIn: '1h'
    }) //token签名 有效期为1小时
    // ctx.session.uid = token;
    ctx.cookies.set('uid', token, {
      signed: false,
      domain: '127.0.0.1', // 写cookie所在的域名 
      path: '/', // 写cookie所在的路径 
      maxAge: 2 * 60 * 60 * 1000, // cookie有效时长 
      //  expires:new Date('2019-03-28'), // cookie失效时间 
      httpOnly: false, // 是否只用于http请求中获取 
      overwrite: false // 是否允许重写 
    });
    if (Object.prototype.toString.call("abc") == "[object String]") {
      console.log(true);
    } else {
      console.log(false);
    }
    // ctx.set
    ctx.body = {
      msg: true,
      data: data,
      message: '获取token成功',
      code: 1,
      token
    };
  } else {
    ctx.body = {
      msg: false,
      data: [],
      message: '参数错误',
      code: -1
    };
  }
})

//【退出登录】
router.post('/logout', async (ctx) => {
  console.log("【退出登录】")
  ctx.cookies.set('uid','',{signed:false,maxAge:0})
  await ctx.redirect("/login"); 
})




//测试token是否成功
router.get('/logininfo', async (ctx) => {
  let token = ctx.cookies.get('uid');
  console.log(token)
  let payload
  if (true) {
    payload = await jwt.verify(token, secret, function (err, decoded) {
      if (!err) {
        console.log(decoded); //会输出123，如果过了60秒，则有错误。
        return decoded;
      } else {
        console.log("【Token-err】：" + err)
        log4js.logway("错误","error","【Token-err】"+err)
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