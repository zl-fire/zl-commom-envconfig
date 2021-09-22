# zl-commom-envconfig
  一个为Node/React/vue/Angular等各js框架项目开发的通用环境配置模块，内置默认/开发/测试/线上四套环境配置，且还可以自己无限递加新的环境配置
  **（只要是js项目，不管是前端js还是后端的nodejs,都可以通用此模块作为通用的多套环境配置解决方案）**

## 起因

在开发中，经常多个项目，多个框架（vue/react/angular/jquery），甚至是前端js,后端nodejs,nodejs的各种框架 并行开发。

这时都会面临同一个问题，那就是任何项目都至少有开发环境和线上环境两套，甚至更多。

每套环境都会有不同的环境变量。不同框架基本都做了封装。

如果只是单独的使用一个框架没什么问题，但是当我们同时进行多个项目多种框架开发时，对于环境配置使用上都会有些不一样，还是有点烦，并且有时公有配置迁移也因此变得更麻烦。

所以，就简单的开发了一个用于在任何框架通用实现，多套环境配置的小模块，如下，原理非常简单，代码也不复杂，但是很实用。

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

3. 在你项目的package.json文件中配置脚本命令，即加上命令： node ./env/setEnv.js 环境名
```js
如：
   node ./env/setEnv.js dev   dev表示开发环境
   node ./env/setEnv.js test  test表示测试环境
   node ./env/setEnv.js prod  prod表示生成环境

   这几个环境名，都是需要和config下的环境配置文件名一致的
```

```js
实际使用类似如下：
    "start": "node ./env/setEnv.js dev && roadhog server",
    "test": "node  ./env/setEnv.js test && roadhog server",
    "build": "node ./env/setEnv.js prod && roadhog build",
    当然，你的脚本命令名字可能并不叫start，test，build等，这个无所谓，根据实际情况调整即可，只有config下的配置文件名和脚本中的配置文件名一致即可
```
   
4. 在你项目代码中引用：
```js
import object from '../../../env/index.js'; //这引入的文件路径请以你实际的路径为准
console.log("========object======",object)
```
![3](/assets/3.png)

5. 启动项目
     npm run ...

## 提示

这里我是将env配置目录放在项目的根目录下的，但是实际上只有导入的路径正确，你可以根据自己的需求放在任意的位置

# 1.0.2 版本更新内容

本次版本共更新两点

### 更新点一

对于我们前端SPA单页应用,运行和打包时，一般都是取的public/index.html作为页面载体.

本版本更新就是让你可以配置多个环境的 【index_环境名.html】，从而在不同的环境读取不同的index.html
 (这种需求较小，但是还是有的，比如我现在就遇到了...)

 **实现**

 第一步： 在publi下准备多个环境的index.html文件，如：

 ```js
 index_dev.html
 index_test.html
 index_prod.html
 ```
 第二步：在脚本命令中加上参数  staticHtml=true ,如：
 ```js
    "start": "node ./env/setEnv.js dev staticHtml=true && roadhog server",
    "test": "node  ./env/setEnv.js test staticHtml=true && roadhog server",
    "build": "node ./env/setEnv.js prod staticHtml=true && roadhog build",
 ```
两步完成后，当我们启动服务时，就会去读取对应环境的index.html文件了
 
 ### 更新点二

 有时候，我们在不同环境下向只是有同一个inde.html文件，但是想读到js里面的不同环境配置，然后根据当前不同配置做一些不同的逻辑，但是在public/index.html中又无法读到相关配置，这时就有了本次版本更新的第二点了。

**实现**

 第一步：在脚本命令中再加上个参数  staticJs=true ,如：
 ```js
    "start": "node ./env/setEnv.js dev staticJs=true && roadhog server",
    "test": "node  ./env/setEnv.js test staticJs=true && roadhog server",
    "build": "node ./env/setEnv.js prod staticJs=true && roadhog build",
 ```

  第二步： 当执行了启动命令后，会在public下生成当前环境的配置文件 index_envcong.js


 ```js
    // 所以，我们直接在index.html中引入此js文件就可以
    <script src="./index_envcong.js"></script>

    // index_envcong.js文件内容格式如下：
    window.index_envcong={
      "description": "这是开发环境配置",
      "env": "dev",
      "API": "http://127.0.0.1:7012",
      "projectName": "js项目通用环境配置"
    };
  
  // 这时我们就可在index.html中直接拿到相关的环境配置信息了， 如果你觉得直接暴露在window上不太安全，
  // 那么你可以将配置对象赋值给一个块级变量，然后将window.index_envcong=null 即可
    
 ```
两步完成后，当我们启动服务时，我们就可在index.html中直接拿到相关的环境配置信息了

### 提示
  staticHtml=true,staticJs=true两个命令可以同存，顺序先后无所谓，以空格隔开，也可以都不写，或者只写一个命令
