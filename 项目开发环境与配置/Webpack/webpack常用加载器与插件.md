https://juejin.im/post/5aa3d2056fb9a028c36868aa

webpack详解



### 常用加载器loader

1.模板:

　　　　(1)html-loader:将HTML文件导出编译为字符串，可供js识别的其中一个模块

　　　　(2)pug-loader : 加载pug模板

　　　　(3)jade-loader : 加载jade模板(是pug的前身，由于商标问题改名为pug)

　　　　(4)ejs-loader : 加载ejs模板

　　　　(5)handlebars-loader : 将Handlebars模板转移为HTML

2.样式:

　　　　(1)css-loader : 解析css文件中代码

　　　　(2)style-loader : 将css模块作为样式导出到DOM中

　　　　(3)less-loader : 加载和转义less文件

　　　　(4)sass-loader : 加载和转义sass/scss文件

　　　　(5)postcss-loader : 使用postcss加载和转义css/sss文件

3.脚本转换编译:

　　　　(1)script-loader : 在全局上下文中执行一次javascript文件，不需要解析

　　　　(2)babel-loader : 加载ES6+ 代码后使用Babel转义为ES5后浏览器才能解析

　　　　(3)typescript-loader : 加载Typescript脚本文件

　　　　(4)coffee-loader : 加载Coffeescript脚本文件

4.JSON加载:

　　　　(1)json-loader : 加载json文件（默认包含）

　　　　(2)json5-loader : 加载和转义JSON5文件

5.Files文件

　　　　(1)raw-loader : 加载文件原始内容(utf-8格式)

　　　　(2)url-loader : 多数用于加载图片资源,超过文件大小显示则返回data URL

　　　　(3)file-loader : 将文件发送到输出的文件夹并返回URL(相对路径)

　　　　(4)jshint-loader : 检查代码格式错误

6.加载框架:

　　　　(1)vue-loader : 加载和转义vue组件

　　　　(2)angualr2-template--loader : 加载和转义angular组件

　　　　(3)react-hot-loader : 动态刷新和转义react组件中修改的部分,基于webpack-dev-server插件需先安装,然后在webpack.config.js中引用react-hot-loader









### 常用插件

#### 热模块替换HMR（Hot Module Replacement）

要安装webpack-dev-server，然后还要配置devServer配置项的hot为true

```js
devServer: {
    hot: true, // Tell the dev-server we're using HMR
    contentBase: resolve(__dirname, 'dist'),
    publicPath: '/'
  }
```



#### 自动引入（ProvidePlugin）

ProvidePlugin 可以在任何地方自动加载模块而不需要import 或 require 方法:
例如：通过如下定义，在任何代码中使用identifier变量，'module1'模块都会被加载，identifier所代表的正式‘module1’模块export的内容



#### 提取公共模块（CommonsChunkPlugin）



#### ExtractTextWebpackPlugin 分离 CSS

同时也需要css-loader style-loader，当然如果使用到sass或scss也要使用对应的加载器。



#### UglifyJsPlugin代码压缩输出

压缩插件UglifyJsPlugin通过UglifyJS2来完成代码压缩，配置参考[UglifyJS2](https://link.jianshu.com/?t=https://github.com/mishoo/UglifyJS2)



#### 设置全局变量插件[DefinePlugin]

[详情](https://webpack.js.org/plugins/define-plugin)

```js
module.exports = {
  /*...*/
  plugins:[
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    })
  ]
};
```

通过DefinePlugin定义的变量可在全局代码中使用，例如Webpack配置文件定义了process.env.NODE_ENV='production'，如果代码中存在如下调用：

```
if (process.env.NODE_ENV !== 'production') console.log('...') 
```

即等同于

```
if (false) console.log('...')
```

原理：DefinePlugin做的工作是在源代码基础上执行的全局查找替换工作，将DefinePlugin插件中定义的变量替换为插件中定义的变量值。



#### 预加载的插件PrefetchPlugin

主要用于提高性能



#### MinChunkSizePlugin

把多个小模块进行合并，以减少文件的大小



#### DedupePlugin

打包的时候删除重复或者相似的文件



#### CommonsChunkPlugin

多个 html共用一个js文件(chunk)



#### HtmlWebpackPlugin 

自动生成html









