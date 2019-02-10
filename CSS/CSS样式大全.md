### 背景

#### background-color

```css
background-color:#b0c4de;
background-color:transparent;/*透明的*/
```

#### background-image

```css
background-image:url('paper.gif');
```

#### background-repeat

| 值        | 说明                                     |
| --------- | ---------------------------------------- |
| repeat    | 背景图像将向垂直和水平方向重复。这是默认 |
| repeat-x  | 只有水平位置会重复背景图像               |
| repeat-y  | 只有垂直位置会重复背景图像               |
| no-repeat | background-image不会重复                 |

#### background-attachment

| 值      | 说明                                            |
| ------- | ----------------------------------------------- |
| scroll  | 背景图片随页面的其余部分滚动。这是默认          |
| fixed   | 背景图像是固定的                                |
| inherit | 指定background-attachment的设置应该从父元素继承 |
| local   | 背景图片随滚动元素滚动                          |

```css
body
{ 
    background-image:url('smiley.gif');
    background-repeat:no-repeat;
    background-attachment:fixed;
}
```

#### background-position

语法

```css
background-position: horizontal vertical
```

水平是

```css
horizontal:percentage | length | left | center | right 
```

垂直是

```css
vertical:percentage | length | top | center | bottom 
```

| 值                                                           | 描述                                                         |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| left top left center left bottom right top right center right bottom center top center center center bottom | 如果仅指定一个关键字，其他值将会是"center"                   |
| *x% y%*                                                      | 第一个值是水平位置，第二个值是垂直。左上角是0％0％。右下角是100％100％。如果仅指定了一个值，其他值将是50％。 。默认值为：0％0％ |
| *xpos ypos*                                                  | 第一个值是水平位置，第二个值是垂直。左上角是0。单位可以是像素（0px0px）或任何其他 [CSS单位](https://www.w3cschool.cn/cssref/css-units.html)。如果仅指定了一个值，其他值将是50％。你可以混合使用％和positions |

#### background-clip

指定背景绘制区域。

语法

```css
background-clip: border-box|padding-box|content-box;
```

| 值          | 说明                                             |
| ----------- | ------------------------------------------------ |
| border-box  | 默认值。背景绘制在边框方框内（剪切成边框方框）。 |
| padding-box | 背景绘制在衬距方框内（剪切成衬距方框）。         |
| content-box | 背景绘制在内容方框内（剪切成内容方框）。         |

```css
div
{
    background-color:yellow;
    background-clip:content-box;
}
```

#### background

语法

```css
background:
bg-color bg-image position /*情况一*/
bg-size bg-repeat bg-origin bg-clip bg-attachment initial|inherit;/*情况二*/
```

| 值                      | 说明                                             |
| ----------------------- | ------------------------------------------------ |
| *background-color*      | 指定要使用的背景颜色                             |
| *background-position*   | 指定背景图像的位置                               |
| *background-size*       | 指定背景图片的大小                               |
| *background-repeat*     | 指定如何重复背景图像                             |
| *background-origin*     | 指定背景图像的定位区域                           |
| *background-clip*       | 指定背景图像的绘画区域                           |
| *background-attachment* | 设置背景图像是否固定或者随着页面的其余部分滚动。 |
| *background-image*      | 指定要使用的一个或多个背景图像                   |

****

### 文本（Text）

#### color文字颜色

```css
body {color:blue;} 
h1 {color:#00ff00;} 
h2 {color:rgb(255,0,0);}
```

#### text-align文本对齐方式

| 值      | 描述                                     |
| ------- | ---------------------------------------- |
| left    | 把文本排列到左边。默认值：由浏览器决定。 |
| right   | 把文本排列到右边。                       |
| center  | 把文本排列到中间。                       |
| justify | 实现两端对齐文本效果。                   |

```css
h1 {text-align:center;} //居中
p.date {text-align:right;}  // 居右
p.main {text-align:justify;}  //每一行被展开为宽度相等，左，右外边距是对齐
```

#### text-align-last（最后一行文本对齐方式）

只作用于段落的最后一行。

CSS 语法

```css
text-align-last: auto|left|right|center|justify|start|end|initial|inherit;
```

属性值

属性值

| 值      | 描述                                                         |
| ------- | ------------------------------------------------------------ |
| auto    | 默认值。最后一行被调整，并向左对齐。                         |
| left    | 最后一行向左对齐。                                           |
| right   | 最后一行向右对齐。                                           |
| center  | 最后一行居中对齐。                                           |
| justify | 最后一行被调整为两端对齐。                                   |
| start   | 最后一行在行开头对齐（如果 text-direction 是从左到右，则向左对齐；如果 text-direction 是从右到左，则向右对齐）。 |
| end     | 最后一行在行末尾对齐（如果 text-direction 是从左到右，则向右对齐；如果 text-direction 是从右到左，则向左对齐）。 |

#### vertical-align属性

设置一个元素的垂直对齐。该属性定义行内元素的基线相对于该元素所在行的基线的垂直对齐。

```css
img{
   vertical-align:text-top;
}
```

| 值          | 描述                                                         |
| ----------- | ------------------------------------------------------------ |
| baseline    | 默认。元素放置在父元素的基线上。                             |
| sub         | 垂直对齐文本的下标。                                         |
| super       | 垂直对齐文本的上标                                           |
| top         | 把元素的顶端与行中最高元素的顶端对齐                         |
| text-top    | 把元素的顶端与父元素字体的顶端对齐                           |
| middle      | 把此元素放置在父元素的中部。                                 |
| bottom      | 把元素的顶端与行中最低的元素的顶端对齐。                     |
| text-bottom | 把元素的底端与父元素字体的底端对齐。                         |
| %           | 使用 "line-height" 属性的百分比值来排列此元素。允许使用负值。 |

#### text-justify

改变字与字之间的间距

语法

```css
text-justify: auto|inter-word|inter-ideograph|inter-cluster|distribute|kashida|trim;
```

| 值              | 描述                                                   |
| --------------- | ------------------------------------------------------ |
| auto            | 浏览器决定齐行算法。                                   |
| none            | 禁用齐行。                                             |
| inter-word      | 增加/减少单词间的间隔。                                |
| inter-ideograph | 用表意文本来排齐内容。                                 |
| inter-cluster   | 只对不包含内部单词间隔的内容（比如亚洲语系）进行排齐。 |
| distribute      | 类似报纸版面，除了在东亚语系中最后一行是不齐行的。     |
| kashida         | 通过拉伸字符来排齐内容。                               |

#### text-decoration 文本装饰

text-decoration 属性规定添加到文本的修饰。

| 值           | 描述                     |
| ------------ | ------------------------ |
| none         | 默认。定义标准的文本。   |
| underline    | 定义文本下的一条线。     |
| overline     | 定义文本上的一条线。     |
| line-through | 定义穿过文本下的一条线。 |
| blink        | 定义闪烁的文本。         |

```css
a {text-decoration:none;}
h1 {text-decoration:overline;} 
h2 {text-decoration:line-through;} 
h3 {text-decoration:underline;}
```

#### text-overflow

文本溢出

语法

```css
 text-overflow: clip|ellipsis|*string*;
```

| 值       | 描述                             |
| -------- | -------------------------------- |
| clip     | 修剪文本。                       |
| ellipsis | 显示省略符号来代表被修剪的文本。 |

#### text-shadow

文本设置阴影。

语法

```css
text-shadow: h-shadow v-shadow blur color;
```

注释：text-shadow 属性向文本添加一个或多个阴影。该属性是逗号分隔的阴影列表，每个阴影有两个或三个长度值和一个可选的颜色值进行规定。省略的长度是 0。

| 值         | 描述                             |
| ---------- | -------------------------------- |
| *h-shadow* | 必需。水平阴影的位置。允许负值。 |
| *v-shadow* | 必需。垂直阴影的位置。允许负值。 |
| *blur*     | 可选。模糊的距离。               |
| *color*    | 可选。阴影的颜色。               |

#### text-transform文本转换

控制文本的大小写。

| 值         | 描述                                           |
| ---------- | ---------------------------------------------- |
| none       | 默认。定义带有小写字母和大写字母的标准的文本。 |
| capitalize | 文本中的每个单词以大写字母开头。               |
| uppercase  | 定义仅有大写字母。                             |
| lowercase  | 定义无大写字母，仅有小写字母。                 |

```css
p.uppercase {text-transform:uppercase;} 
p.lowercase {text-transform:lowercase;} 
p.capitalize {text-transform:capitalize;}
```

#### text-indent文本缩进

| 值       | 描述                               |
| -------- | ---------------------------------- |
| *length* | 定义固定的缩进。默认值：0。        |
| *%*      | 定义基于父元素宽度的百分比的缩进。 |

```css
p {text-indent:50px;}
p {text-indent：2em；}
```

#### word-spacing 文本间隔

增加或减少字与字之间的空白。

| 值       | 描述                         |
| -------- | ---------------------------- |
| normal   | 默认。定义单词间的标准空间。 |
| *length* | 定义单词间的固定空间。       |

```css
p { word-spacing:30px; }
```

#### word-break

规定自动换行的处理方法。

语法

```css
word-break: normal|break-all|keep-all;
```

| 值        | 描述                           |
| --------- | ------------------------------ |
| normal    | 使用浏览器默认的换行规则。     |
| break-all | 允许在单词内换行。             |
| keep-all  | 只能在半角空格或连字符处换行。 |
| hyphenate | 在恰当的断字点进行换行：       |

#### word-wrap

允许长的内容可以自动换行。

语法

```css
word-wrap: normal|break-word;
```

| 值         | 描述                                         |
| ---------- | -------------------------------------------- |
| normal     | 只在允许的断字点换行（浏览器保持默认处理）。 |
| break-word | 在长单词或 URL 地址内部进行换行。            |

#### direction	

设置文本方向。

| 值   | 描述                     |
| ---- | ------------------------ |
| ltr  | 默认。文本方向从左到右。 |
| rtl  | 文本方向从右到左。       |

```css
div
{
	direction:rtl;
}
```



****

### 链接样式

#### 链接文本颜色

```css
a:link {color:#FF0000;}      /* 未访问链接*/ 
a:visited {color:#00FF00;}  /* visited link */ 
a:hover {color:#FF00FF;}  /* mouse over link */ 
a:active {color:#0000FF;}  /* selected link */
```

#### 链接文本修饰

```css
a:link {text-decoration:none;} 
a:visited {text-decoration:none;} 
a:hover {text-decoration:underline;} 
a:active {text-decoration:underline;}
```

#### 链接背景颜色

```css
a:link {background-color:#B2FF99;} 
a:visited {background-color:#FFFF85;} 
a:hover {background-color:#FF704D;} 
a:active {background-color:#FF704D;}
```

#### target

新窗口中打开所有超链接，并在所有其他标签页/窗口上面放置新窗口：

语法

```css
target: target-name target-new target-position;
```

| 值                | 描述                                               |
| ----------------- | -------------------------------------------------- |
| *target-name*     | 规定在何处打开超链接（target destination）。       |
| *target-new*      | 规定应该在新窗口或已有窗口的新标签页中打开超链接。 |
| *target-position* | 规定在何处放置新的目的地链接。                     |

****

### 列表

- 无序列表ul - 列表项标记用特殊图形（如小黑点、小方框等）
- 有序列表ol - 列表项的标记有数字或字母

#### list-style-type

设置不同的列表样式

```css
ul.circle {list-style-type:circle}
ul.square {list-style-type:square}
ol.upper-roman {list-style-type:upper-roman}
ol.lower-alpha {list-style-type:lower-alpha}
```

| 值                   | 描述                                                        |
| -------------------- | ----------------------------------------------------------- |
| none                 | 无标记。                                                    |
| disc                 | 默认。标记是实心圆。                                        |
| circle               | 标记是空心圆。                                              |
| square               | 标记是实心方块。                                            |
| decimal              | 标记是数字。                                                |
| decimal-leading-zero | 0开头的数字标记。(01, 02, 03, 等。)                         |
| lower-roman          | 小写罗马数字(i, ii, iii, iv, v, 等。)                       |
| upper-roman          | 大写罗马数字(I, II, III, IV, V, 等。)                       |
| lower-alpha          | 小写英文字母The marker is lower-alpha (a, b, c, d, e, 等。) |
| upper-alpha          | 大写英文字母The marker is upper-alpha (A, B, C, D, E, 等。) |
| lower-greek          | 小写希腊字母(alpha, beta, gamma, 等。)                      |
| lower-latin          | 小写拉丁字母(a, b, c, d, e, 等。)                           |
| upper-latin          | 大写拉丁字母(A, B, C, D, E, 等。)                           |
| hebrew               | 传统的希伯来编号方式                                        |
| armenian             | 传统的亚美尼亚编号方式                                      |
| georgian             | 传统的乔治亚编号方式(an, ban, gan, 等。)                    |
| cjk-ideographic      | 简单的表意数字                                              |
| hiragana             | 标记是：a, i, u, e, o, ka, ki, 等。（日文片假名）           |
| katakana             | 标记是：A, I, U, E, O, KA, KI, 等。（日文片假名）           |
| hiragana-iroha       | 标记是：i, ro, ha, ni, ho, he, to, 等。（日文片假名）       |
| katakana-iroha       | 标记是：I, RO, HA, NI, HO, HE, TO, 等。（日文片假名）       |

#### list-style-position	

指示如何相对于对象的内容绘制列表项标记。

| 值      | 描述                                                         |
| ------- | ------------------------------------------------------------ |
| inside  | 列表项目标记放置在文本以内，且环绕文本根据标记对齐。         |
| outside | 默认值。保持标记位于文本的左侧。列表项目标记放置在文本以外，且环绕文本不根据标记对齐。 |

#### list-style-image

使用图像来替换列表项的标记。

```css
ul { list-style-image: url('sqpurple.gif'); }
```

#### list-style

简写属性，有如下部分按照顺序组成：

- list-style-type
- list-style-position 
- list-style-image

| 值                    | 描述                         |
| --------------------- | ---------------------------- |
| *list-style-type*     | 设置列表项标记的类型。       |
| *list-style-position* | 设置在何处放置列表项标记。   |
| *list-style-image*    | 使用图像来替换列表项的标记。 |

```css
ul{ list-style: square url("sqpurple.gif");}
```

****

### 边框

#### border

| 值             | 说明           |
| -------------- | -------------- |
| *border-width* | 指定边框的宽度 |
| *border-style* | 指定边框的样式 |
| *border-color* | 指定边框的颜色 |

```css
p 
{
	border:5px solid red;
}
```

#### border-style

用来定义边框的样式，相关属性如下

- none: 默认无边框（常用）

- dotted: 定义一个点线框

- dashed: 定义一个虚线框

- solid: 定义实线边界（常用）

- double: 定义两个边界。 两个边界的宽度和border-width的值相同

- groove: 定义3D沟槽边界。效果取决于边界的颜色值

- ridge: 定义3D脊边界。效果取决于边界的颜色值

- inset:定义一个3D的嵌入边框。效果取决于边界的颜色值

- outset: 定义一个3D突出边框。 效果取决于边界的颜色值

border-style属性可以有1-4个值：

1个值：全边框；

2个值：上下，左右；

3个值：上，左右，下

三个值：上，右，下，左

border-style:dotted solid double dashed;

- 上边框是 dotted
- 右边框是 solid
- 底边框是 double
- 左边框是 dashed

#### border-width 

为边框指定宽度。

```css
p.one 
{ 
    border-style:solid; 
    border-width:5px; 
} 
p.two 
{ 
    border-style:solid; 
    border-width:medium; 
}
```

#### border-color

用于设置边框的颜色

可以使用透明边框

```css
border-color: transparent;
```

border-color单独使用是不起作用的，必须得先使用border-style来设置边框样式。

```css
p.one 
{ 
    border-style:solid; 
    border-color:red; 
} 
p.two 
{ 
    border-style:solid; 
    border-color:#98bf21; 
}
```

#### border-radius

border-radius 属性是一个简写属性，用于设置四个 border-*-radius 属性。

提示：该属性允许您为元素添加圆角边框！

语法

```css
border-radius: 1-4 length|% / 1-4 length|%;
```

注释：按此顺序设置每个 radii 的四个值。如果省略 bottom-left，则与 top-right 相同。如果省略 bottom-right，则与 top-left 相同。如果省略 top-right，则与 top-left 相同。

| 值       | 描述                     |
| -------- | ------------------------ |
| *length* | 定义圆角的形状。         |
| *%*      | 以百分比定义圆角的形状。 |

#### border-spacing

为表格设置 border-spacing：

```css
table
  {
      border-collapse:separate;
      border-spacing:10px 50px;
  }
```

#### 边框单边设置

```css
p 
{ 
    border-top-style:dotted; 
    border-top-width:2px;
    border-top-color:#f00;
    border-top-left-radius:2px;
}
```

### CSS轮廓outline

outline（轮廓）是绘制于元素周围的一条线，位于边框边缘的外围，可起到突出元素的作用。

outline简写属性在一个声明中设置所有的轮廓属性。

可以设置的属性分别是（按顺序）：outline-color, outline-style, outline-width

如果不设置其中的某个值，也不会出问题，比如 outline:solid #ff0000; 也是允许的。

| 值              | 描述             |
| --------------- | ---------------- |
| *outline-color* | 规定边框的颜色。 |
| *outline-style* | 规定边框的样式。 |
| *outline-width* | 规定边框的宽度。 |

#### outline-offset

outline-offset属性设置轮廓框架在 border 边缘外的偏移

语法

outline-offset: *length*|inherit:

| 值       | 描述                   |
| -------- | ---------------------- |
| *length* | 轮廓与边框边缘的距离。 |

### diplay

用来确定元素的显示情况

| 值                 | 描述                                                         |
| ------------------ | ------------------------------------------------------------ |
| none               | 此元素不会被显示。                                           |
| block              | 此元素将显示为块级元素，此元素前后会带有换行符。             |
| inline             | 默认。此元素会被显示为内联元素，元素前后没有换行符。         |
| inline-block       | 行内块元素。（CSS2.1 新增的值）                              |
| list-item          | 此元素会作为列表显示。                                       |
| run-in             | 此元素会根据上下文作为块级元素或内联元素显示。               |
| compact            | CSS 中有值 compact，不过由于缺乏广泛支持，已经从 CSS2.1 中删除。 |
| marker             | CSS 中有值 marker，不过由于缺乏广泛支持，已经从 CSS2.1 中删除。 |
| table              | 此元素会作为块级表格来显示（类似 <table>），表格前后带有换行符。 |
| inline-table       | 此元素会作为内联表格来显示（类似 <table>），表格前后没有换行符。 |
| table-row-group    | 此元素会作为一个或多个行的分组来显示（类似 <tbody>）。       |
| table-header-group | 此元素会作为一个或多个行的分组来显示（类似 <thead>）。       |
| table-footer-group | 此元素会作为一个或多个行的分组来显示（类似 <tfoot>）。       |
| table-row          | 此元素会作为一个表格行显示（类似 <tr>）。                    |
| table-column-group | 此元素会作为一个或多个列的分组来显示（类似 <colgroup>）。    |
| table-column       | 此元素会作为一个单元格列显示（类似 <col>）                   |
| table-cell         | 此元素会作为一个表格单元格显示（类似 <td> 和 <th>）          |
| table-caption      | 此元素会作为一个表格标题显示（类似 <caption>）               |
| inherit            | 规定应该从父元素继承 display 属性的值。                      |

### visibility

| 值       | 描述                                                         |
| -------- | ------------------------------------------------------------ |
| visible  | 默认值。元素是可见的。                                       |
| hidden   | 元素是不可见的。                                             |
| collapse | 当在表格元素中使用时，此值可删除一行或一列，但是它不会影响表格的布局。被行或列占据的空间会留给其他内容使用。如果此值被用在其他的元素上，会呈现为 "hidden"。 |

### opacity

设置一个元素了透明度级别。

```
opacity: value
```

指定不透明度。从0.0（完全透明）到1.0（完全不透明）









### rotation

围绕由 [rotation-point](https://www.w3cschool.cn/cssref/pr-rotation-point.html) 属性定义的指定点，对块级元素进行逆时针旋转。

> 提示：边框、内边距、内容以及背景（非固定）也会被旋转！

```css
rotation: angle;/*单位是deg*/
```

### 溢出

#### overflow

指定如果内容溢出一个元素的框，会发生什么。

| 值      | 描述                                                     |
| ------- | -------------------------------------------------------- |
| visible | 默认值。内容不会被修剪，会呈现在元素框之外。             |
| hidden  | 内容会被修剪，并且其余内容是不可见的。                   |
| scroll  | 内容会被修剪，但是浏览器会显示滚动条以便查看其余的内容。 |
| auto    | 如果内容被修剪，则浏览器会显示滚动条以便查看其余的内容。 |

#### overflow-x

属性规定是否对内容的左/右边缘进行裁剪。

**语法**

```css
overflow-x: visible|hidden|scroll|auto|no-display|no-content;
```

| 值         | 描述                                   |
| ---------- | -------------------------------------- |
| visible    | 不裁剪内容，可能会显示在内容框之外。   |
| hidden     | 裁剪内容 - 不提供滚动机制。            |
| scroll     | 裁剪内容 - 提供滚动机制。              |
| auto       | 如果溢出框，则应该提供滚动机制。       |
| no-display | 如果内容不适合内容框，则删除整个框。   |
| no-content | 如果内容不适合内容框，则隐藏整个内容。 |

#### overflow-y 

规定是否对内容的上/下边缘进行裁剪



### 动画

#### animation

语法

```css
animation: name duration timing-function delay iteration-count direction;
```

| 值                          | 描述                                     |
| --------------------------- | ---------------------------------------- |
| *animation-name*            | 规定需要绑定到选择器的 keyframe 名称。   |
| *animation-duration*        | 规定完成动画所花费的时间，以秒或毫秒计。 |
| *animation-timing-function* | 规定动画的速度曲线。                     |
| *animation-delay*           | 规定在动画开始之前的延迟。               |
| *animation-iteration-count* | 规定动画应该播放的次数。                 |
| *animation-direction*       | 规定是否应该轮流反向播放动画。           |

> 注释：请始终规定 animation-duration 属性，否则时长为 0，就不会播放动画了。

使用简写属性，将动画与 div 元素绑定： 

```css
div 
{ 
    animation:mymove 5s infinite; 
    -webkit-animation:mymove 5s infinite; /* Safari 和 Chrome */ 
} 
```

#### animation-name

animation-name 属性为 @keyframes 动画规定名称。

**语法**

```css
animation-name: keyframename|none;
```

| 值             | 描述                                         |
| -------------- | -------------------------------------------- |
| *keyframename* | 规定需要绑定到选择器的 keyframe 的名称。     |
| none           | 规定无动画效果（可用于覆盖来自级联的动画）。 |

#### animation-duration

定义动画完成一个周期需要多少秒或毫秒。

语法

```css
animation-duration: time;
```

| **值** | **说明**                                                     |
| ------ | ------------------------------------------------------------ |
| time   | 设置一个动画周期的时间间隔（以秒或毫秒为单位）。 默认值为0，表示不会有动画 |

#### animation-timing-function

指定动画速度曲线。速度曲线定义动画从一套 CSS 样式变为另一套所用的时间。速度曲线用于使变化更为平滑。

语法

```css
animation-timing-function: linear | ease | ease-in | ease-out | cubic-bezier(n,n,n,n);
```

| 值                            | 描述                                                        |
| ----------------------------- | ----------------------------------------------------------- |
| linear                        | 动画从开始到结束具有相同的速度。                            |
| ease                          | 默认值。动画有一个缓慢的开始，然后快，结束慢。              |
| ease-in                       | 动画有一个缓慢的开始。                                      |
| ease-out                      | 动画结束缓慢。                                              |
| ease-in-out                   | 动画具有缓慢的开始和慢的结束。                              |
| cubic-bezier(*n*,*n*,*n*,*n*) | 在立方贝塞尔函数中定义速度函数。 可能的值是从0到1的数字值。 |

#### animation-delay

定义动画什么时候开始。animation-delay 值单位可以是秒（s）或毫秒（ms）。

**提示:** 允许负值，-2s 使动画马上开始，但跳过 2 秒进入动画。

**语法**

```
animation-delay: time;
```

#### animation-iteration-count

属性定义动画应该播放多少次。

**语法**

animation-iteration-count: *value*;

| 值       | 描述                           |
| -------- | ------------------------------ |
| *n*      | 定义播放动画多少次。 默认值为1 |
| infinite | 指定动画应该播放无限次（永远） |

#### animation-direction

控制如何在`reverse`或`alternate`周期播放动画。 

如果 animation-direction 值是 "alternate"，则动画会在奇数次数（1、3、5 等等）正常播放，而在偶数次数（2、4、6 等等）向后播放。

> 注释：如果把动画设置为只播放一次，则该属性没有效果。

语法

```css
animation-direction: normal|reverse|alternate|alternate-reverse; 
```

| **值**            | **描述**                                                     |
| ----------------- | ------------------------------------------------------------ |
| normal            | 以正常的方式播放动画                                         |
| reverse           | 以相反方向播放动画                                           |
| alternate         | 播放动画作为正常每奇数时间（1,3,5等）和反方向每偶数时间（2,4,6，等...） |
| alternate-reverse | 在每个奇数时间（1,3,5等）在相反方向上播放动画，并且在每个偶数时间（2,4,6等等）的正常方向上播放动画 |



#### animation-fill-mode

> 注释：其属性值是由逗号分隔的一个或多个填充模式关键词。

**语法**

```css
animation-fill-mode: none|forwards|backwards|both|initial|inherit;
```

| 值        | 描述                               |
| --------- | ---------------------------------- |
| none      | 默认值。无样式                     |
| forwards  | 动画结束后，使用元素的结束属性值。 |
| backwards | 使用元素的起始值。                 |
| both      | 动画将遵循向前和向后的规则。       |

为 h1 元素规定填充模式： 

```css
h1 
{ 
	animation-fill-mode: forwards; 
} 
```



#### animation-play-state

设置是否运行或暂停动画。

> 注释：您可以在 JavaScript 中使用该属性，这样就能在播放过程中暂停动画。

```css
animation-play-state: paused|running;
```

| 值      | 描述                    |
| ------- | ----------------------- |
| paused  | 动画已暂停。            |
| running | 默认值， 动画正在运行。 |



### appearance

允许您使元素看上去像标准的用户界面元素。

**语法**

```css
appearance: normal|icon|window|button|menu|field;
```

| 值     | 描述                               |
| ------ | ---------------------------------- |
| normal | 将元素呈现为常规元素。             |
| icon   | 将元素呈现为图标（小图片）。       |
| window | 将元素呈现为视口。                 |
| button | 将元素呈现为按钮。                 |
| menu   | 将元素呈现为一套供用户选择的选项。 |
| field  | 将元素呈现为输入字段。             |



### 分列布局

#### column-count

规定元素应该被划分的列数。

语法

```css
column-count: number|auto;
```

| 值       | 描述                                      |
| -------- | ----------------------------------------- |
| *number* | 元素内容将被划分的最佳列数。              |
| auto     | 由其他属性决定列数，比如 "column-width"。 |

#### column-fill 

规定如何填充列（是否进行协调）。

**语法**

```
column-fill: balance|auto;
```

| 值      | 描述                                                 |
| ------- | ---------------------------------------------------- |
| balance | 对列进行协调。浏览器应对列长度的差异进行最小化处理。 |
| auto    | 按顺序对列进行填充，列长度会各有不同。               |

#### column-gap

属性规定列之间的间隔。

**语法**

```
column-gap: length|normal;
```

| 值       | 描述                                               |
| -------- | -------------------------------------------------- |
| *length* | 把列间的间隔设置为指定的长度。                     |
| normal   | 规定列间间隔为一个常规的间隔。W3C 建议的值是 1em。 |

#### column-rule

是一个速记属性设置所有column-rule-*属性。column-rule属性设置列之间的宽度，样式和颜色。

**语法**

column-rule: *column-rule-width column-rule-style column-rule-color*;

| 值                  | 说明                   |
| ------------------- | ---------------------- |
| *column-rule-width* | 设置列中之间的宽度规则 |
| *column-rule-style* | 设置列中之间的样式规则 |
| *column-rule-color* | 设置列中之间的颜色规则 |

#### column-span 

规定元素应横跨多少列。

语法

```
column-span: 1|all;
```

| 值   | 描述               |
| ---- | ------------------ |
| 1    | 元素应横跨一列。   |
| all  | 元素应横跨所有列。 |

#### column-width 

规定列的宽度。

**语法**

```
column-width: auto|length;
```

| 值       | 描述               |
| -------- | ------------------ |
| auto     | 由浏览器决定列宽。 |
| *length* | 规定列的宽度。     |

#### columns 

是一个简写属性，用于设置列宽和列数。

**语法**

```
columns: column-width column-count;
```

| 值             | 描述       |
| -------------- | ---------- |
| *column-width* | 列的宽度。 |
| *column-count* | 列数。     |



### 弹性布局

#### flex

语法

```css
 flex: flex-grow flex-shrink flex-basis|auto|initial|inherit;
```

属性值

| 值            | 描述                                                         |
| ------------- | ------------------------------------------------------------ |
| *flex-grow*   | 一个数字，规定项目将相对于其他灵活的项目进行扩展的量。       |
| *flex-shrink* | 一个数字，规定项目将相对于其他灵活的项目进行收缩的量。       |
| *flex-basis*  | 项目的长度。合法值："auto"、"inherit" 或一个后跟 "%"、"px"、"em" 或任何其他长度单位的数字。 |
| auto          | 与 1 1 auto 相同。                                           |
| none          | 与 0 0 auto 相同。                                           |

#### flex-grow 

用于设置或检索弹性盒的扩展比率。。

> **注意：**如果元素不是弹性盒对象的元素，则 flex-grow 属性不起作用。

```
flex-grow: number
```

#### flex-shrink 

用于设置或检索弹性盒的收缩比率。

> **注意：**如果元素不是弹性盒对象的元素，则 flex-shrink 属性不起作用。

```
flex-shrink: number
```

#### flex-basis 

用于设置或检索弹性盒伸缩基准值。。

```
flex-basis: number
```

#### flex-direction 

规定灵活项目的方向。

CSS 语法

```css
 flex-direction: row|row-reverse|column|column-reverse|initial|inherit;
```

属性值

| 值             | 描述                                           |
| -------------- | ---------------------------------------------- |
| row            | 默认值。灵活的项目将水平显示，正如一个行一样。 |
| row-reverse    | 与 row 相同，但是以相反的顺序。                |
| column         | 灵活的项目将垂直显示，正如一个列一样。         |
| column-reverse | 与 column 相同，但是以相反的顺序。             |

#### flex-flow 

是 flex-direction 和 flex-wrap 属性的复合属性。

flex-flow 属性用于设置或检索弹性盒模型对象的子元素排列方式。

flex-direction 属性规定灵活项目的方向。

flex-wrap 属性规定灵活项目是否拆行或拆列。

> **注意：**如果元素不是弹性盒对象的元素，则 flex-flow 属性不起作用。

**语法**

```css
flex-flow: flex-direction flex-wrap
```

| 值               | 描述                                                         |
| ---------------- | ------------------------------------------------------------ |
| *flex-direction* | 可能的值：  row row-reverse column column-reverse initial inherit默认值是 "row"。规定灵活项目的方向。 |
| *flex-wrap*      | 可能的值：  nowrap wrap wrap-reverse initial inherit默认值是 "nowrap"。规定灵活项目是否拆行或拆列。 |



### transform

应用于元素的2D或3D转换。这个属性允许你将元素旋转，缩放，移动，倾斜等。

**语法**

transform: none|*transform-functions*;

| 值                                                           | 描述                                    |
| ------------------------------------------------------------ | --------------------------------------- |
| none                                                         | 定义不进行转换。                        |
| matrix(*n*,*n*,*n*,*n*,*n*,*n*)                              | 定义 2D 转换，使用六个值的矩阵。        |
| matrix3d<br />(*n*,*n*,*n*,*n*<br />,*n*,*n*,*n*,*n*,<br />*n*,*n*,*n*,*n*,<br />*n*,*n*,*n*,*n*) | 定义 3D 转换，使用 16 个值的 4x4 矩阵。 |
| translate(*x*,*y*)                                           | 定义 2D 转换。                          |
| translate3d(*x*,*y*,*z*)                                     | 定义 3D 转换。                          |
| translateX(*x*)                                              | 定义转换，只是用 X 轴的值。             |
| translateY(*y*)                                              | 定义转换，只是用 Y 轴的值。             |
| translateZ(*z*)                                              | 定义 3D 转换，只是用 Z 轴的值。         |
| scale(*x*[,*y*]?)                                            | 定义 2D 缩放转换。                      |
| scale3d(*x*,*y*,*z*)                                         | 定义 3D 缩放转换。                      |
| scaleX(*x*)                                                  | 通过设置 X 轴的值来定义缩放转换。       |
| scaleY(*y*)                                                  | 通过设置 Y 轴的值来定义缩放转换。       |
| scaleZ(*z*)                                                  | 通过设置 Z 轴的值来定义 3D 缩放转换。   |
| rotate(*angle*)                                              | 定义 2D 旋转，在参数中规定角度。        |
| rotate3d(*x*,*y*,*z*,*angle*)                                | 定义 3D 旋转。                          |
| rotateX(*angle*)                                             | 定义沿着 X 轴的 3D 旋转。               |
| rotateY(*angle*)                                             | 定义沿着 Y 轴的 3D 旋转。               |
| rotateZ(*angle*)                                             | 定义沿着 Z 轴的 3D 旋转。               |
| skew(*x-angle*,*y-angle*)                                    | 定义沿着 X 和 Y 轴的 2D 倾斜转换。      |
| skewX(*angle*)                                               | 定义沿着 X 轴的 2D 倾斜转换。           |
| skewY(*angle*)                                               | 定义沿着 Y 轴的 2D 倾斜转换。           |
| perspective(*n*)                                             | 为 3D 转换元素定义透视视图。            |

#### transform-origin

允许您更改转换元素的位置。

2D转换元素可以改变元素的X和Y轴。 3D转换元素，还可以更改元素的Z轴。

语法

transform-origin: *x-axis y-axis z-axis*;

| 值     | 描述                                                         |
| ------ | ------------------------------------------------------------ |
| x-axis | 定义视图被置于 X 轴的何处。可能的值：left  center  right  length  % |
| y-axis | 定义视图被置于 Y 轴的何处。可能的值：top  center  bottom  length  % |
| z-axis | 定义视图被置于 Z 轴的何处。可能的值：*length*                |

#### transform--style

指定嵌套元素是怎样在三维空间中呈现。

**语法**

```
transform-style: flat|preserve-3d;
```

| 值          | 描述                       |
| ----------- | -------------------------- |
| flat        | 子元素将不保留其 3D 位置。 |
| preserve-3d | 子元素将保留其 3D 位置。   |



transition

定义一个元素的过渡动作

语法

```
transition: property duration timing-function delay;
```

| 值                                                           | 描述                                |
| ------------------------------------------------------------ | ----------------------------------- |
| [transition-property](https://www.w3cschool.cn/cssref/pr-transition-property.html) | 规定设置过渡效果的 CSS 属性的名称。 |
| [transition-duration](https://www.w3cschool.cn/cssref/pr-transition-duration.html) | 规定完成过渡效果需要多少秒或毫秒。  |
| [transition-timing-function](https://www.w3cschool.cn/cssref/pr-transition-timing-function.html) | 规定速度效果的速度曲线。            |
| [transition-delay](https://www.w3cschool.cn/cssref/pr-transition-delay.html) | 定义过渡效果何时开始。              |

#### transition-property

指定CSS属性的nametransition效果（transition效果时将会启动指定的CSS属性的变化）。

语法

transition-property: none|all| *property*;

| 值         | 描述                                                  |
| ---------- | ----------------------------------------------------- |
| none       | 没有属性会获得过渡效果。                              |
| all        | 所有属性都将获得过渡效果。                            |
| *property* | 定义应用过渡效果的 CSS 属性名称列表，列表以逗号分隔。 |

#### transition-duration

规定完成过渡效果需要花费的时间（以秒或毫秒计）。

语法

```css
transition-duration: time;
```

| 值   | 描述                                                         |
| ---- | ------------------------------------------------------------ |
| time | 规定完成过渡效果需要花费的时间（以秒或毫秒计）。默认值是 0，意味着不会有效果。 |

#### transition-delay 

规定过渡效果何时开始。transition-delay 值以秒或毫秒计。

```
transition-delay: time;
```

#### transition-timing-function

指定切换效果的速度。

此属性允许一个过渡效果，以改变其持续时间的速度。

**语法**

```css
transition-timing-function: linear|ease|ease-in|ease-out|ease-in-out|cubic-bezier(n,n,n,n);
```

| 值                            | 描述                                                         |
| ----------------------------- | ------------------------------------------------------------ |
| linear                        | 规定以相同速度开始至结束的过渡效果（等于 cubic-bezier(0,0,1,1)）。 |
| ease                          | 规定慢速开始，然后变快，然后慢速结束的过渡效果（cubic-bezier(0.25,0.1,0.25,1)）。 |
| ease-in                       | 规定以慢速开始的过渡效果（等于 cubic-bezier(0.42,0,1,1)）。  |
| ease-out                      | 规定以慢速结束的过渡效果（等于 cubic-bezier(0,0,0.58,1)）。  |
| ease-in-out                   | 规定以慢速开始和结束的过渡效果（等于 cubic-bezier(0.42,0,0.58,1)）。 |
| cubic-bezier(*n*,*n*,*n*,*n*) | 在 cubic-bezier 函数中定义自己的值。可能的值是 0 至 1 之间的数值。 |





























