const router = require('koa-router')()
const log4js = require('../../../Logs/log4js');
// router.prefix('/users') //很重要，可以在当前地址前面添加一个 前缀 /xxx
const S_menu = require("../../service/system/menu");


//【浏览器--菜单加载】
router.post('/navs', async (ctx) => {
    let resData=  await  S_menu.system_navs([]);
     ctx.body=resData;
  })

  
  //菜单页面
  router.get('/page_menu', async (ctx) => {
    await ctx.render('system/page_menu');
  })
  
module.exports = router