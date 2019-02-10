#### 安装vue-cli

```
npm install -g vue-cli
```

#### 使用vue-cli创建vue项目

```
vue init <template-name> <project-name>
```

template的类型有：

- webpack   一个全面的webpack+vue的模板
- webpack-simple 一个简单的webpack+vue-loader的模板
- browserify  一个全面的Browserify+vueify 的模板，功能包括热加载，linting,单元检测。
- browserify-simple  一个简单Browserify+vueify的模板
- pwa  基于webpack模板的vue-cli的PWA模板
- simple  一个最简单的单页应用模板   

当然，最常用的模版还是webpack。

#### 执行创建项目命令之后，需要对项目有基本的配置：

- Project name :项目名称 ，如果不需要更改直接回车就可以了。注意：这里不能使用大写。

- Project description:项目描述，默认为A Vue.js project,直接回车，不用编写。

- Author：作者，如果你有配置git，他会读取.ssh文件中的user。

- Install vue-router? 是否安装vue的路由插件，Y代表安装，N无需安装，下面的命令也是一样的。

- Use ESLint to lint your code? 是否用ESLint来限制你的代码错误和风格

- setup unit tests with Karma + Mocha? 是否需要安装单元测试工具Karma+Mocha。

- Setup e2e tests with Nightwatch?是否安装e2e来进行用户行为模拟测试。

#### vue-cli项目结构

```
|-- build                            // 项目构建(webpack)相关代码
|   |-- build.js                     // 生产环境构建代码
|   |-- check-version.js             // 检查node、npm等版本
|   |-- utils.js                     // 构建工具相关
|   |-- vue-loader.conf.js           // webpack loader配置
|   |-- webpack.base.conf.js         // webpack基础配置
|   |-- webpack.dev.conf.js          // webpack开发环境配置,构建开发本地服务器
|   |-- webpack.prod.conf.js         // webpack生产环境配置
|-- config                           // 项目开发环境配置
|   |-- dev.env.js                   // 开发环境变量
|   |-- index.js                     // 项目一些配置变量
|   |-- prod.env.js                  // 生产环境变量
|   |-- test.env.js                  // 测试脚本的配置
|-- src                              // 源码目录
|   |-- components                   // vue所有组件
|   |-- router                       // vue的路由管理
|   |-- App.vue                      // 页面入口文件
|   |-- main.js                      // 程序入口文件，加载各种公共组件
|-- static                           // 静态文件，比如一些图片，json数据等
|-- test                             // 测试文件
|   |-- e2e                          // e2e 测试
|   |-- unit                         // 单元测试
|-- .babelrc                         // ES6语法编译配置
|-- .editorconfig                    // 定义代码格式
|-- .eslintignore                    // eslint检测代码忽略的文件（夹）
|-- .eslintrc.js                     // 定义eslint的plugins,extends,rules
|-- .gitignore                       // git上传需要忽略的文件格式
|-- .postcsssrc                      // postcss配置文件
|-- README.md                        // 项目说明，markdown文档
|-- index.html                       // 访问的页面
|-- package.json                     // 项目基本信息,包依赖信息等

```

#### package.json

package.json文件是项目的配置文件，定义了项目的基本信息以及项目的相关依赖包，npm运行命令等。

**scripts**

定义的是一些比较长的npm运行命令，用node去执行一段命令，比如：

```
npm run dev
```

就是执行

```
webpack-dev-server --inline --progress --config build/webpack.dev.conf.js
```

这句话的意思就是利用webpack-dev-server读取webpack.dev.conf.js信息并启动一个本地服务器。

**dependencies&DevDependencies**

前者是运行时依赖的环境（即生产环境） ，这样的依赖如下安装方式

```
npm install --save  **(package name)
```

后者是开发人员开发时所使用的工具包，这样的依赖如下安装：

```
npm install --save-dev  **(package name)
```

#### webpack.base.conf.js

这个文件是wenpack基础配置文件，主要根据模式定义了入口出口，以及处理vue，babel等模块（loader），是最为基础的webpack配置部分。其他模式的匹配文件都是以此为基础通过webpack-merge合并为其他的完整的具有特定功能的模块。

