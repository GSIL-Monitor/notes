#### 什么是盒子模型？两种盒子模型的区别？

```
盒子模型就是一个元素变现为一个盒子，其中由margin，border，padding，content四个部分组成。
盒子模型分为两种：标准盒子模型和怪异（IE）盒子模型。
标准盒子模型的width=content
怪异盒子模型的width=content+padding+content
```

#### CSS选择符有哪些？那些属性可以继承？

```
>> 选择符:
	id选择器（#myid）
	class选择器（.myClassName）
	element元素标签选择器（div，p，h1）
	相邻选择器（h1+p）
	子选择器（ul>li）
	后代选择器（li a）
	通配符选择器（*）
	属性选择器（a[rel="xxx"]）
	伪类选择器（a:hover）
```

```
>> 可继承的样式：
	font-size,font-family,font-weight,color,ine-height,text-indent,text-align,word-spacing,letter-spacing,text-transform,direction,width
>> 不可继承的样式:
	border，padding，margin，height,display,background
```

**子元素的100%长度设置都是依据父级容器的宽度来计算的**。

#### CSS的优先级算法？

```
>> 同权重：内联样式>嵌入样式>外部样式表
>> 权重优先级：！important>id>class=伪类>tag
！important大于内联优先级，属于最高优先级。

优先级就近原则，同权重情况下样式定义最近者为准；
载入样式以最后载入的定位为准；

CSS计算权重的方法：
#id 100
.class 10
p 1
#id .class 100+10=110
.class .class p 10+10+1=21
```

#### CSS3新增的伪类有哪些？

```
p:first-of-type 
p:last-of-type
p:only-of-type
p:only-child
p:bth-child(2)
::after
::before
::enabled
::disabled
::checked
```

#### 水平居中的几种方式？



#### display有哪些值？具体的功能是什么？

| 取值         | 功能                                                     |
| ------------ | -------------------------------------------------------- |
| block        | 块类型，默认宽度为父元素的宽高，可设置宽高，换行显示     |
| none         | 元素不显示，并从文档流中移除                             |
| inline       | 行内元素类型。默认宽度为内容宽度，不可设置宽高，同行显示 |
| inline-block | 默认宽度为内容宽高，可以设置宽高，同行显示               |
| list-item    | 像块类型元素一样显示，并添加样式列表标记                 |
| table        | 此元素会作为跨级表格来显示                               |
| inherit      | 继承父元素的display值                                    |

#### position的取值与具体功能？

| 取值     | 功能                                                         |
| -------- | ------------------------------------------------------------ |
| absolute | 生成绝对定位元素，相对于不是static的第一个父元素左上角进行定位 |
| relative | 生成相对定位元素，相对于其正常位置进行定位                   |
| fixed    | 生成绝对定位元素，相对于浏览器窗口进行定位                   |
| static   | 默认值，没有定位。元素出现在正常流中（忽略，top，left，z-index，right，bottom） |
| inherit  | 从父元素继承position                                         |

#### CSS3的新特性？

```
>> 选择器 
>> 圆角(border-radius)
>> 多列布局（multi-colum）
>> 阴影与反射（shadow/reflect）
>> 文字特效（text-shadow等）
>> 文字渲染（text-decration）
>> 渐变（gradient）：分为线性与非线性
>> 旋转，缩放，倾斜，动画（rotate，scale，skew，animation）
```

#### 对CSS3的弹性盒模型的理解？



#### 纯CSS创建三角形的原理？



#### “品”字布局？两列自适应？圣杯布局（三列自适应）？



#### 为什么要初始化CSS样式？

因为浏览器对某些标签的默认值是不同的，如果没有对CSS初始化，就会造成不同浏览器上的页面的显示差异。

优点：便于跨浏览器样式的书写；

缺点：对SEO有一定的影响。

```css
/* 淘宝的样式初始化代码：*/
  body, h1, h2, h3, h4, h5, h6, hr, p, blockquote, dl, dt, dd, ul, ol, li, pre, form, fieldset, legend, button, input, textarea, th, td { margin:0; padding:0; }
  body, button, input, select, textarea { font:12px/1.5tahoma, arial, \5b8b\4f53; }
  h1, h2, h3, h4, h5, h6{ font-size:100%; }
  address, cite, dfn, em, var { font-style:normal; }
  code, kbd, pre, samp { font-family:couriernew, courier, monospace; }
  small{ font-size:12px; }
  ul, ol { list-style:none; }
  a { text-decoration:none; }
  a:hover { text-decoration:underline; }
  sup { vertical-align:text-top; }
  sub{ vertical-align:text-bottom; }
  legend { color:#000; }
  fieldset, img { border:0; }
  button, input, select, textarea { font-size:100%; }
  table { border-collapse:collapse; border-spacing:0; }
```

#### visibility都可以去那些值？分别是什么概念？

| 取值     | 功能                                                         |
| -------- | ------------------------------------------------------------ |
| visible  | 默认值。元素是可见的                                         |
| hidden   | 元素是不可见的                                               |
| collapse | 对于普通元素visibility:collapse;会将元素完全隐藏,不占据页面布局空间,与display:none;表现相同。<br />如果目标元素为table,visibility:collapse;将table行或列隐藏,但是会占据页面布局空间 |

#### 对BFC规范(块级格式化上下文：block formatting context)的理解？

```
它是一个独立容器，决定了元素如何对其内容进行定位,以及与其他元素的关系和相互作用。
一个页面是由很多个 Box 组成的,元素的类型和 display 属性,决定了这个 Box 的类型。不同类型的 Box,会参与不同的 Formatting Context（决定如何渲染文档的容器）,因此Box内的元素会以不同的方式渲染,也就是说BFC内部的元素和外部的元素不会互相影响。
```

