//mysqlConfig.js
var mysql = require('mysql');

const config = {
    // 数据库配置
    database: {
        DATABASE: 'KoaProj', //数据库名称
        USERNAME: 'root', //mysql用户名
        PASSWORD: '13579468250', //mysql密码
        PORT: '3306', //mysql端口号
        HOST: '127.0.0.1' //服务器ip
    }
}
let pool = mysql.createPool({
    host: config.database.HOST,
    user: config.database.USERNAME,
    password: config.database.PASSWORD,
    database: config.database.DATABASE
});



   let  query= function (sql, option) {
        return new Promise((resolve, reject) => {
            pool.getConnection(function (err, connection) {
                if (err) {
                    reject(err)
                } else {
                    connection.query(sql, option, (err, rows) => {
                        if (err) {
                            reject(err)
                        } else {
                            resolve(rows)
                        }
                        connection.release()
                    })
                }
            })
        })
    };


module.exports = query;