```js
'use strict'
const path = require('path')
const utils = require('./utils')
const config = require('../config')
const vueLoaderConfig = require('./vue-loader.conf')
// 获取当前文件的绝对路径
function resolve (dir) {
  return path.join(__dirname, '..', dir)
}
// 定义代码检测的规则
const createLintingRule = () => ({
  test: /\.(js|vue)$/,
  loader: 'eslint-loader',
  enforce: 'pre',
  include: [resolve('src'), resolve('test')],
  options: {
    formatter: require('eslint-friendly-formatter'),
    emitWarning: !config.dev.showEslintErrorsInOverlay
  }
})

module.exports = {
    //基础上下文
  context: path.resolve(__dirname, '../'),
    //入口
  entry: {
    app: './src/main.js'
  },
    //出口
  output: {
    path: config.build.assetsRoot,
    filename: '[name].js',
    publicPath: process.env.NODE_ENV === 'production'
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath
  },
    // 解析：当webpack视图其加载模块的时候，它默认查找.js文件，因此需要在webpack中配置好识别其他文件的功能，遇到.vue的文件也去加载
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',// 以vue结尾的文件
      '@': resolve('src'),// 用@来代用src，方便路径的获取
    }
  },
    // 对不同类型的模块通过使用loader加载器实现编译
  module: {
    rules: [
      ...(config.dev.useEslint ? [createLintingRule()] : []),
      {// 对所有vue文件使用vue-loader
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
      },
      {// 对所有src和test下的js文件使用babel-loader将es6+装换为es5
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('src'), resolve('test'), resolve('node_modules/webpack-dev-server/client')]
      },
      {// 处理图片
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {// 处理多媒体文件
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('media/[name].[hash:7].[ext]')
        }
      },
      {// 处理字体文件
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  },
  node: {
    // 阻止注入useless setImmediate polyfill 因为Vue自己就有
    setImmediate: false,
    // 阻止webpack注入mocks到node原生模块，因为对客户端没有意义
    // that does not make sense for the client
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty'
  }
}
```

#### webpack.dev.conf.js

```js
'use strict'
const utils = require('./utils')
const webpack = require('webpack')
const config = require('../config')// 基本配置参数
const merge = require('webpack-merge')// webpack-merge是一个可以合并数组和对象的插件
const path = require('path')
// 插件
const baseWebpackConfig = require('./webpack.base.conf')//// webpack基本配置文件（开发和生产环境公用部分）
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')// friendly-errors-webpack-plugin用于更友好地输出webpack的警告、错误等信息
const portfinder = require('portfinder')//自动减缩下一个可用端口
// 全局变量
const HOST = process.env.HOST
const PORT = process.env.PORT && Number(process.env.PORT)// 读取系统环境变量的port

//合并webpack配置=base+dev 
const devWebpackConfig = merge(baseWebpackConfig, {
  module: {
      //对一些独立的css文件以及他的预处理文件做一个编译
    rules: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap, usePostCSS: true })
  },
  // cheap-module-eval-source-map is faster for development
  devtool: config.dev.devtool,

  // devServer的参数应该在“/config/index.js”中定义 
  devServer: {// webpack-dev-server服务器配置
    clientLogLevel: 'warning',
    historyApiFallback: {// 历史接口回调函数
      rewrites: [
        { 
            from: /.*/, 
            to: path.posix.join(config.dev.assetsPublicPath, 'index.html') 
        },
      ],
    },
    hot: true,// 开启热加载
    contentBase: false, // 是否使用CopyWebpackPlugin.
    compress: true,
    host: HOST || config.dev.host,// process.env优先
    port: PORT || config.dev.port,// process.env优先
    open: config.dev.autoOpenBrowser,
    overlay: config.dev.errorOverlay
      ? { warnings: false, errors: true }
      : false,
    publicPath: config.dev.assetsPublicPath,
    proxy: config.dev.proxyTable,// 代理设置
    quiet: true, //使用FriendlyErrorsPlugin必须要的参数配置
    watchOptions: {// 启动watch模式，意味着在初始化构建之后，webpack 将继续监听任何已解析文件的更改
      poll: config.dev.poll,// // 通过传递 true 开启 polling，或者指定毫秒为单位进行轮询。默认为false
    }
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': require('../config/dev.env')
    }),
    new webpack.HotModuleReplacementPlugin(),// 模块热替换它允许在运行时更新各种模块，而无需进行完全刷新*
    new webpack.NamedModulesPlugin(), // HMR shows correct file names in console on update.
    new webpack.NoEmitOnErrorsPlugin(),// 跳过编译时出错的代码并记录下来，主要作用是使编译后运行时的包不出错
    // https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: 'index.html',// 指定编译后生成的html文件
      template: 'index.html',// 需要处理的模版
        // 打包过程中的输出的js，css的路径添加到HTML文件中，css插入head，js插入到body，取值可以是：true，false，‘head’，‘body’
      inject: true
    }),
    // copy custom static assets复制静态资源
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../static'),
        to: config.dev.assetsSubDirectory,
        ignore: ['.*']
      }
    ])
  ]
})

module.exports = new Promise((resolve, reject) => {
  portfinder.basePort = process.env.PORT || config.dev.port//获取当前设定的端口
  portfinder.getPort((err, port) => {
    if (err) {
      reject(err)
    } else {
      //发布新的端口，用于e2e测试
      process.env.PORT = port
      // 为devServer配置添加端口
      devWebpackConfig.devServer.port = port

      // 添加FriendlyErrorsPlugin插件
      devWebpackConfig.plugins.push(new FriendlyErrorsPlugin({
        compilationSuccessInfo: {
          messages: [`Your application is running here: http://${devWebpackConfig.devServer.host}:${port}`],
        },
        onErrors: config.dev.notifyOnErrors
        ? utils.createNotifierCallback()
        : undefined
      }))

      resolve(devWebpackConfig)
    }
  })
})

