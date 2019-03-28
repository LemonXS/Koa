//*************************** 生成日志文件 ******************************/
var log4js = require('log4js'); //加载log4js模块
log4js.configure({
    appenders: {
        InfoFile: {
            type: "dateFile",
            filename: 'Logs/log/log',//您要写入日志文件的路径
            alwaysIncludePattern: true,//（默认为false） - 将模式包含在当前日志文件的名称以及备份中
            //compress: true,//（默认为false） - 在滚动期间压缩备份文件（备份文件将具有.gz扩展名）
            pattern:"yyyy-MM-dd.log",//（可选，默认为.yyyy-MM-dd） - 用于确定何时滚动日志的模式。格式:.yyyy-MM-dd-hh:mm:ss.log
            encoding: 'utf-8',//default "utf-8"，文件的编码
            maxLogSize: 10000000 //文件最大存储空间，当文件内容超过文件存储空间会自动生成一个文件xxx.log.1的序列自增长的文件
        }
    },
    categories: {
        default: {
            appenders: ['InfoFile'],
            level: "ALL"//'INFO'
        },
        InfoFile: {
            appenders: ['InfoFile'],
            level:"ALL"//'INFO'
        }
    }
});


/**
 * 日志方法
 * @param {*} logtitle 日志输出类型标识（自定义）   信息/警告/错误
 * @param {*} logtype  日志输出类型                info/warn/error
 * @param {*} logcontent 日志输出内容
 */
function logway(logtitle, logtype, logcontent) {
    const log = log4js.getLogger(logtitle);
    switch (logtype) {
        case 'info':
            log.info(logcontent);
            break;
        case 'warn':
            log.warn(logcontent);
            break;
        case 'error':
            log.error(logcontent);
            break;
        default:
            log.info(logcontent);
            break;
    }
}

//************************   end   **************************************/
exports.logway = logway;
//用法
/**
 * 日志方法
 * @param {*} logtitle 日志输出类型标识（自定义）   信息/警告/错误
 * @param {*} logtype  日志输出类型                info/warn/error
 * @param {*} logcontent 日志输出内容
 */
// const log4js = require('../../Logs/log4js'); 
// log4js.logway("logtitle","logtype","logcontent")
// log4js.logway("记录","info" ,"发送错误的方法名称："+"这是错误的详细报告")
// log4js.logway("警告","warn" ,"发送错误的方法名称："+"这是错误的详细报告")
// log4js.logway("错误","error","发送错误的方法名称："+"这是错误的详细报告")