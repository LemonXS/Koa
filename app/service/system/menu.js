const router = require('koa-router')()
const DB = require('../../db/system/menu');

async function  system_navs(option){
    let rows;
    try {
        rows= await DB.system_navs(option); 
        rows=navstoTree(rows[0])
        return  {code:200,success:true,msg:"",data:rows}
    } catch (error) {
        return {code:9999,success:false,msg:"异常错误",data:null};
    }
        // return {code:9999,success:false,msg:"异常错误",data:null};
}
exports.system_navs=system_navs;






async function  system_menu(option){
    let rows;
    try {
        rows= await DB.system_menu(option); 
        // rows=navstoTree(rows[0])
        return  {code:200,success:true,msg:"",data:rows[0]}
    } catch (error) {
        return {code:9999,success:false,msg:"异常错误",data:null};
    }
}
exports.system_menu=system_menu;



async function  system_menu_sort(option){
    let rows;
    try {
		rows= await DB.system_menu_sort(option); 
		// console.log(rows)
		console.log(rows[0])
		if(rows[0][0].num1==1 && rows[0][0].num2==1 ){
			return  {code:200,success:true,msg:"排序成功",data:[]}
		}else{
			return  {code:0,success:false,msg:"排序失败",data:[]}
		}
    } catch (error) {
        return {code:9999,success:false,msg:"异常错误",data:null};
    }
}
exports.system_menu_sort=system_menu_sort;





//-------------------------------------------------【公共事件】---------------------------------------------
//菜单专用格式转换----页面刷新
function navstoTree(data) {
	// 删除 所有 children,以防止多次调用
	data.forEach(function (item) {
		delete item.children;
	});
	// 将数据存储为 以 id 为 KEY 的 map 索引数据列
	var map = {};
	data.forEach(function (item) {
		map[item.id] = item;
	});
	var val = [];
	data.forEach(function (item) {
		// 以当前遍历项，的pid,去map对象中找到索引的id
		var parent = map[item.parent_id];
		// 好绕啊，如果找到索引，那么说明此项不在顶级当中,那么需要把此项添加到，他对应的父级中
		if (parent) {
			(parent.children || ( parent.children = [] )).push(item);
		} else {
			//如果没有在map中找到对应的索引ID,那么直接把 当前的item添加到 val结果集中，作为顶级
			item["ischeck"]=(item.ischeck==1?true:false);
			item["spread"]=(item.spread==1?true:false);
			val.push(item);
		}
	});
	return val;
}
