### 自定义指令

我们可以使用Vue.directive自定义一个指令

```JavaScript
<div id="app">
    <div v-jspang="color">{{num}}</div>
    <p><button @click="add"> ADD+ </button></p>
</div>

Vue.directive("jspang",function (el,binding,vnode) {
    console.log(el);
    console.log(binding);
    // el.style="color="+binding.value
    el.style.color=binding.value
});
```

上述我们创建了一个自定义指令jspang，并且为其添加了改变颜色的功能。

**自定义指令中可以传递三个参数**

el：指令所绑定的元素，可以用来直接操作DOM

binding：一个对象，包含指令的很多信息。

vnode：Vue编译生成的虚拟节点。

**自定义指令的生命周期**

自定义指令有五个生命周期（也叫钩子函数），分别是 bind,inserted,update,componentUpdated,unbind 

```JavaScript
Vue.directive("Jspang",{
    //生命周期
    bind:function (el,binding) {//被绑定
        el.style.color=binding.value;
        console.log("1-bind");
    },
    inserted:function () {//绑定到节点
        console.log("2-inserted");
    },
    update:function () {//组件更新
        console.log("3-update");
    },
    componentUpdated:function () {//组件更新完成
        console.log("4-componentUpdated")
    },
    unbind:function () {//解绑
        console.log("5-unbind")
    }
});
```

1. bind：只调用一次，指令第一次绑定到元素时调用，用这个钩子函数可以定义一个绑定时执行一次的初始化动作。 

2. inserted:被绑定元素插入父节点时调用（父节点存在即可调用，不必存在于document中）。

3. update:被绑定于元素所在的模板更新时调用，而无论绑定值是否变化。通过比较更新前后的绑定值，可以忽略不必要的模板更新。

4. componentUpdated:被绑定元素所在模板完成一次更新周期时调用。

5. unbind:只调用一次，指令与元素解绑时调用。

   在外部id=app的元素外部设置一个按钮，用来解绑app的周期

```html
<p>
    <button onclick="unbind()">解绑</button>
</p>
<script>
    function unbind(){
        app.$destroy();
    }
</script>
```

### Vue.extend

Vue.extend 返回的是一个“扩展实例构造器”,也就是预设了部分选项的Vue实例构造器。经常服务于Vue.component用来**生成组件**，可以简单理解为当在模板中遇到该组件名称作为标签的自定义元素时，会自动调用“扩展实例构造器”来生产组件实例，并挂载到自定义元素上。 

```JavaScript
<author></author>
<div id="author"></div>

let authorExtend=Vue.extend({
    template:"<p><a :href='authorUrl'>{{authorName}}</a></p>",
    data:function () {
        return {
            authorName:"jspang",
            authorUrl:"http://jspang.com"
        }
    }
});
// 通过标签名绑定
new authorExtend().$mount('author');
// 通过id绑定
new authorExtend().$mount('#author');
```

使用Vue.extend可以实现一个扩展实例构造器，然后使用new将其实例化挂载到指定的位置。上述前者挂载到author标签上，后者挂载到id为author的标签上。

其中使用Vue.extend时，可以为其定义模板和数据，注意：这里的数据不是一个简单的对象，而是一个函数返回值对象。

```JavaScript
data:{
    message:"Hello"
}
// 区别
data:function () {
	return {
		authorName:"jspang",
		authorUrl:"http://jspang.com"
	}
}
```

然而，除了内部定义好的数据外，还可以使用外部传进来的数据，即propsData，使用方式如下：

```javascript
let header_a=Vue.extend({
    template:`<p>{{message}}-{{a}}</p>`,
    data:function(){
        return {
            message:"Hello , I'm header ! ",
        }
    },
    props:['a'],
});
// 挂载扩展,命名为header
new header_a({propsData:{a:1}}).$mount("header");
```

这里的new header_a（）创建一个vue对象实例，然后使用propsData的方式接收外部传进来的数据作为 扩展实例构造器 的属性值，内部使用props并且定义a接收，然后用于template。





### Vue.set

set主要用来改变数据的。

外部数据就是不在Vue构造器里里的data处声明，而是在构造器外部声明，然后在data处引用就可以了。外部数据的加入让程序更加灵活，我们可以在外部获取任何想要的数据形式，然后让data引用。 

