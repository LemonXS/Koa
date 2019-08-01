const router = require('koa-router')()
const D_user = require('../db/users');

/**【登录接口】
 * row[0] 判断当前是否为第一次登录(只看是否有此用户)
 * row[1] 查询当当前账号密码是否匹配(账户是否被禁用等等...)
 * @param {*} option (登录类型,登录标识，密码凭证   
 * @returns
 */
async function  user_login(option){
    let rows= await D_user.user_login(option);
    try {
        if(rows[0].length==1){
            //当前登录的用户 已存在 本系统
              if(rows[1].length==1){
               //登录成功 
               return {code:0,success:true,msg:"登录成功",data:rows[1][0]};
              }else{
               //登录失败
               return {code:1,success:false,msg:"登录失败",data:null};
              }
           }else{
            //当前登录的用户 未已存在 本系统
            //  1.随机生成一个user表数据（一个基本信息，加入数据库，失败者code为3）
            //  2.当前未登录的账号绑定到当前随机账户上
            //  3.绑定成功则同为登陆成功，失败返回 （成功返回 code 0，失败 code1）
             return {code:4,success:false,msg:'未注册',data:null};
           }
     
    } catch (error) {
        return {code:9999,success:false,msg:"异常错误",data:null};
    }
}
exports.user_login=user_login;


/** user表添加
 * @param {*} uid   用户的唯一标识
 * @param {*} nick_name  用户昵称
 * @param {*} gender     性别
 * @param {*} birthday   生日
 * @param {*} face       头像
 * @param {*} register_source  注册类型-三方登录类型（qq，wechart，weibo，local）
 * @param {*} createtime   注册时间
 * @param {*} status       账号状态（0 停用,1 正常）
 * @returns
 */
async function  user_Uregister(option){
    let rows= await D_user.user_Uregister(option);
    if(rows.affectedRows>0){
        return {code:2,success:true,msg:"注册成功",data:rows};
    }else{
        return {code:3,success:false,msg:"注册失败",data:null};
    }
}
exports.user_Uregister=user_Uregister;


/**user_auths表添加
 * @param {*} uid      用户的唯一标识
 * @param {*} identity_type  登录类型（qq，wechart，weibo，local）
 * @param {*} identifier     登录识别号  标识 openid等唯一标识
 * @param {*} credential     登录凭证 密码凭证(三方登录填token,本地就是密码)
 * @param {*} createtime     创建时间
 * @param {*} ip             创建时的ip
 * @param {*} status         账号状态（0 停用,1 正常）
 * @param {*} extend1        扩展字段1
 * @param {*} extend2        扩展字段2
 * @param {*} extend3        扩展字段3
 * @returns
 */
async function  user_UAregister(option){
    let rows= await D_user.user_UAregister(option);
    if(rows.affectedRows>0){
        return {code:2,success:true,msg:"注册成功",data:rows};
    }else{
        return {code:3,success:false,msg:"注册失败",data:null};
    }
}
exports.user_UAregister=user_UAregister;


/**登陆成功写入tokenlog
 * @param {*} uid       用户id
 * @param {*} identity_type   登录类型
 * @param {*} logintime 登录时间
 * @param {*} randomkey 登录随机码
 * @param {*} ip        登录的ip
 * @returns
 */
async function  user_TokenAdd(option){
    let rows= await D_user.user_TokenAdd(option);
    if(rows.affectedRows>0){
        return {code:2,success:true,msg:"注册成功",data:rows};
    }else{
        return {code:3,success:false,msg:"注册失败",data:null};
    }
}
exports.user_TokenAdd=user_TokenAdd;


/**路由token比对（验证）
 * @param {*} uid       用户id
 * @param {*} identity_type   登录类型
 * @param {*} randomkey 登录随机码
 * @param {*} ip        登录的ip
 * @returns
 */
async function  user_Token(option){
    let rows= await D_user.user_Token(option);
    if(rows[0].length>0){
      return true;
    }else{
      return false;
    }
}
exports.user_Token=user_Token;


/**注册时验证 该用户名是否已存在
 * @param {*} identity_type   登录类型
 * @param {*} identifier 登录名
 * @returns
 */
async function  user_register_verify(option){
    let rows= await D_user.user_register_verify(option);
    try {
        if(rows[0].length==0){
            return true;
          }else{
            return false;
          }
    } catch (error) {
        console.log("【user_register_verify】"+JSON.stringify(error))
        return false;
    }
}
exports.user_register_verify=user_register_verify;


/**用户基本信息
 * @param {*} uid  用户id
 * @param {*} identity_type   登录类型
 * @returns
 */
async function  user_userinfo(option){
    let rows= await D_user.user_userinfo(option);
    if(rows[0].length==0){
        return [];
    }else{
        return rows[0][0];
    }
    
}
exports.user_userinfo=user_userinfo;