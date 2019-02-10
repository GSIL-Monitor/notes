### 搭建一个服务

```js
const http = require('http')

http.createServer((req, res) => {
  res.end('Hello World\n')
}).listen(3000)
```

这就是node给我们提供的创建服务的方式，当然，这里是人家给你封装好了，给你随便使用而已。接下来了解一下实现这个功能的基本原理。

### 基本

```js
             _______
            |       | <== res
request ==> |   ?   | 
            |_______| ==> req
               /\
               ||
        http.createServer()
```

- 首先调用 `http.createServer()` 生成一个 `http.Server` 对象 来处理请求

  ```js
  let server = http.createServer();
  ```

- 每次收到请求，都先解析生成 req ( `http.IncomingMessage` ) 和 res ( `http.ServerResponse` )，然后交由用户函数处理。具体内容可以查看附件。

- 用户函数调用`res.end()`来结束处理，响应请求。

从上面的步骤中，我们可以提取出重点是：

1. http.createServer
2. 解析生成req和res
3. 调用用户函数
4. res.end()

### http.createServer

源代码是这样写的：

```js
// lib/http.js

function createServer(requestListener) {
  return new Server(requestListener);
}

// lib/_http_server.js

function Server(requestListener) {
  if (!(this instanceof Server)) return new Server(requestListener);
  net.Server.call(this, { allowHalfOpen: true });

  if (requestListener) {
    this.on('request', requestListener);
  }

  this.on('connection', connectionListener);

  // ...
}
```

可以明显的看到 `http.createServer`函数返回的是一个`http.Server`实例。

该实例监听了`request`和`connection`两个事件：

- request事件：绑定requestListener（）函数，req和res准备好时触发。
- connection事件：绑定connectionListener（）函数，连接时触发。

用户函数是requestListener（），因此，我们需要知道request事件何时触发：

```js
// lib/_http_server.js

function connectionListener(socket) {
  // ...

  // 从 parsers 中取一个 parser
  var parser = parsers.alloc();
  parser.reinitialize(HTTPParser.REQUEST);
  parser.socket = socket;
  socket.parser = parser;

  // ...

  state.onData = socketOnData.bind(undefined, this, socket, parser, state);

  // ...

  socket.on('data', state.onData);

  // ...
}

function socketOnData(server, socket, parser, state, d) {
  // ...
  var ret = parser.execute(d);
  // ...
}
```

当连接建立时，触发 connnection 事件，执行 `connectionListener()`。

这里的 socket 正是连接的 socket 对象，给 socket 绑定 data 事件用来处理数据，处理数据用到的 parser 是从 parsers 中取出来的。

data 事件触发时，执行 `socketOnData()`，最后调用 `parser.execute()` 来解析 HTTP 报文。

