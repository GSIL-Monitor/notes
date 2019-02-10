[TOC]

------

## 事件流

事件流描述的是从页面中接收事件的顺序，其中IE提出的是事件冒泡流，Netscape提出的是事件捕获流。

### 事件冒泡流

即事件由最具体的节点接收，从而传递到最不具体的节点，简单来说就是子节点向父节点传递的这个方向。

### 事件捕获流

事件捕获流就是从最不具体的节点传递到最具体的节点，其意义在于在事件到达预定目标之前捕获它。简单来说就是从父节点到字节点的传递方向。

### DOM事件流

DOM2级事件规定事件流包含三个阶段：事件捕获阶段、处于目标节点和事件冒泡阶段。

其具体体现为：文档节点 -> 目标节点 -> 文档节点

## 事件处理程序

事件就是用户或浏览器自身执行的某种动作。如click，load，mouseover等都是事件名称，而响应某个事件的**函数就叫做事件处理程序**。JS中的事件处理程序的名称都以“on”开头。

### HTML事件处理程序（行内事件）

每个元素都可以添加一些事件处理程序，在HTML元素内部使用on+XXX事件名的方式实现事件处理程序的调用。

```html
<script>
    function click() {
        console.log("clicked")
    }
</script>
<input type="button" value="Click Me" onclick="click()">
```

但是此方法也有缺点，就是HTML与Javascript代码紧密耦合，如果更换事件处理程序，就要改动两个地方：HTML代码和Javascript代码。

### DOM0级事件处理程序

取得一个节点的对象，然后为这个对象添加一个事件处理程序属性。

```html
<div id="div">
    click me
</div>
<script>
    let div=document.getElementById("div");
    div.onclick=function () {
        console.log("clicked");
    }
</script>
```

### DOM2级事件处理程序

DOM2级事件定义了两个方法，分别使用来处理绑定和移除事件处理程序的操作：addEventListener（）和removeEventListener（）。这两个方法接收三个参数：要处理的事件名，事件处理程序的函数，一个决定事件流方向布尔值（true：捕获阶段调用事件处理程序，false：冒泡阶段调用事件处理程序）。

```html
<div id="div">
    click me
</div>
<script>
    let div=document.getElementById("div");
    div.addEventListener("click",function () {
        console.log("clicked");
    },false);
    div.removeEventListener('click',function () {
        console.log("canceled");
    },false)
</script>
```

上述就是DOM2级事件处理程序的用法，但是这里的使用其实并不准确，通过addEventListener（）添加的事件处理程序的确只能使用removeEventListener（）来取消，因此要求添加和移除的事件处理程序是相同的一个，因此无法移除addEventListener（）添加的匿名事件处理程序。

```html
<div id="div">
    click me
</div>
<script>
    let div=document.getElementById("div");
    let click=function(){
        console.log("clicked")
    }
    div.addEventListener("click",clcik,false);
    div.removeEventListener('click',clcik,false)
</script>
```

### IE事件处理函数

IE实现了与DOM类似的两个方法：attachEvent（）和detachEvent（），这两个方法接收两个参数：事件处理程序名称和事件处理程序函数，同时也表示着两个方法都只能被添加到冒泡阶段。

> 注意：这两个方法的事件处理程序名称相比于DOM2级的要多一个“on”的前缀。同时移除事件也不能使用匿名函数的方式。

```html
<div id="div">
    click me
</div>
<script>
    let div=document.getElementById("div");
    let click=function(){
        console.log("clicked")
    }
    div.attachEvent("onclick",click);
    div.detachEvent("onclick",click);
</script>
```

### 封装事件处理方法

由于标准的DOM2级事件处理与IE的事件处理方式不相同，所以将其整合在一起称为一个特定的事件处理函数。

```Javascript
var EvantUtil={
    addHandler:function (element,type,handler) {
        if(element.addEventListener){
            element.addEventListener(type,handler,false);
        }else if(element.attachEvent){
            element.attachEvent("on"+type,handler);
        }else{
            element["on"+type]=handler;
        }
    },
    removeHandler:function (element,type,handler) {
        if(element.removeEventListener){
            element.removeEventListener(type,handler,false);
        }else if(element.datachEvent){
            element.datachEvent("on"+type,handler);
        }else{
            element["on"+type]=null;
        }
    }
}
```

上面已经将函数方法封装好了，接下来进行使用：

```javascript
let div=document.getElementById("div");
let click=function(){
    console.log("clicked")
}
div.addHandler(div,"click",click)
div.removeHandler(div,"click",click)
```



## 事件对象

### DOM中的事件对象

在触发DOM上的某个事件时，都会产生一个事件对象event，这个对象包含着所有与事件相关的信息。包括导致事件的元素、事件的类型以及其他与特定事件相关的信息。 

```javascript
let btn=document.getElementById("btn");
btn.addEventListener("click",function (event) {
    console.log(event);
},false)
```

event对象的相关属性和方法

