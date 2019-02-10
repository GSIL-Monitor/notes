## Node类型

### 属性：

#### nodeType

用来判定指定节点的类型 

#### nodeName/nodeValue

nodeName保存的是标签名，nodeValue保存的是值。如果是元素节点，则nodeValue始终是null，而文本节点类的才会有值。 

#### childNodes

childNodes用来表示所有子节点，其中保存着一个NodeList对象，NodeList是一种类数组的对象，用于保存一组有序的节点，可以通过位置来访问这些节点。 

```javascript
NodeList=root.childNodes;	//获取所有的子节点
firstNode=NodeList[0];		//通过位置获得第一个子节点
firstNode=NodeList.item(0);	//同上
length=NodeList.length;		//获得子节点的数量，这是一个动态的值，用来获取当前时刻的子节点，尽量不要使用这个lenght属性用在循环语句中。
```

可以将NodeList转换成一个数组： 

```javascript
function convertToArray(nodes) {
    let arr=null;
    try {
        arr=Array.prototype.slice.call(nodes,0);
    } catch (e) {
        arr=new Array();
        for (let i=0,len=nodes.length;i<len;i++){
            arr.push(nodes[i]);
        }
    }
    return arr;
}
```

#### parentNode

每个节点都有一个parentNode属性，该属性指向文档树中的父节点。对于一个节点来说，它的父节点只可能是三种类型：element节点、document节点和documentfragment节点。如果不存在，则返回null 

#### previousSibling

上一个同胞节点 

#### nextSibling

下一个同胞节点 

#### firstChild

第一个子节点===childNodes[0] 

#### lastChild

最后一个子节点===chileNodes[nodes.childNodes.length-1] 

#### ownerDocument

查看当前节点所属的文档节点 

### 方法：

#### hasChildNodes（）

查看当前节点是否存在子节点 

#### appendChild（newNode ）

用于向childNodes节点列表的末尾添加一个节点。返回值就是当前新增的节点 。

```javascript
let add=someNodes.appendChild(newNode);
console.log(add===newNode);
console.log(someNodes.lastChild===newNode)
```

如果传入appendChild（）的节点本身就是节点列表中的某一个时，那么就是将节点从原来的位置移动到最后，因为同一个DOM节点不能出现在文档的多个位置。 

#### insertBefore（newNode，node ）

用于将一个节点插入在参照节点之前，如果newNode本来就是节点列表中的一员，那么此时的作用就是将节点移动到参照节点之前。

返回值就是新插入的节点。

#### replaceChild（newNode，oldNode ）

使用新节点来替换掉旧节点，要替换的节点将从文档树中移除，但是此节点仍然在文档中，只是文档树上已经没有了他的位置。

返回值就是新的替换节点。

#### removeChild（oldNode）

移除一个旧节点。返回值就是被移除的这个节点。 

#### cloneNode（bool）

接收一个布尔值，表示是否进行深复制 

深复制（true）：复制节点及其整个子节点树

浅复制（false）：只复制节点本身

复制后的节点是一个孤儿节点，使用appendChild，insertBefore,replaceChild来将它添加到文档中。

#### normalize（）

在某个节点上调用这个方法，处理节点内部的文本节点。

如果找到空文本节点，则删除它，如果找到相邻的文本节点，则将他们合并为一个文本节点。

## Document类型

### 属性

#### documentElement

指向页面的`<HTML>`标签，等价于document.childNodes[0]，或document.firstChild

#### body

指向`<body>`标签

#### doctype

指向文档类型声明

#### title

指向`<title>`标签

#### url

该属性包含页面完整的URL信息 

```JavaScript
let url = document.URL
url="http://www.wrox.com/wileyCDA"
```

#### domain

该属性包含页面的域名

```javascript
document.domain
//域名就是：“www.wrox.com”
```

#### referrer

该属性保存着连接到当前URL的之前的那个页面的URL。（跳转到此页面的上一个页面的URL）

### 方法

#### getElementById（）

通过 id 属性查找元素节点，只能找到唯一一个 

#### getElementByTagName（）

通过元素标签命长查找元素节点，可以找到许多个，返回的是一个HTMLCollection对象，作为一个动态元素的集合，与NodeList非常相似，可以使用方括号或者item（）来获取。

HTMLCollection还有一个nameItem（）方法，可以通过元素name特征来取得集合中的一些特定的值。

```javascript
let images=document.getElementByTagName("img");
let myImage=images.nameItem("myImage");
//通过  *  号可以获取到全部的元素
let all=document.getElementByTagName("*");
```

#### getElementByName（）

通过name特征来获取元素 

#### getElementByClassName（）

通过类名来获取元素

#### write（）

在文档中写入内容。

write中需要注意对特殊标签的转义，否则有可能会出现意想不到的结果。

document.write（）应该在页面被呈现的过程中输出其中的内容，如果文档结束之后再调用，就会导致输出的内容覆盖原有的内容，并重写了整个页面。

#### writeln（）

在文档中写入内容并换行 

#### open（）/close（）

打开网页输出流和关闭网页输出流。 

#### createElement（"div"）

创建一个元素节点

#### createTextNode（）

创建一个文本节点

#### createDocumentFragment（）

创建一个文档片段

#### createAttribute（）

