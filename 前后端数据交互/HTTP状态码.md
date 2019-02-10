### 常见状态码

#### 状态码响应类别原因短语

1XX 信息性状态码（Informational）服务器正在处理请求

2XX 成功状态码（Success）请求已正常处理完毕

3XX 重定向状态码（Redirection）需要进行额外操作以完成请求

4XX 客户端错误状态码（Client Error）客户端原因导致服务器无法处理请求

5XX 服务器错误状态码（Server Error）服务器原因导致处理请求出错

####  2XX 成功

200 OK  表示请求被服务器正常处理

204 No Content    表示请求已成功处理，但是没有内容返回（就应该没有内容返回的状况）

206 Partial Content    表示服务器已经完成了部分GET请求

####  3XX 重定向

301 Moved Permanently    永久重定向，表示请求的资源已经永久的搬到了其他位置

302 Found   临时重定向，表示请求的资源临时搬到了其他位置

303 See Other   表示请求资源存在另一个URI，应使用GET定向获取请求资源

304 Not Modified   表示客户端发送附带条件的请求（GET方法请求报文中的IF…）时，条件不满足

####  **4XX **客户端错误

400 Bad Request   表示请求报文存在语法错误或参数错误，服务器不理解。

401 Unauthorized   表示发送的请求需要有HTTP认证信息或者是认证失败了。

403 Forbidden    表示对请求资源的访问被服务器拒绝了。

404 Not Found   表示服务器找不到你请求的资源。

####  **5XX **服务器错误

500 Internal Server Error  表示服务器执行请求的时候出错了

503 Service Unavailable  表示服务器超负载或正停机维护，无法处理请求

 

 

 

 

 

 