| 属性/方法                | 类型         | 说明                                                         |
| ------------------------ | ------------ | ------------------------------------------------------------ |
| bubbles                  | boolean      | 表明事件是否冒泡                                             |
| cancelable               | boolean      | 表明是否可以取消事件的默认行为                             |
| currentTarget            | Element      | 事件处理程序当前正在作用的那个元素                           |
| defaultPrevented         | boolean      | 为true时表明已经调用了preventDefault（）                     |
| detail                   | Integer      | 与事件相关的细节信息                                         |
| eventPhase               | Integer      | 调用事件处理程序的阶段:1.捕获；2.目标；3.冒泡                |
| preventDefault           | Function     | 取消事件默认行为                                             |
| stopImmediatePropagation | Function     | 取消事件的进一步捕获或冒泡，同时阻止任何事件处理程序被处理   |
| stopPropagation          | Function     | 取消事件的进一步捕获或冒泡，如果bubbles为true，则可以使用这个方法 |
| target                   | Element      | 事件的目标                                                   |
| trusted                  | boolean      | 为true表示事件是浏览器生成的，false表示是开发人员创建的      |
| type                     | string       | 被触发事件的类型                                             |
| view                     | abstractView | 与事件关联的抽象视图。等同于发生事件的window对象             |

#### currentTarget与target的区别

在事件处理程序内部，对象this始终与currentTarget的值相等，而target则只包含事件实际的目标。

事件处理程序指向了目标元素，则this，currentTarget和target包含相同的值。

```javascript
let btn=document.getElementById("btn");
btn.onclick=function (ev) {
    console.log(this);  //  <button>
    console.log(ev.currentTarget===this);   //true
    console.log(ev.target===this);//    true
}
```

如果事件处理程序指向的是目标元素的父节点，则target与另外两个就不相同了

```Javascript
let btn=document.getElementById("btn");
document.body.onclick=function (ev) {
    console.log(this);  //  <body>
    console.log(ev.currentTarget===document.body); //true
    console.log(ev.currentTarget===this);   //true
    console.log(ev.target===this);  //false
    console.log(ev.target===btn);   //true
}
```

#### preventDefault（）方法与cancelable属性

preventDefault用于阻止事件的默认行为，但是只有cancelable属性设置为true的事件，才可以使用preventDefault（）来取消其默认行为。

```Javascript
let btn=document.getElementById("btn");
btn.onclick=function (ev) {
    console.log(ev.cancelable);//   默认为true
    ev.preventDefault();
}
```

#### stopPropagation（）方法与bubbles属性

stopProgation（）方法用来取消事件的进一步捕获或冒泡，但是只有bubbles为true的时候才可以使用

```Javascript
let btn=document.getElementById("btn");
btn.onclick=function (ev) {
    console.log(ev.bubbles);//   默认为true
    ev.stopPropagation();// 设置了就不会出发body事件
};
document.body.onclick=function () {
    alert("body");
}
```

#### eventPhase

eventPhase用来确定当前事件处于哪个阶段，捕获阶段则为1，目标阶段则为2，冒泡阶段则为3。

```Javascript
let btn=document.getElementById("btn");
btn.onclick=function (ev) {
    console.log(ev.eventPhase);//2
};
document.body.addEventListener('click',function (ev) {
    console.log(ev.eventPhase);//1
},true);//true表示捕获阶段
document.body.onclick=function (ev) {
    console.log(ev.eventPhase);//3
}
```

### IE中的事件对象

在使用DOM0级方法添加事件处理程序，event对象作为window对象的一个属性的存在。 如果使用的是HTML事件对象，还可以使用一个名叫event的变量来访问。

```html
<input type="button" value="click" onclick="alert(event.type)">
```

IE的event对象也包含有他的相关属性和方法

| 属性/方法    | 类型    | 说明                                                      |
| ------------ | ------- | --------------------------------------------------------- |
| cancelBubble | boolean | 默认值为false，但将其设置为true就可以取消事件冒泡         |
| returnValue  | boolean | 默认值为true，但是将其设置为false就可以取消事件的默认行为 |
| srcElement   | Element | 事件的目标（与DOM中的target属性想用）                     |
| type         | string  | 被触发的事件的类型                                        |

### 跨浏览器事件对象

```Javascript
var EventUtil={
    //添加事件监听
    addHandler:function (element,type,handler) {
        if(element.addEventListener){
            element.addEventListener(type,handler,false);
        }else if(element.attachEvent){
            element.attachEvent("on"+type,handler);
        }else{
            element["on"+type]=handler;
        }
    },
    //移除事件监听
    removeHandler:function (element,type,handler) {
        if(element.removeEventListener){
            element.removeEventListener(type,handler,false);
        }else if(element.datachEvent){
            element.datachEvent("on"+type,handler);
        }else{
            element["on"+type]=null;
        }
    }
    //返回ev对象的引用
    getEvent:function (ev) {
        return ev?ev:window.event;
    },
    //返回事件的目标
    getTarget:function (ev) {
        return ev.target||ev.srcElement;
    },
    //取消事件的默认行为
    preventDefault:function (ev) {
        if(ev.preventDefault){
            ev.preventDefault();
        }else{
            ev.returnValue=false;
        }
    },
    //阻止默认的事件流
    stopPropagation:function (ev) {
        if(ev.stopPropagation){
            ev.stopPropagation();
        }else{
            ev.cancleBubble=true;
        }
    }，
    //获取相关元素
    getRelatedTarget:function (ev) {
        if (ev.relatedTarget){
            return ev.relatedTarget;
        } else if (ev.toElement){
            return ev.toElement;
        } else if (ev.fromElement){
            return ev.fromElement;
        } else {
            return null;
        }
    }
}
```

