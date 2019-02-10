#### Doctype的作用？

```
告知浏览器的解析器用什么文档标准解析这个文档。DOCTYPE不存在或格式不正确会导致文档以兼容模式呈现。
```

详细：https://www.jb51.net/web/34217.html

#### 浏览器的标准模式和兼容模式各有什么区别？

```
标准模式的排版 和JS运作模式都是以该浏览器支持的最高标准运行。在兼容模式中，页面以宽松的向后兼容的方式显示,模拟老式浏览器的行为以防止站点无法工作。
```

#### HTML的`<!DOCTYPE HTML>`相比以前的有什么区别？

```
HTML5 不基于 SGML，因此不需要对DTD进行引用，但是需要doctype来规范浏览器的行为;
而HTML4.01基于SGML,所以需要对DTD进行引用，才能告知浏览器文档所使用的文档类型。
```

#### 行内元素和块级元素分别有那些？

```
行内元素有：a、b、span、img、input、select、strong
块级元素有：div、ul、ol、li、dl、dt、dd、h1-h6、p
空元素：<br> <hr> <img> <input> <link> <meta>
```

#### CSS导入样式时，link和@import的区别？

```
>> link属于XHTML标签，除了加载CSS外，还能用于定义RSS, 定义rel连接属性等作用；而@import只能用于加载CSS;

>> 页面被加载的时，link会同时被加载，而@import引用的CSS会等到页面被加载完之后再加载;

>> import是CSS2.1 提出的，只在IE5以上才能被识别，而link是XHTML标签，无兼容问题;

>> link支持使用js控制DOM去改变样式，而@import不支持;
```

#### 对浏览器内核的理解？

```
>> 浏览器内核主要分为两个部分：渲染引擎和JS引擎；后来JS引擎越来越独立，内核就倾向于只指渲染引擎

>> 渲染引擎：负责取得网页的内容（HTML、XML、图像等等）、整理讯息（例如加入CSS等），以及计算网页的显示方式，然后会输出至显示器或打印机。

>> JS引擎：解析和执行javascript来实现网页的动态效果。
```

#### HTML5的新特性有哪些？如何解决浏览器兼容问题？

```
>> 新的文档类型：<!DOCTYPE html>

>> 新的解析顺序：不再基于SGML

>> 新标签：audio，video，source，embed，track（多媒体）；datalist，output，keygen（新表单）；header，section，aside，article，footer，section（文档纲要）。

>>新增应用程序接口（API）：地理Geolocation，拖放Drag and Drop，本地缓存Local Storage，应用程序缓存Application Cache，Web Workers，SSE，绘图Canvas/WebGL，多媒体Audio/Video

>>input的新类型：date，email，url	
```

html5shim：这个框架可以解决兼容性问题。

#### 对HTML语义化的了解？

- 用正确的标签做正确的事情；
- 让页面的内容结构化，结构更清晰，便于对浏览器、搜索引擎解析；
- 在没有样式CSS情况下，也是便于阅读的；
- 便于使用爬虫爬取数据的情况，以及便于SEO搜索到；
- 阅读源代码的人更容易将网站分块，便于阅读维护理解

#### 对HTML5离线缓存的理解？解释下基本原理？

```
>> 就是web应用程序在没有网络的情况下，依然可以通过本地数据进行访问。

>> 优势：离线使用，资源加载快，减少服务器负载

>> 应用：H5游戏，不常改变的页面，相对固定的内容。

>> 使用：在文档的html标签中设置manifest 属性，引用manifest文件 。然后配置manifest文件，在manifest 文件中编写离线存储的资源。最后操作window.applicationCache进行需求实现。此外，必须要在服务器端正确的配置 MIME-type。

>> 更新：用户清空浏览器缓存，mainfest文件被修改，程序更新应用缓存，
```

**与传统浏览器缓存的区别**：

- 离线缓存是针对整个应用，浏览器缓存是单个文件；
- 离线缓存是断网也可以打开页面，而浏览器缓存不行；
- 离线缓存可以主动通知浏览器更新资源。

**离线缓存的原理**：

```
HTML5的离线存储是基于一个新建的.appcache文件的缓存机制(不是存储技术)，通过这个文件上的解析清单离线存储资源，这些资源就会像cookie一样被存储了下来。之后当网络在处于离线状态下时，浏览器会通过被离线存储的数据进行页面展示。
```

#### cookies，localStorage，sessionStorage的区别？

```
>> cookie是一个非常小的数据，大小限制为4KB左右，主要用途是用来保存登录信息。一般由服务器生成，可以设置失效时间，默认是关闭浏览器之后失效。cookie每次都会携带在HTTP头中，因此cookie信息过多会导致性能问题。原生的cookie接口并不友好，需要封装。

>> localStorage 表示本地存储，一般为5MB，本地存储除非被清除，否则会永久保存。仅在客户端（即浏览器）中保存，不参与和服务器的通信。

>> sessionStorage类似于localStorage，这个缓存仅仅在当前会话有效，关闭页面或浏览器之后都会被清除。仅在客户端（即浏览器）中保存，不参与和服务器的通信。

```

#### iframe有那些缺点？

```
>> frame会阻塞主页面的Onload事件

>> 搜索引擎的检索程序无法解读这种页面，不利于SEO

>> iframe和主页面共享连接池，而浏览器对相同域的连接有限制，所以会影响页面的并行加载。

如果需要使用iframe，最好是通过javascript动态给iframe添加src属性值，这样可以绕开以上两个问题。
```

#### $(document).ready() 与window.onload的区别?

```
>> 执行时间：window.onload必须等到页面内包括图片的所有元素加载完毕后才能执行。$(document).ready()是DOM结构绘制完毕后就执行，不必等到加载完毕。 

>> window.onload只能出来一次，$(document).ready可以出现多次
```

#### 什么是webSocket？







