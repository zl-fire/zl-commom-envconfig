const path = require("path");
const zl_nodefs = require("zl-nodefs");
let param = process.argv[2];//获取用户输入的参数
if (!param) {
    console.log("=========必须传入环境名=========");
    return;
}
let indexObj = `
import defaultObj from "./config/default.js";
import ${param}Obj from "./config/${param}.js";
module.exports = {...defaultObj,...${param}Obj};
`;
zl_nodefs.writeFile({ path: path.join(__dirname, "./index.js"), content: indexObj, showExeResult: false });

// 执行函数和命令的对应关系
let mapFnObj = {
    "staticHtml=true": function () {
        // 如果public目录下存在 index_环境名.html ，那么会将此环境对应的index.html内容自动写入到index.html，
        // 从而实现不同环境使用不同的index.html文件
        zl_nodefs.copycutFiledir({
            inputFileUrl: path.join(path.resolve("."), "public/index_" + param + ".html"),
            outFileUrl: path.join(path.resolve("."), "public/index.html"),
            copyOrCut: "copy",
            showExeResult: false,
            rewrite: true
        });
    },
    "staticJs=true": function () {
        // 如果public目录下存在 index_envcong.js ，那么会将此环境的配置自动写入到index_envcong.js，
        // 你可以在index.html中通过script标签引入index_envcong.js文件进行使用，从而实现不同环境下运行时都能读到对应的配置

        let defaultCont = require(path.join(__dirname, "./config/default.js"));
        let envCont = require(path.join(__dirname, "./config/" + param + ".js"));
        let content = `
    window.index_envcong=${JSON.stringify({ ...defaultCont, ...envCont }, null, 4)};
         `;
        zl_nodefs.writeFile({ path: path.join(path.resolve("."), "public/index_envcong.js"), content: content, showExeResult: false });
    }
}

process.argv.forEach((ele, i) => {
    ele=ele.trim();//去掉空格
    // 从下标为3的参数开始
    if (i > 2 && typeof mapFnObj[ele] == "function") {
        mapFnObj[ele]();//执行函数
    }
})

