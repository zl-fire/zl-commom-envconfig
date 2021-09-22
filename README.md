# zl-commom-envconfig
  一个为Node/React/vue/Angular等各js框架项目开发的通用环境配置模块，内置默认/开发/测试/线上四套环境配置，且还可以自己无限递加新的环境配置
  （只有是js项目，不管是前端js还是后端的nodejs,都可以通用此模块作为通用的多套环境配置解决方案）

## 起因

在开发中，经常多个项目，多个框架（vue/react/angular/jquery），甚至是前端js,后端nodejs,nodejs的各种框架 并行开发。

这时都会面临同一个问题，那就是任何项目都至少有开发环境和线上环境两套，甚至更多。

每套环境都会有不同的环境变量。不同框架基本都做了封装。

如果只是单独的使用一个框架没什么问题，但是当我们同时进行多个项目多种框架开发时，对于环境配置使用上都会有些不一样，还是有点烦，并且有时公有配置迁移也因此变得更麻烦。

所以，就简单的开发了一个用于在任何框架通用实现，多套环境配置的小模块，如下，原理非常简，也不复杂，但是很实用(就我自己而言 ^_^)

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

   这几个环境名，都是需要和config下的环境配置环境一致的
```

```js
实际使用类似如下：
    "start": "node ./env/setEnv.js dev && roadhog server",
    "test": "node  ./env/setEnv.js test && roadhog server",
    "build": "node ./env/setEnv.js prod && roadhog build",
    当然，你的脚本命令名字可能并不叫start，test，build等，这个无所谓，根据实际情况调整即可
只有config下的配置文件名和脚本中的配置文件名一致即可
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