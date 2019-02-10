### 1、组件中的导航与子路由

在模板中定义路由的导航router-link与子路由router-view

```html
<div id="app">
  <h1>Hello App!</h1>
  <p>
    <!-- use router-link component for navigation. -->
    <!-- specify the link by passing the `to` prop. -->
    <!-- `<router-link>` will be rendered as an `<a>` tag by default -->
    <router-link to="/foo">Go to Foo</router-link>
    <router-link to="/bar">Go to Bar</router-link>
  </p>
  <!-- route outlet -->
  <!-- component matched by the route will render here -->
  <router-view></router-view>
</div>
```

router-link表示路由的导向，其中的to属性代表路由的地址，router-view表示子路由，因此其他部分都变为了不同子路由的框架了。

### 路由的构建

#### 1、定义好使用的组件

```js
const Foo = { template: '<div>foo</div>' }
const Bar = { template: '<div>bar</div>' }
```

#### 2、定义好路由与组件的一一对应关系

```js
const routes = [
  { path: '/foo', component: Foo },
  { path: '/bar', component: Bar }
]
```

#### 3、创建一个router实例，将routes作为参数传进vueRouter构造函数

```js
const router = new VueRouter({
  routes //`routes: routes`的简写方式
})
```

#### 4、将路由实例放在vue实例中，并制定挂载的DOM位置

```js
const app = new Vue({
  router
}).$mount('#app')
```

### 2、组件中的路由对象

可以在组件中使用`this.$router`获得路由对象`vueRouter`

可以通过`this.$router.xxx`**设置**路由对象的参数，使用`this.$route`**获取**路由对象的内容。

```js
export default {
  computed: {
    username () {
      // We will see what `params` is shortly
      return this.$route.params.username
    }
  },
  methods: {
    goBack () {
      window.history.length > 1
        ? this.$router.go(-1)
        : this.$router.push('/')
    }
  }
}
```

### 3、动态路由匹配

#### 1、基本使用

需要把某种模式匹配到的所有路由，全都映射到同个组件。可以在 `vue-router` 的路由路径中使用“动态路径参数”(dynamic segment) 来达到这个效果：

```js
const User = {
  template: '<div>User</div>'
}

const router = new VueRouter({
  routes: [
    // 动态路径参数 以冒号开头
    { path: '/user/:id', component: User }
  ]
})
```

#### 2、组件中操作路由参数

其中`/user/:id`表示像 `/user/foo` 和 `/user/bar` 都将映射到相同的路由User。因为使用的是同一个路由，所以界面可能是一样的，但是我们可以通过在组件中获取路由参数的方式，动态的为相同组件模板设定不同的内容。如：

```js
const User = {
  template: '<div>User {{ $route.params.id }}</div>'
}
```

这里的组件模板就会与路由动态路径的参数绑定到一起了。注意使用的方式是：

<div style="color:#f00">{{ $route.params.id }}</div>

你可以在一个路由中设置多段“路径参数”，对应的值都会设置到 `$route.params` 中。例如：

| 模式                          | 匹配路径            | $route.params                        |
| ----------------------------- | ------------------- | ------------------------------------ |
| /user/:username               | /user/evan          | `{ username: 'evan' }`               |
| /user/:username/post/:post_id | /user/evan/post/123 | `{ username: 'evan', post_id: 123 }` |

除了 `$route.params` 外，`$route` 对象还提供了其它有用的信息，例如，`$route.query` (如果 URL 中有查询参数)、`$route.hash` 等等。

#### 3、参数匹配模式

而且还可以将路径参数如`:id`更改为正则匹配的情况。同一个路径可以匹配多个路由，此时，匹配的优先级就按照路由的定义顺序：谁先定义的，谁的优先级就最高。

```js
routes: [
    // a param can be followed by a regex pattern in parens
    // this route will only be matched if :id is all numbers
    { path: '/params-with-regex/:id(\\d+)' },
    // asterisk can match anything
    { path: '/asterisk/*' },
    // make part of th path optional by wrapping with parens and add "?"
    { path: '/optional-group/(foo/)?bar' }
]
```

#### 4、副作用的解决方法（复用导致没有生命周期）

