module.exports = {
    description: "这是默认环境配置", //项目启动时优先读取默认配置，然后在读取当前环境对应配置，冲突的(只做浅层比较)以当前环境配置为准。
    env: "default",
    API: 'http://127.0.0.1:7012',
    projectName: "js项目通用环境配置"
};