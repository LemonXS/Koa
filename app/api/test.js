const router = require('koa-router')()
const S_users = require("../service/users.js");

const log4js = require('../../Logs/log4js'); 
const axios = require('axios');
const ipaddress = require("../../util/ip.js"); //拓展方法池
const toolway = require("../../util/tool.js"); //拓展方法池
const timeway = require("../../util/timeway.js"); //拓展方法池

const aes256way = require("../../util/safety.js"); //拓展方法池
const tokenutil = require("../../util/token.js");


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





router.post('/testpost', async (ctx) => {
let identity_type="local";
let identifier="admins";
let credential="123456";

    credential=(credential!=''?toolway.md5(credential):'');
  let user_ip=ipaddress.getClientIP(ctx);
  let user_randomStr=toolway.randomWord(false, 16);

var resData=  await  S_users.user_login([identity_type,identifier,credential]);
console.log("--------------【mysql返回参数】--------------");
console.log(resData)
let R_code= resData.code;
let R_success= resData.success;
let R_msg= resData.msg;
let R_data= resData.data;

if(R_code==0 && R_success==true){
    //代表登录成功
    console.log("【"+R_msg+"】");
    let T_resData=  await  S_users.user_TokenAdd([
      R_data.uid,identity_type,user_randomStr,user_ip
    ]);
    console.log("---------------【user-token写入】--------------");
    console.log(T_resData)
    let T_code= T_resData.code;
    let T_success= T_resData.success;
    let T_msg= T_resData.msg;
    let T_data= T_resData.data;
    if(T_code==2 && T_success==true){
    //这是返回前端的成功位置
    //在这个地方还要进行 token的加密和价签
    ctx.body= {code:0,success:true,msg:"登录成功",data:{uid:R_data.uid,utype:identity_type}};
    }else{
      ctx.body= {code:1,success:true,msg:"登陆失败",data:{}};
    }
}else  if(R_code==1 && R_success==false){
//代表登录失败
console.log("【"+R_msg+"】");
ctx.body= {code:1,success:false,msg:"登录失败",data:null};
}else  if(R_code==4 && R_success==false){
//代表未注册
console.log("【"+R_msg+"】");
var Random_uid=toolway.getuuid();
var Random_nickname=toolway.getRandomName();
var Random_gender=(toolway.getRandomBool()==true?'男':'女');
var Random_birthday=timeway.getnewdateway().date1;
var Random_face=toolway.getFace();

 let U_resData=  await  S_users.user_Uregister([
  Random_uid,Random_nickname,Random_gender,Random_birthday,Random_face,identity_type,1
 ]);
 console.log("---------------【user注册】--------------");
 console.log(U_resData)
 let U_code= U_resData.code;
 let U_success= U_resData.success;
 let U_msg= U_resData.msg;
 let U_data= U_resData.data;
if(U_code==2 && U_success==true){
    let UA_resData=  await  S_users.user_UAregister([
      Random_uid,identity_type,identifier,credential,user_ip,1,null,null,null
   ]);
   console.log("---------------【user-auths注册】--------------");
   console.log(UA_resData)
   let UA_code= UA_resData.code;
   let UA_success= UA_resData.success;
   let UA_msg= UA_resData.msg;
   let UA_data= UA_resData.data;
   if(UA_code==2 && UA_success==true){
     let T_resData=  await  S_users.user_TokenAdd([
       Random_uid,identity_type,user_randomStr,user_ip
     ]);
     console.log("---------------【user-token注册】--------------");
     console.log(T_resData)
     let T_code= T_resData.code;
     let T_success= T_resData.success;
     let T_msg= T_resData.msg;
     let T_data= T_resData.data;
    if(T_code==2 && T_success==true){
     //这是返回前端的成功位置
     //在这个地方还要进行 token的加密和价签
     ctx.body= {code:0,success:true,msg:"登录成功",data:{uid:Random_uid,utype:identity_type}};
    }else{
      ctx.body= {code:1,success:true,msg:"登陆失败",data:{}};
    }
   }else{
    ctx.body= {code:3,success:false,msg:"注册失败",data:null};
   }
}else{
  ctx.body= {code:3,success:false,msg:"注册失败",data:null};
}
}else{
//其他异常错误
console.log("【"+R_msg+"】");
ctx.body= {code:9999,success:false,msg:"异常错误",data:null};
}











//  ctx.response.status=200;
//  ctx.body=resData
})


router.post('/testpost_token', async (ctx) => {


  let tokenstr=  tokenutil.enToken({
    randomkey:'9fRncxLhvG1vJ6uU',
    uid:'c06668a0-af67-11e9-a74c-e12bacab5eb7' ,
    identity_type:'local' ,
    ip:'127.0.0.1'
  });
  let enaes256Str= aes256way.encryption(tokenstr);
  ctx.cookies.set('guid', enaes256Str, {
  signed: false,
  path: '/', // 写cookie所在的路径 
  maxAge: 2 * 60 * 60 * 1000, // cookie有效时长 
  httpOnly: false, // 是否只用于http请求中获取 
  overwrite: false // 是否允许重写 
  });



let aseverify=aes256way.decryption(enaes256Str);//解密aes256
let result=await tokenutil.deToken(aseverify);
    if (Object.prototype.toString.call(result) == "[object Object]") {
     console.log("【测试解token成功】")
     console.log(result)
     var verifyToken=  await  S_users.user_Token([result.uid,result.identity_type,result.randomkey,result.ip]);
     ctx.body={"verifyToken":verifyToken};
    }else{
      console.log("【测试解token失败】")
      console.log(result)
      ctx.body={"verifyToken":false};
    }

})



module.exports = router