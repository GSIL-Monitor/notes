### BFC的定义

BFC(Block formatting context)直译为"块级格式化上下文"。它**是一个独立的渲染区域**，只有**Block-level box**参与（在下面有解释）， 它规定了内部的Block-level Box如何布局，并且与这个区域外部毫不相干。

我们常说的文档流其实分为定位流、浮动流和普通流三种。而**普通流其实就是指BFC中的FC**。

**FC**是formatting context的首字母缩写，直译过来是格式化上下文，它**是页面中的一块渲染区域**，有一套渲染规则，决定了其**子元素如何布局，以及和其他元素之间的关系和作用。**

常见的FC有

- BFC（块级格式化上下文）
- IFC（行级格式化上下文）
- GFC（网格布局格式化上下文）
- FFC（自适应格式化上下文）

BFC 可以简单的理解为**某个元素的一个 CSS 属性**，只不过这个属性**不能**被开发者**显式的修改**，拥有这个属性的元素对内部元素和外部元素会表现出一些特性，这就是BFC。

既然不能显示的修改，那么触发的情况有那些？满足下列条件之一就可触发BFC：

【1】根元素，即HTML元素

【2】float的值不为none

【3】overflow的值不为visible

【4】display的值为inline-block、table-cell、table-caption

【5】position的值为absolute或fixed 　　



### BFC的布局规则

#### BFC布局规则1

内部的Box会在垂直方向，一个接一个地放置。

![block-level-box](https://github.com/zyileven/articles/blob/master/images/block-level-box.png)

平常说的盒子是由margin、border、padding、content组成的，实际上每种类型的四条边定义了一个盒子，分别是分别是**content box、padding box、border box、margin box**，这四种类型的盒子一直存在，即使他们的值为0.决定块盒在包含块中与相邻块盒的垂直间距的便是margin-box。

#### 不同BFC的垂直外边距不叠加

正常的Box垂直方向的距离由margin决定。两个相邻Box的margin会发生重叠。

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <style>
        .aside {
            margin: 20px;/*margin属性*/
            width: 100px;
            height: 100px;
            background: #f00;
        }
        .main {
            margin: 20px;/*margin属性*/
            width: 100px;
            height: 100px;
            background: #0f0;
            /*float:left;!* 设置此属性，可以出发BFC属性*!*/
        }
        .text{
            /*盒子main的外面包一个div，通过改变此div的属性使两个盒子分属于两个不同的BFC，以此来阻止margin重叠*/
            /*overflow: hidden;!*设置此属性 触发BFC属性。*!*/
        }
        #div1{
            border: 1px solid #000;
        }
    </style>
</head>
<body>
<div id="div1">
    <div class="aside">
        aside
    </div>
    <div class="text">
        <div class="main">
            main
        </div>
    </div>
</div>
</body>
</html>

```

![](E:\WebStorm_Dir\articles\images\BFC2.png)

如上图上下两个div都有一个`margin:20px`,但是最终两个div之间的距离只有20px，即上下外边距叠加。

我们查看绿色部分，首先它是有两个部分叠加的外部text，



上面可以通过对text设置overflow:hidden；实现BFC

也可以使用main的float:left只要不为none就可以触发BFC





### BFC的具体作用

1. 自适应两栏布局
2. 可以阻止元素被浮动元素覆盖
3. 可以包含浮动元素——清除内部浮动
4. 分属于不同的BFC时可以阻止margin重叠