值得一提的是 parsers 由一个叫做 FreeList ( [wiki](https://en.wikipedia.org/wiki/Free_list) ) 的数据结构实现，其主要目的是复用 parser。

```js
// lib/internal/freelist.js

class FreeList {
  constructor(name, max, ctor) {
    this.name = name;
    this.ctor = ctor;
    this.max = max;
    this.list = [];
  }

  alloc() {
    return this.list.length ? this.list.pop() :
                              this.ctor.apply(this, arguments);
  }

  free(obj) {
    if (this.list.length < this.max) {
      this.list.push(obj);
      return true;
    }
    return false;
  }
}

module.exports = FreeList;
```

通过调用 `parsers.alloc()` 和 `parsers.free(parser)` 来获取释放 parser ( http 模块中 max 为 1000 )

### 解析生成`req`和`res`

由上我们已经知道HTTP 报文是由 parser 来解析的，那么，就让我们来看看 parser 是如何创建的。

```js
// lib/_http_common.js

const binding = process.binding('http_parser');
const HTTPParser = binding.HTTPParser;

// ...

var parsers = new FreeList('parsers', 1000, function() {
  var parser = new HTTPParser(HTTPParser.REQUEST);

  parser._headers = [];
  parser._url = '';
  parser._consumed = false;

  parser.socket = null;
  parser.incoming = null;
  parser.outgoing = null;

  parser[kOnHeaders] = parserOnHeaders;
  parser[kOnHeadersComplete] = parserOnHeadersComplete;
  parser[kOnBody] = parserOnBody;
  parser[kOnMessageComplete] = parserOnMessageComplete;
  parser[kOnExecute] = null;

  return parser;
});

function parserOnHeadersComplete(versionMajor, versionMinor, headers, method, url, statusCode, statusMessage, upgrade, shouldKeepAlive) {
  // ...
    
  if (!upgrade) {
    skipBody = parser.onIncoming(parser.incoming, shouldKeepAlive);
  }

  // ...
}

// lib/_http_server.js

function connectionListener(socket) {
  // ...
  parser.onIncoming = parserOnIncoming.bind(undefined, this, socket, state);
  // ...
}
```

parser 是由 `http_parser` 这个库实现。不难看出，这里的 parser 也是基于事件的

在解析过程中，所经历的事件：

- kOnHeaders：不断解析获取的请求头
- kOnHeadersComplete：请求头解析完毕
- kOnBody：不断解析获取的请求体
- kOnMessageComplete：请求体解析完毕
- kOnExecute：一次解析完毕 ( 无法一次性接收 HTTP 报文的情况 )

当请求头解析完毕时，对于非 upgrade 请求，可以直接执行 `parser.onIncoming()`，进行响应。

```js
// lib/_http_server.js

// 生成 response，并触发 request 事件
function parserOnIncoming(server, socket, state, req, keepAlive) {
  state.incoming.push(req);

  // ...

  var res = new ServerResponse(req);
  
  // ...

  if (socket._httpMessage) {
    state.outgoing.push(res);
  } else {
    res.assignSocket(socket);
  }

  // ...

  res.on('finish', resOnFinish.bind(undefined, req, res, socket, state, server));

  // ...

    server.emit('request', req, res);
  
  // ...
}

function resOnFinish(req, res, socket, state, server) {
  // ...

  state.incoming.shift();

  // ...

  res.detachSocket(socket);

  // ...
    var m = state.outgoing.shift();
    if (m) {
      m.assignSocket(socket);
    }
  }
}
```

可以看出，在源码中，对每一个 socket，维护了 `state.incoming` 和 `state.outgoing` 两个队列，分别用于存储 req 和 res

当 finish 事件触发时，将 req 和 res 从队列中移除

执行 `parserOnIncoming()` 时，最后会触发 request 事件，来调用用户函数

### 调用用户函数

就拿最开始的例子来说：

```js
const http = require('http')

http.createServer((req, res) => {
  res.end('Hello World\n')
}).listen(3000)
```

通过调用 `res.end('Hello World\n')` 来告诉 res，处理完成，可以响应并结束请求。

### res.end

ServerResponse 继承自 OutgoingMessage，`res.end()` 正是 `OutgoingMessage.prototype.end()`

```js
// lib/_http_outgoing.js

OutgoingMessage.prototype.end = function end(chunk, encoding, callback) {
  // ...
  if (chunk) {
    // ...
    write_(this, chunk, encoding, null, true);
  } else if (!this._header) {
    this._contentLength = 0;
    // 生成响应头
    this._implicitHeader();
  }

  // ...
  // 触发 finish 事件
  var finish = onFinish.bind(undefined, this);

  var ret;
  if (this._hasBody && this.chunkedEncoding) {
    // trailer 头相关
    ret = this._send('0\r\n' + this._trailer + '\r\n', 'latin1', finish);
  } else {
    // 保证一定会触发 finish 事件
    ret = this._send('', 'latin1', finish);
  }

  this.finished = true;

  // ...
};

function write_(msg, chunk, encoding, callback, fromEnd) {
  // ...

  if (!msg._header) {
    msg._implicitHeader();
  }

  // ...

  var len, ret;
  if (msg.chunkedEncoding) { // 响应大文件时，分块传输
    if (typeof chunk === 'string')
      len = Buffer.byteLength(chunk, encoding);
    else
      len = chunk.length;

    msg._send(len.toString(16), 'latin1', null);
    msg._send(crlf_buf, null, null);
    msg._send(chunk, encoding, null);
    ret = msg._send(crlf_buf, null, callback);
  } else {
    ret = msg._send(chunk, encoding, callback);
  }

  // ...
}
```

执行函数时，如果给了 chunk，就先 `write_(chunk)`，写入 chunk。再 `_send('', 'latin1', finish)` 绑定 finish 函数。待写入完成后，触发 finish 事件，结束响应

在写入 chunk 之前，必须确保 headers 已经生成，如果没有则调用 `_implicitHeader()` 隐式生成 headers

```js
// lib/_http_server.js

ServerResponse.prototype._implicitHeader = function _implicitHeader() {
  this.writeHead(this.statusCode);
};

ServerResponse.prototype.writeHead = writeHead;
function writeHead(statusCode, reason, obj) {
  // ...
  // 将 obj 和 this[outHeadersKey] 中的所有 header 放到 headers 中
  // ...

  var statusLine = 前后端数据交互 + statusCode + ' ' + this.statusMessage + CRLF;

  this._storeHeader(statusLine, headers);
}

// lib/_http_outgoing.js

OutgoingMessage.prototype._storeHeader = _storeHeader;
function _storeHeader(firstLine, headers) {
  力导向图.html
  前后端数据交互

  // ...
  前后端数据交互
  // ...

  this._header = state.header + CRLF;
  this._headerSent = false;

  // ...
}
```

headers 生成后，保存在 `this._header` 中，此时，响应报文头部已经完成，只需要在响应体之前写入 socket 即可

`write_()` 函数，内部也是调用 `_send()` 函数写入数据

```js
// lib/_http_outgoing.js

OutgoingMessage.prototype._send = function _send(data, encoding, callback) {
  if (!this._headerSent) { // 将 headers 添加到 data 前面
    if (typeof data === 'string' &&
        (encoding === 'utf8' || encoding === 'latin1' || !encoding)) {
      data = this._header + data;
    } else {
      var header = this._header;
      if (this.output.length === 0) {
        this.output = [header];
        this.outputEncodings = ['latin1'];
        this.outputCallbacks = [null];
      } else {
        this.output.unshift(header);
        this.outputEncodings.unshift('latin1');
        this.outputCallbacks.unshift(null);
      }
      this.outputSize += header.length;
      this._onPendingData(header.length);
    }
    this._headerSent = true;
  }
  return this._writeRaw(data, encoding, callback);
};

OutgoingMessage.prototype._writeRaw = _writeRaw;
function _writeRaw(data, encoding, callback) {
  const conn = this.connection;

  // ...

  if (conn && conn._httpMessage === this && conn.writable && !conn.destroyed) {
    if (this.output.length) { // output 中有缓存，先写入缓存
      this._flushOutput(conn);
    } else if (!data.length) { // 没有则异步执行回调
      if (typeof callback === 'function') {
        nextTick(this.socket[async_id_symbol], callback);
      }
      return true;
    }
    // 直接写入 socket
    return conn.write(data, encoding, callback);
  }
  // 加入 output 缓存
  this.output.push(data);
  this.outputEncodings.push(encoding);
  this.outputCallbacks.push(callback);
  this.outputSize += data.length;
  this._onPendingData(data.length);
  return false;
}
```

对于 `res.end()` 来说，直接在 `nextTick()` 中触发 finish 事件，结束响应



### 附件

#### req的内容及结构

```json
IncomingMessage {
  _readableState:
   ReadableState {
     objectMode: false,
     highWaterMark: 16384,
     buffer: BufferList { length: 0 },
     length: 0,
     pipes: null,
     pipesCount: 0,
     flowing: null,
     ended: false,
     endEmitted: false,
     reading: false,
     sync: true,
     needReadable: false,
     emittedReadable: false,
     readableListening: false,
     resumeScheduled: false,
     emitClose: true,
     destroyed: false,
     defaultEncoding: 'utf8',
     awaitDrain: 0,
     readingMore: true,
     decoder: null,
     encoding: null },
  readable: true,
  _events: {},
  _eventsCount: 0,
  _maxListeners: undefined,
  socket:
   Socket {
     connecting: false,
     _hadError: false,
     _handle:
      TCP {
        reading: true,
        owner: [Circular],
        onread: [Function: onread],
        onconnection: null,
        _consumed: true },
     _parent: null,
     _host: null,
     _readableState:
      ReadableState {
        objectMode: false,
        highWaterMark: 16384,
        buffer: BufferList { length: 0 },
        length: 0,
        pipes: null,
        pipesCount: 0,
        flowing: true,
        ended: false,
        endEmitted: false,
        reading: true,
        sync: false,
        needReadable: true,
        emittedReadable: false,
        readableListening: false,
        resumeScheduled: false,
        emitClose: false,
        destroyed: false,
        defaultEncoding: 'utf8',
        awaitDrain: 0,
        readingMore: false,
        decoder: null,
        encoding: null },
     readable: true,
     _events:
      { end: [Array],
        drain: [Array],
        timeout: [Function: socketOnTimeout],
        data: [Function: bound socketOnData],
        error: [Function: socketOnError],
        close: [Array],
        resume: [Function: onSocketResume],
        pause: [Function: onSocketPause] },
     _eventsCount: 8,
     _maxListeners: undefined,
     _writableState:
      WritableState {
        objectMode: false,
        highWaterMark: 16384,
        finalCalled: false,
        needDrain: false,
        ending: false,
        ended: false,
        finished: false,
        destroyed: false,
        decodeStrings: false,
        defaultEncoding: 'utf8',
        length: 0,
        writing: false,
        corked: 0,
        sync: true,
        bufferProcessing: false,
        onwrite: [Function: bound onwrite],
        writecb: null,
        writelen: 0,
        bufferedRequest: null,
        lastBufferedRequest: null,
        pendingcb: 0,
        prefinished: false,
        errorEmitted: false,
        emitClose: false,
        bufferedRequestCount: 0,
        corkedRequestsFree: [Object] },
     writable: true,
     allowHalfOpen: true,
     _sockname: null,
     _pendingData: null,
     _pendingEncoding: '',
     server:
      Server {
        _events: [Object],
        _eventsCount: 2,
        _maxListeners: undefined,
        _connections: 1,
        _handle: [TCP],
        _usingWorkers: false,
        _workers: [],
        _unref: false,
        allowHalfOpen: true,
        pauseOnConnect: false,
        httpAllowHalfOpen: false,
        timeout: 120000,
        keepAliveTimeout: 5000,
        _pendingResponseData: 0,
        maxHeadersCount: null,
        _connectionKey: '6::::3000',
        [Symbol(IncomingMessage)]: [Function],
        [Symbol(ServerResponse)]: [Function],
        [Symbol(asyncId)]: 4 },
     _server:
      Server {
        _events: [Object],
        _eventsCount: 2,
        _maxListeners: undefined,
        _connections: 1,
        _handle: [TCP],
        _usingWorkers: false,
        _workers: [],
        _unref: false,
        allowHalfOpen: true,
        pauseOnConnect: false,
        httpAllowHalfOpen: false,
        timeout: 120000,
        keepAliveTimeout: 5000,
        _pendingResponseData: 0,
        maxHeadersCount: null,
        _connectionKey: '6::::3000',
        [Symbol(IncomingMessage)]: [Function],
        [Symbol(ServerResponse)]: [Function],
        [Symbol(asyncId)]: 4 },
     parser:
      HTTPParser {
        '0': [Function: parserOnHeaders],
        '1': [Function: parserOnHeadersComplete],
        '2': [Function: parserOnBody],
        '3': [Function: parserOnMessageComplete],
        '4': [Function: bound onParserExecute],
        _headers: [],
        _url: '',
        _consumed: true,
        socket: [Circular],
        incoming: [Circular],
        outgoing: null,
        maxHeaderPairs: 2000,
        onIncoming: [Function: bound parserOnIncoming] },
     on: [Function: socketOnWrap],
     _paused: false,
     _httpMessage:
      ServerResponse {
        _events: [Object],
        _eventsCount: 1,
        _maxListeners: undefined,
        output: [],
        outputEncodings: [],
        outputCallbacks: [],
        outputSize: 0,
        writable: true,
        _last: false,
        chunkedEncoding: false,
        shouldKeepAlive: true,
        useChunkedEncodingByDefault: true,
        sendDate: true,
        _removedConnection: false,
        _removedContLen: false,
        _removedTE: false,
        _contentLength: null,
        _hasBody: true,
        _trailer: '',
        finished: false,
        _headerSent: false,
        socket: [Circular],
        connection: [Circular],
        _header: null,
        _onPendingData: [Function: bound updateOutgoingData],
        _sent100: false,
        _expect_continue: false,
        [Symbol(isCorked)]: false,
        [Symbol(outHeadersKey)]: null },
     [Symbol(asyncId)]: 6,
     [Symbol(lastWriteQueueSize)]: 0,
     [Symbol(timeout)]:
      Timeout {
        _called: false,
        _idleTimeout: 120000,
        _idlePrev: [TimersList],
        _idleNext: [TimersList],
        _idleStart: 456,
        _onTimeout: [Function: bound ],
        _timerArgs: undefined,
        _repeat: null,
        _destroyed: false,
        [Symbol(unrefed)]: true,
        [Symbol(asyncId)]: 7,
        [Symbol(triggerId)]: 6 },
     [Symbol(kBytesRead)]: 0,
     [Symbol(kBytesWritten)]: 0 },
  connection:
   Socket {
     connecting: false,
     _hadError: false,
     _handle:
      TCP {
        reading: true,
        owner: [Circular],
        onread: [Function: onread],
        onconnection: null,
        _consumed: true },
     _parent: null,
     _host: null,
     _readableState:
      ReadableState {
        objectMode: false,
        highWaterMark: 16384,
        buffer: BufferList { length: 0 },
        length: 0,
        pipes: null,
        pipesCount: 0,
        flowing: true,
        ended: false,
        endEmitted: false,
        reading: true,
        sync: false,
        needReadable: true,
        emittedReadable: false,
        readableListening: false,
        resumeScheduled: false,
        emitClose: false,
        destroyed: false,
        defaultEncoding: 'utf8',
        awaitDrain: 0,
        readingMore: false,
        decoder: null,
        encoding: null },
     readable: true,
     _events:
      { end: [Array],
        drain: [Array],
        timeout: [Function: socketOnTimeout],
        data: [Function: bound socketOnData],
        error: [Function: socketOnError],
        close: [Array],
        resume: [Function: onSocketResume],
        pause: [Function: onSocketPause] },
     _eventsCount: 8,
     _maxListeners: undefined,
     _writableState:
      WritableState {
        objectMode: false,
        highWaterMark: 16384,
        finalCalled: false,
        needDrain: false,
        ending: false,
        ended: false,
        finished: false,
        destroyed: false,
        decodeStrings: false,
        defaultEncoding: 'utf8',
        length: 0,
        writing: false,
        corked: 0,
        sync: true,
        bufferProcessing: false,
        onwrite: [Function: bound onwrite],
        writecb: null,
        writelen: 0,
        bufferedRequest: null,
        lastBufferedRequest: null,
        pendingcb: 0,
        prefinished: false,
        errorEmitted: false,
        emitClose: false,
        bufferedRequestCount: 0,
        corkedRequestsFree: [Object] },
     writable: true,
     allowHalfOpen: true,
     _sockname: null,
     _pendingData: null,
     _pendingEncoding: '',
     server:
      Server {
        _events: [Object],
        _eventsCount: 2,
        _maxListeners: undefined,
        _connections: 1,
        _handle: [TCP],
        _usingWorkers: false,
        _workers: [],
        _unref: false,
        allowHalfOpen: true,
        pauseOnConnect: false,
        httpAllowHalfOpen: false,
        timeout: 120000,
        keepAliveTimeout: 5000,
        _pendingResponseData: 0,
        maxHeadersCount: null,
        _connectionKey: '6::::3000',
        [Symbol(IncomingMessage)]: [Function],
        [Symbol(ServerResponse)]: [Function],
        [Symbol(asyncId)]: 4 },
     _server:
      Server {
        _events: [Object],
        _eventsCount: 2,
        _maxListeners: undefined,
        _connections: 1,
        _handle: [TCP],
        _usingWorkers: false,
        _workers: [],
        _unref: false,
        allowHalfOpen: true,
        pauseOnConnect: false,
        httpAllowHalfOpen: false,
        timeout: 120000,
        keepAliveTimeout: 5000,
        _pendingResponseData: 0,
        maxHeadersCount: null,
        _connectionKey: '6::::3000',
        [Symbol(IncomingMessage)]: [Function],
        [Symbol(ServerResponse)]: [Function],
        [Symbol(asyncId)]: 4 },
     parser:
      HTTPParser {
        '0': [Function: parserOnHeaders],
        '1': [Function: parserOnHeadersComplete],
        '2': [Function: parserOnBody],
        '3': [Function: parserOnMessageComplete],
        '4': [Function: bound onParserExecute],
        _headers: [],
        _url: '',
        _consumed: true,
        socket: [Circular],
        incoming: [Circular],
        outgoing: null,
        maxHeaderPairs: 2000,
        onIncoming: [Function: bound parserOnIncoming] },
     on: [Function: socketOnWrap],
     _paused: false,
     _httpMessage:
      ServerResponse {
        _events: [Object],
        _eventsCount: 1,
        _maxListeners: undefined,
        output: [],
        outputEncodings: [],
        outputCallbacks: [],
        outputSize: 0,
        writable: true,
        _last: false,
        chunkedEncoding: false,
        shouldKeepAlive: true,
        useChunkedEncodingByDefault: true,
        sendDate: true,
        _removedConnection: false,
        _removedContLen: false,
        _removedTE: false,
        _contentLength: null,
        _hasBody: true,
        _trailer: '',
        finished: false,
        _headerSent: false,
        socket: [Circular],
        connection: [Circular],
        _header: null,
        _onPendingData: [Function: bound updateOutgoingData],
        _sent100: false,
        _expect_continue: false,
        [Symbol(isCorked)]: false,
        [Symbol(outHeadersKey)]: null },
     [Symbol(asyncId)]: 6,
     [Symbol(lastWriteQueueSize)]: 0,
     [Symbol(timeout)]:
      Timeout {
        _called: false,
        _idleTimeout: 120000,
        _idlePrev: [TimersList],
        _idleNext: [TimersList],
        _idleStart: 456,
        _onTimeout: [Function: bound ],
        _timerArgs: undefined,
        _repeat: null,
        _destroyed: false,
        [Symbol(unrefed)]: true,
        [Symbol(asyncId)]: 7,
        [Symbol(triggerId)]: 6 },
     [Symbol(kBytesRead)]: 0,
     [Symbol(kBytesWritten)]: 0 },
  httpVersionMajor: 1,
  httpVersionMinor: 1,
  httpVersion: '1.1',
  complete: false,
  headers:
   { host: 'localhost:3000',
     connection: 'keep-alive',
     'cache-control': 'max-age=0',
     'upgrade-insecure-requests': '1',
     'user-agent':
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/69.0.3497.81 Safari/537.36',
     accept:
      'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
     'accept-encoding': 'gzip, deflate, br',
     'accept-language': 'zh-CN,zh;q=0.9',
     cookie:
      '__utma=111872281.1797966039.1531394407.1531394407.1531394407.1; __utmc=111872281; __utmz=111872281.1531394407.1.1.utmcsr=(direct)|utmccn=(direct)|utmcmd=(none); MyName=zgq' },
  rawHeaders:
   [ 'Host',
     'localhost:3000',
     'Connection',
     'keep-alive',
     'Cache-Control',
     'max-age=0',
     'Upgrade-Insecure-Requests',
     '1',
     'User-Agent',
     'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/69.0.3497.81 Safari/537.36',
     'Accept',
     'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
     'Accept-Encoding',
     'gzip, deflate, br',
     'Accept-Language',
     'zh-CN,zh;q=0.9',
     'Cookie',
     '__utma=111872281.1797966039.1531394407.1531394407.1531394407.1; __utmc=111872281; __utmz=111872281.1531394407.1.1.utmcsr=(direct)|utmccn=(direct)|utmcmd=(none); MyName=zgq' ],
  trailers: {},
  rawTrailers: [],
  aborted: false,
  upgrade: false,
  url: '/',
  method: 'GET',
  statusCode: null,
  statusMessage: null,
  client:
   Socket {
     connecting: false,
     _hadError: false,
     _handle:
      TCP {
        reading: true,
        owner: [Circular],
        onread: [Function: onread],
        onconnection: null,
        _consumed: true },
     _parent: null,
     _host: null,
     _readableState:
      ReadableState {
        objectMode: false,
        highWaterMark: 16384,
        buffer: BufferList { length: 0 },
        length: 0,
        pipes: null,
        pipesCount: 0,
        flowing: true,
        ended: false,
        endEmitted: false,
        reading: true,
        sync: false,
        needReadable: true,
        emittedReadable: false,
        readableListening: false,
        resumeScheduled: false,
        emitClose: false,
        destroyed: false,
        defaultEncoding: 'utf8',
        awaitDrain: 0,
        readingMore: false,
        decoder: null,
        encoding: null },
     readable: true,
     _events:
      { end: [Array],
        drain: [Array],
        timeout: [Function: socketOnTimeout],
        data: [Function: bound socketOnData],
        error: [Function: socketOnError],
        close: [Array],
        resume: [Function: onSocketResume],
        pause: [Function: onSocketPause] },
     _eventsCount: 8,
     _maxListeners: undefined,
     _writableState:
      WritableState {
        objectMode: false,
        highWaterMark: 16384,
        finalCalled: false,
        needDrain: false,
        ending: false,
        ended: false,
        finished: false,
        destroyed: false,
        decodeStrings: false,
        defaultEncoding: 'utf8',
        length: 0,
        writing: false,
        corked: 0,
        sync: true,
        bufferProcessing: false,
        onwrite: [Function: bound onwrite],
        writecb: null,
        writelen: 0,
        bufferedRequest: null,
        lastBufferedRequest: null,
        pendingcb: 0,
        prefinished: false,
        errorEmitted: false,
        emitClose: false,
        bufferedRequestCount: 0,
        corkedRequestsFree: [Object] },
     writable: true,
     allowHalfOpen: true,
     _sockname: null,
     _pendingData: null,
     _pendingEncoding: '',
     server:
      Server {
        _events: [Object],
        _eventsCount: 2,
        _maxListeners: undefined,
        _connections: 1,
        _handle: [TCP],
        _usingWorkers: false,
        _workers: [],
        _unref: false,
        allowHalfOpen: true,
        pauseOnConnect: false,
        httpAllowHalfOpen: false,
        timeout: 120000,
        keepAliveTimeout: 5000,
        _pendingResponseData: 0,
        maxHeadersCount: null,
        _connectionKey: '6::::3000',
        [Symbol(IncomingMessage)]: [Function],
        [Symbol(ServerResponse)]: [Function],
        [Symbol(asyncId)]: 4 },
     _server:
      Server {
        _events: [Object],
        _eventsCount: 2,
        _maxListeners: undefined,
        _connections: 1,
        _handle: [TCP],
        _usingWorkers: false,
        _workers: [],
        _unref: false,
        allowHalfOpen: true,
        pauseOnConnect: false,
        httpAllowHalfOpen: false,
        timeout: 120000,
        keepAliveTimeout: 5000,
        _pendingResponseData: 0,
        maxHeadersCount: null,
        _connectionKey: '6::::3000',
        [Symbol(IncomingMessage)]: [Function],
        [Symbol(ServerResponse)]: [Function],
        [Symbol(asyncId)]: 4 },
     parser:
      HTTPParser {
        '0': [Function: parserOnHeaders],
        '1': [Function: parserOnHeadersComplete],
        '2': [Function: parserOnBody],
        '3': [Function: parserOnMessageComplete],
        '4': [Function: bound onParserExecute],
        _headers: [],
        _url: '',
        _consumed: true,
        socket: [Circular],
        incoming: [Circular],
        outgoing: null,
        maxHeaderPairs: 2000,
        onIncoming: [Function: bound parserOnIncoming] },
     on: [Function: socketOnWrap],
     _paused: false,
     _httpMessage:
      ServerResponse {
        _events: [Object],
        _eventsCount: 1,
        _maxListeners: undefined,
        output: [],
        outputEncodings: [],
        outputCallbacks: [],
        outputSize: 0,
        writable: true,
        _last: false,
        chunkedEncoding: false,
        shouldKeepAlive: true,
        useChunkedEncodingByDefault: true,
        sendDate: true,
        _removedConnection: false,
        _removedContLen: false,
        _removedTE: false,
        _contentLength: null,
        _hasBody: true,
        _trailer: '',
        finished: false,
        _headerSent: false,
        socket: [Circular],
        connection: [Circular],
        _header: null,
        _onPendingData: [Function: bound updateOutgoingData],
        _sent100: false,
        _expect_continue: false,
        [Symbol(isCorked)]: false,
        [Symbol(outHeadersKey)]: null },
     [Symbol(asyncId)]: 6,
     [Symbol(lastWriteQueueSize)]: 0,
     [Symbol(timeout)]:
      Timeout {
        _called: false,
        _idleTimeout: 120000,
        _idlePrev: [TimersList],
        _idleNext: [TimersList],
        _idleStart: 456,
        _onTimeout: [Function: bound ],
        _timerArgs: undefined,
        _repeat: null,
        _destroyed: false,
        [Symbol(unrefed)]: true,
        [Symbol(asyncId)]: 7,
        [Symbol(triggerId)]: 6 },
     [Symbol(kBytesRead)]: 0,
     [Symbol(kBytesWritten)]: 0 },
  _consuming: false,
  _dumped: false }
```

#### res的内容及结构

```json

```