```

#### webpack.prod.js

```js
'use strict'
const path = require('path')
const utils = require('./utils')
const webpack = require('webpack')
const config = require('../config')
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf')
const CopyWebpackPlugin = require('copy-webpack-plugin')// 用于将static中的静态文件复制到指定的产品文件夹
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')// 用于优化和最小化css资源
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')// 压缩js文件

const env = require('../config/prod.env')

const webpackConfig = merge(baseWebpackConfig, {
  module: {
      // 样式文件的处理规则，对css/sass/scss等不同内容使用相应的styleLoaders，由utils配置出各种类型的预处理语言所需要使用的loader，例如sass需要使用sass-loader
    rules: utils.styleLoaders({
      sourceMap: config.build.productionSourceMap,
      extract: true,
      usePostCSS: true
    })
  },
  devtool: config.build.productionSourceMap ? config.build.devtool : false,
   // webpack输出路径与命名规则
  output: {
    path: config.build.assetsRoot,
    filename: utils.assetsPath('js/[name].[chunkhash].js'),
    chunkFilename: utils.assetsPath('js/[id].[chunkhash].js')
  },
  plugins: [
    // http://vuejs.github.io/vue-loader/en/workflow/production.html
    new webpack.DefinePlugin({
      'process.env': env
    }),
      // 丑化压缩代码
    new UglifyJsPlugin({
      uglifyOptions: {
        compress: {
          warnings: false
        }
      },
      sourceMap: config.build.productionSourceMap,
      parallel: true
    }),
      // 将css文件提取到单独的文件
    new ExtractTextPlugin({
      filename: utils.assetsPath('css/[name].[contenthash].css'),
      // 将下面的选项设置为“false”将不会从codesplit掉的代码块中提取CSS。
      // 当webpack加载了codesplit块时，他们的CSS将使用style-loader动态插入。
      // It's currently set to `true` because we are seeing that sourcemaps are included in the codesplit bundle as well when it's `false`, 
      // increasing file size: https://github.com/vuejs-templates/webpack/issues/1110
      allChunks: true,
    }),
    // 压缩提取的CSS. 重复使用来自不同组件的重复CSS
    new OptimizeCSSPlugin({
      cssProcessorOptions: config.build.productionSourceMap
        ? { safe: true, map: { inline: false } }
        : { safe: true }
    }),
    // htnl插件
    new HtmlWebpackPlugin({
      filename: config.build.index,
      template: 'index.html',
      inject: true,
      minify: {
          //删除注释
        removeComments: true,
          // 删除空格
        collapseWhitespace: true,
          // 删除标签属性值的双引号
        removeAttributeQuotes: true
        // more options:
        // https://github.com/kangax/html-minifier#options-quick-reference
      },
      // 注入依赖的时候按照依赖先后顺序进行注入，比如，需要先注入vendor.js，再注入app.js
      chunksSortMode: 'dependency'
    }),
    // 当供应商模块没有改变时，保持module.id稳定
    new webpack.HashedModuleIdsPlugin(),
    //启用范围hoisting
    new webpack.optimize.ModuleConcatenationPlugin(),
    // 将所有从node_modules中引入的js提取到vendor.js，即抽取库文件
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks (module) {
        // any required modules inside node_modules are extracted to vendor
        return (
          module.resource &&
          /\.js$/.test(module.resource) &&
          module.resource.indexOf(
            path.join(__dirname, '../node_modules')
          ) === 0
        )
      }
    }),
    // 将webpack运行时和模块清单提取到自己的文件中，用于在每当更新应用程序包时，都会阻止更新供应商哈希值
      // 从vendor中提取出manifest
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
      minChunks: Infinity
    }),
    // 此实例从代码拆分的块中提取共享块并将它们捆绑在一个单独的快中，就像vender一样
    // see: https://webpack.js.org/plugins/commons-chunk-plugin/#extra-async-commons-chunk
    new webpack.optimize.CommonsChunkPlugin({
      name: 'app',
      async: 'vendor-async',
      children: true,
      minChunks: 3
    }),

    //将static文件夹里面的静态资源复制到dist/static
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../static'),
        to: config.build.assetsSubDirectory,
        ignore: ['.*']
      }
    ])
  ]
})
// 如果开启了产品gzip压缩，则利用插件将构建后的产品文件进行压缩
if (config.build.productionGzip) {
  const CompressionWebpackPlugin = require('compression-webpack-plugin')

  webpackConfig.plugins.push(
    new CompressionWebpackPlugin({
      asset: '[path].gz[query]',
        // 压缩算法
      algorithm: 'gzip',
      test: new RegExp(
        '\\.(' +
        config.build.productionGzipExtensions.join('|') +
        ')$'
      ),
      threshold: 10240,
      minRatio: 0.8
    })
  )
}
// 如果启动了report，则通过插件给出webpack构建打包后的产品文件分析报告
if (config.build.bundleAnalyzerReport) {
  const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
  webpackConfig.plugins.push(new BundleAnalyzerPlugin())
}

