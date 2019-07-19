const router = require('koa-router')()
const log4js = require('../../Logs/log4js'); 
const jwt = require('jsonwebtoken')
const secret = require("../../Config/Config.js").secret;//私钥
const axios = require('axios')
router.prefix('/api') //很重要，可以在当前地址前面添加一个 前缀 /xxx


router.get('/test', async (ctx) => {
await ctx.render('test');
})


//测试 axios 是否可以在后端使用 【结果：可行】
router.get('/testget', async (ctx) => {
 await axios.get('https://maoyan.com/films/248172', {
  }).then(function (response) {
    console.log("成功")
    console.log(response);
  }).catch(function (error) {
    console.log("错误")
    console.log(error);
  });
})

//测试 axios 是否可以在后端使用 【结果：可行】
router.post('/testpost', async (ctx) => {
 console.log(ctx.response.status)
 ctx.response.status=200;
 ctx.body={a:1,b:2,c:3}
})

module.exports = router