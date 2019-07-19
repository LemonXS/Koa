
//随机头像
function genFace(){
    const fs = require('fs');
    var url_img = "";
    var path = "./public/images/face/";
    //实际使用用域名，内部测试ip如下
    var ip = "127.0.0.1";
    //如果有端口就写，如果没有，跳过
    var port = "3000";
    var path_link = "http://"+ip + ":" + port + "/public/images/face/";
 
    var files = fs.readdirSync(path);
    var len = files.length;
    var randNum = Math.floor(Math.random()*len);
    var url_img = path_link + files[randNum];
    return url_img;
}
console.log(genFace())