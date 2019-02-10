### v-if/v-else/v-else-if/v-show

v-if:是vue 的一个内部指令，指令用在我们的html中，v-if用来判断是否加载html的DOM 。

```html
<div v-if="isLogin">你好：JSPang</div> 
<div v-else="isLogin">你未登录</div> 
var app=new Vue({
	el:'#app',
	data:{
		isLogin:false
	}
})
```

通过使用vue里面定义的isLogin值，来判断是否显示DOM的内容。否则输出v-else的DOM的内容。

还有一个v-else-if的指令，用来判断else if的情况：

```html
<div v-if="type === 'A'">
  A
</div>
<div v-else-if="type === 'B'">
  B
</div>
<div v-else-if="type === 'C'">
  C
</div>
<div v-else>
  Not A/B/C
</div>
```

Vue 会尽可能高效地渲染元素，通常会复用已有元素而不是从头开始渲染（如果DOM结构一样，就只修改数据，不会发生DOM**重流**）。

```HTML
<template v-if="loginType === 'username'">
  <label>Username</label>
  <input placeholder="Enter your username">
</template>
<template v-else>
  <label>Email</label>
  <input placeholder="Enter your email address">
</template>
```

当然，如果不需要默认的复用DOM元素，则需要为两个对应的DOM元素都设置一个key属性，表示这两者完全独立，互不影响，即这两个元素在条件改变时会触发**重流**。

```HTML
<template v-if="loginType === 'username'">
  <label>Username</label>
  <input placeholder="Enter your username" key="username-input">
</template>
<template v-else>
  <label>Email</label>
  <input placeholder="Enter your email address" key="email-input">
</template>
```

v-show：调整css中display属性，DOM已经加载，只是CSS控制没有显示出来。 

v-if与v-show的区别：

相比于if判断是否写入而言，show的意义在于已经渲染（一定会渲染），但是主要用于判断是否**隐藏**。

v-if：判断是否加载DOM，在不需要的时候不加载DOM，可以减少服务器的压力，仅在需要时加载。**（惰性渲染）**

v-show：调整css的display用来表示显示与隐藏，但是无论如何都会加载这个DOM，优点是使客户端操作更加流畅。**（CSS样式切换）**



### v-for

基本实现：

基于源数据多次渲染元素或模板块。此指令之值，必须使用特定语法 `alias in expression` ，为当前遍历的元素提供别名。也可以用 `of` 替代 `in` 作为分隔符，因为它是最接近 JavaScript 迭代器的语法：

```HTML
<li v-for="item in items">{{item}}</li>

var app=new Vue({
	el:'#app',
	data:{
		items:[20,23,18,65,32,19,54,56,41]
	}
})
```

在什么元素中使用v-for指令，就循环某个元素，这里的for循环使用的是for in循环的思路。

如果要对vue传给DOM的数据进行处理，使用vue的computed属性来对数据进行加工，然后将加工后的数据返回给DOM。

![](E:\WebStorm_Dir\articles\images\v-for.png)

compute里面可以使用sort方法，但是必须对sort方法进行加强。

```JavaScript
function sortNumber(a,b) {
    return a-b;
}
/**
 * @description 对array对象，按照key进行排序
 * @param array
 * @param key
 * @returns {*|void}
 */
function sortByKey(array,key) {
    return array.sort(function (a, b) {
        let x=a[key];
        let y=b[key];
        return ((x<y)?-1:((x>y)?1:0));
    })
}
```

**对象的for循环：**

```HTML
<ul id="v-for-object" class="demo">
  <li v-for="value in object">
    {{ value }}
  </li>
</ul>
new Vue({
  el: '#v-for-object',
  data: {
    object: {
      firstName: 'John',
      lastName: 'Doe',
      age: 30
    }
  }
})
```

在遍历对象时，是按 `Object.keys()` 的结果遍历，但是不能保证它的结果在不同的 JavaScript 引擎下是一致的。

当 Vue.js 用 `v-for` 正在更新已渲染过的元素列表时，它默认用“就地复用”策略。如果数据项的顺序被改变，Vue 将不会移动 DOM 元素来匹配数据项的顺序， 而是简单复用此处每个元素，并且确保它在特定索引下显示已被渲染过的每个元素

为了给 Vue 一个提示，以便它能跟踪每个节点的身份，从而重用和重新排序现有元素，你需要为每项提供一个唯一 `key` 属性。理想的 `key` 值是每项都有的且唯一的 id。它的工作方式类似于一个属性，所以你需要用 `v-bind` 来绑定动态值：

```HTML
<div v-for="item in items" :key="item.id">
  <!-- 内容 -->
</div>
```