module.exports = webpackConfig
```

#### build.js

```js
'use strict'
require('./check-versions')()

process.env.NODE_ENV = 'production'

const ora = require('ora')// 一个可以在终端显示spinner的插件
const rm = require('rimraf')// 用于删除文件或文件夹的插件
const path = require('path')
const chalk = require('chalk')//用于在控制台输出带颜色的插件
const webpack = require('webpack')
const config = require('../config')
const webpackConfig = require('./webpack.prod.conf')

const spinner = ora('building for production...')
spinner.start()// 开启loading动画
// 首先删除整个dist里面的内容，删除完才开始构建包
rm(path.join(config.build.assetsRoot, config.build.assetsSubDirectory), err => {
  if (err) throw err
    // 执行webpack构建打包，完成之后在终端输出构建完成的相关信息或者输出报错信息并退出程序
  webpack(webpackConfig, (err, stats) => {
    spinner.stop()
    if (err) throw err
    process.stdout.write(stats.toString({
      colors: true,
      modules: false,
      children: false, // If you are using ts-loader, setting this to true will make TypeScript errors show up during build.
      chunks: false,
      chunkModules: false
    }) + '\n\n')

    if (stats.hasErrors()) {
      console.log(chalk.red('  Build failed with errors.\n'))
      process.exit(1)
    }

    console.log(chalk.cyan('  Build complete.\n'))
    console.log(chalk.yellow(
      前后端数据交互 +
      力导向图.html
    ))
  })
})

