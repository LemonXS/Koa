const DBConfig = require("../../Config/DBConfig.js");

// 【登录】
function login(option){
return  DBConfig.findOne('user',option);
}


/**
 * 【添加】
 * @param {*} toption  表名
 * @param {*} option    参数
 */
function add(toption,option){
    return  DBConfig.insert(toption,option);
    }
exports.login=login;
exports.add=add;