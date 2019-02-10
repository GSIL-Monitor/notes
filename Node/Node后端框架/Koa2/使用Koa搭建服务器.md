## 一、初始化项目

安装koa项目生成器

```sh
npm i -g koa-generator
```

生成一个名为server的koa项目

```
koa2 server
```

安装server项目需要的依赖

```sh
cd server
npm i
```

启动安装好的koa2服务器

```sh
npm run start	
```



## 二、koa2的基本使用

一个最基本的将请求URL上面请求参数放在页面中的服务器：

```js
const Koa=require('koa');
const app=new Koa();
app.use(async (ctx)=>{
    let url=ctx.url;
    let req_query=ctx.request.query;
    let req_querystring=ctx.request.querystring;
    ctx.body={
        url,
        req_query,
        req_querystring,
    }
});
app.listen(3000,()=>{
    console.log("listen in 3000")
});
```

ctx的基本结构：

```js
{ request:
   { method: 'GET',
     url: '/ppp?abc=123',
     header:
      { host: 'localhost:3000',
        connection: 'keep-alive',
        'cache-control': 'max-age=0',
        'upgrade-insecure-requests': '1',
        'user-agent':
         'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/69.0.3497.81 Safari/537.36',
        accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
        'accept-encoding': 'gzip, deflate, br',
        'accept-language': 'zh-CN,zh;q=0.9',
        cookie:
         'Webstorm-c6b78b15=7dfaba85-c8d0-4c16-87a1-4e11d987bb9a; __utma=111872281.1797966039.1531394407.1531394407.1531394407.1; __utmc=111872281; __utmz=111872281.1531394407.1.1.utmcsr=(direct)|utmccn=(direct)|utmcmd=(none); Webstorm-2e98b7f4=ef875bd4-096a-4e88-ba67-396b052924c2' 
      } 
   },
  response: { 
      status: 404, message: 'Not Found', header: {} 
  },
  app: { 
      subdomainOffset: 2, proxy: false, env: 'development' 
  },
  originalUrl: '/ppp?abc=123',
  req: '<original node req>',
  res: '<original node res>',
  socket: '<original node socket>' 
}
```

总的来说ctx就是客户端发送给服务端的请求体，其中包括`method`，`url`，`header`等

可以发现`ctx`中的`request`属性中具有`url`属性，而上下文`ctx`本身也具有`originalUrl`属性

所以可以使用如下方法代替上述的获取URL参数的方式

```js
let req_query1=ctx.query;
let req_querystring1=ctx.querystring;
```

获取到同样的信息。

```json
{
  "url": "/ppp?abc=123",
  "req_query": {
    "abc": "123"
  },
  "req_querystring": "abc=123",
  "req_query1": {
    "abc": "123"
  },
  "req_querystring1": "abc=123"
}
```

再看看上述的ctx的内容，可以看到有一个request，也有一个req，这里解释一下：

- ctx.request：是Koa2中context经过封装的请求对象，它用起来更直观和简单。

- ctx.req：是context提供的node.js原生HTTP请求对象。这个虽然不那么直观，但是可以得到更多的内容，适合我们深度编程。

ctx.req一般用于post请求，具体实现步骤如下：

1. 解析上下文ctx中的原生node.js对象ctx.req
2. 将POST表单数据解析成querystring字符串
3. 将字符串转换为json格式

实现代码：

```js
let postData=await parsePostData(ctx);
ctx.body=postData;
```

首先直接从ctx中获取失败，因为数据存储在ctx.req这个node原生的对象中，所以需要进一步解析，于是采用ctx获取到数据所触发的`data`事件

```js
// 解析ctx.req 中的数据的方法
function parsePostData(ctx){
    return new Promise((resolve, reject) => {
        try {
            let postdata="";
            ctx.req.on('data',(data)=>{
                postdata+=data;
            });
            ctx.req.addListener('end',function () {
                resolve(postdata);
            })
        }catch (e) {
            reject(e);
        }
    })
}
```

然后在完全接受请求之后，将请求作为resolve的参数返回出去，在主函数中使用

```js
let postData=await parsePostData(ctx);
```

获取到解析后的字符串数据postData。

当然，由于我们前端服务器需要的是json格式的数据，因此需要对postData进行进一步的处理：

```js
// 将数据以json格式返回的方法
function parseQueryStr(str){
    let queryData={};
    let queryStrList=str.split('&');
    for (let [index, str] of queryStrList.entries()) {
        let itemList=str.split("=");
        queryData[itemList[0]]=decodeURIComponent(itemList[1]);
    }
    return queryData;
}
```

这个函数就是用于将postData转化为JSON数据。

然后在`parsePostData`方法中调用，将字符串转化为json，然后返回到页面：

```js
//。。。
ctx.req.addListener('end',function () {
    let parseData=parseQueryStr(postdata);
    resolve(parseData);
})
//。。。
```

最后页面返回json格式的数据，也符合前端页面数据的读取形式。

