### Vue.extend(options)

使用基础Vue构造器，创建一个子类，参数options是一个包含组件选项的对象。data必须是一个函数。

```js
// 创建构造器
var Profile=Vue.extend({
    template:'<p>{{firstName}}{{lastName}}aka{{alias}}</p>',
    data:function(){
        return {
            firstName:"Walter",
            lastName:"White",
            alias:"Heisenberg",
        }
    }
})
// 使用构造器创建实例
var vm=new Profile();
// 将实例挂载到一个元素上,也就是通过id或者class的DOM元素上
vm.$mount('#id');
```

------

### Vue.nextTick（[callback，context]）

在下次 DOM 更新循环结束之后执行延迟回调。在修改数据之后立即使用这个方法，获取更新后的 DOM。

```js
// 修改数据
vm.msg='Hello'
// DOM还没有更新
Vue.nextTick(function（）{
    // DOM更新了
})
// 作为一个Promise使用
Vue.nextTick（）.then（function（）{
    // DOM更新了
}）
```

> 如果没有提供回调且在支持 Promise 的环境中，则返回一个 Promise。

------

### Vue.set(target,key,value)

向响应式对象中添加一个属性，并确保这个新属性同样是响应式的，且触发视图更新。它必须用于向响应式对象上添加新属性，因为 Vue 无法探测普通的新增属性

> 注意对象不能是 Vue 实例，或者 Vue 实例的根数据对象。

target：是目标对象

key：表示要插入的键

value：表示要插入的键的值

------

### Vue.delete(target,key)

删除对象的属性。如果对象是响应式的，确保删除能触发更新视图。这个方法主要用于避开 Vue 不能检测到属性被删除的限制。

------

### Vue.directive（id，[definition]）

注册或获取全局指令。

```js
// 注册
Vue.directive('my-directive',{
    // 钩子函数
    bind:function(){},
    inserted:function(){},
    update:function(){},
    componentUpdate:function(){},
    unbind:function(){},
    
    // 普通指令
    inserted: function (el) {// 聚焦元素
        el.focus()
  	}
})
// 注册（指令函数）
Vue.directive('my-directive',function(){
    
})
// getter , 返回已注册的指令
var myDirective=Vue.directive('my-directive');
```

注册局部指令，组件中也接受一个directives的选项

```js
directives:{
    focus:{
        // 指令的定义
        inserted:function(el){
            el.focus();
        }
    }
}
```

指令的具体使用：

```js
//这样就可以使input成功自动聚焦
<input v-focus>
```

**一个指令定义对象可以提供如下几个钩子函数：**

- `bind`：只调用一次，指令第一次绑定到元素时调用。在这里可以进行一次性的初始化设置。
- `inserted`：被绑定元素插入父节点时调用 (仅保证父节点存在，但不一定已被插入文档中)。
- `update`：所在组件的 VNode 更新时调用，**但是可能发生在其子 VNode 更新之前**。指令的值可能发生了改变，也可能没有。但是你可以通过比较更新前后的值来忽略不必要的模板更新 (详细的钩子函数参数见下)。
- `componentUpdated`：指令所在组件的 VNode **及其子 VNode** 全部更新后调用。
- `unbind`：只调用一次，指令与元素解绑时调用。

**指令钩子函数会被传入以下参数：**

- `el`：指令所绑定的元素，可以用来直接操作 DOM 。
- binding：一个对象，包含以下属性：
  - `name`：指令名，不包括 `v-` 前缀。
  - `value`：指令的绑定值，例如：`v-my-directive="1 + 1"` 中，绑定值为 `2`。
  - `oldValue`：指令绑定的前一个值，仅在 `update` 和 `componentUpdated`钩子中可用。无论值是否改变都可用。
  - `expression`：字符串形式的指令表达式。例如 `v-my-directive="1 + 1"` 中，表达式为 `"1 + 1"`。
  - `arg`：传给指令的参数，可选。例如 `v-my-directive:foo` 中，参数为 `"foo"`。
  - `modifiers`：一个包含修饰符的对象。例如：`v-my-directive.foo.bar`中，修饰符对象为 `{ foo: true, bar: true }`。
