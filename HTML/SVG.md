### svg是一块画布

SVG 代码都放在顶层标签`<svg>`之中。

```html
<svg width="100%" height="100%">
  <circle id="mycircle" cx="50" cy="50" r="50" />
</svg>
```

​	`width`属性和`height`属性，指定了 SVG 图像在 HTML 元素中所占据的宽度和高度。除了相对单位，也可以采用绝对单位（单位：像素）。如果不指定这两个属性，SVG 图像默认大小是300像素（宽） x 150像素（高）。

​	如果只想展示 SVG 图像的一部分，就要指定`viewBox`属性。

```html
<svg width="100" height="100" viewBox="50 50 50 50">
  <circle id="mycircle" cx="50" cy="50" r="50" />
</svg>
```

上面`viewBox`的效果表示从`x=50,y=50`开始，显示一个`width=50,height=50`的范围。

![](E:\WebStorm_Dir\articles\images\viewBox.png)

将内容放大4倍之后，显示右下角的位置。并且svg的宽高依然不表，只是内容变大了。



### circle表示圆形

```html
<svg width="300" height="180">
  <circle cx="30"  cy="50" r="25" />
  <circle cx="90"  cy="50" r="25" class="red" />
  <circle cx="150" cy="50" r="25" class="fancy" />
</svg>
```

`cx`、`cy`、`r`属性分别为横坐标、纵坐标和半径，单位为像素。坐标都是相对于`<svg>`画布的左上角原点。

具有如下样式：

> fill：填充色
>
> stroke：描边色
>
> stroke-width：边框宽度

具体使用：

```css
.red {
  fill: red;
}

.fancy {
  fill: none;
  stroke: black;
  stroke-width: 3pt;
}
```

### line表示直线

```html
<svg width="300" height="180">
  <line x1="0" y1="0" x2="200" y2="0" style="stroke:rgb(0,0,0);stroke-width:5" />
</svg>
```

x1,y1表示直线初始位置，x2,y2表示直线结尾位置。style属性表示线段的样式。

### polyline用来绘制折线

```html
<svg width="300" height="180">
  <polyline points="3,3 30,28 3,53" fill="none" stroke="black" />
</svg>
```

如上述：`points="3,3 30,28 3,53"`

坐标以**逗号**隔开，点与点之间以**空格**隔开；

### rect用于绘制矩形

```html
<svg width="300" height="180">
  <rect x="0" y="0" height="100" width="200" style="stroke: #70d5dd; fill: #dd524b" />
</svg>
```

x,y 表示矩形左上角，height和width表示矩形的高宽；

### ellipse用来绘制椭圆

```html
<svg width="300" height="180">
  <ellipse cx="60" cy="60" ry="40" rx="20" stroke="black" stroke-width="5" fill="silver"/>
</svg>
```

cx，cy表示椭圆正中心，rx，ry指定了椭圆横向轴和纵向轴的半径。

### polygon用于绘制多边形

```html
<svg width="300" height="180">
  <polygon fill="green" stroke="orange" stroke-width="1" points="0,0 100,0 100,100 0,100 0,0"/>
</svg>
```

`points`属性指定了每个端点的坐标，横坐标与纵坐标之间与逗号分隔，点与点之间用空格分隔。

### path用于绘制路径

```html
<svg width="300" height="180">
<path d="
  M 18,3
  L 46,3
  L 46,40
  L 61,40
  L 32,68
  L 3,40
  L 18,40
  Z
"></path>
</svg>
```

`d`属性表示绘制顺序，它的值是一个长字符串，每个字母表示一个绘制动作，后面跟着坐标。

> M：移动到（x,y），一般表示初始位置
>
> L：连接直线到某个点，将上一个点与下一个点连接。等于一条line语句
>
> Z：闭合路径

### text用于绘制文本

```html
<svg width="300" height="180">
  <text x="50" y="25">Hello World</text>
</svg>
```

`x`属性和`y`属性，表示文本区块基线（baseline）起点的横坐标和纵坐标。文字的样式可以用`class`或`style`属性指定。

### use用于复制一个形状