**建议尽可能在使用 `v-for` 时提供 `key`，除非遍历输出的 DOM 内容非常简单，或者是刻意依赖默认行为以获取性能上的提升。**





### v-text/v-html

我们将数据传输到DOM上使用的是两个大括号的形式

`<span>{{ message }}</span>` 

但是这样有一个弊端，就是DOM加载到这个地方时，还没有给message传递数据，就会有一闪而过的{{message}}，而使用v-text就可以解决这个问题，他只会在获取到数据的时候显示。

双大括号会将数据解释为纯文本，而非HTML。为了输出真正的HTML，你就需要使用v-html 指令。 

需要注意的是：在生产环境中动态渲染HTML是非常危险的，因为容易导致XSS攻击。所以只能在可信的内容上使用v-html，永远不要在用户提交和可操作的网页上使用。 

```html
<div id="app">
    <span>{{message}}</span><!-- 避免加载时闪过{{message}} -->
    ==<span v-text="message"></span>
    <br>
    <span>{{dodo}}</span>
    <span v-html="dodo"></span>
</div>
<script>
    let app=new Vue({
        el:"#app",
        data:{
            message:"hello____world",
            dodo:"<h2>hello____world</h2>"
        }
    })
</script>
```



### v-on

v-on是表示事件绑定的指令，用在普通元素上时，只能监听**原生 DOM 事件**。用在自定义元素组件上时，也可以监听子组件触发的**自定义事件**。在监听原生 DOM 事件时，方法以事件为唯一的参数。如果使用内联语句，语句可以访问一个 `$event` 属性：`v-on:click="handle('ok', $event)"`。

```html
<div id="app">
    本场得分:{{grade}}
    <button v-on:click="sub"> - </button>
    <button @click="add"> + </button>
    <br>
    <input type="text" v-on:keyup.13="onEnter" v-model="grade2">
</div>
```

可以直接在DOM上绑定某个事件方法，而且事件方法写在vue的methods属性当中。

```JavaScript
let app=new Vue({
    el:"#app",
    data:{
        grade:0,
        grade2:1,
    },
    methods:{
        add:function () {
            this.grade++;
        },
        sub:function () {
            this.grade--;
        },
        onEnter:function () {
            this.grade+=parseInt(this.grade2);
        }
    }
})
```

另外，v-on还有一种简写方式

v-on:click=""可以写为@click=""。

```HTML
<!-- 方法处理器 -->
<button v-on:click="doThis"></button>

<!-- 内联语句 -->
<button v-on:click="doThat('hello', $event)"></button>

<!-- 缩写 -->
<button @click="doThis"></button>

<!-- 停止冒泡 -->
<button @click.stop="doThis"></button>

<!-- 阻止默认行为 -->
<button @click.prevent="doThis"></button>

<!-- 阻止默认行为，没有表达式 -->
<form @submit.prevent></form>

<!--  串联修饰符 -->
<button @click.stop.prevent="doThis"></button>

<!-- 键修饰符，键别名 -->
<input @keyup.enter="onEnter">

<!-- 键修饰符，键代码 -->
<input @keyup.13="onEnter">

<!-- 点击回调只会触发一次 -->
<button v-on:click.once="doThis"></button>

<!-- 对象语法 (2.4.0+) -->
<button v-on="{ mousedown: doThis, mouseup: doThat }"></button>
```

事件绑定除了能够绑定鼠标事件以外，也可以绑定键盘事件，并且绑定到指定键码：

`<input type="text" v-on:keyup.enter="onEnter" v-model="secondCount">` 

回车触发事件，以下是一些键码。

![](E:\WebStorm_Dir\articles\images\键码.jpg)

自定义组件上的监听事件：

```HTML
<my-component @my-event="handleThis"></my-component>

<!-- 内联语句 -->
<my-component @my-event="handleThis(123, $event)"></my-component>

<!-- 组件中的原生事件 -->
<my-component @click.native="onClick"></my-component>
```



### v-model

你可以用 `v-model` 指令在表单 `<input>`、`<textarea>` 及 `<select>` 元素上创建双向数据绑定。它会根据控件类型自动选取正确的方法来更新元素。尽管有些神奇，但 `v-model` 本质上不过是语法糖。它负责监听用户的输入事件以更新数据，并对一些极端场景进行一些特殊处理。

`v-model` 会忽略所有表单元素的 `value`、`checked`、`selected` 特性的初始值而总是将 Vue 实例的数据作为数据来源。你应该通过 JavaScript 在组件的 `data` 选项中声明初始值。

```html
<p>正常双向绑定<input type="text" v-model="message"></p>
<script>
    let app=new Vue({
        el:"#app",
        data:{
            message:"  Hello  ",
            isTrue:true,
            webNames:[],
            sex:"男",
        },
    })
</script>
```

