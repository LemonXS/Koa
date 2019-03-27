const router = require('koa-router')();
const DB = require("../../Config/DBConfig.js");


// router.get("/", async (ctx, next) => {
//   await ctx.render("index", {
//     title: "Hello Koa 2!"
//   });
// });

// router.get("/string", async (ctx, next) => {
//   ctx.body = "koa2 string";
// });

// router.get("/json", async (ctx, next) => {
//   ctx.body = {
//     title: "koa2 json"
//   };
// });

//------------------【Mongodb测试】
//显示学员信息
router.get('/',async (ctx)=>{
      var result=await DB.find('user',{});
      console.log("find条件查找后的返回："+JSON.stringify(result));
      await ctx.render('index',{
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
      let data=await DB.insert('user',ctx.request.body);
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
      let data=await DB.find('user',{"_id":DB.getObjectId(id)});
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
      let data=await DB.update('user',{"_id":DB.getObjectId(id)},{
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
      var data=await DB.remove('user',{"_id":DB.getObjectId(id)});
      console.log("删除后的返回："+data);
      if(data){
          ctx.redirect('/')
      }
  
  })
  

 



module.exports = router
