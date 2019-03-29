const router = require('koa-router')()
const log4js = require('../../Logs/log4js'); 
// router.prefix('/users') //很重要，可以在当前地址前面添加一个 前缀 /xxx
const Susers = require("../service/users.js");

const jwt = require('jsonwebtoken')
// const util = require('util')
// const verify = util.promisify(jwt.verify) // 解密
const secret = require("../../Config/Config.js").secret;//私钥
const toolway=require("../../util/tool.js");//拓展方法池
const timeway=require("../../util/timeway.js");//拓展方法池

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

  var nowdate= timeway.nowdateway(0).date1;
  var random16=toolway.randomWord(false, 16);

  console.log("【登陆数量】");
  console.log(data)
  if (data.length > 0) {
// console.log(now())
    let trackdata=await Susers.add('tracklog',{uid:data[0]._id,username:data[0].username,randomkey:random16,logintime:nowdate});
    // console.log(trackdata)  result: { n: 1, ok: 1 }
    try{
      if(trackdata.result.ok){
        const token = jwt.sign({
          randomkey:random16,
          ukey:data._id,
          name: username,
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

        ctx.body = {
          success: true,
          data: [],
          message: '登录成功',
          code: 1
        };
      }
      }catch(err){
          console.log(err);
          ctx.body = {
            success: true,
            data: [],
            message: '登录成功',
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
  ctx.cookies.set('uid','',{signed:false,maxAge:0})
  await ctx.redirect("/login"); 
})




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