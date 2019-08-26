const router = require('koa-router')()
const log4js = require('../../Logs/log4js');
router.prefix('/api') //很重要，可以在当前地址前面添加一个 前缀 /xxx

//天气插件
router.get('/weather', async (ctx) => {
    await ctx.render('tool/weather');
})

//彩带花
router.get('/flowers', async (ctx) => {
    await ctx.render('tool/flowers');
})


module.exports = router