当然，koa已经有人给我们造好了轮子，就是koa-bodyparser中间件



接下来看一下**cookie的使用**

从一开始使得ctx中，可以看到cookie的内容是

```js
cookie:
         'Webstorm-c6b78b15=7dfaba85-c8d0-4c16-87a1-4e11d987bb9a; __utma=111872281.1797966039.1531394407.1531394407.1531394407.1; __utmc=111872281; __utmz=111872281.1531394407.1.1.utmcsr=(direct)|utmccn=(direct)|utmcmd=(none); Webstorm-2e98b7f4=ef875bd4-096a-4e88-ba67-396b052924c2' 
```

有上述的内容并不能看出什么有用的内容，因为这只是原生的cookie。

接下来将对cookie进行设置和获取。

```js
app.use(async (ctx)=>{
    if (ctx.url === '/index') {
        // 设置cookie
        ctx.cookies.set(
            'MyName','zgq',
        );
        ctx.body="cookie is set ok";
    } else {
        ctx.body="failed"
    }
});
```

通过上述的内容，我们配置了一个cookie值，但是cookie其实还有其他属性

![](E:\WebStorm_Dir\articles\images\cookieOptions.png)

如上图所示，就是Chrome下cookie结构的其他配置信息。接下来，将在代码中设置这些cookie的配置信息：

```js
ctx.cookies.set(
            'MyName','zgq',
            {// 配置cookie选项
                domain:'127.0.0.1',     // 写cookie所在的域名
                path:'/index',       // 写cookie所在的路径
                maxAge:1000*60*60*24,   // cookie有效时长
                expires:new Date('2018-12-32'),     // cookie失效时间
                httpOnly:false,     // 是否只用于http请求中获取
                overwrite:false,    // 是否允许重写
            }
        );
```

设置好之后的cookie如下：

![](E:\WebStorm_Dir\articles\images\cookieOptions2.png)

设置好了cookie之后，自然就是使用cookie

```js
if (ctx.cookies.get('MyName')) {
    ctx.body=ctx.cookies.get('MyName');
} else {
    ctx.body='“MyName” Cookie is none';
}
```







## 三、熟悉各种koa的中间件

### 1、koa-logger

**基本使用**

```js
const logger = require('koa-logger');
app.use(logger());
```

建议把`app.use(logger());`放在其它的中间件被`app.use(...)`之前。用以保证日志的完整性（从头到尾包含）。

### 2、koa-views

koa-view 是用在koa上的模板渲染中间件。

**基本使用**

```js
const Koa = require('koa');
const app = new Koa();
const views = require('koa-views');

// app.use(views(...))的执行必须在router之前。
app.use(views(__dirname + '/views', {
    extension: 'jade',//用于指明view文件的默认后缀名，确定使用的是什么模版
    map: {
        html: 'underscore' // 对“html”文件采用“underscore”引擎来处理
    },
    engineSource: {
        foo: () => Promise.resolve('bar')// 对“.foo后缀名”的文件使用“此方法”来处理
    },
    options: {// 这是传入helpers和partials的地方，这些options会被传入到view engine中。
        helpers: {
            uppercase: (str) => str.toUpperCase()
        },
        partials: {
            subTitle: './my-partial' // requires ./my-partial.hbs
        }
    }
}));
```

koa-views在使用的时候包含两个参数：

一个是root，指明view文件的绝对路径（注意这里不能用相对路径）；

另一个是options，这里面又包含着四个配置项

### 3、koa-json

美观的输出JSON response的Koa中间件。

**基本使用**

总是返回美化了的json数据

```js
const json = require('koa-json');
app.use(json());
```

默认不进行美化，但是当地址栏传入pretty参数的时候，则返回的结果是进行了美化的。

```js
const json = require('koa-json');
app.use(json({ pretty: false, param: 'pretty' }));
```

当访问时URL带上 `?pretty` 的时候就返回美化过的结果。

### 4、koa-onerror

koa的错误处理中间件

**基本使用**

```js
const onerror = require('koa-onerror');
onerror(app);
```

koa-onerror 会自动地把err.status当作response的status code, 而且自动地把err.headers当作response的headers。

### 5、koa-bodyparser

**基本使用**

```js
const bodyParser = require('koa-bodyparser');
app.use(bodyParser());
app.use(async ctx => {
  // 解析后的正文将存储在ctx.request.body中
  // 如果没有解析，body将是一个空对象（{}）
  ctx.body = ctx.request.body;
});
```

`bodyParser()`中可以传入一个参数option，其中可包含如下这些配置项：

- enableTypes: bodyParser只有在请求的类型匹配enableTypes（默认为[‘json’, ‘form’]）的时候才会工作。