然后v-model还有几个相关的修饰符，如.lazy，.number，.trim。lazy的主要目的是懒加载，即去除input标签的change事件，而是监听blur事件，表示输入完成失去焦点时触发。number表示输入字符串转为数组。trim表示去除首尾空格。

```html
<p>正常双向绑定<input type="text" v-model="message"></p>
<p>懒加载数据绑定<input type="text" v-model.lazy="message"></p>
<p>过滤只允许绑定数字<input type="text" v-model.number="message"></p>
<p>删除前后空格<input type="text" v-model.trim="message"></p>
```

v-model还可以将多选框用于数据绑定

绑定一个值：

```html
input type="checkbox" id="isTrue" v-model="isTrue">
<label for="isTrue">{{isTrue}}</label>
```

绑定数组：

```html
<p>
    <input type="checkbox" id="jspang" value="jspang" v-model="webNames">
    <label for="isTrue">jspang</label>
    <input type="checkbox" id="Panda" value="Panda" v-model="webNames">
    <label for="isTrue">Panda</label>
    <input type="checkbox" id="panpan" value="panpan" v-model="webNames">
    <label for="isTrue">panpan</label>
</p>
<p>
    {{webNames}}
</p>
```

单选框的绑定：

```html
<p>
    <input type="radio" id="one" value="男" v-model="sex">
    <label for="one">男</label>
    <input type="radio" id="two" value="女" v-model="sex">
    <label for="two">女</label>
    <p>你选择的性别是：{{sex}}</p>
</p>
```

### v-bind

v-bind是处理HTML中的标签属性的，例如`<div></div>`就是一个标签，`<img>`也是一个标签，我们绑定`<img>`上的src进行动态赋值。 

在html中我们用v-bind:src=”imgSrc”的动态绑定了src的值，这个值是在vue构造器里的data属性中找到的。 

```html
<a v-bind:href="zgqUrl">zgq的文章</a>
<script>
    let app=new Vue({
        el:"#app",
        data:{
            message:"  Hello  ",
            zgqUrl:"https://github.com/zyileven/articles",
            className:"classA",
            isOk:true,
            classA:"classA",
            classB:"classB",
            red:"red",
            size:"24px",
            styleObj:{
                color:'green',
                fontSize:"16px",
            }
        },
    })
</script>
```

v-bind也可以进行缩写，缩写为:src类型。

```HTML
<!-- 绑定一个属性 -->
<img v-bind:src="imageSrc">

<!-- 缩写 -->
<img :src="imageSrc">

<!-- 内联字符串拼接 -->
<img :src="'/path/to/images/' + fileName">

<!-- 绑定一个有属性的对象 -->
<div v-bind="{ id: someProp, 'other-attr': otherProp }"></div>

<!-- 通过 prop 修饰符绑定 DOM 属性 -->
<div v-bind:text-content.prop="text"></div>

<!-- prop 绑定。“prop”必须在 my-component 中声明。-->
<my-component :prop="someThing"></my-component>

<!-- 通过 $props 将父组件的 props 一起传给子组件 -->
<child-component v-bind="$props"></child-component>

<!-- XLink -->
<svg><a :xlink:special="foo"></a></svg>
```

v-bind绑定css样式：

1.直接绑定class样式

```
<div :class="className">直接绑定class</div>
```

2.判断绑定class样式

```html
<div :class="{classA:isOk}">判断绑定class</div>
<div>
<input type="checkbox" v-model="isOk">
</div>
```

3.同时绑定多个样式，多个样式组成的数组

```html
<div :class="[classA,classB]">class中的数组</div>
```

4.三元运算符决定样式

```html
<div :class="isTrue?classA:classB">三元运算符</div>
```

5.直接绑定样式

```html
<div :style="{color:red,fontSize:size}">绑定style</div>
```

6.绑定style对象

```html
<div :style="styleObj">绑定style对象</div>
```



### v-pre

表示此标签内显示的是源码，不会进行渲染

```html
<div v-pre>源码输出：{{message}}</div>
```

输出的内容是：{{message}}

### v-cloak

表示此标签里面的内容在页面完全加载完成时候才会显示

```html
<div v-cloak>渲染完成后才显示</div>
```

### v-once

表示内容只会渲染一次，就算双向绑定也无法修改其内容：

```html
<div v-once>数据永远不变了，只渲染初始的一次：{{message}}</div>
<div v-model="message">双向数据绑定：{{message}}</div>
<input type="text" v-model="message">
```

上述代码改变文本框内容时，第一行文本不会变化，第二行文本会随着文本框的内容同步变化。

























































































































