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
  ctx.cookies.set( 'cid','hello world',{ 
   signed: false ,
   domain:'127.0.0.1', // 写cookie所在的域名 
   path:'/',// 写cookie所在的路径 
   maxAge: 2*60*60*1000, // cookie有效时长 
  //  expires:new Date('2019-03-28'), // cookie失效时间 
   httpOnly:false, // 是否只用于http请求中获取 
   overwrite:false // 是否允许重写 
   } );


   //【判断传输的数据类型】
   console.log(Object.prototype.toString.call(1)); // [object Number] 
   console.log(Object.prototype.toString.call('abc')); // [object String] 
   console.log(Object.prototype.toString.call(false)); // [object Boolean] 
   console.log(Object.prototype.toString.call(undefined)); // [object Undefined] 
   console.log(Object.prototype.toString.call(null)); // [object Null] 
   console.log(Object.prototype.toString.call([12,32,43,21,32,12])); // [object Array] 
   console.log(Object.prototype.toString.call({x:1,y:3})); // [object Object] 
   console.log(Object.prototype.toString.call(new Date())); // [object Date] 
   console.log(Object.prototype.toString.call(/abc/)); // [object RegExp] 

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
