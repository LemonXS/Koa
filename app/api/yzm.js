//【图片验证码】
const router = require('koa-router')()
const svgCaptcha = require('svg-captcha');
const aes256way = require("../../util/safety.js"); //拓展方法池
const aeskey= require("../../Config/Config.js").aes256key; //私钥
const aesiv= require("../../Config/Config.js").ivkey; //私钥

router.prefix('/api') //很重要，可以在当前地址前面添加一个 前缀 /xxx
router.get('/yzmcode',async (ctx) => {
  const cap = svgCaptcha.create({
          //随机长度
          size:4,
          // 翻转颜色
          inverse: false,
          // 字体大小
          fontSize: 36,
          // 噪声线条数
          noise: 3,
          // 宽度
          width: 80,
          // 高度
          height: 30,
      });
     try {
      ctx.session.captcha =  aes256way.encryption(cap.text.toLowerCase(),aeskey,aesiv); // session 存储验证码数值
     } catch (error) {
     }
  console.log("【验证码文本】")
  console.log(cap.text.toLowerCase());
  console.log(ctx.session.captcha);
  ctx.response.type = 'image/svg+xml';
  ctx.body = cap.data;
})
module.exports = router;