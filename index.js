#!/usr/bin/env node
// let gitcktSpecdir = require("zl-gitckt-specdir");
let path=require("path");
const zl_nodefs = require("zl-nodefs");
let param = process.argv[2];//获取用户输入的参数
//显示帮助命令
if (param === "-help") {
    console.log("\n请在你项目的根目录下执行zl-env命令\n");
}
else if (param === "-v") {
    console.log("当前版本为:", require('../package.json').version);
}
else if(param === "create"){
    zl_nodefs.copycutFiledir({
        inputFileUrl: path.join(__dirname,"./env"),
        outFileUrl: path.join(path.resolve("."),"./env"),
        copyOrCut: "copy",
        showExeResult:false,
        rewrite:false
    });
 }
else {
    console.log("创建通用环境配置文件命令为：zl-env create");
}