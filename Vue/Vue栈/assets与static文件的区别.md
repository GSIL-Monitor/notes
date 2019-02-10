## Webpacked Assets

为了回答这个问题，我们首先需要了解Webpack如何处理静态资产。在 `*.vue` 组件中，所有模板和CSS都会被 `vue-html-loader` 及 `css-loader` 解析，并查找资源URL。例如，在 `<img src="./logo.png">`
和 `background: url(./logo.png)` 中，`"./logo.png"` 是相对的资源路径，将由**Webpack解析为模块依赖**。

因为 `logo.png` 不是 JavaScript，当被视为模块依赖时，需要使用 `url-loader` 和 `file-loader`
处理它。vue-cli 的 webpack 脚手架已经配置了这些 loader，因此可以使用相对/模块路径。

由于这些资源可能在构建过程中被内联/复制/重命名，所以它们基本上是源代码的一部分。这就是为什么建议将
Webpack 处理的静态资源放在 `/src` 目录中和其它源文件放一起的原因。事实上，甚至不必把它们全部放在 `/src/assets`：可以用`模块/组件`的组织方式来使用它们。例如，可以在每个放置组件的目录中存放静态资源。

## "Real" Static Assets

相比之下，`static/` 目录下的文件并不会被 Webpack 处理：它们会直接被复制到最终目录（默认是`dist/static`）下。必须使用绝对路径引用这些文件，这是通过在 `config.js` 文件中的 `build.assetsPublicPath` 和 `build.assetsSubDirectory` 连接来确定的。

任何放在 `static/` 中文件需要以绝对路径的形式引用：`/static/[filename]`。如果更改 `assetSubDirectory` 的值为 `assets`，那么路径需改为 `/assets/[filename]`。



使用assets文件资源的方法：

```javascript
data(){
  return {
 locationIcon:require("../../assets/images/location.png"),
    }
}

<van-col span="3"><img :src="locationIcon" width="80%" class="location-icon"></van-col>

```

使用static文件资源的方法

```javascript
bannerPicArray:[
//获取远程静态图片
{imageUrl:'http://7xjyw1.com1.z0.glb.clouddn.com/simleVueDemoPic001.jpg'},
{imageUrl:'http://7xjyw1.com1.z0.glb.clouddn.com/simleVueDemoPic002.jpg'},
{imageUrl:'http://7xjyw1.com1.z0.glb.clouddn.com/simleVueDemoPic003.jpg'},
  // 获取本地静态图片，注意，本地静态文件需要放置到static中
  {imageUrl:'../../../static/simleVueDemoPic001.jpg'},
  {imageUrl:'../../../static/simleVueDemoPic002.jpg'},
  {imageUrl:'../../../static/simleVueDemoPic003.jpg'},
]
// 使用方式
<van-swipe :autoplay="1000">
        <van-swipe-item v-for="(banner,index) in bannerPicArray" :key="index">
          <img :src="banner.imageUrl" v-lazy="banner.imageUrl" width="100%">
        </van-swipe-item>
      </van-swipe>



```

