## 概念

FlexBox意为弹性布局，是一种布局解决方案，与传统解决方案(基于盒模型，使用浮动，绝对定位)相比，flex布局更加灵活，具有响应式，可以解决在布局上的很多麻烦。优点如下：

- 方便垂直居中
- 改变元素的视觉次序
- 解决盒子空白问题
- 减少浮动问题

Flex布局使得子项目能够”弹性”的改变其高宽, 自由填充容器剩余空间, 以适应容器变大, 或者压缩子项目自身, 以适应容器变小; 同时还可以方便的调节子项目方向和顺序. flex常用于高宽需要自适应, 或子项目大小成比例, 或水平垂直对齐等场景. 

Flex弹性盒模型里, 有容器和项目之分. 设置`display:flex`的为容器, 容器内的元素称作它的子项目, 容器有容器的一套属性, 子项目有子项目的另一套属性. (可以这么理解: father作为弹性盒子, 制定行为规范, son享受盒子的便利, 按照规范划分各自的”辖区”). 

![](E:\WebStorm_Dir\articles\images\flex1.jpeg)

![](E:\WebStorm_Dir\articles\images\flex2.png)

父级制定的规范, 基于两个方向 — 水平和垂直。

- 水平方向的称之为主轴(main axis), 垂直方向的称之为交叉轴(cross axis).
- 主轴起始位置, 叫做`main start`, 末尾位置叫做`main end`;
- 交叉轴起始位置, 叫做`cross start`, 末尾位置叫做`cross end`.
- 子项目在主轴上所占的宽(高)度, 叫做`main size`, 在交叉轴上所占的高(宽)度, 叫做`cross size`.

## 属性

`display: flex | inline-flex;`(元素将升级为弹性盒子). 前者容器升级为**块级盒子**, 后者容器将升级为**行内盒子**. 元素采用flex布局以后, 子元素的float, clear, vertical-align属性都将失效. 

### 容器属性

容器具有以下6个属性. 

#### flex-direction 

指定主轴的方向

| flex-direction的值 | 描述                              |
| ------------------ | --------------------------------- |
| **row**(默认)      | 指定主轴水平, 子项目从左至右排列➜ |
| **row-reverse**    | 指定主轴水平, 子项目从右至左排列⬅︎ |
| **column**         | 指定主轴垂直, 子项目从上至下排列⬇︎ |
| **column-reverse** | 指定主轴垂直, 子项目从下至上排列⬆︎ |

![](E:\WebStorm_Dir\articles\images\flex3.png)

#### flex-wrap 

指定如何换行.

![](E:\WebStorm_Dir\articles\images\flex4.png)

| flex-wrap的值    | 描述                   |
| ---------------- | ---------------------- |
| **nowrap**(默认) | 默认不换行             |
| **wrap**         | 正常换行               |
| **wrap-reverse** | 换行, 且前面的行在底部 |

nowrap：不换行

![](E:\WebStorm_Dir\articles\images\flex5.png)

wrap：换行，第一行在上方

![](E:\WebStorm_Dir\articles\images\flex6.png)

wrap-reverse：换行，第一行在下方

![](E:\WebStorm_Dir\articles\images\flex7.png)

#### flex-flow 

它是flex-direction 和 flex-wrap的简写形式, 默认值为`row nowrap`.

基本语法结构为：

`flex-flow: <flex-direction> || <flex-wrap>;` 

表示一次性设置两个属性。

#### justify-content 

指定主轴上子项目的对齐方式.(通常为水平方向对齐方式)

| justify-content的值  | 描述(子项目–主轴方向)                                        |
| -------------------- | ------------------------------------------------------------ |
| **flex-start**(默认) | 子项目起始位置与`main start`位置对齐                         |
| **flex-end**         | 子项目末尾位置与`main end`位置对齐                           |
| **center**           | 在主轴方向居中于容器                                         |
| **space-between**    | 与交叉轴两端对齐, 子项目之间的间隔全部相等                   |
| **space-around**     | 子项目两侧的距离相等, 它们之间的距离两倍于它们与主轴起始或末尾位置的距离. |

![](E:\WebStorm_Dir\articles\images\flex—justfyContent.png)

#### align-items 

指定交叉轴上子项目的对齐方式.(通常为垂直方向对齐方式)

| align-items的值   | 描述(子项目—交叉轴方向)                           |
| ----------------- | ------------------------------------------------- |
| **flex-start**    | 子项目起始位置与`cross start`（垂直顶部）位置对齐 |
| **flex-end**      | 子项目末尾位置与`cross end`（垂直底部）位置对齐   |
| **center**        | 在交叉轴方向居中于容器（垂直居中）                |
| **baseline**      | 第一行文字的基线对齐（第一行文字对齐）            |
| **stretch**(默认) | 高度未定(或auto)时, 将占满容器的高度（高度填满）  |