```

#### utils.js

```js
'use strict'
const path = require('path')
const config = require('../config')
const ExtractTextPlugin = require('extract-text-webpack-plugin')//这里用来提取css样式
const packageConfig = require('../package.json')
// 资源文件的存放路径
exports.assetsPath = function (_path) {
  const assetsSubDirectory = process.env.NODE_ENV === 'production'
    ? config.build.assetsSubDirectory
    : config.dev.assetsSubDirectory

  return path.posix.join(assetsSubDirectory, _path)
}
//生成css/sass/scss等各种用来编写样式的语言所对应的loader配置
exports.cssLoaders = function (options) {
  options = options || {}

  const cssLoader = {
      //css-loader配置
    loader: 'css-loader',
    options: {
        //是否使用source-map
      sourceMap: options.sourceMap
    }
  }

  const postcssLoader = {
    loader: 'postcss-loader',
    options: {
      sourceMap: options.sourceMap
    }
  }

  // 生成各种loader配置，并且配置了extract-text-pulgin
  function generateLoaders (loader, loaderOptions) {
    const loaders = options.usePostCSS ? [cssLoader, postcssLoader] : [cssLoader]
	// 关于样式的loader处理顺序
    if (loader) {
      loaders.push({
        loader: loader + '-loader',
        options: Object.assign({}, loaderOptions, {
          sourceMap: options.sourceMap
        })
      })
    }

    // 提取CSS
    if (options.extract) {
        //配置ExtractTextPlugin提取样式
      return ExtractTextPlugin.extract({
        use: loaders,
        fallback: 'vue-style-loader'
      })
    } else {
        //不提取样式就直接只用vue-style-loader配合各种loader去处理
      return ['vue-style-loader'].concat(loaders)
    }
  }

  // https://vue-loader.vuejs.org/en/configurations/extract-css.html
  return {
      // 得到各种不同处理样式的语言所对应的loader
    css: generateLoaders(),
    postcss: generateLoaders(),
    less: generateLoaders('less'),
    sass: generateLoaders('sass', { indentedSyntax: true }),
    scss: generateLoaders('sass'),
    stylus: generateLoaders('stylus'),
    styl: generateLoaders('stylus')
  }
}

// 生成处理单独的.css、.sass、.scss等样式文件的规则（vue组件以外的）
exports.styleLoaders = function (options) {
  const output = []
  const loaders = exports.cssLoaders(options)

  for (const extension in loaders) {
    const loader = loaders[extension]
    output.push({
      test: new RegExp('\\.' + extension + '$'),
      use: loader
    })
  }

  return output
}

exports.createNotifierCallback = () => {
  const notifier = require('node-notifier')

  return (severity, errors) => {
    if (severity !== 'error') return

    const error = errors[0]
    const filename = error.file && error.file.split('!').pop()

    notifier.notify({
      title: packageConfig.name,
      message: severity + ': ' + error.name,
      subtitle: filename || '',
      icon: path.join(__dirname, 'logo.png')
    })
  }
}

```

#### .babelrc

```js
{ //设定转码规则
  "presets": [
    ["env", {
      "modules": false,
      //对BABEL_ENV或者NODE_ENV指定的不同的环境变量，进行不同的编译操作
      "targets": {
        "browsers": ["> 1%", "last 2 versions", "not ie <= 8"]
      }
    }],
    "stage-2"
  ],
  //转码用的插件
  "plugins": ["transform-vue-jsx", "transform-runtime"]
}
```

#### .editorconfig

```js
root = true

[*]    // 对所有文件应用下面的规则
charset = utf-8                    // 编码规则用utf-8
indent_style = space               // 缩进用空格
indent_size = 2                    // 缩进数量为2个空格
end_of_line = lf                   // 换行符格式
insert_final_newline = true        // 是否在文件的最后插入一个空行
trim_trailing_whitespace = true    // 是否删除行尾的空格
```

#### 组件.vue

template：模板

script：写一些页面的js逻辑代码

style：页面需要的CSS样式

#### router/index.js

这是vue-router的功能，配置相关的路由。

```js
import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    }
  ]
})

```