> <span style="color:#f00;font-weight:bold">注意：</span>
>
> 当使用路由参数时，例如从 `/user/foo` 导航到 `/user/bar`，**原来的组件实例会被复用**。因为两个路由都渲染同个组件，比起销毁再创建，复用则显得更加高效。**不过，这也意味着组件的生命周期钩子不会再被调用**。

在遇到上面这种复用组件导致生命周期无效的情况下，可以通过watch（监测变化）监听路由的变化来实现调用。

```js
const User = {
  template: '...',
  watch: {
      //to表示跳转到那里去，from表示从哪里跳转过来的
    '$route' (to, from) {
      // 对路由变化作出响应...
    }
  }
}
```

或者使用：

导航守卫**beforeRouteUpdate**



### 4、嵌套路由

```html
<div id="app">
  <router-view></router-view>
</div>
```

```js
const User = {
  template: '<div>User {{ $route.params.id }}</div>'
}

const router = new VueRouter({
  routes: [
    { path: '/user/:id', component: User }
  ]
})
```

这里的 `<router-view>` 是最顶层的出口，渲染最高级路由匹配到的组件。同样地，**一个被渲染组件同样可以包含自己的嵌套 `<router-view>`**。例如，在 `User` 组件的模板添加一个 `<router-view>`：

```js
const User = {
  template: `
    <div class="user">
      <h2>User {{ $route.params.id }}</h2>
      <router-view></router-view>
    </div>
  `
}
```

```js
const router = new VueRouter({
  routes: [
    { path: '/user/:id', component: User,
      children: [
          {//如果你想要渲染点什么，可以提供一个 空的 子路由：
              path:'',
              component:Dfgb,
          }
          {//要注意，以 / 开头的嵌套路径会被当作根路径。 这让你充分的使用嵌套组件而无须设置嵌套的路径。
              path:'/',
              component:Xxx
          }，
          {
              // 当 /user/:id/profile 匹配成功，
              // UserProfile 会被渲染在 User 的 <router-view> 中
              path: 'profile',
              component: UserProfile
          },
          {
              // 当 /user/:id/posts 匹配成功
              // UserPosts 会被渲染在 User 的 <router-view> 中
              path: 'posts',
              component: UserPosts
          }
      ]
    }
  ]
})
```

从上面的内容可以看出，`children` 配置就是像 `routes` 配置一样的路由配置数组，所以呢，你可以嵌套多层路由。

### 5、编程式导航

除了使用 `<router-link>` 创建 a 标签来定义导航链接，我们还可以借助 router 的实例方法，通过编写代码来实现。

**注意：在 Vue 实例内部，你可以通过 `$router` 访问路由实例。因此你可以调用 `this.$router.push`。**，因此后续使用到的`router`都可以替换成`this.$router`

#### 1、push

`router.push(location, onComplete?, onAbort?)`

想要导航到不同的 URL，则使用 `router.push` 方法。这个方法会向 history 栈添加一个新的记录，所以，当用户点击浏览器后退按钮时，则回到之前的 URL。

点击 `<router-link :to="...">` 等同于调用 `router.push(...)`。

| 声明式                    | 编程式             |
| ------------------------- | ------------------ |
| `<router-link :to="...">` | `router.push(...)` |

该方法的参数可以是一个字符串路径，或者一个描述地址的对象。例如：

```js
const userId = 123
// 字符串
router.push('home')//匹配"/home"
// 对象
router.push({ path: 'home' })// 匹配 "/home"
// 命名的路由
router.push({ path: `/user/${userId}` }) // 匹配： /user/123
router.push({ name: 'user', params: { userId: 123 }}) // 匹配：/user/123
// 带查询参数
router.push({ path: 'register', query: { plan: 'private' }}) // 匹配：/register?plan=private
```

上述可以看出，使用path和params的方式都可以实现路径的匹配。但是需要注意的是path和params不能同时使用：

> <span style="color:#f00;font-weight:bold">注意：</span>
>
> **如果提供了 path，params 会被忽略，上述例子中的 query 并不属于这种情况。取而代之的是下面例子的做法，你需要提供路由的 name 或手写完整的带有参数的 path：**

