//【图片验证码】
const router = require('koa-router')()
const svgCaptcha = require('svg-captcha');
router.prefix('/api') //很重要，可以在当前地址前面添加一个 前缀 /xxx
router.get('/yzmcode',async (ctx) => {
  const cap = svgCaptcha.create({
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
  ctx.session.captcha = cap.text.toLowerCase(); // session 存储验证码数值
  console.log("【验证码文本】")
  console.log(cap.text.toLowerCase());
  ctx.response.type = 'image/svg+xml';
  ctx.body = cap.data;
})
module.exports = router;