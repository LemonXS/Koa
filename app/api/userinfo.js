const router = require('koa-router')()
router.prefix('/api') //很重要，可以在当前地址前面添加一个 前缀 /xxx

router.post('/userinfo',async (ctx)=>{
    console.log("当前用户信息")
    ctx.response.type='json';
    ctx.body={
        status: 0,
        message: '数据验证',
        data:{
          a:"1",
          b:"2",
          c:"3"
        }
    }
})




module.exports = router