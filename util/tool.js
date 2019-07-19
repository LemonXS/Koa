

const crypto = require('crypto');
const uuid = require('node-uuid');//guid  生成唯一key
/*
** randomWord 产生任意长度随机字母数字组合
** randomFlag-是否任意长度 min-任意长度最小位[固定位数] max-任意长度最大位
*/
//【使用方法】
//生成3-32位随机串：randomWord(true, 3, 32)
//生成43位随机串：randomWord(false, 16)
function randomWord(randomFlag, min, max){
    var str = "",
        range = min,
        arr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
 
    // 随机产生
    if(randomFlag){
        range = Math.round(Math.random() * (max-min)) + min;
    }
    for(var i=0; i<range; i++){
        pos = Math.round(Math.random() * (arr.length-1));
        str += arr[pos];
    }
    return str;
}


/**
 * md5 加密
 * @param {*} data 要加密的数据
 * @returns
 */
function md5(data){
    var md5 = crypto.createHash('md5');
     return md5.update(data).digest('hex');
}
// console.log(md5("123456"))


//v1 是基于时间戳生成uuid(会生成一个唯一的key作为 用户id)
function getuuid(){
   return uuid.v1();
}


//随机生成姓名
function getRandomName() {
    var firstNames = new Array("赵", "钱", "孙", "李", "周", "吴", "郑", "王", "冯", "陈",
        "褚", "卫", "蒋", "沈", "韩", "杨", "朱", "秦", "尤", "许", "何", "吕", "施", "张", "孔", "曹", "严", "华", "金", "魏",
        "陶", "姜", "戚", "谢", "邹", "喻", "柏", "水", "窦", "章", "云", "苏", "潘", "葛", "奚", "范", "彭", "郎", "鲁", "韦",
        "昌", "马", "苗", "凤", "花", "方", "俞", "任", "袁", "柳", "酆", "鲍", "史", "唐", "费", "廉", "岑", "薛", "雷", "贺",
        "倪", "汤", "滕", "殷", "罗", "毕", "郝", "邬", "安", "常", "乐", "于", "时", "傅", "皮", "卞", "齐", "康", "伍", "余",
        "元", "卜", "顾", "孟", "平", "黄", "和", "穆", "萧", "尹", "欧阳", "慕容"
    );
    var secondNames = new Array("子璇", "淼", "国栋", "夫子", "瑞堂", "甜", "敏", "尚", "国贤", "贺祥", "晨涛", "昊轩", "易轩", "益辰", 
        "益帆", "益冉", "瑾春", "瑾昆", "春齐", "杨", "文昊", "东东", "雄霖", "浩晨", "熙涵", "溶溶", "冰枫", "欣欣", "宜豪", "欣慧", "建政",
        "美欣", "淑慧", "文轩", "文杰", "欣源","松笠" , "榕润", "欣汝", "慧嘉", "新建", "建林", "亦菲", "林", "冰洁", "佳欣", "涵涵", "禹辰",
        "淳美", "泽惠", "伟洋", "涵越", "润丽", "翔", "淑华", "晶莹", "凌晶", "苒溪", "雨涵", "嘉怡", "佳毅", "子辰", "佳琪", "紫轩", "瑞辰",
        "昕蕊", "萌", "明远", "欣宜", "泽远", "欣怡", "佳怡", "佳惠", "晨茜", "晨璐", "运昊", "汝鑫", "淑君", "晶滢", "润莎", "榕汕", "佳钰",
        "佳玉", "晓庆", "一鸣", "语晨", "添池", "添昊", "雨泽", "雅晗", "雅涵", "清妍", "诗悦", "嘉乐", "晨涵", "天赫", "玥傲", "佳昊", "天昊",
        "萌萌", "若萌","忠林"
    );

    var firstLength = firstNames.length;
    var secondLength = secondNames.length;

    var i = parseInt(Math.random() * firstLength);
    var j = parseInt(Math.random() * secondLength);

    var name = firstNames[i] + secondNames[j];

    return name;

} 

//随机Bool 返回 true/false
function getRandomBool(){
 if(Math.round(Math.random())){
  return true;
 }else{
     return false;
 }
}
/**
 * 随机整数
 * @param {*} min 起始 1
 * @param {*} max 结束 100
 */
function randomNumber (min,max){
    var num = Math.floor(Math.random()*(max-min+1)+min);
    return num;
}


//随机头像
function getFace(){
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



exports.randomWord=randomWord;
exports.md5=md5;
exports.getuuid=getuuid;
exports.getRandomName=getRandomName;
exports.getRandomBool=getRandomBool;
exports.randomNumber=randomNumber;
exports.getFace=getFace;
