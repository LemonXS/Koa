const DBusers = require("../db/users.js");


 function login(option){
    return   DBusers.login(option);
}

function add(toption,option){
    return  DBusers.add(toption,option);
    }
exports.login=login;
exports.add=add;