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
  
 //菜单页面内容
  router.post('/system_menu', async (ctx) => {
    let resData=  await  S_menu.system_menu([]);
    // console.log("------菜单内容------");
    // console.log(resData);
     ctx.body=resData;
  })

 //菜单页面内容-上下移动排序
 router.post('/system_menu_sort', async (ctx) => {
var dq_id=ctx.request.body.dq_id;
var dq_order=ctx.request.body.dq_order;
var th_id=ctx.request.body.th_id;
var th_order=ctx.request.body.th_order;
console.log(dq_id)
console.log(dq_order)
console.log(th_id)
console.log(th_order)

  let resData=  await  S_menu.system_menu_sort([dq_id,dq_order,th_id,th_order]);
  // console.log("------菜单排序返回------");
  // console.log(resData);
   ctx.body=resData;

})

  


module.exports = router