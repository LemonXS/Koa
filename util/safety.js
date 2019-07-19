const crypto = require('crypto');
const c_aeskey= require("../Config/Config").aes256key; //私钥  aes256加密的私钥
const c_aesiv= require("../Config/Config.js").ivkey; //私钥 aes256加密的向量
const c_secret = require("../Config/Config.js").secret;//token的密钥
const c_appkey = require("../Config/Config.js").appkey;//session 或 cookie的密钥

//https://www.cnblogs.com/vipstone/p/5514886.html


let aesutil = module.exports = {};

/**
 * aes加密
 * @param data 待加密内容
 * @param key 必须为32位私钥
 * @param iv 向量
 * @returns {string}
 */
aesutil.encryption = function (data, key=c_aeskey, iv=c_aesiv) {
    // console.log("=========================+++++++=======================")
    // console.log(key)
    iv = iv || "";
    var clearEncoding = 'utf8';
    var cipherEncoding = 'base64';
    var cipherChunks = [];
    var cipher = crypto.createCipheriv('aes-256-ecb', key, iv);
    cipher.setAutoPadding(true);
    cipherChunks.push(cipher.update(data, clearEncoding, cipherEncoding));
    cipherChunks.push(cipher.final(cipherEncoding));
    return cipherChunks.join('');
}

/**
 * aes解密
 * @param data 待解密内容
 * @param key 必须为32位私钥
 * @param iv 向量
 * @returns {string}
 */
aesutil.decryption = function (data,key=c_aeskey, iv=c_aesiv) {
    // console.log("=======================================================")
    // console.log(key)
    if (!data) {
        return "";
    }
    iv = iv || "";
    var clearEncoding = 'utf8';
    var cipherEncoding = 'base64';
    var cipherChunks = [];
    var decipher = crypto.createDecipheriv('aes-256-ecb', key, iv);
    decipher.setAutoPadding(true);
    cipherChunks.push(decipher.update(data, cipherEncoding, clearEncoding));
    cipherChunks.push(decipher.final(clearEncoding));
    return cipherChunks.join('');
}