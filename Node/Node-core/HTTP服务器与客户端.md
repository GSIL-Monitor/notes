## HTTP服务器与客户端

Node.js提供了一个http模块，其中封装了一个HTTP服务器和一个HTTP客户端。

http.Server是一个基于事件的HTTP服务器。

http.request则是一个HTTP客户端工具，用于对HTTP服务器发起请求。

### HTTP服务器

使用http实现一个服务器

```JavaScript
http.createServer(function (req, res) {
    res.writeHead(200,{"Content-Type":"text/plain"});
    res.write("<h1>Node.js</h1>");
    res.end('<p>Hello World</p>');
}).listen(3000);
console.log("listening in 3000");
```

http.createServer创建了一个http.Server的实例，并将一个函数作为HTTP请求处理函数。这个函数接收两个参数，分别是请求对象（req）和响应对象（res）。

在服务器对响应进行处理，然后将其返回给客户端，并对请求对象进行事件处理。

#### http.Server的事件

http.Server是一个基于事件的HTTP服务器，所有的请求都被封装为独立的事件，主要提供以下几个事件。

- request：当客户端请求到来时，该事件被触发，提供两个参数req和res，分别是http.ServerRequest和http.ServerResponse的实例，表示请求和响应信息。
- connection：当TCP连接建立时，该事件被触发，提供一个参数socket，为net.Socket的实例。connection事件的粒度要大于request，因为客户端在Keep-Alive模式下可能会在同一个连接内发送多此请求。
- close：当服务器关闭时，该事件被触发。注意不是在用户连接断开时。

除此之外还有checkContinue，upgrade，clientError等高级的事件，只有在复杂的HTTP服务器的时候才会用到。

上述最常用的事件就是request，http.createServer就是request的一个捷径写法，显示写法如下：

```JavaScript
let server=new http.Server();
server.on('request',function (req, res) {
    res.writeHead(200,{"Content-Type":"text/plain"});
    res.write('<h1>Node.js</h1>');
    res.end('<p>Hello World</p>');
})
server.listen(3000);
console.log("listening in 3000");
```

#### http.ServerRequest

http.ServerRequest是HTTP请求的信息，是后端开发最重要的部分。一般由http.Server的request事件发送。也就是我们常见的request，req等请求对象。

HTTP请求一般可以分为两个部分：请求头和请求体；因为http.ServerRequest提供了三个事件用于控制请求体的传输。

- data：当请求体数据到来时，该事件被触发。该事件提供一个参数chunk，表示接收到的数据，如果该事件没有监听，那么请求提将会被抛弃。该事件可能会被调用多次。

- end：当请求体数据传输完成时，该事件被触发，此后将不会再有数据的到来。
- close：用户当前请求结束时，该事件被触发。不同于end，如果用户强制终止了传输，也还是调用close

下图是ServerRequest的属性：

