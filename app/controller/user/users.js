const router = require('koa-router')()
const log4js = require('../../../Logs/log4js');
// router.prefix('/users') //很重要，可以在当前地址前面添加一个 前缀 /xxx
const S_users = require("../../service/user/users.js");
const jwt = require('jsonwebtoken')
const uuid = require('node-uuid');//guid  生成唯一key


// const verify = util.promisify(jwt.verify) // 解密
const secret = require("../../../Config/Config.js").secret; //私钥
const toolway = require("../../../util/tool.js"); //拓展方法池
const timeway = require("../../../util/timeway.js"); //拓展方法池
const ipaddress = require("../../../util/ip.js"); //拓展方法池
const aes256way = require("../../../util/safety.js"); //拓展方法池
const aeskey= require("../../../Config/Config.js").aes256key; //私钥
const aesiv= require("../../../Config/Config.js").ivkey; //私钥
const tokenutil = require("../../../util/token.js");




//【404页面】
router.get('/404', async (ctx) => {
  await ctx.render('error/404');
})
//【500页面】
router.get('/500', async (ctx) => {
  await ctx.render('error/500');
})
//【退出登录】
router.get('/logout', async (ctx) => {
  console.log("【退出登录】")
  ctx.cookies.set('guid', '', {
    signed: false,
    maxAge: 0
  })
  await ctx.redirect("/login");
})

//---------------------------------------------------------登录模块--------------------------------------
//【登录页面】
router.get('/login', async (ctx) => {
  // console.log("---------------------------【当前用户ip】")
  // console.log(ipaddress.getClientIP(ctx))


  // console.log("-------------uuidStr(生成唯一值)-------------");
  // var uuidStr=uuid.v1();
  //  console.log(uuidStr)
  // console.log("-------------nowdate(当前时间无格式)-------------");
  // var nowdate = timeway.nowdateway(0).date0;
  // console.log(nowdate)
  // console.log("-------------random16(随机16位)-------------");
  // var random16 = toolway.randomWord(false, 16);
  // console.log(random16)
  // console.log("-------------enToken(生成token)-------------");
  // let enTokenStr= tokenutil.enToken({a:"123",b:"456"},"1Q2W3E");
  // console.log(enTokenStr)
  // console.log("-------------enAse256(加密token)-------------");
  // var enaes256Str= aes256way.encryption(enTokenStr);
  // console.log(enaes256Str)

  // console.log("-------------deAse256(解密token)-------------");
  // var deaes256Str=aes256way.decryption(enaes256Str);
  // console.log(deaes256Str)

  // console.log("-------------deToken(解出token的内容)-------------");
  // let deTokenStr= await tokenutil.deToken(deaes256Str,"1Q2W3E");
  // console.log(deTokenStr)
  await ctx.render('user/login');
})
//【本地登录验证】
router.post('/login', async (ctx) => {
  // let username = ctx.request.body.username;
  // let pwd =      ctx.request.body.pwd;
  let yzm = ctx.request.body.yzm.toLowerCase();
  let identity_type="local";
  let identifier= ctx.request.body.username;
  let credential= ctx.request.body.pwd;
      credential=(credential!=''?toolway.md5(credential):'');
  let user_ip=ipaddress.getClientIP(ctx);
  let user_randomStr=toolway.randomWord(false, 16);
  var  yzmsign= ""
    try {
      yzmsign= aes256way.encryption(yzm);
    } catch (error) {
      yzmsign="";
    }
  if(yzmsign== ctx.session.captcha){

    var resData=  await  S_users.user_login([identity_type,identifier,credential]);
    console.log("--------------【mysql返回参数】--------------");
    console.log(resData)
    let R_code= resData.code;
    let R_success= resData.success;
    let R_msg= resData.msg;
    let R_data= resData.data;
    
    if(R_code==0 && R_success==true){
        //代表登录成功
        let T_resData=  await  S_users.user_TokenAdd([
          R_data.uid,identity_type,user_randomStr,user_ip
        ]);
        // console.log("---------------【user-token写入】--------------");
        // console.log(T_resData)
        let T_code= T_resData.code;
        let T_success= T_resData.success;
        let T_msg= T_resData.msg;
        let T_data= T_resData.data;
        if(T_code==2 && T_success==true){
        //这是返回前端的成功位置
        //在这个地方还要进行 token的加密和价签
        let enTokenStr=  tokenutil.enToken({
          randomkey:user_randomStr,
          uid:R_data.uid,
          identity_type:identity_type ,
          ip:user_ip
        });
        let enAes256Str= aes256way.encryption(enTokenStr);
        ctx.cookies.set('guid', enAes256Str, {
        signed: false,
        path: '/', // 写cookie所在的路径 
        maxAge: 2 * 60 * 60 * 1000, // cookie有效时长 
        httpOnly: true , // 是否只用于http请求中获取 
        overwrite: true // 是否允许重写 
        });
        ctx.body= {code:0,success:true,msg:"登录成功",data:{uid:R_data.uid,utype:identity_type}};
        }else{
          ctx.body= {code:1,success:true,msg:"登陆失败",data:{}};
        }
    }else  if(R_code==1 && R_success==false){
    //代表登录失败
    ctx.body= {code:1,success:false,msg:"登录失败",data:null};
    }else  if(R_code==4 && R_success==false){
    //代表没有当前此用户
      ctx.body= {code:4,success:false,msg:"没有此用户",data:null};
    }else{
    //其他异常错误
    ctx.body= {code:9999,success:false,msg:"异常错误",data:null};
    }
  
  }else{
    ctx.body = {
      success: false,
      data: [],
      message: '验证码错误',
      code: -1
    };
  }
})