## 事件类型

### UI事件

当用户与页面上的元素交互时触发。

确定浏览器是否支持DOM3级事件

```javascript
var www=document.implementation.hasFeature("UIEvent","3.0")；

console.log(www);//true
```

#### load

当页面完全加载后在window上面触发，当所有框架都加载完毕时在框架集上面触发，当图像加载完时在img元素上面触发。

确定页面加载完毕

```javascript
window.onload
```

确定图片加载完毕

```html
<img src="" alt="" onload="">
```

确定动态加载的javascript文件是否加载完毕

```javascript
var script=document.createElement("script");
EventUtil.addHandler(script,"load",function (event) {
    alert("loaded")
})
```

确定样式表是否加载完毕

```javascript
var link=document.createElement("link");
link.type="text/css";
link.rel="stylesheet";
EventUtil.addHandler(link,"load",function (event) {
    alert("css loaded")
})
```

#### unload

当页面完全卸载时在window上面触发，当所有框架都卸载后在框架集上面触发。

这个事件在文档完全被卸载时触发。只要用户从一个页面切换到另外一个页面也会触发，利用这个事件最多的就是：清除引用，避免内存泄漏。

页面卸载

```javascript
EventUtil.addHandler(window,"unload",function (event) {
    alert("unloaded");
})
```

#### abort

当用户停止下载过程时，如果嵌套的内容没有加载完，则在object元素上触发。



#### error

当发生javascript错误时在window上触发，当无法记载图片时在img元素上面触发，当无法加载嵌套内容时在object元素上触发。

#### select

当用户选择文本框（input或textarea）中的一个或多个字符时触发

**resize**(function () {    let showCount=0;    EventUtil.addHandler(window,"load",function () {        alert("Load fired");    });    EventUtil.addHandler(window,"pageshow",function (event) {        showCount++;        alert(showCount+" times"+event.persisted);    })})()****

当窗口或框架的大小变化时在window或则框架上触发。

```javascript
EventUtil.addHandler(window,"resize",function (event) {
    alert("resized");
})
```

关于何时会触发resize事件，不同浏览器有不同的机制，IE、Safari、Chrome和Opera会在浏览器变化了1像素时就触发resize事件，然后随着变化不断重复触发，FireFox只会在浏览器停止调整窗口时才会触发resize事件。由于这个差别，所以在resize事件里面最好不要添加太多的内容代码，而且FireFox比其他浏览器更加节省性能。

#### scroll

当用户滚动带滚动条的元素内容时，在该元素上触发，他实际表示的是页面中相应元素的变化。在混杂模式下，可以通过body元素的scrollLeft和scrollTop来监控到这一变化；而在标准模式下，所有浏览器都会通过html元素来反映这一变化。

```javascript
EventUtil.addHandler(window,"scroll",function (event) {
    if (document.compatMode==="CSS1Compat"){
        alert(document.documentElement.scrollTop);
    } else {
        alert(document.body.scrollTop);
    }
})
```

与resize事件类似，在浏览器滚动期间重复被触发，所以有必要让事件处理程序更简单些。

### 焦点事件

焦点事件会在页面元素获得或失去焦点时触发。

#### blur

在元素失去焦点时触发。这个事件不会冒泡，所有浏览器都支持。

#### focus

在元素获得焦点时触发。但是这个事件不冒泡，所有浏览器都支持。

#### focusin

在元素获得焦点时触发。与HTML事件focus等价，冒泡。

#### focusout

在元素失去焦点时触发。这个事件是HTML事件blur的通用版本。

### 鼠标事件/滚轮事件

#### click

用户单击鼠标左键或者按下enter键时触发

#### dblclick

用户双击鼠标左键时触发

#### mousedown

在用户按下了任意鼠标按钮时触发

#### mouseenter

在鼠标光标从元素外部首次移动到元素范围内时触发，这个事件不冒泡，而且在光标移动到后代元素不会触发。

#### mouseleave

在位于元素上方的鼠标光标移动到元素范围之外时触发

#### mousemove

当鼠标在元素内部移动时重复不断触发

#### mouseout

在鼠标指针位于一个元素上方，然后用户将其移入到另一个元素时触发。

#### mouseover

在鼠标指针位于一个元素外部时，然后用户将其首次移入到另一个元素边界之内时触发

#### mouseup

用户释放鼠标按钮时触发。

#### 鼠标单击与双击事件执行顺序

mousedown—>mouseup—>click—>mousedown—>mouseup—>dblclick

只有在同一个元素上相继触发mousedown和mouseup事件，才会触发click事件

#### 客户区坐标位置clientX/clientY

