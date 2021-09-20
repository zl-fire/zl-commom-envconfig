const path = require("path");
const zl_nodefs = require("zl-nodefs");
let json = zl_nodefs.readFileContent({ filePath:path.join(__dirname,"../config/test.js") });
zl_nodefs.writeFile({ path: path.join(__dirname,"../index.js") , content: json, showExeResult: false });