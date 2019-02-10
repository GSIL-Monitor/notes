https://segmentfault.com/a/1190000014309163

### 什么是Babel？

babel就是一个js文件的编译器，主要用于将es2015+版本的js文件编译为旧版本（这个版本适合所有浏览器，兼容性更好）。

Babel主要的功能：

- 转换语法
- Polyfill 实现目标环境中缺少的功能 
- 源代码转换 

有关编译器的精彩教程，点击[链接](https://github.com/thejameskyle/the-super-tiny-compiler)

### 使用指南

#### 概览

1. 安装依赖包

   ```sh
   npm install --save-dev @babel/core @babel/cli @babel/preset-env
   npm install --save @babel/polyfill
   ```

2. 创建配置文件`babel.config.js`

   ```js
   const presets = [
     ["@babel/env", {
       targets: {
         edge: "17",
         firefox: "60",
         chrome: "67",
         safari: "11.1"
       },
       useBuiltIns: "usage"
     }]
   ];
   
   module.exports = { presets };
   ```

3. 将所有代码编译到指定的路径

   ```sh
   ./node_modules/.bin/babel src --out-dir lib
   ```

#### 核心库

Babel 的核心功能在 [@babel/core](https://babel.docschina.org/docs/en/babel-core) 模块。通过以下命令安装：

```sh
npm install --save-dev @babel/core
```

直接在 JavaScript 中 `require` 它并像下面这样使用它：

```sh
const babel = require("@babel/core");
babel.transform("code", optionsObject);
```

#### CLI工具

[@babel/cli](https://babel.docschina.org/docs/en/babel-cli) 是一个允许你从终端使用 babel 的工具。

```sh
npm install --save-dev @babel/core @babel/cli

./node_modules/.bin/babel src --out-dir lib
```

它使用**我们设置的解析方式**来解析 `src` 目录中的所有 JavaScript 文件，并将转换后每个文件输出到 `lib` 目录。可以自行配置解析方式，传入执行选项来进行想要进行的解析。

#### Plugins&Presets

使用别人已经封装好的插件来实现，指定某种代码转换功能。

例如：

箭头函数转化插件：`@babel/plugin-transform-arrow-functions`

也可以只用preset来代替预先设定的一组插件，而不是逐一添加我们想要的所有插件。

```sh
npm install --save-dev @babel/preset-env
./node_modules/.bin/babel src --out-dir lib --presets=@babel/env
```

这个 preset 包括支持现代 JavaScript的所有插件。但是 presets 也可以选择。我们不从终端传入 cli 和 preset 选项，而是通过另一种传入选项的方式：**配置文件**。

#### presets配置

创建一个`babel.config.js`

```js
const presets = [
  ["@babel/env", {
    targets: {
      edge: "17",
      firefox: "60",
      chrome: "67",
      safari: "11.1"
    }
  }]
];

module.exports = { presets };
```





### 项目

1、安装babel-loader和babel-core

```
npm install --save-dev babel-loader babel-core
```

2、安装babel-preset-env

```
npm install babel-preset-env --save-dev
```

新建`.babelrc`文件：

```js
{
    "presets":["env"]
}
```

3、安装babel-polyfill

此依赖用于开发应用，会在全局添加新的方法，会污染全变量。

```
npm install --save babel-polyfill
```

在入口文件本文为`index.js`的顶部添加

```
import "babel-polyfill"
```

在webpcak.config.js中将babel-polyfill添加到entry数组中

```
module.exports = {
  entry: ['babel-polyfill', './src/index.js'],
  ...
```

最终webpack.config.js为

```js
const path = require('path');

module.exports = {
  entry: ['babel-polyfill', './src/index.js'],
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  mode:'development',
  module: {
    rules: [
      {
        test: /\.js$/, exclude: /node_modules/, loader: "babel-loader"
        // test 符合此正则规则的文件，运用 loader 去进行处理，除了exclude 中指定的内容
      }
    ]
  }
};
```