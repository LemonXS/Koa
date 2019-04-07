const Koa = require("koa");
const app = new Koa();
const views = require("koa-views");
const json = require("koa-json");
const onerror = require("koa-onerror");
const bodyparser = require("koa-bodyparser");
const logger = require("koa-logger");
const render = require("koa-art-template");
const path = require("path");
const session = require('koa-session');
const cors = require('koa2-cors');
//token
const jwt = require('jsonwebtoken')
// const aes256way = require("./util/safety.js"); //拓展方法池
// const aeskey= require("./Config/Config.js").aes256key; //私钥
// const aesiv= require("./Config/Config.js").ivkey; //私钥




// const jwtKoa = require('koa-jwt')
// const util = require('util')
// const verify = util.promisify(jwt.verify) // 解密
const log4js = require('./Logs/log4js');
const secret = require("./Config/Config.js").secret;
const appkey = require("./Config/Config.js").appkey;

const db = require("./Config/DBConfig.js");//拓展方法池
// const ipaddress = require("../../util/ip.js"); //拓展方法池 ip

//【controller】本地控制器
const index = require("./app/controller/index");
const users = require("./app/controller/users");
//【api】对外开放的API专用
const userinfo = require("./app/api/userinfo");






// app.use(jwtKoa({
//   secret
// }).unless({
//   // path: [/^\/api\/login/] //数组中的路径不需要通过jwt验证
//   path: [
//     /^\/login/,
//     /^\/register/,
//     /^\/javascripts.*/
//     //  /^((?!\/api).)*$/ // 设置除了私有接口外的其它资源，可以不需要认证访问
//   ]
// }));


//Token 路由拦截中心
app.use(async (ctx, next) => { // 我这里知识把登陆和注册请求去掉了，其他的多有请求都需要进行token校验 

  if (!ctx.url.match(/^\/login/)
   && !ctx.url.match(/^\/public.*/) 
   && !ctx.url.match(/^\/register/) 
   && !ctx.url.match(/^\/logout/) 
   && !ctx.url.match(/^\/404/) 
   && !ctx.url.match(/^\/500/)
   && !ctx.url.match(/^\/mysqlDB/) 
   ) {
    // Authentication Error
    let token = ctx.cookies.get('guid');
    let result;
    let jwtdata = "";
    try {
      result = await jwt.verify(token, secret, function (err, decoded) {
        if (!err) {
          console.log("【总路径 Token 监控】")
          console.log(decoded)
          // console.log(decoded); //会输出解密的，如果过了60秒，则有错误。
          jwtdata = decoded;
          return decoded;
        } else {
          console.log("【Token-err】：" + err)
          return false;
        }
      })
    } catch (error) {
      result = false;
    }
    if (Object.prototype.toString.call(jwtdata) == "[object Object]") {
      let trackdata = await db.find('tracklog', {
        "uid":db.getObjectId(jwtdata.ukey) , "randomkey": jwtdata.randomkey,"ip":jwtdata.ip
      });
      console.log("【总路径 trackdata】")
      console.log(trackdata)

      if (trackdata.length > 0) {
        result = true;
      } else {
        result = false;
      }
    } else {
      result = false;
    }
    if (result == false) {
      ctx.cookies.set('guid', '', {
        signed: false,
        maxAge: 0
      })
      return await ctx.redirect("/login");
    } else {
      return await next();
    }
  } else {
    return await next();
  }
});


// app.use(async (ctx, next) =>  {
//   let trackdata =  appservice.find('tracklog', {
//     uid: decoded.ukey,
//     randomkey: decoded.randomkey
//   }).then(data => { 
//     console.log("【trackdata】")
//   console.log(trackdata)
//   console.log("【data】")
//   console.log(data)
//    })
//   if (trackdata.length > 0) {
//    next();
//   }else{
//     next();
//   }
// })




// //允许跨域
app.use(cors());

// //允许跨域
// app.use(cors({
//   origin: function (ctx) {
//       if (ctx.url === '/cors') {
//           return "*"; // 允许来自所有域名请求
//       }
//       return 'http://127.0.0.1:8080'; / 这样就能只允许 http://127.0.0.1:8080 这个域名的请求了
//   },
//   exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
//   maxAge: 5,
//   credentials: true,
//   allowMethods: ['GET', 'POST', 'DELETE'],
//   allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
// }))




// error handler
onerror(app);


// middlewares
app.use(
  bodyparser({
    enableTypes: ["json", "form", "text"]
  })
);
app.use(json());
app.use(logger());
// app.use(require("koa-static")(__dirname + "/public"));
app.use(require("koa-static")(__dirname));


// app.use(
//   views(__dirname + "/views", {
//     extension: "ejs"
//   })
// );

//配置 koa-art-template模板引擎
render(app, {
  root: path.join(__dirname, 'views'), // 视图的位置
  extname: '.html', // 后缀名
  debug: process.env.NODE_ENV !== 'production' //是否开启调试模式

});


//session
app.keys = appkey;
const CONFIG = {
  key: 'koa:sess', //cookie key (default is koa:sess)
  maxAge: 1000 * 60 * 60 * 2, // cookie的过期时间 maxAge in ms (default is 1 days)
  overwrite: true, //是否可以overwrite    (默认default true)
  httpOnly: true, //cookie是否只有服务器端可以访问 httpOnly or not (default true)
  signed: true, //签名默认true
  rolling: false, //在每次请求时强行设置cookie，这将重置cookie过期时间（默认：false）
  renew: false, //(boolean) renew session when session is nearly expired,
};
app.use(session(CONFIG, app));
// 设置值 ctx.session.username = "张三";
// 获取值 ctx.session.username

// //session中保存了页面访问次数，每次请求的时候，会增加计数再把结果返回给用户。
// app.use(ctx => {
//   // ignore favicon
//   if (ctx.path === '/favicon.ico') return;
//   let n = ctx.session.views || 0;
//   ctx.session.views = ++n;
//   ctx.body = n + ' views';
// });


// logger
app.use(async (ctx, next) => {
  const start = new Date();
  console.log("【日志】")
  console.log(start)
  const ms = new Date() - start;
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
  await next();
});

// routes
app.use(index.routes(), index.allowedMethods());
app.use(users.routes(), users.allowedMethods());

//【api】路由
app.use(userinfo.routes(), userinfo.allowedMethods());






app.use(async (ctx,next) => {
     let status=ctx.response.status;
      if (status === 404) {
        await ctx.render("error/404");
    } else if (status === 500) {
        await ctx.render("error/500");
    }else{
      await next();
    }
});


// error-handling
//【错误中心】  在try-catch错误是无法监听的  
//             需要手动释放：ctx.app.emit('error', err, ctx);
//             在需要的代码中放入即可监听
app.on("error", async (err, ctx) => {
  // console.error("server error", err, ctx);
  log4js.logway("【错误中心】", "error", "【err】:" + err + "  【ctx】: " + JSON.stringify(ctx))
  // await next();
});

module.exports = app;
