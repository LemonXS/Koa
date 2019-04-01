const DBConfig = require("../../Config/DBConfig.js");

/**
 *mongodb里面查询 _id 把字符串转换成对象
 * @param {*} option
 * @returns
 */
function getObjectId( option) {
    return DBConfig.getObjectId(option);
}



// 【登录】
function login(option) {
    return DBConfig.findOne('user', option);
}


/**
 * 【添加】
 * @param {*} toption  表名
 * @param {*} option    参数
 */
function add(toption, option) {
    return DBConfig.insert(toption, option);
}

/**
 *【删除】
 * @param {*} toption 表名
 * @param {*} option 参数
 * @returns
 */
function del(toption, option) {
    return DBConfig.remove(toption,option );
}


/**
 *【查询】
 * @param {*} toption 表名
 * @param {*} option 参数
 * @returns
 */
  function find(toption, option) {
    return DBConfig.find(toption,option);
}



exports.getObjectId=getObjectId;
exports.login = login;
exports.add = add;
exports.del = del;
exports.find = find;