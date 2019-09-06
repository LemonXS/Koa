const router = require('koa-router')()
const jwt = require('jsonwebtoken')
const S_users = require("../../../service/user/users.js");

const toolway = require("../../../../util/tool.js"); //拓展方法池
const timeway = require("../../../../util/timeway.js"); //拓展方法池
const ipaddress = require("../../../../util/ip.js"); //拓展方法池
const log4js = require('../../../../Logs/log4js');//日志
const aes256way = require("../../../../util/safety.js"); //aes加密解密 拓展方法池
const tokenutil = require("../../../../util/token.js");//token加密解密

const axios = require('axios');
//回掉地址页面
router.get('/proxy', async (ctx, next) => {
  await ctx.render('user/qq/proxy')
})
//获取openid
router.post('/proxy_openid', async (ctx, next) => {
  var access_token = ctx.request.body.access_token;
  let user_ip=ipaddress.getClientIP(ctx);
  let user_randomStr=toolway.randomWord(false, 16);

  let identity_type="qq";
  let client_id="";
  let identifier="";
  let credential="";
     await axios.get('https://graph.qq.com/oauth2.0/me?access_token=' + access_token)
    .then(response => {
      console.log("----------------成功-----------------")
      console.log(response.data)
      var str = response.data;
      var jsonStr = str.replace('callback( ', '');
      jsonStr = jsonStr.replace(' );', '');
      jsonStr = JSON.parse(jsonStr);
      var qqOpenid = jsonStr['openid'];
      var qqClient_id = jsonStr['client_id'];
      identifier=qqOpenid;
      client_id=qqClient_id;
    })
    .catch(error => {
      identifier="";
      client_id="";
    });

    var resData= await   S_users.user_login([identity_type,identifier,credential]);
    // console.log("--------------【mysql返回参数】--------------");
    // console.log(resData)
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
         httpOnly: false, // 是否只用于http请求中获取 
         overwrite: false // 是否允许重写 
         });


        ctx.body= {code:0,success:true,msg:"登录成功",data:{uid:R_data.uid,utype:identity_type}};
        }else{
          ctx.body= {code:1,success:false,msg:"登陆失败",data:{}};
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
    }else{
      ctx.body= {code:3,success:false,msg:"注册失败",data:null};
    }
    }else{
    //其他异常错误
    // console.log("【"+R_msg+"】");
    ctx.body= {code:9999,success:false,msg:"异常错误",data:null};
    }

})


//获取用户信息
// router.post('/proxy_userinfo', async (ctx, next) => {
//   var openid = ctx.request.body.openid;
//   var client_id = ctx.request.body.client_id;
//   var access_token = ctx.request.body.access_token;
//   // console.log(ctx.request.body)
//   await axios.get('https://graph.qq.com/user/get_user_info?access_token='+access_token+'&oauth_consumer_key='+client_id+'&openid='+openid)
//     .then(response => {
//       console.log("----------------数据成功-----------------")
//       console.log(response.data)
//     //   ctx.body = {
//     //     code:response.data.ret,
//     //     msg:response.data.msg,
//     //   }
//     })
//     .catch(error => {
//       console.log("----------------数据错误-----------------")
//       console.log(error);
//       ctx.body = {
//         code:0,
//         msg:"FALSE"
//       }
//     });
// })






//获取用户信息
router.post('/proxy_userinfo', async (ctx, next) => {
  var openid = ctx.request.body.openid;
  var client_id = ctx.request.body.client_id;
  var access_token = ctx.request.body.access_token;
  var nowdate = timeway.nowdateway(0).date1;
  var random16 = toolway.randomWord(false, 16);
  var ipstr = ipaddress.getClientIP(ctx);

  await  axios.get('https://graph.qq.com/user/get_user_info?access_token=' + access_token + '&oauth_consumer_key=' + client_id + '&openid=' + openid)
    .then(response => {
      console.log("----------------数据成功-----------------")
      console.log(response.data)
            if (response.data.ret != 1002) {
              


              
            
            } else {
              ctx.body = {
                success: false,
                data:null,
                message: '登录失败',
                code: 2
              };
            }

    })
    .catch(error => {
      console.log("----------------数据错误-----------------")
      console.log(error);
      ctx.body = {
        success: false,
        data: null,
        message: '登录异常',
        code: 9999
      };
    });

})










module.exports = router