//---------------------------------------------------------注册模块--------------------------------------
//【本地注册】
router.post('/register', async (ctx) => {
  let identity_type="local";
  let identifier= ctx.request.body.u;
  let credential= ctx.request.body.p;
       credential=toolway.md5(credential);
  let user_ip=ipaddress.getClientIP(ctx);
  let user_randomStr=toolway.randomWord(false, 16);


//代表未注册
var Random_uid=toolway.getuuid();//用户唯一id
var Random_nickname=toolway.getRandomName();//随机用户名称
var Random_gender=(toolway.getRandomBool()==true?'男':'女');
var Random_birthday=timeway.getnewdateway().date1;//用户系统生日
var Random_face=toolway.getFace();




let V_resData= await   S_users.user_register_verify([identity_type,identifier]);

if(V_resData){
  let U_resData= await   S_users.user_Uregister([
    Random_uid,Random_nickname,Random_gender,Random_birthday,Random_face,identity_type,1
   ]);
  //  console.log("---------------【user注册】--------------");
  //  console.log(U_resData)
   let U_code= U_resData.code;
   let U_success= U_resData.success;
   let U_msg= U_resData.msg;
   let U_data= U_resData.data;
  if(U_code==2 && U_success==true){
      let UA_resData= await   S_users.user_UAregister([
        Random_uid,identity_type,identifier,credential,user_ip,1,null,null,null
     ]);
    //  console.log("---------------【user-auths注册】--------------");
    //  console.log(UA_resData)
     let UA_code= UA_resData.code;
     let UA_success= UA_resData.success;
     let UA_msg= UA_resData.msg;
     let UA_data= UA_resData.data;
     if(UA_code==2 && UA_success==true){
       let T_resData= await   S_users.user_TokenAdd([
         Random_uid,identity_type,user_randomStr,user_ip
       ]);
      //  console.log("---------------【user-token注册】--------------");
      //  console.log(T_resData)
       let T_code= T_resData.code;
       let T_success= T_resData.success;
       let T_msg= T_resData.msg;
       let T_data= T_resData.data;
      if(T_code==2 && T_success==true){
       //这是返回前端的成功位置
       //在这个地方还要进行 token的加密和价签
    
       let enTokenStr=  tokenutil.enToken({
        randomkey:user_randomStr,
        uid:Random_uid,
        identity_type:identity_type ,
        ip:user_ip
      });
   
       let enAes256Str= aes256way.encryption(enTokenStr);
       ctx.cookies.set('guid', enAes256Str, {
       signed: false,
       path: '/', // 写cookie所在的路径 
       maxAge: 2 * 60 * 60 * 1000, // cookie有效时长 
       httpOnly: false, // 是否只用于http请求中获取 
       overwrite: false // 是否允许重写 
       });
        ctx.body= {code:0,success:true,msg:"登录成功",data:null};
      }else{
        ctx.body= {code:1,success:false,msg:"登陆失败",data:null};
      }
     }else{
        ctx.body= {code:3,success:false,msg:"注册失败",data:null};
     }
    }
}else{
  ctx.body= {code:5,success:false,msg:"用户名已存在",data:null};
}
})

module.exports = router