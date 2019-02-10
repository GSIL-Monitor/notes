<span style="color:red">swiper-button-prev设置样式时</span>

注意样式的引入顺序，如果顺序不对，会造成样式设置无效，不起任何作用，因为他会被后面的样式所覆盖。当你设置好样式而样式没有起作用的时候，查看浏览器开发者查看样式作用顺序，找出问题所在。。。

<span style="color:red">CSS绘制任意方向的三角形</span>

```css
width: 0px;
height: 0px;
border-top:26px solid #f59c00;
border-bottom: 0px solid transparent;
border-left:26px solid transparent;
border-right:26px solid transparent;
```

<span style="color:red">雪碧图</span>

```css
ackground: url("img/icons.jpg") no-repeat;
background-position: 0 0;
```

<span style="color:red">CSS画一个圆</span>

```css
width: 152px;
height: 152px;
border: 5px solid #ee8c8a;// 加这句话变为圆环样式
border-radius: 50%;
```

<span style="color:red">不换行隐藏多余文本</span>

```css
white-space: normal;
text-overflow: ellipsis;
overflow: hidden;
```

如果是a元素的文本，则需要在外面包一层，并在外面那一层去省略。

<span style="color:red">缩小浏览器视口导致右边部分为空</span>

为body元素设置min-width，无论怎么缩小，都是以min-width为宽度，滑动栏享有滑动可以见到右边的内容存在了。

此属性不支持IE6，如果需要，请使用如下方式：

```css
body{
   min-width:1000px;        /* Suppose you want minimum width of 1000px */
   width: auto !important;  /* Firefox will set width as auto */
   width:1000px;            /* As IE6 ignores !important it will set width as 1000px; */
}
```

OR

```css
body{
   min-width:1000px; // Suppose you want minimum width of 1000px
   _width: expression( document.body.clientWidth > 1000 ? "1000px" : "auto" ); /* sets max-width for IE6 */
}
```



<span style="color:red">解决ie8不支持媒体布局的情况</span>

在html头部引入如下两句代码：

```html
<script src="https://cdn.staticfile.org/html5shiv/r29/html5.min.js"></script>
  <script src="https://cdn.staticfile.org/respond.js/1.4.2/respond.min.js"></script>
```

<span style="color:red">获取浏览器视口宽高的方法
</span>

```js
document.documentElement.clientHeight/clientWidth
document.body.clientHeight/clientWidth
window.innerHeight/innerWidth
```

<span style="color:red">媒体查询的几种使用方式 </span>

```css
/*媒体查询*/
/*当页面大于1200px 时，大屏幕，主要是PC 端*/
@media (min-width: 1200px) {
    
}
/*在992 和1199 像素之间的屏幕里，中等屏幕，分辨率低的PC*/
@media (min-width: 992px) and (max-width: 1199px) {
    
}
/*在768 和991 像素之间的屏幕里，小屏幕，主要是PAD*/
@media (min-width: 768px) and (max-width: 991px) {
    
}
/*在480 和767 像素之间的屏幕里，超小屏幕，主要是手机*/
@media (min-width: 480px) and (max-width: 767px) {
    
}
/*在小于480 像素的屏幕，微小屏幕，更低分辨率的手机*/
@media (max-width: 479px) {
    
}
```

上面的只是媒体查询如何在不同屏幕间作用，还可以为其添加其他的参数，如screen用来确定是电脑屏幕：

```css
@media screen and (min-width: 600px) and (max-width: 1200px) {
    
}
```

<span style="color:red">swiper做轮播图 </span>

在标准浏览器下面使用：swiper4

在IE8浏览器下使用：Swiper2

```html
<!--[if !IE]><!-->
<link rel="stylesheet" href="swiper.min.css">
<script src="swiper.min.js"></script>
<!--<![endif]-->
<!--[if IE]>
<link rel="stylesheet" href="idangerous.swiper.css">
<script src="idangerous.swiper.min.js"></script>
<![endif]-->
```

