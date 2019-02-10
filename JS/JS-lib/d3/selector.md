d3中的选择器主要有如下的api：

- [d3.selection](https://github.com/d3/d3-selection#selection) - 选择根文档元素。
- [d3.select](https://github.com/d3/d3-selection#select) - 从文档中选择一个元素。
- [d3.selectAll](https://github.com/d3/d3-selection#selectAll) - 从文档中选择多个元素。
- [*selection*.select](https://github.com/d3/d3-selection#selection_select) - 选择每个选中元素的一个后代元素。
- [*selection*.selectAll](https://github.com/d3/d3-selection#selection_selectAll) - 选择每个选中元素的多个后代元素。
- [*selection*.filter](https://github.com/d3/d3-selection#selection_filter) - 基于数据过滤元素。
- [*selection*.merge](https://github.com/d3/d3-selection#selection_merge) - 合并两个选择。
- [d3.matcher](https://github.com/d3/d3-selection#matcher) - 测试一个元素是否匹配选择器。
- [d3.selector](https://github.com/d3/d3-selection#selector) - 选择一个元素。
- [d3.selectorAll](https://github.com/d3/d3-selection#selectorAll) - 选择多个元素。
- [d3.window](https://github.com/d3/d3-selection#window) - 得到节点的所有者窗口。



上面以d3开头是d3.js的全局方法，可以直接调用，而以selection开头的表示调用d3全局方法之后返回的对象(selction)上的方法。

### xxx.select()

选择单个元素

#### 从d3上获取元素

`d3.select()`

```js
var p1=d3.select("p")；	// 表示选择第一个p元素,
console.log(p1);
```

返回一个section类型的对象，如下：

![](E:\project\articles\images\d3-select-1.png)

如果获取的是一个body元素，结果就是：

```js
var body=d3.select("body")；	// 表示body元素,
console.log(body);
```

![](E:\project\articles\images\d3-select-2.png)

#### 从已知节点上获取元素

`selection.select()`

```js
var body=d3.select("body")；	// 表示body元素,
var p=body.select("p")；	// 获取body下的第一个p元素
```

有上述的使用方法，可以看出d3中选择节点的方式是支持链式调用的（方法返回原来的对象）。并且可以查看，经手不同的节点获取元素返回的对象结构都是一样的，所以原节点是什么对后面获取到的节点没有影响。

![](E:\project\articles\images\d3-select-3.png)

#### 花式选择获取元素

select方法的内部可以使用任意符合css标准的选择器选择节点

```
var body = d3.select("body"); // 选中body元素标签
var div = d3.select("div"); // 选中第一个div元素标签
var div1 = d3.select(".className"); // 选中类名为className的元素标签
var div2 = d3.select("#idName"); // 选中id为idName的元素标签
var tmp=d3.select("div:nth-child(2)"); // 选取body下的第二个div节点
```



### xxx.selectAll()

使用selectAll与select方法类似，不过他是用于获取多个节点的方法；

等价于选择器中的getElementSByTagsName和getElementsByClassName，都是获得一个nodeList集合，然后可以对里面的（可迭代）的集合进行操作。

```js
var divs=d3.selectAll("div");
console.log(divs); // NodeList[3]
```

![](E:\project\articles\images\d3-selectAll-1.png)

也可以使用已有节点的selectAll

```js
var paras=d3.select("div").selectAll("p");
console.log("paras:",paras); // NodeList[3] [p,p,p]
```

![](E:\project\articles\images\d3-selectAll-2.png)

这里和单选节点select有一点区别，就是selectAll方法返回的对象里面有了他的父级的信息，而select清一色都是html。



### selection.filter

filter用来过滤获取的节点，并返回符合条件的节点，一般这个selection节点都是通过selectAll方法返回的，否则一个节点拿来过滤也没有意义。



### d3.selection

这个方法直接用来获取html元素

```js
var html=d3.selection();
console.log(html); // document.documentElement
```

![](E:\project\articles\images\d3-selection.png)





