- encode: 请求编码，默认是utf-8。
- formLimit: the urlencoded 主体的大小限制。如果超出大小限制，将会返回413错误码。默认的限制大小是56kb。
- jsonLimit: json正文限制，默认 1mb.
- textLimit: 文本正文限制，默认 1mb.
- strict：当设置为true时，JSON解析器将只接受数组和对象。默认为true。在严格模式下，ctx.request.body将始终是一个对象（或数组），这样可以避免大量的类型判断。但是文本正文将始终返回字符串类型。
- detectJSON: 自定义 json request 检测函数。默认为空。

```js
app.use(bodyparser({
  detectJSON: function (ctx) {
    return /\.json$/i.test(ctx.path);
  }
}));
```

- extendTypes: 支持的扩展类型

```js
app.use(bodyparser({
    extendTypes: {
    	json: ['application/x-javascript'] 
        // 将app/x-javascript类型的主体解析为JSON字符串
    }
}));
```

- onerror: support 自定义的 error handle, 如果koa-bodyparser抛出错误异常, 你可以像如下这样来自定义response

```js
app.use(bodyparser({
  onerror: function (err, ctx) {
    ctx.throw('body parse error', 422);
  }
}));
```

- disableBodyParser: 您可以通过设置ctx.disableBodyParser = true来动态禁用body解析器

```js
app.use(async (ctx, next) => {
  if (ctx.path === '/disable') 
      ctx.disableBodyParser = true;
  await next();
});
app.use(bodyparser());
```

### 6、koa-static

用于koa的静态文件服务中间件。

**基本使用**

```js
const staticServe = require('koa-static');
app.use(staticServe(root, opts));
```

它可以传入两个参数：

一个是root，静态文件的根目录。即只有包含在此根目录以内的文件才会提供静态服务。

另一个是option，其中包含如下配置项：

- maxage：浏览器缓存的最大时间（max-age），单位是milliseconds（毫秒）。默认为0
- hidden：允许传送隐藏文件，默认为false
- index：默认文件名，默认为'index.html'
- defer：如果为true，则在yield next之后提供服务，允许任何下游中间件首先响应。
- gzip：当client支持 gzip 而且被请求的文件也有一个以 .gz 为扩展名的文件的时候，自动以所请求文件对应的 .gz 文件进行返回。默认为true
- extensions：尝试匹配传递数组中的扩展名以在URL中没有扩展名为合格的时搜索文件。首先发现是服务。 （默认为false）

### 7、koa-router

koa路由中间件。

**基本使用**

```js
var Router = require('koa-router');

var router = new Router();

router.get('/', function (ctx, next) {...});

app
  .use(router.routes())
  .use(router.allowedMethods());
```

**router的各种不同的请求方式**

```js
router
  .get('/', function (ctx, next) {
        ctx.body = 'Hello World!';
  })
  .post('/users', function (ctx, next) {

  })
  .put('/users/:id', function (ctx, next) {

  })
  .del('/users/:id', function (ctx, next) {

  })
  .all('/users/:id', function (ctx, next) {

  });
```

`router.all()` 能够用于匹配所有的请求方法。

**多个中间件例子**

```js
router.get(
  '/users/:id',
  // 所谓的中间件就是一个方法
  function (ctx, next) { // 当使用多个中间件时，只要不是最后一个中间件，都必须在参数中带一个next方法用来跳转到下一个中间件。
    return User.findOne(ctx.params.id).then(function(user) {
      ctx.user = user;
      return next();
    });
  },
  function (ctx) {
    console.log(ctx.user);
    // => { id: 17, name: "Alex" }
  }
);
```

**嵌套路径**

```js
var forums = new Router();
var posts = new Router();

posts.get('/', function (ctx, next) {...});
posts.get('/:pid', function (ctx, next) {...});
forums.use('/forums/:fid/posts', posts.routes(), posts.allowedMethods());

// responds to "/forums/123/posts" and "/forums/123/posts/123"
app.use(forums.routes());
```

**路由前缀**

```js
var router = new Router({
  prefix: '/users'
});

router.get('/', ...); // responds to "/users"
router.get('/:id', ...); // responds to "/users/:id"
```

**重定向**

```js
router.redirect('/login', 'sign-in');
//其中，'/login'是source，'sign-in'是destination

This is equivalent to:

router.all('/login', function (ctx) {
  ctx.redirect('/sign-in');
  ctx.status = 301;
});
```

**命名路由**

```js
router.get('user', '/users/:id', function (ctx, next) {
 // ...
});

router.url('/users/:id', {id: 1});
或者：
router.url('user', 3);
// => "/users/3"
```

**URL参数**

```js
router.get('/:category/:title', function (ctx, next) {
  console.log(ctx.params);
  // => { category: 'programming', title: 'how-to-node' }
});
```

可以通过ctx.params获取到url后边的参数。

**装载路由**

```js
let home=new Router();
// 声明另外一个路由
let page = new Router();
// 由于使用了多个路由，所以需要装载所有路由
const router=new Router();
router.use('/home',home.routes(),home.allowedMethods())
router.use('/page',page.routes(),page.allowedMethods())
// 加载路由中间件
app.use(router.routes());
app.use(router.allowedMethods());
```







































































































