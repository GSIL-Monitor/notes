## 快速生成express框架

1、在顶层目录安装`express-generator`快速创建应用程序框架。 

```javascript
npm install express-generator -g
```

2、使用`express-generator`创建一个名为myapp的express框架的应用程序

```
 express --view=pug myapp
```

3、切换进项目目录，然后安装依赖

```
cd myapp
npm install
```

4、启动项目

```
set DEBUG=myapp:* & npm start
```

5、然后`http://localhost:3000/`在浏览器中加载以访问该应用程序。 

生成的应用程序具有以下目录结构： 

```
.
├── app.js
├── bin
│   └── www
├── package.json
├── public
│   ├── images
│   ├── javascripts
│   └── stylesheets
│       └── style.css
├── routes
│   ├── index.js
│   └── users.js
└── views
    ├── error.pug
    ├── index.pug
    └── layout.pug

7 directories, 9 files
```

## 

## Express路由

使用app.METHOD（）用来定义路由，来处理所有的HTTP方法，并使用app.use（）将中间件指定为回调函数

```
app.METHOD(PATH, HANDLER)
```

- `app`是一个实例`express`。
- `METHOD`是一个[HTTP请求方法](https://en.wikipedia.org/wiki/Hypertext_Transfer_Protocol#Request_methods)，小写。
- `PATH` 是服务器上的路径。
- `HANDLER` 是路由匹配时执行的功能。

get

```javascript
app.get('/', function (req, res) {
  res.send('Hello World!')
})
```

post

```javascript
app.post('/', function (req, res) {
  res.send('Got a POST request')
})
```

put

```javascript
app.put('/user', function (req, res) {
  res.send('Got a PUT request at /user')
})
```

delete

```javascript
app.delete('/user', function (req, res) {
  res.send('Got a DELETE request at /user')
})
```

有一种特殊的路由方法，`app.all()`用于在路径上为*所有* HTTP请求方法加载中间件函数。 

```javascript
app.all('/secret', function (req, res, next) {
  console.log('Accessing the secret section ...')
  next() // pass control to the next handler
})
```

### 路线处理程序

您可以提供多个回调函数，其行为类似于[中间件](http://expressjs.com/en/guide/using-middleware.html)来处理请求。唯一的例外是这些回调可能会调用`next('route')`以绕过剩余的路由回调。您可以使用此机制对路径施加前置条件，然后在没有理由继续当前路由的情况下将控制权传递给后续路由。 

#### 单个回调函数可以处理路由

```javascript
app.get('/example/a', function (req, res) {
  res.send('Hello from A!')
})
```

#### 多个回调函数可以处理路径（确保指定`next`对象）

```
app.get('/example/b', function (req, res, next) {
  console.log('the response will be sent by the next function ...')
  next()
}, function (req, res) {
  res.send('Hello from B!')
})
```

#### 一组回调函数可以处理路由

``` javascript
var cb0 = function (req, res, next) {
  console.log('CB0')
  next()
}

var cb1 = function (req, res, next) {
  console.log('CB1')
  next()
}

var cb2 = function (req, res) {
  res.send('Hello from C!')
}

app.get('/example/c', [cb0, cb1, cb2])
```

#### 独立函数和函数数组的组合可以处理路径

```javascript
var cb0 = function (req, res, next) {
  console.log('CB0')
  next()
}

var cb1 = function (req, res, next) {
  console.log('CB1')
  next()
}

app.get('/example/d', [cb0, cb1], function (req, res, next) {
  console.log('the response will be sent by the next function ...')
  next()
}, function (req, res) {
  res.send('Hello from D!')
})
```

### app.route()方法

您可以使用创建路径的可链接路径处理程序`app.route()`。由于路径是在单个位置指定的，因此创建模块化路由很有帮助，同时减少冗余和拼写错误。 

以下是使用定义的链接路由处理程序的示例`app.route()`。 

```javascript
app.route('/book')
  .get(function (req, res) {
    res.send('Get a random book')
  })
  .post(function (req, res) {
    res.send('Add a book')
  })
  .put(function (req, res) {
    res.send('Update the book')
  })
```

### express.Router

使用`express.Router`该类创建模块化，可安装的路由处理程序。一个`Router`实例是一个完整的中间件和路由系统; 因此，它通常被称为“迷你应用程序”。 

以下示例将路由器创建为模块，在其中加载中间件功能，定义一些路由，并将路由器模块安装在主应用程序中的路径上。 

```javascript
var express = require('express')
var router = express.Router()

// middleware that is specific to this router
router.use(function timeLog (req, res, next) {
  console.log('Time: ', Date.now())
  next()
})
// define the home page route
router.get('/', function (req, res) {
  res.send('Birds home page')
})
// define the about route
router.get('/about', function (req, res) {
  res.send('About birds')
})

module.exports = router
```

然后，在应用程序中加载路由器模块： 

```javascript
var birds = require('./birds')

// ...

app.use('/birds', birds)
```

## 

## 响应方法

响应方法可以像客户端发送响应，并终止请求-响应周期。如果没有从路由处理程序调用这些方法，则客户端请求将保持挂起状态。 

| 方法             | 描述                                                    |
| ---------------- | ------------------------------------------------------- |
| res.download()   | 提示下载文件                                            |
| res.end()        | 结束响应过程                                            |
| res.json()       | 发送JSON请求                                            |
| res.jsonp()      | 使用JSONP支持发送JSON响应                               |
| res.redirect()   | 重定向请求                                              |
| res.render()     | 渲染视图模板                                            |
| res.send()       | 发送各种类型的回复                                      |
| res.sendFile()   | 将文件作为八位字节流发送                                |
| res.sendStatus() | 设置 响应状态代码并将其字符串表示形式作为响应主体发送。 |

## Express中间件

### 概念

语法：`app.use（[path，] callback [，callback ...]）`

在指定的路径上安装指定的中间件函数：当请求的路径path的基数匹配时，执行中间件函数。

path：中间件函数的路径，可以使以下任何一种：

- 表示路径的字符串
- 路径模式
- 用于匹配路径的正则表达式模式
- 任何上述组合的阵列

callback：回调函数

- 中间件功能
- 一系列中间件函数（以逗号隔开）
- 一系列中间件功能
- 以上所有的组合

您可以提供多个类似中间件的回调函数，除了这些回调可以调用`next('route')`以绕过剩余的路由回调。您可以使用此机制在路由上施加前置条件，然后在没有理由继续当前路由的情况下将控制权传递给后续路由。 

path的默认值就是“/”，所以对**每次请求都全部要执行的函数不会有路径**。

```javascript
app.use(function (req, res, next) {
  console.log('Time: %d', Date.now());
  next();
});
```

中间件功能按顺序执行，因此中间件包含的顺序很重要。

中间件函数是可以访问[请求对象](http://expressjs.com/en/4x/api.html#req)（`req`），[响应对象](http://expressjs.com/en/4x/api.html#res)（`res`）以及`next`应用程序请求 - 响应周期函数的函数。该`next`功能是Express路由器中的一个功能，当被调用时，它将执行当前中间件之后的中间件。 

中间件功能可以执行以下任务：

- 执行任何代码。
- 更改请求和响应对象。
- 结束请求 - 响应周期。
- 调用堆栈中的下一个中间件。

如果当前的中间件函数没有结束请求 - 响应周期，则**必须调用`next()`以将控制传递给下一个中间件函数**。否则，请求将被挂起。 

![](E:\WebStorm_Dir\pictures\express中间件.png)

```JavaScript
var express = require('express')
var app = express()

app.get('/', function (req, res) {
  res.send('Hello World!')
})

app.listen(3000)
```

#### 路径模式

这将匹配以`/ abcd`和`/ abd`开头的路径：

```javascript
app.use('/abc?d', function (req, res, next) {
  next();
});
```

这将匹配以`/ abcd`，`/ abbcd`，`/ abbbbbcd`开头的路径，依此类推：

```javascript
app.use('/ab+cd', function (req, res, next) {
  next();
});
```

这将匹配以`/ abcd`，`/ abxcd`，`/ abFOOcd`，`/ abbArcd`开头的路径，等等：

```javascript
app.use('/ab\*cd', function (req, res, next) {
  next();
});
```

这将匹配以`/ ad`和`/ abcd`开头的路径：

```javascript
app.use('/a(bc)?d', function (req, res, next) {
  next();
});
```

#### 正则表达式

这将匹配以`/ abc`和`/ xyz`开头的路径：

```javascript
app.use(/\/abc|\/xyz/, function (req, res, next) {
  next();
});
```

#### 排列

这将匹配以`/ abcd`，`/ xyza`，`/ lmn`和`/ pqr`开头的路径：

```javascript
app.use(['/abcd', '/xyza', /\/lmn|\/pqr/], function (req, res, next) {
  next();
});
```

### 中间件功能myLogger（复用中间件的写法）

这是一个名为“myLogger”的中间件函数的简单示例。当对应用程序的请求通过时，此函数只打印“LOGGED”。中间件函数被分配给名为的变量`myLogger`。

```JavaScript
var myLogger = function (req, res, next) {
  console.log('LOGGED')
  next()
}
```

> 注意上面的调用`next()`。调用此函数会调用应用程序中的下一个中间件函数。该`next()`函数不是Node.js或Express API的一部分，而是传递给中间件函数的第三个参数。该`next()`函数可以命名为任何东西，但按照惯例，它总是被命名为“next”。为避免混淆，请始终使用此约定。 

要加载中间件功能，请调用`app.use()`，指定中间件功能。例如，以下代码`myLogger`在到根路径（/）的路由之前加载中间件函数。 

```JavaScript
var express = require('express')
var app = express()
// 编写可复用的中间件myLogger
var myLogger = function (req, res, next) {
  console.log('LOGGED')
  next()
}
// 使用myLogger中间件，并且这样使用的中间件在每次请求时都会触发这个中间件
app.use(myLogger)
// 使用myLogger之后的中间件，但是请求周期将终止于这个中间件，因为他没有next
app.get('/', function (req, res) {
  res.send('Hello World!')
})

app.listen(3000)
```

**每次应用程序收到请求时，它都会向终端输出消息“LOGGED”，因为他是直接使用中间件，而没有路径的说法。**

中间件加载的顺序很重要：首先加载的中间件函数也会先执行。

如果上一个没有调用next（）方法，请求-响应周期就在上一个中间件终止，后续的中间件都是无效的

### 中间件回调函数示例

一些简单的例子`callback`参数`app.use()`，`app.METHOD()`和`app.all()` 

#### 单个中间件

您可以在本地定义和安装中间件功能。

```javascript
app.use(function (req, res, next) {
  next();
});
```

路由器是有效的中间件。

```javascript
var router = express.Router();
router.get('/', function (req, res, next) {
  next();
});
app.use(router);
```

Express应用程序是有效的中间件。

```javascript
var subApp = express();
subApp.get('/', function (req, res, next) {
  next();
});
app.use(subApp);
```

#### 中间件系列

您可以在同一装载路径中指定多个中间件功能。

```javascript
var r1 = express.Router();
r1.get('/', function (req, res, next) {
  next();
});

var r2 = express.Router();
r2.get('/', function (req, res, next) {
  next();
});

app.use(r1, r2);
```

#### 排列

使用数组逻辑分组中间件。如果将一组中间件作为第一个或仅中间件参数传递，则

必须指定装载路径。

```javascript
var r1 = express.Router();
r1.get('/', function (req, res, next) {
  next();
});

var r2 = express.Router();
r2.get('/', function (req, res, next) {
  next();
});

app.use('/', [r1, r2]);
```

#### 组合

您可以结合上述所有安装中间件的方法。

```javascript
function mw1(req, res, next) { next(); }
function mw2(req, res, next) { next(); }

var r1 = express.Router();
r1.get('/', function (req, res, next) { next(); });

var r2 = express.Router();
r2.get('/', function (req, res, next) { next(); });

var subApp = express();
subApp.get('/', function (req, res, next) { next(); });

app.use(mw1, [mw2, r1, r2], subApp);
```

#### express.static中间件

从应用程序目录中的“public”目录为应用程序提供静态内容：

```javascript
// GET /style.css etc
app.use(express.static(__dirname + '/public'));
```

将中间件安装在“/ static”以仅在其请求路径以“/ static”为前缀时才提供静态内容：

```javascript
// GET /static/style.css etc.
app.use('/static', express.static(__dirname + '/public'));
```

通过在静态中间件之后加载记录器中间件来禁用静态内容请求的日志记录：

```javascript
app.use(express.static(__dirname + '/public'));
app.use(logger());
```

从多个目录提供静态文件，但优先于“./public”而不是其他目录：

```javascript
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/files'));
app.use(express.static(__dirname + '/uploads'));
```



### 中间件功能requestTime

创建一个名为“requestTime”的中间件函数，并将其添加为`requestTime` 对请求对象调用的属性。 

```JavaScript
var requestTime = function (req, res, next) {
  req.requestTime = Date.now()
  next()
}
```

该应用程序现在使用`requestTime`中间件功能。此外，根路径路由的回调函数使用中间件函数添加的属性`req`（请求对象）。 

```JavaScript
var express = require('express')
var app = express()

var requestTime = function (req, res, next) {
  req.requestTime = Date.now()
  next()
}
//调用requestTime中间件
app.use(requestTime)
//调用根目录中间件，但是它可以使用requestTime中间件里面的req或者res的属性或方法，也就是说后面的中间件，可以使用前面中间件放到req和res中的属性和方法
app.get('/', function (req, res) {
  var responseText = 'Hello World!<br>'
  responseText += '<small>Requested at: ' + req.requestTime + '</small>'
  res.send(responseText)
})

app.listen(3000)
```

当您向应用程序的根目录发出请求时，应用程序现在会在浏览器中显示您的请求的时间戳。

因为您可以访问请求对象，响应对象，堆栈中的下一个中间件函数以及整个Node.js API，所以中间件函数的可能性是无穷无尽的。

### 可配置得中间件

如果您需要配置中间件，请导出一个接受选项对象或其他参数的函数，然后根据输入参数返回中间件实现。 

```JavaScript
module.exports = function(options) {
  return function(req, res, next) {
    // 使用options对象实现中间件函数
    next()
  }
}
```

现在可以使用中间件，如下所示。 

```JavaScript
var mw = require('./my-middleware.js')

app.use(mw({ option1: '1', option2: '2' }))
```







## Express静态文件

express框架将所有的静态资源放在一个public文件里面，里面包含有JS，css，image，html等静态文件。

使用app.use()指定这个文件夹，就可以在URL中访问指定的内容。

```
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static('public'));
```

上面两种方式都可以获取到public目录，但是前一种更为保险，他是用绝对路径的方式，保证了能够正确的指向。如果app.js与public文件夹在同一个目录，可以使用第二种方式。

使用静态文件主要的方法是：

```
http://localhost:3000/images/kitten.jpg
http://localhost:3000/css/style.css
http://localhost:3000/js/app.js
http://localhost:3000/images/bg.png
http://localhost:3000/hello.html
```







## app.xxx（）

分配设置`name`到`value`。您可以存储所需的任何值，但可以使用某些名称来配置服务器的行为。 

使用方式：

```javascript
app.set('title', 'My Site');
app.get('title'); // "My Site"
```

### 应用程序设置

| 属性                   | 类型         | 描述                                                         | 默认                                                         |
| ---------------------- | ------------ | ------------------------------------------------------------ | ------------------------------------------------------------ |
| case sensitive routing | 布尔         | 启用区分大小写。                                             | N / A（未定义）                                              |
| env                    | 串           | 环境模式。                                                   | `process.env.NODE_ENV`（`NODE_ENV`环境变量）或“开发”如果`NODE_ENV`没有设置。 |
| etag                   | 多变         | 设置ETag响应头。                                             | `weak`                                                       |
| jsonp callback name    | 串           | 指定默认的JSONP回调名称。                                    | “回电话”                                                     |
| json escape            | 布尔         | 启用从逃逸JSON响应`res.json`，`res.jsonp`以及`res.send`API的。 | N / A（未定义）                                              |
| json replacer          | 多变         | [`JSON.stringify`使用](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify#The_replacer_parameter)的['replacer'参数](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify#The_replacer_parameter)。**注意**：子应用程序将继承此设置的值。 | N / A（未定义）                                              |
| json spaces            | 多变         | [`JSON.stringify`使用](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify#The_space_argument)的['space'参数](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify#The_space_argument)。这通常设置为用于缩进美化JSON的空格数。**注意**：子应用程序将继承此设置的值。 | N / A（未定义）                                              |
| query parser           | 多变         | 通过将值设置为禁用查询解析`false`，或将查询解析器设置为使用“简单”或“扩展”或自定义查询字符串解析功能。<br /><br />简单的查询解析器基于Node的本机查询解析器[querystring](http://nodejs.org/api/querystring.html)。<br /><br />扩展查询解析器基于[qs](https://www.npmjs.org/package/qs)。<br /><br />自定义查询字符串解析函数将接收完整的查询字符串，并且必须返回查询键及其值的对象。 | “扩展”                                                       |
| strict routing         | 布尔         | 启用严格路由。                                               | N / A（未定义）                                              |
| subdomain offset       | 数           | 要删除以访问子域的主机的点分隔部分的数量。                   | 2                                                            |
| trust proxy            | 多变         | 表示应用程序位于前置代理后面，并使用`X-Forwarded-*`标头确定客户端的连接和IP地址。注意：`X-Forwarded-*`标头很容易被欺骗，检测到的IP地址不可靠。<br /><br />启用后，Express会尝试确定通过前置代理或一系列代理连接的客户端的IP地址。然后，`req.ips`属性包含客户端通过的IP地址数组。要启用它，请使用[信任代理选项表中](http://expressjs.com/en/4x/api.html#trust.proxy.options.table)描述的值。 | `false` （禁用）                                             |
| views                  | 字符串或数组 | 应用程序视图的目录或目录数组。如果是数组，则按照它们在数组中出现的顺序查找视图。 | `process.cwd() + '/views'`                                   |
| view cache             | 布尔         | 启用视图模板编译缓存。                                       | `true` 在生产中，否则未定义。                                |
| view engine            | 串           | 省略时使用的默认引擎扩展                                     | N / A（未定义）                                              |
| x-powered-by           | 布尔         | 启用“X-Powered-By：Express”HTTP标头。                        | `true`                                                       |

相关APIhttp://expressjs.com/en/4x/api.html#app.set

“trust proxy”设置选项

“etag”设置的选项

## express.json（）/bodyParser

都是用来解析客户端请求的。前者新版，后者旧版。

APIhttp://expressjs.com/en/4x/api.html#express.json