鼠标事件客户端的坐标信息，即点击目标元素时的鼠标相对于整个浏览器视口的坐标（没有滚动效果坐标）。

```javascript
var btn=document.getElementById("btn");
var div=document.getElementById("div");
EventUtil.addHandler(btn,"click",function (event) {
    event=EventUtil.getEvent(event);
    console.log(event.clientX,event.clientY);
});
EventUtil.addHandler(div,"click",function (event) {
    event=EventUtil.getEvent(event);
    console.log(event.clientX,event.clientY);
})
```

#### 页面坐标位置pageX/pageY

这个事件告诉你鼠标是在页面的什么位置发生的，坐标是从页面本身开始，而非视口的左边和顶部计算的（要计算滚动效果对坐标的影响）。

```javascript
var div=document.getElementById("div");
EventUtil.addHandler(div,"click",function (event) {
    event=EventUtil.getEvent(event);
    var pageX=event.pageX;
    var pageY=event.pageY;
    if (pageX===undefined){
        pageX=event.clientX+(document.body.scrollLeft||document.documentElement.scrollLeft);
    }
    if (pageY===undefined){
        pageY=event.clientY+(document.body.scrollTop||document.documentElement.scrollTop);
    }
    console.log(pageX,pageY);
})
```

#### 屏幕坐标位置screenX/screenY

确定鼠标位置在相对于整个屏幕的坐标信息

```javascript
var div=document.getElementById("div");
EventUtil.addHandler(div,"click",function (event) {
    event=EventUtil.getEvent(event);
    console.log(event.screenX,event.screenY);
})
```

#### 键盘控制的鼠标事件

DOM规定了4个属性，表示这些修改键的状态：shiftKey，ctrlKey，altKey与metaKey，如果在鼠标事件出发的时候，相应的键被被按下了，就会触发特殊事件。

```javascript
var div=document.getElementById("div");
EventUtil.addHandler(div,"click",function (event) {
    event=EventUtil.getEvent(event);
    if (event.shiftKey){
        console.log("shift+mouse");
    }
    else if (event.ctrlKey){
        console.log("ctrl+mouse");
    }
    else if (event.altKey){
        console.log("alt+mouse");
    }
    else if (event.metaKey){
        console.log("meta+mouse");
    }
    else {
        console.log("normal+mouse");
    }
})
```

#### 相关元素

某一个鼠标事件有可能会出发到两个事件。比如焦点转移，对于获取焦点事件：得到焦点的元素是主元素，失去焦点的元素是相关元素；对于失去焦点事件：失去焦点的元素是主元素，得到焦点的元素是相关元素。

DOM通过event对象的relatedTarget属性提供了相关元素的信息。

```javascript
var div=document.getElementById("div");
EventUtil.addHandler(div,"mouseout",function (event) {
    event=EventUtil.getEvent(event);
    var target=EventUtil.getTarget(event);
    var related=EventUtil.getRelatedTarget(event);
    console.log(target+" to "+related);
})
```

#### 鼠标按钮

由鼠标按钮的不同组合，会有不同的事件被触发。

0：表示没有按下按钮

1：表示按下了主鼠标按钮

2：表示按下了次鼠标按钮

3：表示同时按下了主，次鼠标按钮

4：表示按下了中间的鼠标按钮

5：同时按下了主鼠标按钮和中间按钮

6：表示同时按下了次鼠标按钮和中间按钮

7：表示同时按下了三个鼠标按钮

使用方式是event.button的方式获取。

#### 鼠标滚轮事件

IE的mousewheel事件与FireFox的DOMMouseScroll事件，但是前者的单位是120的倍数，而后者的单位是3的倍数，如果需要使用，则将其乘以40以保证两者的基本单位相同。

### 文本事件/键盘事件

键盘事件事件包括三个事件，分别如下：

keydown：当用户按下键盘上的**任意键**时触发，如果按住不放的话，会不断触发。

keypress：当用户按下键盘上的**任意字符键**时触发，如果按住不放的话，会不断地触发

keyup：当用户释放键盘上的键时触发

只有一个文本事件，就是：textInput

textInput：这是对keypress的补充，用意是将本文显示给用户之前更容易拦截文本。在文本插入文本框之前触发textInput。

按下字符键：keydown—>keypress—>keyup

按下非字符键：keydown—>keyup



#### 键码

在按下一个键之后，产生的event对象会包含一个keyCode属性，这是一个数字代码，与键盘上的特定的键一一对应。

#### 字符编码

按下键盘可以用来插入或者删除字符，此时会触发keypress事件，而keypress会产生一个event对象，且此对象内部存在一个charCode属性，用来返回按下的键的字符形式。

#### DOM3级变化

使用key属性，用来代替keyCode属性

- 如果按下字符，key表示不区分大小写情况的字符（k或者K）
- 按下非字符，则直接输出相应键的名。

使用char属性，用来代替keyChar属性

- 如果按下字符，char与key的作用相同
- 按下非字符，输出null

新增了一个keyIdentifier属性，用来返回一个格式类似于“U+0000”的字符串，表示Unicode值。

