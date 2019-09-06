const query = require('../../../Config/MySqlConfig');


async function  system_navs(option) {
 return await  query(" call p_system_menu() ",option)
}
exports.system_navs=system_navs;