```js
// 这里的 params 不生效
router.push({ path: '/user', params: { userId }}) // -> /user
```

##### 命名式路由

我们使用的params一般是和name搭配使用的，我们也称之为**命名式路由**：

你可以在创建 Router 实例的时候，在 `routes` 配置中给某个路由设置名称。

```js
const router = new VueRouter({
  routes: [
    {
      path: '/user/:userId',
      name: 'user',
      component: User
    }
  ]
})
```

要链接到一个命名路由，可以给 `router-link` 的 `to` 属性传一个对象：

```html
<router-link :to="{ name: 'user', params: { userId: 123 }}">User</router-link>
```

这跟代码调用 `router.push()` 是一回事：

```js
router.push({ name: 'user', params: { userId: 123 }})
```

这两种方式都会把路由导航到 `/user/123` 路径。

#### 2、replace

跟 `router.push` 很像，唯一的不同就是，它不会向 history 添加新记录，而是跟它的方法名一样 —— 替换掉当前的 history 记录。

| 声明式                            | 编程式                |
| --------------------------------- | --------------------- |
| `<router-link :to="..." replace>` | `router.replace(...)` |

#### 3、go

这个方法的参数是一个整数，意思是在 history 记录中向前或者后退多少步，类似 `window.history.go(n)`。

```js
// 在浏览器记录中前进一步，等同于 history.forward()
router.go(1)
// 后退一步记录，等同于 history.back()
router.go(-1)
// 前进 3 步记录
router.go(3)
// 如果 history 记录不够用，那就默默地失败呗
router.go(-100)
router.go(100)
```



### 6、命名视图

有时候想同时 (同级) 展示多个视图，而不是嵌套展示，例如创建一个布局，有 `sidebar` (侧导航) 和 `main` (主内容) 两个视图，这个时候命名视图就派上用场了。你可以在界面中拥有多个单独命名的视图，而不是只有一个单独的出口。如果 `router-view` 没有设置名字，那么默认为 `default`。

```html
<router-view class="view one"></router-view>
<router-view class="view two" name="a"></router-view>
<router-view class="view three" name="b"></router-view>
```

一个视图使用一个组件渲染，因此对于同个路由，多个视图就需要多个组件。确保正确使用 `components`配置 (带上 s)：**主要使用过name属性匹配到不同的组件，注意这里是用的components（加s）**

```js
const router = new VueRouter({
  routes: [
    {
      path: '/',
      components: {
        default: Foo,
        a: Bar,
        b: Baz
      }
    }
  ]
})
```

#### 嵌套式命名视图

我们也有可能使用命名视图创建嵌套视图的复杂布局。这时你也需要命名用到的嵌套 `router-view` 组件。

`UserSettings` 组件的 `<template>` 部分应该是类似下面的这段代码：

```html
<!-- UserSettings.vue -->
<div>
  <h1>User Settings</h1>
  <NavBar/>
  <router-view/>
  <router-view name="helper"/>
</div>
```

可以用这个路由配置完成该布局：

```js
{
  path: '/settings',
  // 你也可以在顶级路由就配置命名视图
  component: UserSettings,
  children: [{
    path: 'emails',
    component: UserEmailsSubscriptions
  }, {
    path: 'profile',
    components: {
      default: UserProfile,
      helper: UserProfilePreview
    }
  }]
}
```

### 7、重定向

“重定向”的意思是，当用户访问 `/a`时，URL 将会被替换成 `/b`，然后匹配路由为 `/b`

重定向也是通过 `routes` 配置来完成，下面例子是从 `/a` 重定向到 `/b`：

```js
const router = new VueRouter({
  routes: [
    { path: '/a', redirect: '/b' }
  ]
})
```

重定向的目标也可以是一个命名的路由：

```js
const router = new VueRouter({
  routes: [
    { path: '/a', redirect: { name: 'foo' }}
  ]
})
```

甚至是一个方法，动态返回重定向目标：

```js
const router = new VueRouter({
  routes: [
    { path: '/a', redirect: to => {
      // 方法接收 目标路由 作为参数
      // return 重定向的 字符串路径/路径对象
    }}
  ]
})
```

#### 别名

### 8、路由组件传参

