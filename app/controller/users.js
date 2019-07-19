const router = require('koa-router')()
const log4js = require('../../Logs/log4js');
// router.prefix('/users') //很重要，可以在当前地址前面添加一个 前缀 /xxx
const Susers = require("../service/users.js");
const jwt = require('jsonwebtoken')
const uuid = require('node-uuid');//guid  生成唯一key
// const util = require('util')
// const verify = util.promisify(jwt.verify) // 解密
const secret = require("../../Config/Config.js").secret; //私钥
const toolway = require("../../util/tool.js"); //拓展方法池
const timeway = require("../../util/timeway.js"); //拓展方法池
const ipaddress = require("../../util/ip.js"); //拓展方法池
const aes256way = require("../../util/safety.js"); //拓展方法池
const aeskey= require("../../Config/Config.js").aes256key; //私钥
const aesiv= require("../../Config/Config.js").ivkey; //私钥
const tokenutil = require("../../util/token.js");






router.get('/404', async (ctx) => {
  await ctx.render('error/404');
})
router.get('/500', async (ctx) => {
  await ctx.render('error/500');
})


router.get('/login', async (ctx) => {
  // console.log("-------------uuidStr-------------");
  // var uuidStr=uuid.v1();
  //  console.log(uuidStr)
  // console.log("-------------nowdate-------------");
  // var nowdate = timeway.nowdateway(0).date0;
  // console.log(nowdate)
  // console.log("-------------random16-------------");
  // var random16 = toolway.randomWord(false, 16);
  // console.log(random16)
  // console.log("-------------enToken-------------");
  // let enTokenStr= tokenutil.enToken({a:"123",b:"456"},"1Q2W3E");
  // console.log(enTokenStr)
  // console.log("-------------enAse256-------------");
  // var enaes256Str= aes256way.encryption(enTokenStr);
  // console.log(enaes256Str)

  // console.log("-------------deAse256-------------");
  // var deaes256Str=aes256way.decryption(enaes256Str);
  // console.log(deaes256Str)

  // console.log("-------------deToken-------------");
  // let deTokenStr= await tokenutil.deToken(deaes256Str,"1Q2W3E");
  // console.log(deTokenStr)
  await ctx.render('user/login');
})


//【登录】
router.post('/login', async (ctx) => {
  let username = ctx.request.body.username;
  let pwd = ctx.request.body.pwd;
  let yzm = ctx.request.body.yzm.toLowerCase();
  var  yzmsign= ""
    try {
      yzmsign= aes256way.encryption(yzm);
    } catch (error) {
      yzmsign="";
    }
    // console.log("-----------------------【登录校验验证码】--------------------")
    // console.log("【原     】  "+yzm)
    // console.log("【加   密】  "+yzmsign)
    // console.log("【session】  "+ctx.session.captcha)
    // console.log(yzmsign==ctx.session.captcha?true:false)
  if(yzmsign== ctx.session.captcha){
    let data = await Susers.login({
      "username": username,
      "pwd": pwd
    });
    var nowdate = timeway.nowdateway(0).date1;//当前时间到毫米（无格式：20190714140001999）
    var random16 = toolway.randomWord(false, 16);//随机16未字符串
    var ipstr=ipaddress.getClientIP(ctx);//拿到ip
    if (data.length > 0) {
      // 删除以前Cookie登录的记录
      let deltrackdata = await Susers.del('tracklog', {
        uid: data[0]._id
      });
      //更新当前Cookie登录的记录
      let addtrackdata = await Susers.add('tracklog', {
        uid: data[0]._id,
        username: data[0].username,
        randomkey: random16,
        logintime: nowdate,
        ip:ipstr
      });
      try {
        if (addtrackdata.result.ok) {
          //生成token
          let tokenstr=  tokenutil.enToken({
              randomkey: random16,
              ukey: data[0]._id,
              name: username,
              ip:ipstr
            });
          try {
              //把token加密
              let enaes256Str= aes256way.encryption(tokenstr);
              console.log("------【asesign加密成功】-------")
              ctx.cookies.set('guid', enaes256Str, {
              signed: false,
              path: '/', // 写cookie所在的路径 
              maxAge: 2 * 60 * 60 * 1000, // cookie有效时长 
              httpOnly: false, // 是否只用于http请求中获取 
              overwrite: false // 是否允许重写 
            });
            log4js.logway("【登录记录】", "info", "【本地记录】:"+"  用户标识："+data[0]._id + "  用户名称："+data[0].username)
            ctx.body = {
              success: true,
              data: [],
              message: '登录成功',
              code: 1
            };
          } catch (error) {
             asesign="";
             console.log("------【asesign----加密失败】-------")
             ctx.body = {
              success: false,
              data: [],
              message: '登录遇到错误',
              code: 1
            };
          }
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
        message: '用户名或密码错误',
        code: -1
      };
    }
  }else{
    ctx.body = {
      success: false,
      data: [],
      message: '验证码错误',
      code: 3
    };
  }
})

//【退出登录】
router.get('/logout', async (ctx) => {
  console.log("【退出登录】")
  ctx.cookies.set('guid', '', {
    signed: false,
    maxAge: 0
  })
  await ctx.redirect("user/login");
})





router.get('/register', async (ctx) => {
  await ctx.render('user/register');
})

module.exports = router