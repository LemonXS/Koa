const DBusers = require("../db/users.js");


 function login(option){
    return   DBusers.login(option);
}

exports.login=login;