const DBConfig = require("../Config/DBConfig.js");

function login(option){
return  DBConfig.find('user',option);
}
exports.login=login;