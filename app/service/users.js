const DBusers = require("../db/users.js");


function login(option) {
    return DBusers.login(option);
}

function add(toption, option) {
    return DBusers.add(toption, option);
}

function del(toption, option) {
    return DBusers.del(toption, option);
}


  function find(toption, option) {
    return  DBusers.find(toption, option);
}



exports.login = login;
exports.add = add;
exports.del = del;
exports.find = find;