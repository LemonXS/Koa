
/**
 *当前或前几个月的时间
 * @param {*} num1 0 代表当前月
 * @returns
 */
function nowdateway(num1){
    let nowdate = new Date();
    nowdate.setMonth(nowdate.getMonth()-num1 );
    let y = nowdate.getFullYear();
    let m = nowdate.getMonth()+1;
    let d = nowdate.getDate();
    let h =nowdate.getHours();
    let f =nowdate.getMinutes();
    let s= nowdate.getSeconds();
    let ms= nowdate.getMilliseconds();
    return {
        //到毫秒 纯数字
        "date0":y + "" + (m < 10 ? "0" + m : m)+""+(d < 10 ? "0" + d : d)+""+ (h < 10 ? "0" + h : h)+""+ (f < 10 ? "0" + f : f)+""+ (s < 10 ? "0" + s : s)+""+(ms<100?(ms<10?"00"+ms:"0"+ms):ms),
        //时间
        "date1":y + "-" + (m < 10 ? "0" + m : m)+"-"+(d < 10 ? "0" + d : d)+" "+ (h < 10 ? "0" + h : h)+":"+ (f < 10 ? "0" + f : f)+":"+ (s < 10 ? "0" + s : s) ,
       
    };
};

exports.nowdateway=nowdateway;