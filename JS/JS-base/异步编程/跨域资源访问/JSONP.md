JSONP就是使用script标签中的src属性来获取其他域的内容，但是需要服务端返回指定的部分数据。



### 客户端的处理

1.首先为JSONP跨域请求设置一个触发条件，即click事件处理程序

```js
btn.addEventListener('click', function () {
   
})
```

2.利用jsonp的特性创建一个script标签，并将其添加到DOM树上。

```js
let script = document.createElement('script');
script.setAttribute('type', 'text/javascript');
script.src = url;
document.body.appendChild(script);
```

> 触发click事件，开始请求-------------->

### 服务端的代码书写步骤：

1.首先在Node环境搭建一个服务器

```js
let http = require("http");
let server = http.createServer();
server.listen(8080);
```

2.为服务端书写接收到请求后的处理方式，即request事件处理函数。

```js
server.on("request", function (req, res) {
    
}
```

3.使用Node内置核心模块url和querystring获取请求体中的数据

```js
let url = require("url");
let querystring = require("querystring");
let urlPath = url.parse(req.url).pathname;
let qs = querystring.parse(req.url.split("?")[1]);// 获取到？后面部分，也就是callback=monkey，体现的格式为{ callback: 'monkey' }
```

URL的结构：http://www.域名/路径名?hashKey=hashValue

上述获取到了urlPath表示URL的路径参数，qs获取到了？后面部分的hash值

4.判断路径名是以/jsonp结尾的，并且hash参数里面有一个名为callback的hashKey，则表示请求是一个JSONP请求，并且请求指定需要返回一个hashKey为callback的参数。

```js
if (urlPath === '/jsonp' && qs.callback) {
    
}
```

5.制作响应头，指定返回的是json数据，并且指定返回的数据内容data

```js
// 响应头信息
res.writeHead(200, {'Content-Type': 'application/json;charset=utf-8'});
// 数据
let data = {"name": "data values",};
// 数据JSON化
data = JSON.stringify(data);
```

6.返回一个响应callback，由请求callback和data数据构成

```js
let callback = qs.callback + "(" + data + ");";
```

这里的qs.callback代表的是请求体中的http://localhost:8080/jsonp?callback=monkey的monkey，data是一个JSON数据。组合起来得到一个名为callback的字符串变量，内容为`monkey({"name":"data values"});`

7.于是在处理完请求的最后一步将callback放在响应体中返回回去。注意：因为monkey是由请求端确定的，所以可以由请求端任意设置任何名字，服务端会响应对应名字的callback值。

```js
res.end(callback);
```

> 服务端发送了一个响应给客户端，客户端开始处理响应----------------------》

### 客户端的处理

1.创建一个函数，函数名为http://localhost:8080/jsonp?callback=monkey中的callback的值，即monkey，参数是data，这里的服务端返回的data就是相应体`monkey({"name":"data values"});`中的json数据部分，然后就可以在这个函数体中进行数据的操作。

```js
function monkey(data) {
    root.innerText = data.name;
}
```



### 源代码：

#### 服务端

```js
let http = require("http");
let url = require("url");
let querystring = require("querystring");
let server = http.createServer();
server.on("request", function (req, res) {
    let urlPath = url.parse(req.url).pathname;
    let qs = querystring.parse(req.url.split("?")[1]);// 获取到？后面部分，也就是callback=monkey，体现的格式为{ callback: 'monkey' }
    if (urlPath === '/jsonp' && qs.callback) {
        // 响应头信息
        res.writeHead(200, {'Content-Type': 'application/json;charset=utf-8'});
        // 数据
        let data = {"name": "data values",};
        // 数据JSON化
        data = JSON.stringify(data);
        // 从 http://localhost:8080/jsonp?callback=monkey 获取到 qs.callback=monkey
        console.log(qs.callback);
        // 定义一个callback 字符串变量，callback = monkey({"name":"data values"})
        let callback = qs.callback + "(" + data + ");";
        // 返回callback，客户端由 function monkey(data){这里处理数据}  接收
        console.log(callback);
        console.log(typeof callback);
        res.end(callback);
    } else {
        res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'});
        res.end('Hell World\n');
    }
});
server.listen(8080);
console.log("server is running...");

```

#### 客户端

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <style>
        #root {
            width: 10rem;
            height: 10rem;
        }
    </style>
</head>
<body>
<span>启动服务器之后才有效</span>
<div id="root">root</div>
<button id="btn">点我切换文本</button>
<script>
    // node-server 服务器
    let btn = document.getElementById("btn");
    let root = document.getElementById("root");
    let url = "http://localhost:8080/jsonp?callback=monkey";

    function monkey(data) {
        root.innerText = data.name;
    }

    btn.addEventListener('click', function () {
        let script = document.createElement('script');
        script.setAttribute('type', 'text/javascript');
        script.src = url;
        document.body.appendChild(script);
    })
</script>
</body>
</html>
```

