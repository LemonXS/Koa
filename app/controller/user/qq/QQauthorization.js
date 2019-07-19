const router = require('koa-router')()
const jwt = require('jsonwebtoken')
const Susers = require("../../../service/users.js");

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
  // console.log(ctx.request.body)
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
      ctx.body = {
        code: 200,
        msg: 'SUCCESS',
        openid: qqOpenid,
        client_id: qqClient_id
      }
    })
    .catch(error => {
      console.log("----------------错误-----------------")
      console.log(error);
      ctx.body = {
        code: 0,
        msg: 'FALSE',
        openid: '',
        client_id: ''
      }
    });
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


    //  //删除以前Cookie登录的记录
    //   // let deltrackdata = Susers.del('tracklog', {
    //   //   uid: openid
    //   // });
    //   //更新当前Cookie登录的记录
    //    Susers.add('tracklog', {
    //     uid: openid,
    //     username: response.data.nickname,
    //     randomkey: random16,
    //     logintime: nowdate,
    //     ip: ipstr 
    //   }).then((addresult) => {
    //     if (addresult.result.ok) {
            if (response.data.ret != 1002) {
              //生成token
              let tokenstr = tokenutil.enToken({
                randomkey: random16,
                ukey: openid,
                name: response.data.nickname,
                ip: ipstr
              });
             
                let asesign = aes256way.encryption(tokenstr);//aes加密token
                ctx.cookies.set('guid', asesign, {
                  signed: false,
                  path: '/', // 写cookie所在的路径 
                  maxAge: 2 * 60 * 60 * 1000, // cookie有效时长 
                  httpOnly: false, // 是否只用于http请求中获取 
                  overwrite: false // 是否允许重写 
                });
                log4js.logway("【登录记录】", "info", "【QQ记录】:" + "  用户标识：" + openid + "  用户名称：" + response.data.nickname)
              console.log("++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++")
                console.log(JSON.stringify({
                  randomkey: random16,
                  ukey: openid,
                  name: response.data.nickname,
                  ip: ipstr
                }))
                // console.log(tokenstr);
                // console.log(asesign);
                ctx.body = {
                  success: true,
                  data: [],
                  message: '登录成功',
                  code: 1
                };
            } else {
              ctx.body = {
                success: false,
                data: [],
                message: '登录失败',
                code: 1
              };
            }
         
      //   } else {
      //     ctx.body = {
      //       success: false,
      //       data: [],
      //       message: '登录异常',
      //       code: 2
      //     };
      //   }

      // }).catch(error => {
      //   ctx.body = {
      //     success: false,
      //     data: [],
      //     message: '登录异常',
      //     code: 2
      //   };
      // });
    })
    .catch(error => {
      console.log("----------------数据错误-----------------")
      console.log(error);
      ctx.body = {
        success: false,
        data: [],
        message: '登录异常',
        code: 2
      };
    });

})










module.exports = router