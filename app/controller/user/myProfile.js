const router = require('koa-router')()
const log4js = require('../../../Logs/log4js');
// router.prefix('/users') //很重要，可以在当前地址前面添加一个 前缀 /xxx
// const S_users = require("../../service/user/users.js");


//【个人中心】
router.get('/myProfile', async (ctx) => {
    console.log("000000000000000000000000000000000000000000000000000000000000000000000")
    await ctx.render('user/myProfile');
  })






module.exports = router