新增了一个location属性，用来确定点击的键是在键盘的那个区域：0默认键盘，1表示左侧的位置，如左alt，2表示右侧位置，3表示数字小键盘，4表示移动设备键盘，5表示手柄

新增一个getModifierState（）方法，接受一个参数，即等于shift，Control，等的字符串，表示要修改的键，如果要修改的键是活动的（也就是处于被按下状态），这个方法就返回true，否则返回false。

#### textInput事件

这个事件用于在文本域内输入文本时触发，这个事件与keypress有一些区别，任何可以获得焦点的元素都可以触发keypress事件，而只有可编辑区域才可以出发textInput事件。而且textInput只会在按下字符键才会触发其他键都不会出发。

#### inputMethod事件

此事件用来表示文本框内的内容是如何输入的。

- 0，浏览器不确定怎么输入的
- 1，键盘输入
- 2，粘贴
- 3，拖放
- 4，使用IME输入的
- 5，通过表单选择某一项输入的
- 6，手写输入的
- 7，语音输入的
- 8，几种方法组合输入的
- 9，通过脚本输入的



### 合成（复合）事件

DOM3级新增的一类事件，用于处理IME的输入序列。IME（Input Method Editor，输入法编辑器）

有三种复合事件：

compositionstart：在IME的文本复合系统打开时触发，表示开始要输入了。

compositionupdate：在向输入字段中插入新字符时触发。

compositionend：在IME的文本复合系统关闭时触发，表示返回正常键盘输入状态

使用event事件的data属性来获取值。evnet.data



### DOM变动事件

变动事件主要是为了给HTML DOM设计的。

- DOMSubtreeModified：在DOM结构中发生任何变化时触发。这个事件在其他事件发生后都会发生。
- DOMNodeInserted：在一个节点作为子节点被插入到另一个节点中时触发。
- DOMNodeRemoved：在节点从其父节点中被移除时触发。

- DOMNodeInsertedIntoDocument：在一个节点被直接插入文档或通过子树间接插入文档之后触发。在DOMNodeInserted之后触发。
- DOMNodeRemovedFromDocument：在一个节点被直接从文档中移除或者通过子树间接从文档中移除之前触发。这是事件在DOMNodeRemoved之后触发。
- DOMAttrModified：在特征被修改之后触发。
- DOMCharacterDataModified：在文本节点的值发生变化时触发。

#### 删除节点

	在使用DOM API中的removeChild或者replaceChild从DOM中删除节点时，首先会触发DOMNdeRemoved事件。此时事件的目标event.target是被删除的节点，event.relatedNode属性中包含着对目标节点父节点的引用。

	在这个事件被触发时，节点尚未从其父节点上删除，因此parentNode属性依然包含着对父节点的引用。这个事件会冒泡，因此可以在任何比目标节点层次高的层次上处理它。

	如果被移除的节点包含子节点，那么在其所有子节点以及这个被移除的节点上会相继触发DOMNodeRemovedFromDocument事件，这个事件不会冒泡，所以只有直接指定给其中一个子节点。

	随后发生的是DOMSubtreeModified事件。这个事件的目标是被移除的父节点。

```html
<body>
<ul id="myList">
    <li>item1</li>
    <li>Item2</li>
    <li>Item3</li>
</ul>
<script>
var EventUtil={
    //添加事件监听
    addHandler:function (element,type,handler) {
        if(element.addEventListener){
            element.addEventListener(type,handler,false);
        }else if(element.attachEvent){
            element.attachEvent("on"+type,handler);
        }else{
            element["on"+type]=handler;
        }
    },
    removeHandler:function (element,type,handler) {
        if(element.removeEventListener){
            element.removeEventListener(type,handler,false);
        }else if(element.datachEvent){
            element.datachEvent("on"+type,handler);
        }else{
            element["on"+type]=null;
        }
    },
    //返回ev对象的引用
    getEvent:function (ev) {
        return ev?ev:window.event;
    },
    //返回事件的目标
    getTarget:function (ev) {
        return ev.target||ev.srcElement;
    },
    //取消事件的默认行为
    preventDefault:function (ev) {
        if(ev.preventDefault){
            ev.preventDefault();
        }else{
            ev.returnValue=false;
        }
    },
    //阻止默认的事件流
    stopPropagation:function (ev) {
        if(ev.stopPropagation){
            ev.stopPropagation();
        }else{
            ev.cancleBubble=true;
        }
    },
    //获取相关元素
    getRelatedTarget:function (ev) {
        if (ev.relatedTarget){
            return ev.relatedTarget;
        } else if (ev.toElement){
            return ev.toElement;
        } else if (ev.fromElement){
            return ev.fromElement;
        } else {
            return null;
        }
    }
};
EventUtil.addHandler(window,'load',function (event) {
    var list=document.getElementById("myList");
    EventUtil.addHandler(document,'DOMSubtreeModified',function (event) {
        console.log(event.type);
        console.log(event.target);
        console.log(event.relatedNode);
    })
    EventUtil.addHandler(document,'DOMNodeRemoved',function (event) {
        console.log(event.type);
        console.log(event.target);
        console.log(event.relatedNode);
    })
    EventUtil.addHandler(list.firstChild,'DOMNodeRemovedFromDocument',function (event) {
        console.log(event.type);
        console.log(event.target);
        console.log(event.relatedNode);
    })
    list.parentNode.removeChild(list);
})
</script>
</body>
```

