/**
 * @getClientIP
 * @desc 获取用户 ip 地址
 * @param {Object} req - 请求
 */
function getClientIP(req) {
    let ip= req.headers['x-forwarded-for'] || // 判断是否有反向代理 IP
        req.ip  ||
        req.connection.remoteAddress || // 判断 connection 的远程 IP
        req.socket.remoteAddress || // 判断后端的 socket 的 IP
        req.connection.socket.remoteAddress || "";
        if(ip){
            ip=  ip.replace('::ffff:','');
        }
        return ip;
        // var ip = req.headers['x-forwarded-for'] ||
        //     req.ip ||
        //     req.connection.remoteAddress ||
        //     req.socket.remoteAddress ||
        //     req.connection.socket.remoteAddress || '';
        // if(ip.split(',').length>0){
        //     ip = ip.split(',')[0]
        // }
        // return ip;
};


module.exports = {getClientIP}