```html
<svg viewBox="0 0 30 10" xmlns="http://www.w3.org/2000/svg">
  <circle id="myCircle" cx="5" cy="5" r="4"/>
  <use href="#myCircle" x="10" y="0" fill="blue" />
  <use href="#myCircle" x="20" y="0" fill="white" stroke="blue" />
</svg>
```

`<use>`的`href`属性指定所要复制的节点，`x`属性和`y`属性是`<use>`左上角的坐标。另外，还可以指定`width`和`height`坐标。

### g是包含多个形状的组

g只是简单的封装，在use只用过程中依然会显示内部的实现原理

```html
<svg width="300" height="100">
  <g id="myCircle">
    <text x="25" y="20">圆形</text>
    <circle cx="50" cy="50" r="20"/>
  </g>
	<--! 直接复制一个组-->
  <use href="#myCircle" x="100" y="0" fill="blue" />
  <use href="#myCircle" x="200" y="0" fill="white" stroke="blue" />
</svg>
```

### defs用于自定义形状

defs用于自定义形状，他的内部代码不会显示，仅供引用。使用use也不会显示内与实现原理，只有一个`“#myCircle”`标签

```html
<svg width="300" height="100">
  <defs>
    <g id="myCircle">
      <text x="25" y="20">圆形</text>
      <circle cx="50" cy="50" r="20"/>
    </g>
  </defs>

  <use href="#myCircle" x="0" y="0" />
  <use href="#myCircle" x="100" y="0" fill="blue" />
  <use href="#myCircle" x="200" y="0" fill="white" stroke="blue" />
</svg>
```

### pattern用于自定义形状

`<pattern>`标签用于自定义一个形状，该形状可以被引用来平铺一个区域。该形状可以被引用来平铺一个区域。

```html
<svg width="500" height="500">
  <defs>
    <pattern id="dots" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
      <circle fill="#bee9e8" cx="50" cy="50" r="35" />
    </pattern>
  </defs>
  <rect x="0" y="0" width="100%" height="100%" fill="url(#dots)" />
</svg>
```

dots：表示将一个圆形定义为dots模式。`patternUnits="userSpaceOnUse"`表示`<pattern>`的宽度和长度是实际的像素值。然后，指定这个模式去填充下面的矩形。

### image用于插入图片

```html
<svg viewBox="0 0 100 100" width="100" height="100">
  <image xlink:href="path/to/image.jpg"
    width="50%" height="50%"/>
</svg>
```

`xlink:href`属性表示图像的来源。

### animate用来表示动画

```html
<svg width="500px" height="500px">
  <rect x="0" y="0" width="100" height="100" fill="#feac5e">
    <animate attributeName="x" from="0" to="500" dur="2s" repeatCount="indefinite" />
  </rect>
</svg>
```

基本的属性有：

> attributeName：发生动画效果的属性名，比如宽度，位置，颜色等
>
> begin：表示延迟时间
>
> from：单词动画的初始值
>
> to：单次动画的结束值
>
> dur：单词动画的持续时间
>
> repeatCount：动画的循环模式

### `<animateTransform>`标签

`<animate>`标签对 CSS 的`transform`属性不起作用，如果需要变形，就要使用`<animateTransform>`标签。

```html
<svg width="500px" height="500px">
  <rect x="250" y="250" width="50" height="50" fill="#4bc0c8">
    <animateTransform attributeName="transform" type="rotate" begin="0s" dur="10s" from="0 200 200" to="360 400 400" repeatCount="indefinite" />
  </rect>
</svg>
```

type：指定动画为旋转类型；



### SVG图像转Canvas图像

首先，需要新建一个`Image`对象，将 SVG 图像指定到该`Image`对象的`src`属性。

```javascript
var img = new Image();
var svg = new Blob([svgString], {type: "image/svg+xml;charset=utf-8"});

var DOMURL = self.URL || self.webkitURL || self;
var url = DOMURL.createObjectURL(svg);

img.src = url;
```

然后，当图像加载完成后，再将它绘制到`<canvas>`元素。

```javascript
img.onload = function () {
  var canvas = document.getElementById('canvas');
  var ctx = canvas.getContext('2d');
  ctx.drawImage(img, 0, 0);
};
```