首先执行`list.parentNode.removeChild(list);`，将ul从body上面移除，事件的触发顺序依次是：

1. 在ul上触发DOMNodeRemoved事件。relatedNode属性等于body
2. 在ul上触发DOMNodeRemovedFromDocument事件。
3. 在身为ul元素子节点的每个li元素及文本节点上触发DOMNodeRemovedFromDocument事件。
4. 在body上触发DOMSubtreeModified事件，因为ul元素是document.body的直接子元素

![](C:\Users\DELL\Pictures\DOM变动事件1.png)

#### 插入节点

在使用appendChild，replaceChild，insertBefore向DOM中插入节点时，首先或触发DOMNodeInserted事件，事件目标是被插入的节点，realatedNode包含一个对父元素的引用。这个事件被触发时，节点已经被插入到新的父节点中，这个事件是冒泡的，可以在DOM的各个层次操作他。

紧接着，会在新插入的节点上面触发DOMNodeInsertedIntoDocument事件，这个事件不冒泡，因此必须在插入节点之前为她添加这个事件处理程序，最后再触发DOMSubtreeModified事件，触发于新插入节点的父节点。

```html
<body>
<ul id="myList">
    <li>item1</li>
    <li>Item2</li>
    <li>Item3</li>
</ul>
<script>
var EventUtil={
    //添加事件监听
    addHandler:function (element,type,handler) {
        if(element.addEventListener){
            element.addEventListener(type,handler,false);
        }else if(element.attachEvent){
            element.attachEvent("on"+type,handler);
        }else{
            element["on"+type]=handler;
        }
    },
    removeHandler:function (element,type,handler) {
        if(element.removeEventListener){
            element.removeEventListener(type,handler,false);
        }else if(element.datachEvent){
            element.datachEvent("on"+type,handler);
        }else{
            element["on"+type]=null;
        }
    },
    //返回ev对象的引用
    getEvent:function (ev) {
        return ev?ev:window.event;
    },
    //返回事件的目标
    getTarget:function (ev) {
        return ev.target||ev.srcElement;
    },
    //取消事件的默认行为
    preventDefault:function (ev) {
        if(ev.preventDefault){
            ev.preventDefault();
        }else{
            ev.returnValue=false;
        }
    },
    //阻止默认的事件流
    stopPropagation:function (ev) {
        if(ev.stopPropagation){
            ev.stopPropagation();
        }else{
            ev.cancleBubble=true;
        }
    },
    //获取相关元素
    getRelatedTarget:function (ev) {
        if (ev.relatedTarget){
            return ev.relatedTarget;
        } else if (ev.toElement){
            return ev.toElement;
        } else if (ev.fromElement){
            return ev.fromElement;
        } else {
            return null;
        }
    }
};
EventUtil.addHandler(window,'load',function (event) {
    var list=document.getElementById("myList");
    var item=document.createElement("li");
    item.appendChild(document.createTextNode("Item4"));
    EventUtil.addHandler(document,'DOMSubtreeModified',function (event) {
        console.log(event.type);
        console.log(event.target);
        console.log(event.relatedNode);
    })
    EventUtil.addHandler(document,'DOMNodeInserted',function (event) {
        console.log(event.type);
        console.log(event.target);
        console.log(event.relatedNode);
    })
    EventUtil.addHandler(item,'DOMNodeInsertedIntoDocument',function (event) {
        console.log(event.type);
        console.log(event.target);
        console.log(event.relatedNode);
    })
    list.appendChild(item);
})
</script>
</body>
```

![](C:\Users\DELL\Pictures\DOM变动事件2.png)

### HTML5事件

#### contextmenu事件

用以表示何时应该显示上下文菜单，以便开发人员取消默认的上下文菜单而提供自定义的菜单。

由于contextmenu事件是冒泡的，因此可以为document指定一个事件处理程序，用以处理发生的所有此类事件。这个事件的目标是发生用户操作的元素，在所有浏览器中都可以取消这个事件，在兼容DOM浏览器中：event.preventDefault；在IE中华，将event.returnValue的值设置为false。因为contextmenu事件属于鼠标事件，所以其事件对象中还包含了与光标位置的所有属性。

