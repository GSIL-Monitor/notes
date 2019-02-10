在Vue中使用路由，我们可以直接使用官方推荐的vue-router插件。这里贴上vue-router的官网地址https://router.vuejs.org/zh/



### 安装vue-router

调用`npm install vue-router --save-dev`命令，下载安装vue-router。当然如果你使用了vue-cli脚手架，也可以在初始化vue项目的时候就安装vue-router。



首先查看项目中router文件下的index.js文件

```JavaScript
import Vue from 'vue'   //引入Vue
import Router from 'vue-router'  //引入vue-router
import Hello from '@/components/Hello'  //引入根目录下的Hello.vue组件

Vue.use(Router)  //Vue全局使用Router

export default new Router({
  routes: [              //配置路由，这里是个数组
    {                    //每一个链接都是一个对象
      path: '/',         //链接路径
      name: 'Hello',     //路由名称，
      component: Hello   //对应的组件模板
    }
  ]
})
```

上述代码的意义就是，在进入网页根目录主页时显示Hello组件为模版的主页面。



可以在如下代码内部添加新的路由（路由就是路径）

```JavaScript
export default new Router({
  routes: [              //配置路由，这里是个数组
    {                    //每一个链接都是一个对象
      path: '/',         //链接路径
      name: 'Hello',     //路由名称，
      component: Hello   //对应的组件模板
    }
  ]
})
```

增加一个H1页面，可以通过 http://localhost:8080/#/h1 获取到以h1为模版的新的h1分支页面，h1页面来自于已经存在的h1模版

```javascript
import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import h1 from '@/components/h1'
export default new Router({
  routes: [              //配置路由，这里是个数组
    {                    //每一个链接都是一个对象
      path: '/',         //链接路径
      name: 'Hello',     //路由名称，
      component: Hello   //对应的组件模板
    },
    {
      path:'/h1',// 配置h1的路由
      component:h1,// h1路由所代表的组件内容
    },
  ]
})
```

在这里我们准备好了路由的切换，现在需要对路由中的内容进行添加

编写h1.vue作为h1页面的模版：

```HTML
<template>
  <div>
    <h2>{{msg}}</h2>
  </div>
</template>

<script>
  export default { // 传递给外部的接口
    data(){
      return {
        msg:"I am h1"
    }
    }
  }
</script>

<style scoped>
//	这里使用scoped表示是否将此样式，锁定为只能这个模板使用
</style>
```

前面所提到的Hello或者是h1模版，其实都只是页面的一部分，或者说是App.vue框架的内部填充内容，接下来我们看一下App.vue的内容：

```html
<template>
  <div id="app">
    <img src="./assets/logo.png">
    <div>
      <router-link to="/">首页</router-link> |
      <router-link to="/intro">介绍</router-link>
      <router-link :to="{name:'page1',params:{username:'JSPANG',id:'888'}}">介绍页1</router-link> |
      <router-link to="/intro/page2">介绍页2</router-link> |
    </div>
    <p>当前页的 name = {{$route.name}}</p>
    <!--此处用来存放router的内容-->
    <router-view/>
  </div>
</template>

<script>
  // 将这里的模板作为 App 组件传递出去
  export default {
    name: 'App'
  }
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
</style>
```

其中的template部分内容表示页面主体框架，router-view表示我们要填充进去的与路由绑定的组件内容。router-link表示路由页面的跳转链接。

`<router-link to="/">[显示字段]</router-link>`

to：是我们的导航路径，要填写的是你在router/index.js文件里配置的path值，如果要导航到默认首页，只需要写成  to=”/”；

[显示字段] ：就是我们要显示给用户的导航名称，比如首页  新闻页。



首先作为代表页面文件路径的路由一定会有多个层次，这里就使用到了子路由的概念，修改App.vue添加新的链接：

`<router-link to="/hi/hi1">-Hi页面1</router-link> |`

 `<router-link to="/hi/hi2">-Hi页面2</router-link>`

在components文件夹中准备好组件模板，在routes/index.js文件中使用路由绑定指定的hi1和hi2组件，结合App.vue的外部框架实现hi1与hi2页面。这里因为我们要将hi1与hi2作为hi的子页面的路由来使用，在原有的hi页面下使用children属性，实现子路由转发的效果，具体使用如下：

```JavaScript
{
  path:'/hi',
  name:"HI",
  component:Intro,
  children:[
    {
      path:"/",component:hi,      
    }
    {
      path:"hi1",name:"hi1",component:hi1,
    },
    {
      path:"hi2",name:"hi2",component:hi2,
    }
  ]
}
```



Vue中的参数传递：

1.使用name传递参数

在index.js中的路由中配置了name属性，然后可以在App.vue中获取

`path:"hi1",name:"hi1",component:hi1,`

使用$route.name的形势接收，然后直接在框架模板中使用

`<p>{{ $route.name}}</p>`

2.使用route-link的to属性的绑定

`<router-link :to="{name:xxx,params:{key:value}}">valueString</router-link>`

这里的to前边是带冒号的，然后后边跟的是一个对象形势的字符串.

- name：就是我们在路由配置文件中起的name值。
- params：就是我们要传的参数，它也是对象形势，在对象里可以传递多个值。

首先在App.vue中修改为：

`<router-link :to="{name:'hi1',params:{username:'jspang'}}">Hi页面1</router-link>`

然后绑定index.js内部的路由（根据name值匹配）

`{path:'/hi1',name:'hi1',component:Hi1},`

最后在组件模板里面使用

`{{$route.params.username}}`以插值的形式显示到内容页



