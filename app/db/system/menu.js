const query = require('../../../Config/MySqlConfig');

//index 页面的菜单加载
async function  system_navs(option) {
 return await  query(" call p_system_navs() ",option)
}
exports.system_navs=system_navs;

//菜单页面的数据加载
async function  system_menu(option) {
    return await  query(" call p_system_menu()",option)
   }
   exports.system_menu=system_menu;