![](https://github.com/zyileven/pictures/blob/master/ServerRequest%E5%B1%9E%E6%80%A7.png)

#### 获取GET请求内容

因为我们的get请求一般是放在URL当中的，所以我们使用url来获取GET请求的内容。

```JavaScript
http.createServer(function (req, res) {
    res.writeHead(200,{"Content-Type":"text/plain"});
    res.write(util.inspect(url.parse(req.url,true)));
    res.end();
}).listen(3000);
```

可以获得GET请求的内容为：

```
Url {
  protocol: null,
  slashes: null,
  auth: null,
  host: null,
  port: null,
  hostname: null,
  hash: null,
  search: null,
  query: {},
  pathname: '/',
  path: '/',
  href: '/' }
```

#### 获取POST请求内容

首先我们知道POST与GET请求并不相同，因此，post请求需要我们从请求体中去获取。因此手动添加监听请求的data事件，确认请求体内容。然后获取post请求的内容。

```javascript
http.createServer(function (req, res) {
    let post="";
    req.on("data",function (chunk) {
        post+=chunk;
    });
    req.on("end",function () {
        post=querystring.parse(post);
        res.end(util.inspect(post));
    });
}).listen(3000);
```

上面代码并没有在请求响应函数中向客户端返回信息，而是定义了一个 post 变量，用
于在闭包中暂存请求体的信息。通过 req 的 data 事件监听函数，每当接受到请求体的数据，就累加到 post 变量中。在 end 事件触发后，通过 querystring.parse 将 post 解析为真正的 POST 请求格式，然后向客户端返回。

#### http.ServerResponse

http.ServerResponse是返回给客户端的信息，决定了用户最终能看到的结果。他也是有http.Server的request事件发送的，所谓第二个参数传递，也就是我们熟知的response或res，

http.ServerResponse有三个重要的成员函数，用于返回响应头，响应内容以及结束请求：

- response.writeHead(statusCode, [headers])：向请求的客户端发送响应头。该函数在一个请求内最多只能调用一次，如果不调用，则会自动生成一个响应头。
- response.write(data, [encoding])：向请求的客户端发送响应内容。data 是一个 Buffer 或字符串，表示要发送的内容。如果 data 是字符串，那么需要指定encoding 来说明它的编码方式，默认是 utf-8。在 response.end 调用之前，response.write 可以被多次调用。
- response.end([data], [encoding])：结束响应，告知客户端所有发送已经完成。当所有要返回的内容发送完毕的时候，该函数 必须 被调用一次。它接受两个可选参数，意义和 response.write 相同。如果不调用该函数，客户端将永远处于等待状态。

### HTTP客户端

http 模块提供了两个函数 http.request 和 http.get，功能是作为客户端向 HTTP
服务器发起请求。

1、http.request(options, callback) 发起 HTTP 请求。接受两个参数，option 是一个类似关联数组的对象，表示请求的参数，callback 是请求的回调函数。

option常用的参数如下所示。

- host ：请求网站的域名或 IP 地址。
- port ：请求网站的端口，默认 80。
- method ：请求方法，默认是 GET。
- path ：请求的相对于根的路径。
- headers ：一个关联数组对象，为请求头的内容。

callback传递一个参数，为http.ClientResponse的实例

http.request 返回一个 http.ClientRequest 的实例。

```javascript
let contents = querystring.stringify({
    name: 'byvoid',
    email: 'byvoid@byvoid.com',
    address: 'Zijing 2#, Tsinghua University',
});
let options = {
    host: 'www.byvoid.com',
    path: '/application/node/post.php',
    method: 'POST',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length' : contents.length
    }
};
let req=http.request(options,function (res) {
    res.setEncoding("utf8");
    res.on("data",function (data) {
        console.log(data);
    });
});
req.write(contents);
req.end();
```

2、http.get（options，callback）

http模块还提供了一个更加简便的方法用于处理GET请求：http.get。它是http.request 的简化版，唯一的区别在于http.get自动将请求方法设为了 GET 请求，同时不需要手动调用 req.end()。

```JavaScript
http.get({host:'www.byvoid.com'},function(res){
    res.setEncoding("utf8");
    res.on("data",function (data) {
        console.log(data);
    })
});
```

#### http.ClientRequest

http.ClientRequest 是由 http.request 或 http.get 返回产生的对象，表示一个已经产生而且正在进行中的 HTTP 请求。它提供一个 response 事件，即 http.request或 http.get 第二个参数指定的回调函数的绑定对象。我们也可以显式地绑定这个事件的监听函数：

```JavaScript
let req=http.get({host:"www.byvoid.com"});
req.on('response',function (res) { //响应事件对响应的内容进行处理
    res.setEncoding("utf8");
    res.on("data",function (data) {
        console.log(data);
    })
});
req.write("xxx");//请求内容操作
req.end();//请求结束
```

http.ClientRequest 像 http.ServerResponse 一样也提供了 write 和 end 函数，用于向服务器发送请求体，通常用于 POST、PUT 等操作。所有写结束以后必须调用 end函数以通知服务器，否则请求无效。

http.ClientRequest 还提供了以下函数：

request.abort（）：终止正在发送的请求。

request.setTimeout（timeout，[callback]）：设置请求超时时间，timeout为毫秒数。当请求超时以后，callback将会被调用。

request.setNoDelay（）：一旦socket被分配给请求且已连接，socket.setNoDelay（）被调用。

request.setSocketKeepAlive()：一旦socket被分配给请求且已连接，socket.setSocketKeepAlive()被调用。

#### http.ClientResponse

http.ClientResponse 与 http.ServerRequest 相似，提供了三个事件 data、end和 close，分别在数据到达、传输结束和连接结束时触发，其中 data 事件传递一个参数chunk，表示接收到的数据。

http.ClientResponse 也提供了一些属性，用于表示请求的结果状态

statusCode 						HTTP 状态码，如 200、404、500
httpVersion 						HTTP 协议版本，通常是 1.0 或 1.1
headers 						HTTP 请求头
trailers 							HTTP 请求尾（不常见）

http.ClientResponse 还提供了以下几个特殊的函数。

- response.setEncoding([encoding])：设置默认的编码，当 data 事件被触发时，数据将会以 encoding 编码。默认值是 null，即不编码，以 Buffer 的形式存储。常用编码为 utf8。
- response.pause()：暂停接收数据和发送事件，方便实现下载功能。
- response.resume()：从暂停的状态中恢复。































