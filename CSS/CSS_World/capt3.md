### width:auto

auto是width属性的默认值，其作用域不同的元素下有不同的效果：

> 作用于块级元素

此块级元素的宽度等于父级元素的宽度。

> 作用于内联元素

此内联元素的宽度等于内容撑开的宽度，如果宽度大于父级宽度，会超出父级的宽度，如果小于父级宽度，则正常显示。

```h
#div1{
    width: 100px;/*修改父级宽度*/
    height: 100px;
	border: 1px solid #f00;
}
.text{
    width: auto;
}

<div id="div1">
        <span class="text">erxtcyvubinompomnibuytcrxcyvubinomppoinuby</span>
    </div>
```



### 外部尺寸与内部尺寸

#### 外部尺寸

所谓“内部尺寸”，简单来讲就是元素的尺寸由外部的元素决定，默认直接为外部元素的100%。，并不是看上去的宽度100%显示这么简单，而是一种margin / border / padding和content 内容区域自动分配水平空间的机制。

#### 内部尺寸

所谓“内部尺寸”，简单来讲就是元素的尺寸由内部的元素决定，而非由外部的容器决定，主要体现内容部分撑开。

> display:block

元素的宽度由外部的**父级**决定，但是表现形式是**块级**元素的形式（一条独占单行）

> display:inline-block

元素的宽度由外部的**父级**决定，但是表现形式是内联元素的形式（多条一行显示）

> display:inline

元素的宽度由外部的**内容**决定，但是表现形式是内联元素的形式（多条一行显示）



#### 首选最小宽度

对内联元素使用，并且将其宽度设置为0，如果有内容其宽度不会为0，如果是汉字，则为一个汉字字符的宽度，英文则为一个单词的宽度。

```css
<span></span>

span{
    display: inline-block;
    width: 0;
}
    span:before{
    content: 'love 你 love';
    outline: 1px solid darkcyan;
}
```



#### 最大宽度

一个display:inline-block的块级元素的宽度是由内部的内联元素宽度相加得到的（前提是内联元素没有换行，如果换行则宽度最大等于换行位置截止）。同时此款及元素中的子块级元素的宽度等于此块级元素的宽度。



### width值的细节

- 如果将宽度设置为固定值，那么就会失去块级元素的流动性。

- 设置宽度只代表content宽度，设置padding和border会导致页面变动。



### 宽度分离原则

以一个父级元素作为定义宽度的标准，限制内部元素的宽度。使得内部的width:auto，任何时候设置padding和border都会压缩内部的content的宽度。而不会引发页面的变动。

缺点：导致页面元素过多。



另一个方法是使用box-sizing，可以将width表示为border-box的宽度，修改padding和border都会压缩内部的content的宽度，不会引发页面的变动。

box-sizing发明出来是为了解决替换元素的宽度自适应的问题，其具体的使用方法是：

```css
input, textarea, img, video, object {
    box-sizing: border-box;
}
```