![](E:\WebStorm_Dir\articles\images\flex—justfyContent.png)

#### align-content 

指定多根主轴（多行）的对齐方式. 若只有一根主轴, 则无效.

| align-content的值 | 描述(子项目)                                                 |
| ----------------- | ------------------------------------------------------------ |
| **flex-start**    | 顶部与`cross start`位置对齐                                  |
| **flex-end**      | 底部与`cross end`位置对齐                                    |
| **center**        | 在交叉轴方向居中于容器                                       |
| **space-between** | 与交叉轴两端对齐, 间隔全部相等                               |
| **space-around**  | 子项目两侧的距离相等, 它们之间的距离两倍于它们与主轴起始或末尾位置的距离. |
| **stretch**(默认) | 多根主轴上的子项目充满交叉轴                                 |

![](E:\WebStorm_Dir\articles\images\flex—alignContent.png)

### 子项目属性

子项目具有以下6个属性. 

#### flex-grow

指定子项目的**放大比例,** 默认为0(即不放大). 该属性可取值为任何正整数. 假设各个子项目的放大比例之和为n, 那么容器内剩余的空间将分配n份, 每个子项目各自分到x/n份. (x为该子项目的放大比例) 

![](E:\WebStorm_Dir\articles\images\flex-grow.png)

如果所有项目的flex-grow属性都为1，则它们将等分剩余空间（如果有的话）。如果一个项目的flex-grow属性为2，其他项目都为1，则前者占据的剩余空间将比其他项多一倍。 

#### flex-shrink

指定子项目的**缩小比例**, 默认为`1`. 设置为0时, 空间不足该子项目将不缩小. 我们知道, `容器的缩小总宽度=子项目所需要的总宽度-容器实际宽度`, 假设容器需要缩小的宽度为W, 某子项目的默认宽度为L, 其缩小比例为p, 那么该子项目实际的宽度为`L-p*W`. 

![](E:\WebStorm_Dir\articles\images\flex-shrink.png)

负值对该属性无效。 

#### flex-basis

指定子项目**分配的默认空间**, 默认为`auto`. 

基本语法：

`flex-basis: <length> | auto; /* default auto */` 

浏览器根据这个属性，计算主轴是否有多余空间。它的默认值为auto，即项目的本来大小。 

它可以设为跟width或height属性一样的值（比如350px），则项目将占据固定空间。 

#### flex 

是 flex-grow, flex-shrink, flex-basis 3个属性的缩写. 默认为`0 1 auto`. 该属性取值为auto时等同于设置为`1 1 auto`, 取值为none时等同于设置为`0 0 auto`. 

基本语法：

`flex: none | [ <'flex-grow'> <'flex-shrink'>? || <'flex-basis'> ]` 

用于一次性同时设置三个属性。建议优先使用这个属性，而不是单独写三个分离的属性，因为浏览器会推算相关值。

#### align-self 

指定单个子项目独立的对齐方式. 默认为`auto`, 表示继承父元素的align-items属性, 如**无父元素, 则等同于`stretch`**. 该属性共有6种值, 其他值与上述align-items属性保持一致. 

基本语法：

`align-self: auto | flex-start | flex-end | center | baseline | stretch;`

![flex-start](E:\WebStorm_Dir\articles\images\align-self.png)

#### order 

指定子项目的顺序, 数值越小, 顺序越靠前, 默认为`0`. 

![](E:\WebStorm_Dir\articles\images\flex-order.png)

### flex属性的优先级

我们可以给input设置`flex:1`, 使其充满一行, 并且随着父元素大小变化而变化. 也可以给div设置`flex:1`使其充满剩余高度.

使用flex布局这些都不是难事, 需要注意的是, 这其中有坑. 为了避免踩坑, 我们先来看下flex属性的优先级:

> **width|height > 自适应文本内容的宽度或高度 > flex:数值** 

这意味着, 首先是元素宽高的值优先, 其次是内容的宽高, 再次是flex数值. 

- 给input元素设置`flex:1`时需要注意, 通常input拥有一个默认宽度(用于展示默认数量的字符), 在chrome v55下, 这个宽度默认为126px(同时还包含2px的border). 因此想要实现input宽度自适应, 可以设置其width为0.
- 给div元素设置`flex:1`时, 因div的高度会受子级元素影响, 为了使得该div占满其父元素剩余的高度, 且不超出, 建议将该div的`height`属性设置为0. 此时PC端表现非常优秀，美中不足的是，对于移动端而言，div的子元素设置为`height:100%`并没有什么卵用，此时子元素高度依然为0。目前我能想到的比较好的解决方案就是：给div也设置`display:flex;align-item:stretch`，使得div本身也获得flex布局能力，同时div子元素高度充满div本身。

### 













































































