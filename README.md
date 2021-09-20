# zl-commom-envconfig
  一个为Node/React/vue/Angular等各js框架项目开发的通用环境配置模块，内置默认/开发/测试/线上四套环境配置，且还可以自己无限递加新的环境配置
  （只有是js项目，不管是前端js还是后端的nodejs,都可以通用此模块作为通用的多套环境配置解决方案）

## 引入与使用

1. 全局安装：npm i zl-commom-envconfig -g
   
2. 在你项目根目录下执行命令： zl-env create （此命令执行后会在项目根目录下生成env配置）

```js
env
├── config
│   ├── default.js
│   ├── dev.js
│   ├── prod.js
│   └── test.js
├── index.js
└── setEnv.js
```

3. 在你项目的package.json文件中配置脚本命令(package.json 和 生成的env文件夹需要在同一个目录，当然1，2步执行无误的话，默认应该就是)

```js
类似如下：
    "start": "node ./env/setEnv.js dev && roadhog server",
    "test": "node  ./env/setEnv.js test && roadhog server",
    "build": "node ./env/setEnv.js prod && roadhog build",
当然，你的脚本命令名字可能并不叫start，test，build等，这个无所谓，根据实际情况调整即可
```
   
4. 在你项目代码中引用：
```js
import object from '../../../env/index.js';
console.log("========object======",object)
```
![3](/assets/3.png)
5. 启动项目
     npm run ...

## 提示

这里我是将env配置目录放在项目的根目录下的，但是实际上只有导入的路径正确，你可以根据自己的需求放在任意的位置