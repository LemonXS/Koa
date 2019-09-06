const query = require('../../../Config/MySqlConfig');


/** 【登录接口】
 * row[0] 判断当前是否为第一次登录(只看是否有此用户)
 * row[1] 查询当当前账号密码是否匹配(账户是否被禁用等等...)
 * @param {*} option (登录类型,登录标识，密码凭证   )
 * @returns
 */
async function  user_login(option) {
    console.log("请求值")
    console.log(option)
    console.log(option[0])
 return await  query(" call p_user_login(?,?,?) ",option)
}
exports.user_login=user_login;

/** user表添加
 * @param {*} uid   用户的唯一标识
 * @param {*} nick_name  用户昵称
 * @param {*} gender     性别
 * @param {*} birthday   生日
 * @param {*} face       头像
 * @param {*} register_source  注册类型-三方登录类型（qq，wechart，weibo，local）
 * @param {*} createtime   注册时间  (不用传值)
 * @param {*} status       账号状态（0 停用,1 正常）
 * @returns
 */
async function  user_Uregister(option) {
 return await  query("insert into `user`(uid,nick_name,gender,birthday,face,register_source,createtime,status) value(?,?,?,?,?,?,now(),?) ",option)
}
exports.user_Uregister=user_Uregister;

/** user_auths表添加
 * @param {*} uid      用户的唯一标识
 * @param {*} identity_type  登录类型（qq，wechart，weibo，local）
 * @param {*} identifier     登录识别号  标识 openid等唯一标识
 * @param {*} credential     登录凭证 密码凭证(三方登录填token,本地就是密码)
 * @param {*} createtime     创建时间  (不用传值)
 * @param {*} ip             创建时的ip
 * @param {*} status         账号状态（0 停用,1 正常）
 * @param {*} extend1        扩展字段1
 * @param {*} extend2        扩展字段2
 * @param {*} extend3        扩展字段3
 * @returns
 */
async function  user_UAregister(option) {
    return await  query(" insert into `user_auths`(uid,identity_type,identifier,credential,createtime,ip,status,extend1,extend2,extend3) value(?,?,?,?,now(),?,?,null,null,null) ",option)
   }
exports.user_UAregister=user_UAregister;



/** 登陆成功写入tokenlog
 * @param {*} uid       用户id
 * @param {*} identity_type   登录类型
 * @param {*} logintime 登录时间
 * @param {*} randomkey 登录随机码
 * @param {*} ip        登录的ip
 * @returns
 */
async function  user_TokenAdd(option) {
    return await  query(" insert into user_token(uid,identity_type,logintime,randomkey,ip) value(?,?,now(),?,?)",option)
   }
exports.user_TokenAdd=user_TokenAdd;



/**路由token比对（验证）
 * @param {*} uid       用户id
 * @param {*} identity_type   登录类型
 * @param {*} randomkey 登录随机码
 * @param {*} ip        登录的ip
 * @returns
 */
async function  user_Token(option) {
    return await  query(" call p_user_token(?,?,?,?)",option)
   }
exports.user_Token=user_Token;


/**注册时验证 该用户名是否已存在
 * @param {*} identity_type   登录类型
 * @param {*} identifier 登录名
 * @returns
 */
async function  user_register_verify(option) {
    return await  query(" call p_user_register_verify(?,?)",option)
   }
exports.user_register_verify=user_register_verify;



/**用户基本信息
 * @param {*} uid  用户id
 * @param {*} identity_type   登录类型
 * @returns
 */
async function  user_userinfo(option) {
    return await  query(" call p_user_userinfo(?,?)",option)
   }
exports.user_userinfo=user_userinfo;
