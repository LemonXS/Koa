
  document.onkeydown = function(e){
    var ev = document.all ? window.event : e;
    if(ev.keyCode==13) {
        $(".submit").click();
    }
}


layui.use(['layer'], function(){
    var layer = layui.layer;
          $(".submit").on('click',function () {
            console.log("【cookie】");
            console.log(document.cookie);
              var uname=$(".username").val().trim();
              var pwd=$(".password").val().trim();
              var yzm=$(".yzm").val().trim();
              $(".username").removeClass("input_succ").addClass("input_succ");
              $(".password").removeClass("input_succ").addClass("input_succ");
              $(".yzm").removeClass("input_succ").addClass("input_succ");
              if(uname.length<6 || issql(uname)) {
                  $(".username").removeClass("input_succ").addClass("input_err");
                  layer.msg('账号格式错误', {icon: 0});
                  return false;
              }
               if(pwd.length<6 || issql(pwd)) {
                  $(".password").removeClass("input_succ").addClass("input_err");
                  layer.msg('密码格式错误', {icon: 0});
                  return false;
              } 
               if(yzm.length !=4 || issql(yzm)){
                  $(".yzm").removeClass("input_succ").addClass("input_err");
                  layer.msg('验证码格式错误', {icon: 0});
                  return false;
              } 

               {
                  var uname=$(".username").val().trim();
                  var pwd=$(".password").val().trim();
                  var yzm=$(".yzm").val().trim();
                     $.ajax({
                      url:"/login",
                      type:"post",
                      dataType:"json",
                      data:{
                          username:uname,
                          pwd:pwd,
                          yzm,yzm},
                      success:function(obj){
                          if(obj.success==true){
                             layer.msg('登陆成功', {icon: 6});
                             window.location.href="/"
                          }else{
                            if(obj.code==-1){
                                layer.msg('【账号或密码错误】', {icon: 5});
                                $(".yzm").text("");
                                $("#imgyzm").click();
                                console.log(obj.message)
                            }
                            if(obj.code==2){
                                layer.msg('【登录异常】', {icon: 5});
                                $(".yzm").text("");
                                $("#imgyzm").click();
                                console.log(obj.message);
                            }
                            if(obj.code==3){
                                layer.msg('【验证码错误】', {icon: 5});
                                $(".yzm").text("");
                                $("#imgyzm").click();
                                console.log(obj.message);
                            }
                          }
                      },
                      error:function(err){
                          console.log("异常ERR："+JSON.stringify(err))
                      }
                  })
              }
          })
  });






  /*是否带有小数*/
function    isDecimal(strValue )  {  
    var  objRegExp= /^\d+\.\d+$/;
    return  objRegExp.test(strValue);  
 }  
 
 /*校验是否中文名称组成 */
 function ischina(str) {
     var reg=/^[\u4E00-\u9FA5]{2,4}$/;   /*定义验证表达式*/
     return reg.test(str);     /*进行验证*/
 }
 
 /*校验是否全由8位数字组成 */
 function isStudentNo(str) {
     var reg=/^[0-9]{8}$/;   /*定义验证表达式*/
     return reg.test(str);     /*进行验证*/
 }

 /*校验是sql注入 */
 function issql(str) {
    var reg= /select|update|delete|exec|count|'|"|=|;|>|<|%/i;   /*定义验证表达式*/
    return reg.test(str);     /*进行验证*/
}