**单页面多路由区域操作**

就是在App.vue中的router-view下面再添加一些router-view，作为多路由处理。

```html
 <router-view ></router-view>
 <router-view name="left" style="float:left;width:50%;background-color:#ccc;height:300px;"></router-view>
 <router-view name="right" style="float:right;width:50%;background-color:#c0c;height:300px;"></router-view>
```

目前为止，在根目录下面就有了三个不同的路由时，但是一个路由只能代表一个路径，一个路由也绑定一个组件，因此当存在三个路由在同一个路径下时，我们使用components的方式来包含三个不同的路由块，使用方式如下：

```JavaScript
{
      path: '/Hi',
      components: {
        default:Hello,
        left:Hi2,
        right:Hi1
      }
 }
```

等价于这个路由下的页面有三个子窗口（类似iframe），其中也有不同的名字，则里的名字是在App.vue中设定的，用来区分三个路由，于是可以用来绑定不同的组件，于是left：Hi2和right：Hi1。也可以使用js来操作Hi1页面与Hi2页面。



**URL传递参数**

:冒号的形式传递参数

1.在配置文件里以冒号的形式设置参数。我们在/src/router/index.js文件里配置路由。

```JavaScript
{
    path:'/params/:newsId/:newsTitle',
    component:Params
}
```

2.在src/components目录下建立我们params.vue组件，也可以说是页面。我们在页面里输出了url传递的的新闻ID和新闻标题。

```html
<template>
  <div>
    <h2>{{ msg }}</h2>
    <p>新闻ID：{{ $route.params.newsId}}</p>
    <p>新闻标题：{{ $route.params.newsTitle}}</p>
  </div>
</template>

<script>
  export default {
    name: 'params',
    data () {
      return {
        msg: 'params page'
      }
    }
  }
</script>
```

上述代码可以看出，我们使用的是$router.params.newsId这种形式来获取url参数的值

3.在App.vue文件里加入我们的`<router-view>`标签。这时候我们可以直接利用url传值了。

```html
<router-link to="/params/198/jspang website is very good">params</router-link> |
```



**正则表达式在URL传值中的应用**

正则需要在路由配置文件里（/src/router/index.js）以圆括号的形式加入。

```
path:'/params/:newsId(\\d+)/:newsTitle',
```

加入了正则，我们再传递数字之外的其他参数，params.vue组件就没有办法接收到。



**重定向**

我们只要在路由配置文件中（/src/router/index.js）把原来的component换成redirect参数就可以了，而redirect的值则表示新的跳转路径。

```JavaScript
export default new Router({
  routes: [
    {
      path: '/',
      component: Hello
    },{
      path:'/params/:newsId(\\d+)/:newsTitle',
      component:Params
    },{
      path:'/goback',
      redirect:'/'
    }

  ]
})
```

这里我们设置了goback路由，但是它并没有配置任何component（组件），而是直接redirect到path:’/’下了，这就是一个简单的重新定向。

重定向时也可以使用带参数的URL，用来传递参数：

```JavaScript
{
  path:'/params/:newsId(\\d+)/:newsTitle',
  component:Params
},{
  path:'/goParams/:newsId(\\d+)/:newsTitle',
  redirect:'/params/:newsId(\\d+)/:newsTitle'
}
```

我们除了有重定向的功能以外，还可以使用aias来设置别名：

```JavaScript
{
    path: '/hi1',
    component: Hi1,
    alias:'/jspang'
 }
```

经过上面的配置以后，我们可以使用/jspang来代替/hi1

配置我们的`<router-link>`，起过别名之后，可以直接使用`<router-link>`标签里的to属性，进行重新定向。

```
<router-link to="/jspang">jspang</router-link>
```

**redirect和alias的区别**

- redirect：仔细观察URL，redirect是直接改变了url的值，把url变成了真实的path路径。
- alias：URL路径没有别改变，这种情况更友好，让用户知道自己访问的路径，只是改变了<router-view>中的内容。



路由的mode设置：

将mode值设置为history可以去除掉vue默认的/#/部分，成为正常的URL



404页面设置：

找不到的页面统统使用：path：‘*’表示找不到页面。



**路由中的生命周期**

在配置路由的index.js文件中，可以写一个也只有一个钩子函数，即beforeEnter：

```JavaScript
{
      path:'/params/:newsId(\\d+)/:newsTitle',
      component:Params,
      beforeEnter:(to,from,next)=>{
        console.log('我进入了params模板');
        console.log(to);
        console.log(from);
        next();
},
```

三个参数：

1. to:路由将要跳转的路径信息，信息是包含在对像里边的。
2. from:路径跳转前的路径信息，也是一个对象的形式。
3. next:路由的控制参数，常用的有next(true)和next(false)。又或者是直接跳转到指定的页面：next({path:'/h1'});



在模板中的钩子函数可以有两个，分别是：

- beforeRouteEnter：在路由进入前的钩子函数。
- beforeRouteLeave：在路由离开前的钩子函数。

```JavaScript
export default {
  name: 'params',
  data () {
    return {
      msg: 'params page'
    }
  },
  beforeRouteEnter:(to,from,next)=>{
    console.log("准备进入路由模板");
    next();
  },
  beforeRouteLeave: (to, from, next) => {
    console.log("准备离开路由模板");
    next();
  }
}
</script>
```



编程式导航：

我们可以让我们的导航进行前进或者后退，并且我们的地址栏也是有所变化的。

前进

 this.$router.go(1)

后退

this.$router.go(-1) 

指定跳转，如：返回首页

this.$router.push(‘/‘)