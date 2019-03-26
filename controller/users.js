const router = require('koa-router')()
// router.prefix('/users') //很重要，可以在当前地址前面添加一个 前缀 /xxx
// const DB = require("../Config/DBConfig.js");
const Susers = require("../service/users.js");


router.get('/login',async (ctx)=>{
  await ctx.render('login');
})

router.post('/login',async (ctx)=>{
  var username=ctx.request.body.username;
  var pwd=ctx.request.body.pwd;
  console.log(ctx.request.body)
  let data=await Susers.login({"username":username,"pwd":pwd});// DB.find('user',{"username":username,"pwd":pwd});

  console.log("【登陆数量】");
  console.log(data)

 if(data.length>0){
  ctx.body = {
    msg:true,
    data:data
};
 }else{
  ctx.body = {
    msg:false,
    data:[]
};
 }
 
 
})



module.exports = router
