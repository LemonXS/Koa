const router = require('koa-router')();
// const mongoDB = require("../../Config/DBConfig.js");
const mysqlDB = require("../../Config/MySqlConfig.js");
const aes256way = require("../../util/safety.js"); //拓展方法池
const aeskey= require("../../Config/Config.js").aes256key; //私钥
const aesiv= require("../../Config/Config.js").ivkey; //私钥
const ipaddress = require("../../util/ip.js"); //拓展方法池
const assert = require('assert');

//测试mysl链接测试
//aes加密解密
router.get("/mysqlDB", async (ctx, next) => {
    assert.equal(1, 2);
       console.log("-----------------MySql-----------------------");
       try {
        await mysqlDB.findtableData(" users ",{"username ":"233"});
        console.log("【mysql链接测试成功】")
       } catch (error) {
          console.log("【mysql链接测试失败】") 
          console.log(error)
       }
       console.log("-----------------MongoDB-----------------------");
        await mongoDB.dbconn().then((db)=>{
            console.log("【mongoDB链接测试成功】")
             db.collection('user').insertOne({username:"11111",age:"1232323"},function(err,obj){
                console.log("【mongoDB链接测试成功】")
                 console.log(err)
                 console.log(obj.result)
             })
        }).catch((err)=>{
         console.log("【mongoDB链接测试--失败】")
            console.log(err)
        });
     



       console.log("【ase密钥】"+aeskey)
       console.log("【ase向量】"+aesiv)
       let aseen;
       try {
        aseen=  aes256way.encryption("123456",aeskey,aesiv);
        console.log("【ase-256加密---成功】");
       } catch (error) {
        console.log("【ase-256加密---失败】"); 
       }
       let asede;
      try {
        asede=  aes256way.decryption(aseen,aeskey,aesiv);
        console.log("【ase-256解密---成功】");
      } catch (error) {
        console.log("【ase-256解密---失败】");
      }
      
      console.log("【ip获取】："+  ipaddress.getClientIP(ctx))
      ctx.body = "我是【ase-加密解密】测试";
});



//------------------【Mongodb测试】


  //增加学员
  router.get('/add',async (ctx)=>{
      await ctx.render('add');
  })


 



module.exports = router