```html
<body>
<div id="myDiv">click "myList" style="position: absolute;visibility: hidden;ba</div>
<ul id="myList" style="position: absolute;visibility: hidden;background-color: silver">
    <li>item1</li>
    <li>Item2</li>
    <li>Item3</li>
</ul>
<script>
var EventUtil={
    //添加事件监听
    addHandler:function (element,type,handler) {
        if(element.addEventListener){
            element.addEventListener(type,handler,false);
        }else if(element.attachEvent){
            element.attachEvent("on"+type,handler);
        }else{
            element["on"+type]=handler;
        }
    },
    removeHandler:function (element,type,handler) {
        if(element.removeEventListener){
            element.removeEventListener(type,handler,false);
        }else if(element.datachEvent){
            element.datachEvent("on"+type,handler);
        }else{
            element["on"+type]=null;
        }
    },
    //返回ev对象的引用
    getEvent:function (ev) {
        return ev?ev:window.event;
    },
    //返回事件的目标
    getTarget:function (ev) {
        return ev.target||ev.srcElement;
    },
    //取消事件的默认行为
    preventDefault:function (ev) {
        if(ev.preventDefault){
            ev.preventDefault();
        }else{
            ev.returnValue=false;
        }
    },
    //阻止默认的事件流
    stopPropagation:function (ev) {
        if(ev.stopPropagation){
            ev.stopPropagation();
        }else{
            ev.cancleBubble=true;
        }
    },
    //获取相关元素
    getRelatedTarget:function (ev) {
        if (ev.relatedTarget){
            return ev.relatedTarget;
        } else if (ev.toElement){
            return ev.toElement;
        } else if (ev.fromElement){
            return ev.fromElement;
        } else {
            return null;
        }
    }
};

EventUtil.addHandler(window,"load",function (ev) {
    let div=document.getElementById("myDiv");
    EventUtil.addHandler(div,"contextmenu",function (ev) {
        ev=EventUtil.getEvent(ev);
        EventUtil.preventDefault(ev);
        let menu=document.getElementById("myList");
        menu.style.left=ev.clientX+"px";
        menu.style.top=ev.clientY+"px";
        console.log(menu.style.left,menu.style.top);
        menu.style.visibility="visible";
    });
    EventUtil.addHandler(document,"click",function (ev) {
        document.getElementById("myList").style.visibility="hidden"
    })
})
</script>
</body>
```

在div上面单击鼠标右键，显示上下文菜单，然后左键点击文档中任意地方，隐藏上下文菜单

#### beforeunload事件

在页面卸载之前触发，主要用于在页面卸载之前阻止这一操作。也就是是否确认关闭。

```javascript
EventUtil.addHandler(window,"beforeunload",function (ev) {
    ev=EventUtil.getEvent(ev);
    let message="1234567890";
    ev.returnValue=message;
    return message;
})
```

#### DOMContentLoaded事件

window的load事件在页面中的一切需要加载的都加载完之后触发，但这个过程可能会因为加载的外部资源过多而花费较多时间。

而DOMContentLoaded事件则是在形成DOM树之后就开始触发，不会理会图片，js文件，css文件或其他资源是否加载完毕。

#### readystatechange事件

这个事件的目的是提供与文档或元素的加载状态有关的信息，但是这个事件的行为有时候也很难预料。支持此事件对象都有一个readyState属性，此属性都有如下5个值：

1. uninintialized（未初始化）：对象存在但未初始化。
2. loading（正在加载）：对象正在加载数据。
3. loaded（加载完毕）：对象数据加载完成。
4. interactive（交互）：可以操作对象了，但还没有完全加载。
5. complete（完成）：对象已经加载完毕。

```javascript
EventUtil.addHandler(document,"readystatechange",function (ev) {
    if (document.readyState==="interactive"){
        console.log("interactive");
    } 
})
```

另外script标签和link标签也会触发此事件。

**pageshow和pagehide事件**

往返缓存（back-forward cache或bfcache），可以在用户使用浏览器的"后退"和"前进"按钮时加快页面的转换速度。这个缓存中不仅保存着页面的数据，还保存了DOM和js的状态；实际上就是将整个页面都保存到了内存中，如果页面存在于bfcache中，打开页面就不会触发load事件。

pageshow，这个在页面显示时触发，无论页面是否来自bfcache。在重新加载的页面中，pageshow会在load事件触发后触发；而对于bfcache中的页面，pageshow会在页面状态完全恢复的那一刻触发。虽然这个事件的目标是document，但是事件处理程序必须添加在window上。

pageshow的事件对象上还包括一个名为persisted的布尔值属性，用来判断页面是否存在bfcache中，如果为true，则存在与bfcache，如果为false，则不存在与bfcache。

```javascript
(function () {
    let showCount=0;
    EventUtil.addHandler(window,"load",function () {
        alert("Load fired");
    });
    EventUtil.addHandler(window,"pageshow",function (event) {
        showCount++;
        alert(showCount+" times"+event.persisted);
    })
})()
```

pagehide与pageshow类似，但是其主要触发在浏览器卸载页面的时候，而且是在unload之前触发，与pageshow一样，在document上触发，但是事件处理程序必须写在window对象上，对于persisted，如果页面卸载后是存放在bfcache中，则为true，否则为false

**hashchange事件**

用于在URL的参数列表发生变化时通知开发人员，主要用于Ajax，开发人员经常使用URL参数列表来保存状态或导航信息。

必须把hashchange事件添加给window对象，然后URL变化时就会调用他。此时的事件对象包含两个属性：oldURL与newURL。这两个属性分别保存着参数列表变化前后的URL。

可以使用location.hash来获取当前的hash参数列表的值。



## 事件内存和性能

### 事件委托