#### 什么是浮动？怎么使用浮动？

```
>> 浮动：可以理解为让某个div元素脱离标准流，漂浮在标准流之上，和标准流不是一个层次。

>> 设置浮动之后，元素的display自动变为block了。

>> 使用：通过css定义float（浮动）让div样式层块，向左或向右（靠）浮动。
float : none | left |right
```

#### 为什么要清除浮动？清除浮动的方法有哪些？

```
清除浮动是为了清除使用浮动元素产生的影响。浮动的元素，高度会塌陷，而高度的塌陷使我们页面后面的布局不能正常显示。

1、父元素设置高度height
2、父元素也一起浮动（不推荐）
3、clear：both用来闭合浮动
.clearfix::after {
  	  clear: both;
}
.clearfix {
      *zoom: 1;
}
4、浮动元素的父级div定义伪类:after
&::after,&::before{
    content: " ";
    visibility: hidden;
    display: block;
    height: 0;
    clear: both;
}
```

#### zoom:1的清除浮动原理?

```
当设置了zoom的值之后，所设置的元素就会就会扩大或者缩小，高度宽度就会重新计算了，这里一旦改变zoom值时其实也会发生重新渲染，运用这个原理，也就解决了ie下子元素浮动时候父元素不随着自动扩大的问题。
```

#### 什么是外边距合并？

```
外边距合并指的是，当两个垂直外边距相遇时，它们将形成一个外边距。合并后的外边距的高度等于两个发生合并的外边距的高度中的较大者。
```

#### 什么是媒体查询？

```html
媒体查询由一个可选的“媒体类型”和零个或多个“使用媒体功能”的限制了样式表范围的表达式组成；媒体查询，添加自CSS3，允许内容的呈现针对一个特定范围的输出设备而进行裁剪，而不必改变内容本身。

<!-- link元素中的CSS媒体查询 -->
<link rel="stylesheet" media="(max-width: 800px)" href="example.css" />

<!-- 样式表中的CSS媒体查询 -->
<style>
@media (max-width: 600px) {
  .facet_sidebar {
    display: none;
  }
}
</style>


```

#### CSS优化、提高性能的方法有哪些？

```
使用关键选择器：在有id选择器的时候尽可能不用其他规则，只指定一个id即可。
提取项目的通用公有样式，增强可复用性，按模块编写组件；
增强项目的协同开发性、可维护性和可扩展性;
使用预处理工具或构建工具（gulp对css进行语法检查、自动补前缀、打包压缩、自动优雅降级）;
```

选择器匹配方式是从右向左匹配的。



#### CSS模块化处理是什么划分的？

```
CSS文件的分类和引用顺序：
	公共类型样式；
	特殊类型样式；
	皮肤类型样式；
CSS内部的分类及其顺序：
	重置和默认：消除默认样式和浏览器差异，并设置部分标签的初始样式；
	统一处理：统一调用背景图和清除浮动；
	布局（grid）（.g-）：将页面分割为几个大块，通常有头部、主体、主栏、侧栏、尾部等！
	模块（module）（.m-）：通常是一个语义化的可以重复使用的较大的整体！比如导航、登录、注册、各种列表、评论、搜索等！
	元件（unit）（.u-）：通常是一个不可再分的较为小巧的个体，通常被重复用于各种模块中！比如按钮、输入框、loading、图标等！
	功能（function）（.f-）：为方便一些常用样式的使用，我们将这些使用率较高的样式剥离出来，按需使用，通常这些选择器具有固定样式表现，比如清除浮动等！
	皮肤（skin）（.s-）：如果你需要把皮肤型的样式抽离出来，通常为文字色、背景色（图）、边框色等，非换肤型网站通常只提取文字色！
	状态（.z-）：为状态类样式加入前缀，统一标识，方便识别，她只能组合使用或作为后代出现（.u-ipt.z-dis{}，.m-list li.z-sel{}）
```

#### 什么是响应式布局？具体是怎么实现的？

```
响应式布局：意在实现不同屏幕分辨率的终端上浏览网页的不同展示方式。通过响应式设计能使网站在手机和平板电脑上有更好的浏览阅读体验。

一、设置meta标签
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
二、通过媒介查询来设置样式
@media screen and (max-width: 980px) {
  #head { … }
  #content { … }
  #footer { … }
}
三、设置多种视图宽度

注意：
宽度需要使用百分比；
处理图片缩放的方法，img { width: auto; max-width: 100%; }；
用::before和::after伪元素 +content 属性来动态显示一些内容

```

#### ::before 和 :after中双冒号和单冒号 有什么区别？

```
单冒号(:)用于CSS3伪类，双冒号(::)用于CSS3伪元素。
```

#### 如何修改chrome自动填充表单的黄色背景 ？

```css
input:-webkit-autofill, textarea:-webkit-autofill, select:-webkit-autofill {
    background-color: rgb(250, 255, 189); /* #FAFFBD; */
    background-image: none;
    color: rgb(0, 0, 0);
  }
```

#### 怎么让Chrome支持小于12px的文字？

```
1、用图片：如果是内容固定不变情况下，使用将小于12px文字内容切出做图片，这样不影响兼容也不影响美观。
2、针对谷歌浏览器内核，加webkit前缀，用transform:scale()这个属性进行缩放，
<style>p span{font-size:10px;-webkit-transform:scale(0.8);display:block;}</style>
```