创建一个特征

### 特殊集合

#### document.anchor

获取到文档中所有带有name特征的`<a>`元素 

#### document.form

获取到文档中所有的`<form>`元素 

#### document.images

获取到文档中所有的`<img>`元素 

#### document.links

获取到文档中所有带href的`<a>`元素 

## Element类型

### 属性

#### tagName

node.tagName输出的就是节点的元素标签名，其中标签名是大写形式的。 

```JavaScript
if(element.tagName==="div"){	//不能这样比较，容易出错
//...
}
if(element.tagName.toLowerCase==="div"){	//这样比较比较准确，适用于任何文档
//...
}
```

#### id

元素唯一标识符 

#### title

元素的附加说明信息 

#### lang

元素的语言代码 

#### dir

元素语言的方向，ltr：左到右，rtl：右到左 

#### className

与元素的class属性对应，即为元素指定的CSS类 

#### attribute

##### 	getNamedItem（Name1 ）

​	返回属性名等于Name1的值。 

##### 	removeNamedItem（Name2 ）

​	移除属性名为Name2的属性。 

##### 	setNamedItem（node）

​	在属性列表中添加一个指定属性名的属性 

##### 	item（pos）

​	返回属性列表中的对应pos位置的属性。 

### 方法

#### getAttribute（）

参数是上面几个属性， 返回的是特征的值，如果特征不存在，那么返回null。参数也可以是自定义的特征。当然，自定义特征需要前面添加一个data-的前缀。

style特征会得到响应css的样式对象文本。

onclick等事件特征会得到相应的代码字符串。

#### setAttribute（）

参数分别是“特征名”和对应的“特征值”。通过此方法设置的特征名统一都会采用小写的形式。

因为所有特征都是属性，多以直接给属性赋值可以设置特征的值。

#### removeAttribute（）

彻底删除一个元素的指定特征。 

#### 自定义Attribute

## Text文本类型

### 属性

#### length

返回文本节点的长度

### 方法

#### appendData（text）

将text添加到文本节点末尾 

#### deleteData（offset，count ）

删除congoffset位置开始的后面count个文本 

#### insertData（offset，text ）

将text添加到指定offset位置 

#### replaceData（offset，count，text ）

将text的内容替换掉从offset开始后的count个文本 

#### splitText（offset ）

从指定位置offset 切割文本，返回后半截文本。 

#### substringData（offset，count ）

提取从offset到offset+count的文本。 

#### normalize（）

在一个包含两个或多个文本节点的父元素上调用此方法，用以将所有文本节点合成一个节点。 

## Comment类型

拥有除splitText（）之外的所有字符串操作方法。

## **DocumentFragment类型**

在所有节点类型中，只有DocumentFragment在文档中没有对应的标记。DOM规定文档片段是一种“轻量级”的文档，可以包含和控制节点，但不会像完整文档那样占用额外的资源。

nodeType：11

nodeName：#document-fragment

nodeValue：null

parentNode：null

虽然不能把文档片段直接添加到文档中，但是可以将它作为一个仓库来使用，即可以在里面保存将来可能会添加到文档的节点。要创建文档节点，使用document.createDocumentFragment（）方法：

```JavaScript
let fragment=document.createDocumentFragment();
```

文档片段继承了Node的所有方法，通常用于执行针对文档的DOM操作。如果将文档中的节点添加到文档片段中，就会从文档树中移除该节点，也不会从浏览器中在看到该节点。添加文档片段中的新节点同样不属于文档树。可以通过appendChild（）或insertBefore（）将文档片段中的内容添加到文档中。在将文档片段作为参数传递给这两个方法的时候，时间上只会把文档片段内的所有子节点添加到相应的位置，文档片段永远不会成为文档树的一部分。这样可以**避免浏览器过多的重流与重绘**。

ul下添加30个li标签

``` JavaScript
let ul=document.getElementById("myList");
let li=null;
console.time(1)
for (let i=0;i<300;i++){
    li=document.createElement("li");
    li.appendChild(document.createTextNode("item"+(i+1)));
    ul.appendChild(li);
}
console.timeEnd(1);//13ms
```

使用DocumentFragment

```JavaScript
let fragment=document.createDocumentFragment();
let ul=document.getElementById("myList");
let li=null;
console.time(1)
for (let i=0;i<300;i++){
    li=document.createElement("li");
    li.appendChild(document.createTextNode("item"+(i+1)));
    fragment.appendChild(li);
}
ul.appendChild(fragment);
console.timeEnd(1);//4ms
```

通过上面的例子可以看出，我们使用fragment先将所有子节点放在一个仓库里，然后调用一次appendChild就将所有子节点添加到了文档，同时文档片段里面的所有子节点都被删除了。极大提高了浏览器性能。

## Attr类型

### 属性

#### name

特征名称

#### value

特征的值 

#### specified

一个布尔值，用以区别特性是在代码中指定的还是默认的

### 方法

#### setAttributeNode（）

将新创建的特性添加到元素中

#### attributes

返回对应特性的Attr节点

#### getAttributeNode（）

返回对应特性的Attr节点

#### getAttribute（）

只返回特征的值

#### removeAttribute（）

移除某个特征

## 操作表格

这个自行查阅API



















































