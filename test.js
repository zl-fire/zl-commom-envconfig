// let param = process.argv[2];//获取用户输入的参数
// console.log("==param===",param)
let path=require("path");
const zl_nodefs = require("zl-nodefs");
zl_nodefs.copycutFiledir({
    inputFileUrl: path.join(path.resolve("."),"public/index.html"),
    outFileUrl: path.join(path.resolve("."),"public/index2.html"),
    copyOrCut: "copy",
    showExeResult:false,
    rewrite:true
});