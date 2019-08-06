const router = require('koa-router')()
const log4js = require('../../Logs/log4js');
const uuid = require('node-uuid');//guid  生成唯一key
router.prefix('/api') //很重要，可以在当前地址前面添加一个 前缀 /xxx
//短信接口




module.exports = router