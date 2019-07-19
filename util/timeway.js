
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

//年月范围  (0代表本月  1代表上月)
//num1 当前时间前    num1个月
//num2 前几个时间基础上     的时间加上num2个月
// console.log(datefwway(5,5))  此为当前月份的前六个月
function monthDate(num1,num2){
    var nowdate = new Date();
    nowdate.setMonth(nowdate.getMonth()-num1 );
    var y = nowdate.getFullYear();
    var m = nowdate.getMonth()+1;
    var d = nowdate.getDate();

    var nowdate1 = new Date(y+"-"+m+"-"+d);
    nowdate1.setMonth(nowdate1.getMonth()+num2 );
    var y1 = nowdate1.getFullYear();
    var m1 = nowdate1.getMonth()+1;
    var d1=nowdate1.getDate();


    var rdate = new Date(y, m, 0);   //Wed Mar 31 00:00:00 UTC+0800 2010 
    var rdate1 = new Date(y1, m1, 0);   //Wed Mar 31 00:00:00 UTC+0800 2010 
    var  r=rdate.getDate();
    var  r1=rdate1.getDate();
    return {
        //到月
        "date1":y + "年" + (m < 10 ? "0" + m : m)+"月"+" 至 "+y1 + "年" + (m1 < 10 ? "0" + m1 : m1)+"月" ,
        "date2":y + "-" + (m < 10 ? "0" + m : m)+" 至 "+y1 + "-" + (m1 < 10 ? "0" + m1 : m1),
        "date3":{stime:y+""+(m < 10 ? "0" + m : m),endtime:y1 + "" + (m1 < 10 ? "0" + m1 : m1)},
       //开始01，结尾月末
        "date4":y + "年" + (m < 10 ? "0" + m : m)+"月"+"01"+"日"+" 至 "+y1 + "年" + (m1 < 10 ? "0" + m1 : m1)+"月"+ (r1 < 10 ? "0" + r1 : r1)+"日",
        "date5": y + "-" + (m < 10 ? "0" + m : m)+"-"+"01"+" 至 "+y1 + "-" + (m1 < 10 ? "0" + m1 : m1)+"-"+(r1 < 10 ? "0" + r1 : r1),
        "date6":{stime:y+""+(m < 10 ? "0" + m : m)+""+"01",endtime:y1 + "" + (m1 < 10 ? "0" + m1 : m1)+""+(r1 < 10 ? "0" + r1 : r1)},
        "date7": {stime:y+"-"+(m < 10 ? "0" + m : m)+"-"+"01",endtime:y1 + "-" + (m1 < 10 ? "0" + m1 : m1)+"-"+(r1 < 10 ? "0" + r1 : r1)},
       //开始01，当天结束
       "date8": y + "-" + (m < 10 ? "0" + m : m)+"-"+"01"+" 至 "+y1 + "-" + (m1 < 10 ? "0" + m1 : m1)+"-"+(d1 < 10 ? "0" + d1 : d1),
       "date9":{stime:y+"-"+(m < 10 ? "0" + m : m)+"-"+"01",endtime:y1 + "-" + (m1 < 10 ? "0" + m1 : m1)+"-"+(d1 < 10 ? "0" + d1 : d1)}

    };
}

//当前最新时间
function getnewdateway(){
    var nowdate = new Date();
    nowdate.setMonth(nowdate.getMonth());
    var y = nowdate.getFullYear();
    var m = nowdate.getMonth() + 1;
    var d = nowdate.getDate();

    var h = nowdate.getHours();
    var f = nowdate.getMinutes();
    var s = nowdate.getSeconds();
    return {
        date1: y + "-" + (m < 10 ? "0" + m : m) + "-" + (d < 10 ? "0" + d : d)+" "+(h < 10 ? "0" + h : h)+":"+(f < 10 ? "0" + f : f)+":"+(s < 10 ? "0" + s : s),
        date2: y + "" + (m < 10 ? "0" + m : m) + "" + (d < 10 ? "0" + d : d) +""+(h < 10 ? "0" + h : h)+""+(f < 10 ? "0" + f : f)+""+(s < 10 ? "0" + s : s)
    }
}


exports.nowdateway=nowdateway;
exports.monthDate=monthDate;
exports.getnewdateway=getnewdateway;