//在构造器外部声明数据

```JavaScript
var outData={
    count:1,
    goodName:'car'
};

var app=new Vue({
    el:'#app',
    //引用外部数据
    data:outData

})
```

因为定义监听事件使用的是原生的onclick，所以在外部改变数据的三种方法：

``` html
<p><button onClick="add()">add+</button></p>
```

1.用Vue.set改变 

`Vue.set(outData,'count',4);` 

2.用Vue对象的方法添加 

`app.count++;` 

3.直接操作外部数据 

`outData.count++;`

**为什么使用Vue.set**

由于Javascript的限制，Vue不能自动检测以下变动的数组。

*当你利用索引直接设置一个项时，vue不会为我们自动更新。

*当你修改数组的长度时，vue不会为我们自动更新。

```JavaScript
let outData={
    count:1,
    // goods:"car",
    arr:['aaa','bbb','ccc']
}

// 无效的，因为Vue不能自动检测变动的数组
app.arr[2]='ddd';
```

### Vue的生命周期

![](E:\WebStorm_Dir\articles\images\vue-lifecycle.png)

Vue一共有10个生命周期，分别代表不同时期的状态：

```JavaScript
beforeCreate:function(){
    console.log("1-beforeCreate 初始化之前");
},
created:function(){
    console.log("2-created 初始化创建完成");
},
beforeMount:function(){
    console.log("3-beforeMount 挂载之前");
},
mounted:function(){
    console.log("4-mounted 被挂载之后");
},
beforeUpdate:function(){
    console.log("5-beforeUpdate 数据更新之前");
},
updated:function(){
    console.log("6-updated 被更新之后");
},
activated:function(){
    console.log("7-activated");
},
deactivated:function(){
    console.log("8-deactivated");
},
beforeDestroy:function(){
    console.log("9-beforeDestory 销毁之前");
},
destroyed:function(){
    console.log("10-destroyed 销毁之后");
},
```

### Template制作模板

一、直接写在选项里的模板

直接在构造器里的template选项后边编写。这种写法比较直观，但是如果模板html代码太多，不建议这么写。 **适用于一两行的模板**

```JavaScript
let app=new Vue({
        el:"#app",
        data:{
            message:"Hello",
        },
        // 模板一：适用于一两句的模板
        template:`
            <h2 style="color:red">我是选项模板</h2>
		`
    })
```

二、写在template标签里的模板

```JavaScript
<template id="demo2">
<h2 style="color:red">我是template标签模板</h2>
</template>


let app=new Vue({
    el:"#app",
    data:{
    	message:"Hello",
    },
    // 模板一：适用于一两句的模板
    template:"#dd2"
})
```

将模版写在标签里，然后使用id绑定。**适用于一整块的模板**

三、写在script标签里的模板

这种写模板的方法，可以让模板文件从外部引入。 **适用于外部的整个文件的模板**

```html
<script type="x-template" id="dd3">
    <h2 style="color:red">我是Script标签模板</h2>
</script>
<script>
    let app=new Vue({
        el:"#app",
        data:{
            message:"Hello",
        },
        // 模板三：方便使用script的src的外部引用整个模板文件
        template:"#dd3",
    })
</script>
```

### 组件

#### 组件的定义与创建

```javascript
// 1
components:{
    "panda":{
        // 2
        props:["here","fromLocation"],
        // 3
        template:`<div>panda from <a href="#">{{here}}</a> <a href="#">{{fromLocation}}</a></div>`,

    }
}
```

首先在Vue构造函数内部使用components属性，内部添加一个名为panda的组件，外部使用格式为`<panda></panda>`它具有一个here属性和一个fromLocation属性，显示给外部的样式就是template模板的样式，而且模板内部使用的属性就是props定义的。

**组件的创建方式主要有两种：**

全局组件：在Vue构造函数外部使用Vue.component（）定义的，可以用于任何vue对象，所以是全局的。

局部组件：在Vue构造函数里定义的，就只能用于当前的Vue对象。



可以通过v-bind来用props属性获取data里面的值。



### 父子组件关系

首先定义父级组件

