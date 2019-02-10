### http

HTTP 协议是一种无状态的、无连接的、单向的应用层协议。它采用了请求/响应模型。通信请求只能由客户端发起，服务端对请求做出应答处理。

### 弊端

HTTP 协议无法实现服务器主动向客户端发起消息。大多数 Web 应用程序将通过频繁的异步JavaScript和XML（AJAX）请求实现长轮询。轮询的效率低，非常浪费资源

### WebSocket

服务器可以主动向客户端推送信息，客户端也可以主动向服务器发送信息。

WebSocket握手请求

```
GET /chat HTTP/1.1
Host: server.example.com
//----------
Upgrade: websocket
Connection: Upgrade
//--------------Websocket的核心,告诉服务器我发送的是websocket协议，需要一个特定的助理来处理。
Sec-WebSocket-Key: x3JJHMbDL1EzLkh9GBhXDw==		//验证需要
Sec-WebSocket-Protocol: chat, superchat			//通URL下，不同的服务对应的需要的协议
Sec-WebSocket-Version: 13						//版本
Origin: http://example.com
```

WebSocket握手响应

```
HTTP/1.1 101 Switching Protocols
//--------------------
Upgrade: websocket
Connection: Upgrade
//---------------告诉客户端，服务已经接收到请求，并且成功建立了WebSocket
Sec-WebSocket-Accept: HSmrc0sMlYUkAGmm5OPpG2HaGWk=	//经过服务器确认，并且加密过后的 Sec-WebSocket-Key
Sec-WebSocket-Protocol: chat			//最终使用的协议。
```



过程：

客户端：我要建立WebSocket协议，需要的服务：chat，WebSocket版本协议：17（http request）

服务端：升级WebSocket协议，需要返回处理的服务是：chat，版本号是17

服务器开始：巴拉巴拉巴拉。。。。。

（服务器完成协议升级之后，服务端就可以主动推送信息给客户端了，就成为了一次请求，源源不断的信息返回）

### WebSocket如何工作

| 事件    | 事件处理程序        | 描述                       |
| ------- | ------------------- | -------------------------- |
| open    | WebSocket.onopen    | 连接建立时触发             |
| message | WebSocket.onmessage | 客户端接收服务端数据时触发 |
| error   | WebSocket.onerror   | 通信发生错误时触发         |
| close   | WebSocket.onclose   | 连接关闭时触发             |

其他：有时间再看

https://zhangslob.github.io/2018/11/17/WebSocket%E7%88%AC%E8%99%AB%E4%B9%8B%E7%88%AC%E5%8F%96%E9%BE%99%E7%8F%A0%E5%BC%B9%E5%B9%95/