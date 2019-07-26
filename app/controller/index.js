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


 //显示学员信息
  router.get('/show',async (ctx)=>{
    var result=await mongoDB.find('user',{});
    console.log("find条件查找后的返回："+JSON.stringify(result));
    await ctx.render('show',{
        list:result
    });
})
  //增加学员
  router.get('/add',async (ctx)=>{
      await ctx.render('add');
  })


  //执行增加学员的操作
  router.post('/doAdd',async (ctx)=>{
      console.log("【执行增加学员的操作】")
      console.log(ctx.request.body)

      //获取表单提交的数据
     // console.log(ctx.request.body);  //{ username: '王麻子', age: '12', sex: '1',pwd:"123456" }
      let data=await mongoDB.insert('user',ctx.request.body);
      
      //console.log(data);
      console.log("添加后的返回："+data);
      try{
          if(data.result.ok){
              ctx.redirect('/')
          }
      }catch(err){
          console.log(err);
          return;
          ctx.redirect('/add');
      }
  
  
  
  })
  
  
  
  //编辑学员
  router.get('/edit',async (ctx)=>{
      //通过get传过来的id来获取用户信息
      let id=ctx.query.id;
      console.log("返回的id："+id);
      let data=await mongoDB.find('user',{"_id":mongoDB.getObjectId(id)});
      console.log("_id查找后的返回："+JSON.stringify(data));
      //获取用户信息
      await ctx.render('edit',{
          list:data[0]
      });
  })
  
  
  router.post('/doEdit',async (ctx)=>{
      //通过get传过来的id来获取用户信息
      //console.log(ctx.request.body);
      var id=ctx.request.body.id;
      var username=ctx.request.body.username;
      var age=ctx.request.body.age;
      var sex=ctx.request.body.sex;
      var pwd=ctx.request.body.pwd;
      console.log("【doEdit】")
      console.log(ctx.request.body)
      let data=await mongoDB.update('user',{"_id":mongoDB.getObjectId(id)},{
          "username":username,"age":age,"sex":sex,"pwd":pwd
      })
      console.log("修改后的返回："+data);
      try{
          if(data.result.ok){
              ctx.redirect('/')
          }
      }catch(err){
          console.log(err);
          return;
          ctx.redirect('/');
      }
  })
  
  
  //删除学员
  router.get('/delete',async (ctx)=>{
      let id=ctx.query.id;
      var data=await mongoDB.remove('user',{"_id":mongoDB.getObjectId(id)});
      console.log("删除后的返回："+data);
      if(data){
          ctx.redirect('/')
      }
  
  })
  

 



module.exports = router
