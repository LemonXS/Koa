const router = require('koa-router')()
// router.prefix('/users') //很重要，可以在当前地址前面添加一个 前缀 /xxx
// const DB = require("../Config/DBConfig.js");
const Susers = require("../service/users.js");


const jwt = require('jsonwebtoken')
const util = require('util')
const verify = util.promisify(jwt.verify) // 解密
const secret= require("../../Config/Config.js").secret;



router.get('/login', async (ctx) => {
  await ctx.render('login');
})

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
    ctx.cookies.set('cid', 'hello world', {
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

    let userToken = {
      name:username,
      pwd:pwd
  }
  const token = jwt.sign(userToken, secret, {expiresIn: '1h'})  //token签名 有效期为1小时

  ctx.session.uid = token;




    //【判断传输的数据类型】
    console.log(Object.prototype.toString.call(1)); // [object Number] 
    console.log(Object.prototype.toString.call('abc')); // [object String] 
    console.log(Object.prototype.toString.call(false)); // [object Boolean] 
    console.log(Object.prototype.toString.call(undefined)); // [object Undefined] 
    console.log(Object.prototype.toString.call(null)); // [object Null] 
    console.log(Object.prototype.toString.call([12, 32, 43, 21, 32, 12])); // [object Array] 
    console.log(Object.prototype.toString.call({
      x: 1,
      y: 3
    })); // [object Object] 
    console.log(Object.prototype.toString.call(new Date())); // [object Date] 
    console.log(Object.prototype.toString.call(/abc/)); // [object RegExp] 
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

router.get('/logininfo', async (ctx) => {
  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiMTExIiwicHdkIjoiMTIzIiwiaWF0IjoxNTUzNjkyOTkwLCJleHAiOjE1NTM2OTY1OTB9.6iIIOyL31R3Jo_1pDsyGoelUIvF0pembiUMZtUBYLyc";
  //ctx.header.authorization  // 获取jwt
  console.log("【Token】"+  ctx.session.uid )
  console.log(token)
  console.log(secret)
  let payload
  if (token) {
      payload = await verify(token.split(' ')[1], secret)  // // 解密，获取payload
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