const router = require('koa-router')()
const log4js = require('../../Logs/log4js');
// router.prefix('/users') //很重要，可以在当前地址前面添加一个 前缀 /xxx

const S_users = require("../service/users.js");
// const jwt = require('jsonwebtoken')
// const uuid = require('node-uuid');//guid  生成唯一key
// const secret = require("../../Config/Config.js").secret; //私钥
// const toolway = require("../../util/tool.js"); //拓展方法池
// const timeway = require("../../util/timeway.js"); //拓展方法池
// const ipaddress = require("../../util/ip.js"); //拓展方法池
// const aeskey= require("../../Config/Config.js").aes256key; //私钥
// const aesiv= require("../../Config/Config.js").ivkey; //私钥
const aes256way = require("../../util/safety.js"); //拓展方法池
const tokenutil = require("../../util/token.js");


// router.get('/index', async (ctx) => {
//     await ctx.render('index',{
//         title:"HAHA"
//     });
// })

router.get('/', async (ctx) => {
    let tokencookie = ctx.cookies.get('guid');
    if(tokencookie!="" && tokencookie!=undefined){
        console.log("---------------------------------------【Cookie使用中】------------------------------------")
        //解密 guid 获取cookie信息
        var deaes256Str=aes256way.decryption(tokencookie);
        let deTokenStr= await tokenutil.deToken(deaes256Str);
        // console.log(deTokenStr)
        if(deTokenStr!=false){
            console.log("---------------------------------------【Cookie验证成功】------------------------------------")
           
            let userinfoData= await   S_users.user_userinfo([deTokenStr.uid,deTokenStr.identity_type]);
            // console.log(JSON.stringify(userinfoData))
            await ctx.render('index',{
                title:userinfoData
            });
        }else{
            console.log("---------------------------------------【Cookie解码失败】------------------------------------")
            await ctx.render('login');
        }
    }else{
        console.log("---------------------------------------【Cookie失效】------------------------------------")
        await ctx.render('logout');
    }
  // console.log("-------------uuidStr-------------");
  // var uuidStr=uuid.v1();
  //  console.log(uuidStr)
  // console.log("-------------nowdate-------------");
  // var nowdate = timeway.nowdateway(0).date0;
  // console.log(nowdate)
  // console.log("-------------random16-------------");
  // var random16 = toolway.randomWord(false, 16);
  // console.log(random16)
  // console.log("-------------enToken-------------");
  // let enTokenStr= tokenutil.enToken({a:"123",b:"456"},"1Q2W3E");
  // console.log(enTokenStr)
  // console.log("-------------enAse256-------------");
  // var enaes256Str= aes256way.encryption(enTokenStr);
  // console.log(enaes256Str)
  // console.log("-------------deAse256-------------");
  // var deaes256Str=aes256way.decryption(enaes256Str);
  // console.log(deaes256Str)
  // console.log("-------------deToken-------------");
  // let deTokenStr= await tokenutil.deToken(deaes256Str,"1Q2W3E");
  // console.log(deTokenStr)

})

// 页面模板
router.get('/PageTemplate', async (ctx) => {
    await ctx.render('PageTemplate');
})



module.exports = router
