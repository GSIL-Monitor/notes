#### 一、避免使用iframe

在页面加载过程中iframe元素会阻塞父文档onload事件的触发，而开发者程序通常会在onload事件触发时初始化UI操作。

另外开发者会把一些重要的行为绑定在unload事件上，而不幸的是在一些浏览器中，只有当onload事件触发后unload事件才能触发，如果onload事件长时间未触发，而用户已经离开当前页面，那么unload事件也将永远得不到触发。

有个简单的解决方案来避免onload事件被阻塞，使用JavaScript动态的加载iframe元素或动态设置iframe的src属性：

```
 <iframe id=iframe1 ></iframe>
 document.getElementById(‘iframe1’).setAttribute(‘src’，‘url’);
```

除此之外我们必须知道iframe是文档内最消耗资源的元素之一，创建iframe元素的开销比创建其他类型的DOM元素要高1~2个数量级。

#### 二、避免空链接属性

空的链接属性是指img、link、script、ifrrame元素的src或href属性被设置了，但是属性却为空。

但是即使图片的地址为空，浏览器依旧会以默认的规则去请求空地址：

- Internet Explorer 8及以下版本浏览器只在img类型元素上出现问题，IE会把img的空地址解析为当前页面地址的目录地址。
- 早些版本的Webkit内核浏览器 与Firefox 会把空地址解析为当前页面的地址。如果页面内有多个空链接属性元素，当前页面的服务器则会被请求多次，增加服务器的负载。
- 幸运的是所有主流浏览器面对iframe的src属性为空时，会把空地址解析为about:blank地址，而不会向服务器发出额外的请求。

#### 三、避免节点深层级嵌套

深层级嵌套的节点在初始化构建时往往需要更多的内存占用，并且在遍历节点时也会更慢些，这与浏览器构建DOM文档的机制有关。

通过浏览器HTML解析器的解析，浏览器会把整个HTML文档的结构存储为DOM树结构。当文档节点的嵌套层次越深，构建的DOM树层次也会越深。

#### 四、缩小HTML文档的大小

提高下载速度最显而易见的方式就是减少文件的大小，特别是压缩内嵌在HTML文档中的JavaScript和CSS代码，这能使得页面体积大幅精简。除此之外减少HTML文档大小还可以采取下面几种方法：

1. 删掉HTM文档对执行结果无影响的空格空行和注释
2. 避免Table布局
3. 使用HTML5

#### 五、显示指定文档字符集

HTML页面开始时指定字符集，有助于浏览器可以立即开始解析HTML代码。HTML文档通常被解析为一序列的带字符集编码信息的字符串通过internet传送。字符集编码在HTTP响应头中，或者HTML标记中指定。浏览器根据获得的字符集，把编码解析为可以显示在屏幕上的字符。**如果浏览器不能获知页面的编码字符集，一般都会在执行脚本和渲染页面前，会把字节流缓存，会去匹配合适的字符编码，这会导致消耗不必要的时间。**为了避免浏览器把时间花费在搜寻合适的字符集来进行解码，所以最好在文档中总是显式的指定页面字符集。

#### 六、显示设置图片的宽高

当浏览器加载页面的HTML代码时，有时候需要在图片下载完成前就对页面布局进行定位。如果HTML里的图片没有指定尺寸（宽和高），或者代码描述的尺寸与实际图片的尺寸不符时，浏览器则要在图片下载完成后再“回溯”该图片并重新显示，这会消耗额外时间。所以，最好为页面里的每一张图片都指定尺寸，不管是在页面HTML里的`<img>`标签，还是在CSS里。

#### 七、避免脚本阻塞加载

当浏览器在解析常规的script标签时，它需要等待script下载完毕，再解析执行，而后续的HTML代码只能等待。为了避免阻塞加载，应把脚步放到文档的末尾，如把script标签插入在body结束标签之前。