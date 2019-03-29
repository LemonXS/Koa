function nowdateway(num1){
    var nowdate = new Date();
    nowdate.setMonth(nowdate.getMonth()-num1 );
    var y = nowdate.getFullYear();
    var m = nowdate.getMonth()+1;
    var d = nowdate.getDate();
    var h =nowdate.getHours();
    var f =nowdate.getMinutes();
    var s= nowdate.getSeconds();
    return {
        "date1":y + "-" + (m < 10 ? "0" + m : m)+"-"+(d < 10 ? "0" + d : d)+" "+ (h < 10 ? "0" + h : h)+":"+ (f < 10 ? "0" + f : f)+":"+ (s < 10 ? "0" + s : s) ,
       
    };
}
console.log(nowdateway(3))