```JavaScript
let pandaComponent={
    template:`
        <div>
            <p>panda from China</p>
            <city></city>
        </div>
    `,
    components:{
        "city":city,
    },
}
let app=new Vue({
    el:"#app",
    components:{
        "panda":pandaComponent,
    }
})
```

上述的父级是panda，pandaComponent内部有他本来的模版，然后我们在panda父级组件中定义子组件city

```JavaScript
et city={
    template:`<div style="color:red;">sichuan of China</div>`
}
let pandaComponent={
    template:`
        <div>
            <p>panda from China</p>
            <city></city>
        </div>
    `,
    components:{
        "city":city,
    },
}
```

将子组件city传进父组件pandaComponent，并作为city子组件。将子组件放在父组件的template中实现父子组件的嵌套。

### component标签

`<component></component>`标签是Vue框架自定义的标签，它的用途就是可以动态绑定我们的组件，根据数据的不同更换不同的组件。 

首先定义三个组价：

```JavaScript
let componentA={
    template:`
        <div style="color:red">I'm ComponentA.</div>
    `,
}
let componentB={
    template:`
        <div style="color:green">I'm ComponentB.</div>
    `,
}
let componentC={
    template:`
        <div style="color:pink">I'm ComponentC.</div>
    `,
}
components:{
    "componentA":componentA,
    "componentB":componentB,
    "componentC":componentC,
},
```

在id为app的div标签内部使用component标签，并且绑定`v-bind：is=who`，而who则绑定需要的标签。则可以根据who所指向的那个组件（componentA，componentB，componentC）以确定显示的内容。当然也可以使用事件监听处理程序用来动态设置。



## Options

### computed

主要用于保护原始数据，输出处理过后的数据

```html
<div id="app">
    {{newPrice}}
    <ul>
        <li v-for="news in reverseNews">{{news.title}}----{{news.date}}</li>
    </ul>
</div>
<script>
    let newsList=[
        {title:"aaa",date:"2018/8/18"},
        {title:"bbb",date:"2018/8/19"},
        {title:"ccc",date:"2018/8/19"},
        {title:"ddd",date:"2018/8/20"},
    ];
    let app=new Vue({
        el:"#app",
        data:{
            price:100,
            newsList:newsList,
        },
        computed:{
            newPrice:function () {
                return this.price="￥"+this.price+"元";
            },
            reverseNews:function () {
                return this.newsList.reverse();
            }
        },
    })
</script>
```

### methods

内部只要是事件方法，此方法：

1.可以接收处理事件，而且方法可以接收参数

```html
<div id="app">
    {{a}}
    <button @click="add(10,$event)">ADD</button>
</div>
<script>
    let app=new Vue({
        el:"#app",
        data:{
            a:1,
        },
        methods:{
            add:function (num,event) {
                if (num<=this.a){
                    this.a=0;
                } else {
                    this.a++;
                }
                console.log(event);
            }
        },
    })
</script>
```

可以在作用域中使用$event获取到add方法传入的event事件对象。

2.自定义创建的组件不能使用methods里面的方法，但是可以使用@click.native的方式，这里native表示原生标签使用方法，因此就可以使用了

```html
<div id="app">
    {{a}}
    <btn @click.native="add(10)"></btn>
</div>
<script>
    let btn={
        template:`<button>组件APP</button>`
    };
    let app=new Vue({
        el:"#app",
        data:{
            a:1,
        },
        components:{
            "btn":btn,
        },
        methods:{
            add:function (num,event) {
                if (num<=this.a){
                    this.a=0;
                } else {
                    this.a++;
                }
                console.log(event);
            }
        },
    })
</script>
```

3.在vue作用域外部的点击事件，需要使用onclick="app.add(3)"的方式指定调用那个add方法。

```html
<button onclick="app.add(10)">外部ADD</button>
<script>
    let btn={
        template:`<button>组件APP</button>`
    };
    let app=new Vue({
        el:"#app",
        data:{
            a:1,
        },
        components:{
            "btn":btn,
        },
        methods:{
            add:function (num,event) {
                if (num<=this.a){
                    this.a=0;
                } else {
                    this.a++;
                }
                console.log(event);
            }
        },
    })
</script>
```































































































