当事件处理程序过多时，可以使用事件委托的方式来解决。事件委托利用了事件冒泡的特性，只需要指定一个事件处理程序，就可以**管理某一类型的所有事件**。

```html
<body>
<ul id="myList">
    <li id="goSomewhere">item1</li>
    <li id="doSomething">Item2</li>
    <li id="sayHi">Item3</li>
</ul>
<script>
var EventUtil={
    //添加事件监听
    addHandler:function (element,type,handler) {
        if(element.addEventListener){
            element.addEventListener(type,handler,false);
        }else if(element.attachEvent){
            element.attachEvent("on"+type,handler);
        }else{
            element["on"+type]=handler;
        }
    },
    removeHandler:function (element,type,handler) {
        if(element.removeEventListener){
            element.removeEventListener(type,handler,false);
        }else if(element.datachEvent){
            element.datachEvent("on"+type,handler);
        }else{
            element["on"+type]=null;
        }
    },
    //返回ev对象的引用
    getEvent:function (ev) {
        return ev?ev:window.event;
    },
    //返回事件的目标
    getTarget:function (ev) {
        return ev.target||ev.srcElement;
    },
    //取消事件的默认行为
    preventDefault:function (ev) {
        if(ev.preventDefault){
            ev.preventDefault();
        }else{
            ev.returnValue=false;
        }
    },
    //阻止默认的事件流
    stopPropagation:function (ev) {
        if(ev.stopPropagation){
            ev.stopPropagation();
        }else{
            ev.cancleBubble=true;
        }
    },
    //获取相关元素
    getRelatedTarget:function (ev) {
        if (ev.relatedTarget){
            return ev.relatedTarget;
        } else if (ev.toElement){
            return ev.toElement;
        } else if (ev.fromElement){
            return ev.fromElement;
        } else {
            return null;
        }
    }
};
var item1=document.getElementById("goSomewhere");
var item2=document.getElementById("doSomething");
var item3=document.getElementById("sayHi");
var list=document.getElementById("myList");
// 非事件委托
EventUtil.addHandler(item1,"click",function (ev) {
    location.href="http://www.wrox.com";
});
EventUtil.addHandler(item2,"click",function (ev) {
    document.title="I changed the document's title "
});
EventUtil.addHandler(item3,"click",function (ev) {
    alert("HI");
});
// 使用事件委托，将事件绑定到ul上
EventUtil.addHandler(list,"click",function (ev) {
    ev=EventUtil.getEvent(ev);
    var target=EventUtil.getTarget(ev);
    switch (target.id) {
        case "doSomething":
            document.title="I changed the document's title ";
            break;
        case "goSomewhere":
            location.href="http://www.wrox.com";
            break;
        case "sayHi":
            alert("HI");
            break;
    }
})
</script>
</body>
```

上面就是事件委托的基本使用，可以明显看出同一类型的元素的事件，可以将其绑定到其父对象上，大大减少了事件处理程序的数量，上面就是由3个事件处理程序变味了1个事件处理程序。

为document添加事件委托的优点：

- document对象很快就可以访问，而且可以在页面生命周期的任何时点上为它添加事件处理程序
- 在页面中设置事件处理程序所需的时间更少
- 整个页面占用的内存空间更少

#### 事件代理

可以在纯javascript编程中使用代理，用来创建对象以及操控目标对象。

```javascript
var delegate = function(client, clientMethod) {
    return function() {
    	return clientMethod.apply(client, arguments);
    }
}

var agentMethod = delegate (client, clientMethod);
agentMethod();
```



### 移除事件处理程序

随着浏览器与javascript之间的交互越来越多，虽然可以使用事件委托的方式极大的减少事件处理程序的数量，是一中很好的处理方式。

这里，将不需要再使用的事件处理程序移除也是一种不错的解决方案。内存中的那些过时不用的事件处理程序，也是导致web应用程序内存与性能问题的主要原因。

#### 通过移除DOM元素时，事件处理程序不会被移除

可以通过移除某个DOM元素，不会移除掉绑定到这个DOM元素上的事件处理程序，同时在此DOM元素上调用类似于`div.onclick=null`形式，移除事件处理程序。

```html
<body>
<div id="myDiv">
    <input type="button" value="Click Me" id="mybtn">
</div>
<script>
    var btn=document.getElementById("mybtn");
    btn.onclick=function (ev) {
        // 这里执行某些操作
        btn.onclick=null;   // 移除事件处理程序
        document.getElementById("myDiv").innerHTML="Processing ...";
    };
</script>
</body>
```

#### 卸载页面时，没有清理干净事件处理程序

如果页面卸载之前，没有清理干净事件处理程序，那他们会滞留在内存中，每次加载完页面再卸载页面的时候（可能是在两个特免间来回切换，也可以是点击“刷新”按钮），内存中滞留的对象数目就会不断地增加，因为事件处理程序占用的内存从来没有释放过。

解决办法是：在页面卸载之前，先通过onunload事件处理程序移除掉所有事件处理程序。（这个时候事件处理委托的优点就体现了出来——需要跟踪的处理程序越少，移除就越容易）

















