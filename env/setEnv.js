const path = require("path");
const zl_nodefs = require("zl-nodefs");
let param = process.argv[2];//获取用户输入的参数
let indexObj=`
import defaultObj from "./config/default.js";
import ${param}Obj from "./config/${param}.js";
module.exports = {...defaultObj,...${param}Obj};
`;
zl_nodefs.writeFile({ path: path.join(__dirname,"./index.js") , content: indexObj, showExeResult: false });