- `vnode`：Vue 编译生成的虚拟节点。移步 [VNode API](https://cn.vuejs.org/v2/api/#VNode-%E6%8E%A5%E5%8F%A3) 来了解更多详情。
- `oldVnode`：上一个虚拟节点，仅在 `update` 和 `componentUpdated` 钩子中可用。

**例子**

```html
<div id="hook-argument-example" v-demo:foo.a.b="message"></div>
```

```js
Vue.directive('demo',{
    bind:function(el,binding,vnode){
        var s=JSON.stringify;
        el.innerHTML=
              'name: '       + s(binding.name) + '<br>' +
              'value: '      + s(binding.value) + '<br>' +
              'expression: ' + s(binding.expression) + '<br>' +
              'argument: '   + s(binding.arg) + '<br>' +
              'modifiers: '  + s(binding.modifiers) + '<br>' +
              'vnode keys: ' + Object.keys(vnode).join(', ')
    }
})
new Vue({
    el:"#hook-arguments-example",
    data:{
        message:'Hello!',
    }
})
```

### Vue.filter（id，[definition]）

注册或获取全局过滤器。

```js
// 注册
Vue.filter('my-filter', function (value) {
  // 返回处理后的值
})
// getter，返回已注册的过滤器
var myFilter = Vue.filter('my-filter')
```

Vue.js 允许你自定义过滤器，可被用于一些常见的文本格式化。过滤器可以用在两个地方：**双花括号插值和 v-bind 表达式**，过滤器应该被添加在 JavaScript 表达式的尾部，由“管道”符号指示：

```html
//双括号
<div>
    {{message|capitalize}}
</div>
// 在v-bind中
<div v-bind:id="rawId|formatId"></div>
```

你可以在一个组件的选项中定义本地的过滤器：

```js
filters:{
    capitalize:function(value){
        if(!value)
            return ""
      	value=value.toString();
        return value.charAt(0).toUpperCase()+value.slice(1);
    } 
}
```

或者在创建 Vue 实例之前全局定义过滤器：

```js
Vue.filter（'capitalize',function(value){
    if(!value) return '';
    value=value.toString();
    return value.charAt(0).toUpperCase()+value.slice(1);
}）
new Vue({
    //...
})
```

```html
{{ message | filterA | filterB }}
```

过滤器函数总接收表达式的值 (之前的操作链的结果) 作为第一个参数。在上述例子中，`capitalize` 过滤器函数将会收到 `message` 的值作为第一个参数。

`filterA` 被定义为接收单个参数的过滤器函数，表达式 `message` 的值将作为参数传入到函数中。然后继续调用同样被定义为接收单个参数的过滤器函数 `filterB`，将 `filterA` 的结果传递到 `filterB` 中。

过滤器是 JavaScript 函数，因此可以接收参数：

```
{{ message | filterA('arg1', arg2) }}
```

这里，`filterA` 被定义为接收三个参数的过滤器函数。其中 `message` 的值作为第一个参数，普通字符串 `'arg1'` 作为第二个参数，表达式 `arg2` 的值作为第三个参数。

------

### Vue.component（id，[definition]）

注册或获取全局组件。注册还会自动使用给定的`id`设置组件的名称

```js
// 使用构造器注册组件
Vue.component('my-component',Vue.extend({/* ... */}))

// 使用具有options的对象注册组件
Vue.component('my-component',{/* ... */})

// 获取注册组件
var myComponent=Vue.component('my-component');
```

*******

### Vue.use（plugin）

安装 Vue.js 插件。如果插件是一个对象，必须提供 `install` 方法。如果插件是一个函数，它会被作为 install 方法。install 方法调用时，会将 Vue 作为参数传入。

该方法需要在调用 `new Vue()` 之前被调用。

当 install 方法被同一个插件多次调用，插件将只会被安装一次。

通过全局方法 `Vue.use()` 使用插件。它需要在你调用 `new Vue()` 启动应用之前完成：

```js
Vue.use(myPlugin);
new Vue({
    //...options
})
```

**开发插件**

Vue.js 的插件应该有一个公开方法 `install`。这个方法的第一个参数是 `Vue`构造器，第二个参数是一个可选的选项对象：

```js
MyPlugin.install=function(Vue,options){
    //1、添加全局方法和属性
    Vue.myGlobalMethods=function(){
        // ...
    }
    // 2、添加全局资源
    Vue.directive('my-directive',function(){
        bind(el,binding,vnode,oldVnode){
            // ... 
        }
        // ...
    })
    // 3、注入组件
    Vue.mixin({
        created:function(){
            // ...
        }
        // ... 
    })
    // 4、添加实例方法
    Vue.prototype.$myMethod=function(methodOptions){
        // ...
    }
}
```

------

### Vue.mixin（mixin）

 一旦使用全局混入对象，将会影响到 **所有** 之后创建的 Vue 实例。使用恰当时，可以为自定义对象注入处理逻辑。

```js
Vue.mixin({
    created:function(){
        var myOption=this.$options.myOption
        if(myOption){
            console.log(myOption)
        }
    }
})
new Vue({
    myOption:"Hello"
})
```

------

### Vue.compile（template）

在render函数中编译模板字符串。只在独立构建时有效。

```js
var res=Vue.compile('<div><span>{{msg}}</span></div>')
new Vue({
    data:{
        msg:"hello"
    },
    render:res.render,
    staticRenderFns:res.staticRenderFns,
})
```

