#!/usr/bin/env node
let gitcktSpecdir = require("zl-gitckt-specdir");
let param = process.argv[2];//获取用户输入的参数
//显示帮助命令
if (param === "-help") {
    console.log("\n请在你项目的根目录下执行zl-env命令\n");
}
else if (param === "-v") {
    console.log("当前版本为:", require('../package.json').version);
}
else {
    // 从如下gitUrl地址拉取项目目录indexDB-demo,目录保存位置为saveDir，默认为当前命令执行时所在目录
    gitcktSpecdir({
        gitUrl: 'https://github.com/zl-fire/zl-commom-envconfig',
        dirName: 'env',
        saveDir: "./aa"
    })
}