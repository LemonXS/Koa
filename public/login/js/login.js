layui.use(['layer'], function(){
    var layer = layui.layer;
          imgVer({
              el:'$("#imgVer")',
              width:'260',
              height:'116',
              img:[
                  '/public/login/images/logo_1.jpg',
                  '/public/login/images/logo_2.jpg',
                  '/public/login/images/logo_3.jpg'
              ],
              success:function (result) {
                  //alert('执行登录函数');
                  $(".login").css({
                      "left":"0",
                      "opacity":"1"
                  });
                  $(".verBox").css({
                      "left":"404px",
                      "opacity":"0"
                  });
                  console.log("【滑块成功】");
                  console.log(result);
                  $("#div_tips").empty();
  
                  var uname=$(".username").val().trim();
                  var pwd=$(".password").val().trim();
                     $.ajax({
                      url:"/login",
                      type:"post",
                      dataType:"json",
                      data:{username:uname,
                      pwd:pwd},
                      success:function(obj){
                          if(obj.success==true){
                             layer.msg('登陆成功', {icon: 6});
                             window.location.href="/"
                          }else{
                              layer.msg('【账号密码错误】', {icon: 5});
                              console.log(obj.message)
                          }
                      },
                      error:function(err){
                          console.log("异常ERR："+JSON.stringify(err))
                      }
                  })
              },
              error:function (herr) {
              console.log("【herr】"+JSON.stringify(herr))
              }
          });
          $(".submit").on('click',function () {
              var uname=$(".username").val().trim();
              var pwd=$(".password").val().trim();
              if(uname.length<6) {
                  $(".username").attr("style","border:1px solid red;")
                  layer.msg('账号必须最少6位数', {icon: 0});
              } else if(pwd.length<6) {
                  $(".password").attr("style","border:1px solid red;")
                  layer.msg('密码必须最少6位数', {icon: 0});
              } else {
                  $(".username").removeAttr("style","border:1px solid #9DA3A6;")
                  $(".password").removeAttr("style","border:1px solid #9DA3A6;")
  
                  $(".login").css({
                      "left":"-404px",
                      "opacity":"0"
                  });
                  $(".verBox").css({
                      "left":"0",
                      "opacity":"1"
                  });
              }
          })
         
  });