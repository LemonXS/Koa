const Koa = require("koa");
const app = new Koa();
const views = require("koa-views");
const json = require("koa-json");
const onerror = require("koa-onerror");
const bodyparser = require("koa-bodyparser");
const logger = require("koa-logger");
const render = require("koa-art-template");
const path = require("path");




const index = require("./controller/index");
const users = require("./controller/users");

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
app.use(require("koa-static")(__dirname + "/public"));

// app.use(
//   views(__dirname + "/views", {
//     extension: "ejs"
//   })
// );

//配置 koa-art-template模板引擎
render(app, {
  root: path.join(__dirname, 'views'),   // 视图的位置
  extname: '.html',  // 后缀名
  debug: process.env.NODE_ENV !== 'production'  //是否开启调试模式

});


// logger
app.use(async (ctx, next) => {
  const start = new Date();
  await next();
  const ms = new Date() - start;
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});

// routes
app.use(index.routes(), index.allowedMethods());
app.use(users.routes(), users.allowedMethods());

// error-handling
app.on("error", (err, ctx) => {
  console.error("server error", err, ctx);
});

module.exports = app;
