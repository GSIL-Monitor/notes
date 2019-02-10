## `<router-link>`

该组件支持用户在具有路由功能的应用中导航。通过 `to` 属性指定的目标地址，渲染成一个新的标签。

这里生成的新的标签默认是带有正确链接的 `a` 标签，当然可以手动通过配置 `tag` 属性生成其他指定的标签。

> `<router-link> ` 相比于a标签的好处：
>
> - 无论是 HTML5 history 模式还是 hash 模式，它的表现行为一致，所以，当你要切换路由模式，或者在 IE9 降级使用 hash 模式，无须作任何变动。
> - 在 HTML5 history 模式下，`router-link` 会守卫点击事件，让浏览器不再重新加载页面。
> - 当你在 HTML5 history 模式下使用 `base` 选项之后，所有的 `to` 属性都不需要写 (基路径) 了。

### 将激活class应用在外层元素

有时候我们不想在 `<a>` 链接上设置样式，所以可以在链接的外部包裹一层，如使用 `li` 标签，然后通过 `to` 属性将其导向真正的链接，实现如下：

```html
<router-link tag="li" to="/foo">
  <a>/foo</a>
</router-link>
```

这样情况下，`a`专注于实现`href`链接的功能，而样式或其他操作都应用到li标签上

### Props

### to

表示目标路由的链接。当被点击后，内部会立刻把 `to` 的值传到 `router.push()`，所以这个值可以是一个字符串或者是描述目标位置的对象。

```html
<!-- 字符串 -->
<router-link to="home">Home</router-link>
<!-- 渲染结果 -->
<a href="home">Home</a>

JS本质
<router-link v-bind:to="'home'">Home</router-link>

<!-- 不写 v-bind 也可以，就像绑定别的属性一样 -->
<router-link :to="'home'">Home</router-link>

<!-- 同上 -->
<router-link :to="{ path: 'home' }">Home</router-link>

<!-- 命名的路由 -->
<router-link :to="{ name: 'user', params: { userId: 123 }}">User</router-link>

<!-- 带查询参数，下面的结果为 /register?plan=private -->
<router-link :to="{ path: 'register', query: { plan: 'private' }}">Register</router-link>
```

### replace

设置 `replace` 属性的话，当点击时，会调用 `router.replace()` 而不是 `router.push()`，于是导航后不会留下 history 记录。

```html
<router-link :to="{ path: '/abc'}" replace></router-link>
```

### append

设置 `append` 属性后，则在当前 (相对) 路径前添加基路径。例如，我们从 `/a` 导航到一个相对路径 `b`，如果没有配置 `append`，则路径为 `/b`，如果配了，则为 `/a/b`

```html
<router-link :to="{ path: 'relative/path'}" append></router-link>
```

### tag

有时候想要 `<router-link>` 渲染成某种标签，例如 `<li>`。 于是我们使用 `tag`prop 类指定何种标签，同样它还是会监听点击，触发导航。

```html
<router-link to="/foo" tag="li">foo</router-link>
<!-- 渲染结果 -->
<li>foo</li>
```

### 其他

active-class，exact，event，exact-active-class

## `<router-view>`

`<router-view>` 是一个组件，匹配到路径对应的视图组件。`<router-view>` 渲染的组件还可以内嵌自己的 `<router-view>`，即嵌套路径，渲染嵌套组件。

`<router-view>` 也有自己的一些属性，但是作为匹配视图组件的组件，除了本身的属性以外的其他属性都是通过路由参数来进行传递的。

> 其他属性（非`<router-view>`）在路由参数里面，并且传递给视图组件

因为它也是个组件，所以可以配合 `<transition>` 和 `<keep-alive>` 使用。如果两个结合一起用，要确保在内层使用 `<keep-alive>`：

```html
<transition>
  <keep-alive>
    <router-view></router-view>
  </keep-alive>
</transition>
```

### name

如果 `<router-view>`设置了名称，则会渲染对应的路由配置中 `components` 下的相应组件。

```html
<router-view class="view one"></router-view>
<router-view class="view two" name="a"></router-view>
<router-view class="view three" name="b"></router-view>
```

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

上述是：默认是Foo（没有name），name=a对应Bar，name=b对应Baz



## Router构建选项

### routes

`RouteConfig` 的类型定义：

```js
declare type RouteConfig = {
  path: string;
  component?: Component;
  name?: string; // 命名路由
  components?: { [name: string]: Component }; // 命名视图组件
  redirect?: string | Location | Function;
  props?: boolean | string | Function;
  alias?: string | Array<string>;
  children?: Array<RouteConfig>; // 嵌套路由
  beforeEnter?: (to: Route, from: Route, next: Function) => void;
  meta?: any;

  // 2.6.0+
  caseSensitive?: boolean; // 匹配规则是否大小写敏感？(默认值：false)
  pathToRegexpOptions?: Object; // 编译正则的选项
}
```

### mode

配置路由模式:

- `hash`: 使用 URL hash 值来作路由。支持所有浏览器，包括不支持 HTML5 History Api 的浏览器。
- `history`: 依赖 HTML5 History API 和服务器配置。
- `abstract`: 支持所有 JavaScript 运行环境，如 Node.js 服务器端。**如果发现没有浏览器的 API，路由会自动强制进入这个模式。**

`vue-router` 默认 hash 模式 —— 使用 URL 的 hash 来模拟一个完整的 URL，于是当 URL 改变时，页面不会重新加载。

我们可以用路由的 **history 模式**，这种模式充分利用 `history.pushState` API 来完成 URL 跳转而无须重新加载页面。

```js
const router = new VueRouter({
  mode: 'history',
  routes: [...]
})
```

### base

应用的基路径。例如，如果整个单页应用服务在 `/app/` 下，然后 `base` 就应该设为 `"/app/"`

### 其他

linkActiveClass，linkExactActiveClass，scrollBehavior，parseQuery / stringifyQuery， fallback



## Router实例属性

### router.app

配置了 `router` 的 Vue 根实例。

###  router.mode

路由使用的模式（hash，history，abstract）

###  router.currentRoute

当前路由对应的路由信息对象



## Router实例方法

### router.beforeEach

### router.beforeResolve

### router.afterEach

函数签名：

```js
router.beforeEach((to, from, next) => {
  /* must call `next` */
})

router.beforeResolve((to, from, next) => {
  /* must call `next` */
})

router.afterEach((to, from) => {})
```

增加全局的导航守卫。

在 2.5.0+ 这三个方法都返回一个移除已注册的守卫/钩子的函数。

### router.push（）

想要导航到不同的 URL，则使用 `router.push` 方法。这个方法会向 history 栈添加一个新的记录，所以，当用户点击浏览器后退按钮时，则回到之前的 URL。

该方法的参数可以是一个字符串路径，或者一个描述地址的对象。例如：

```js
// 字符串
router.push('home')

// 对象
router.push({ path: 'home' })

// 命名的路由
router.push({ name: 'user', params: { userId: 123 }})

// 带查询参数，变成 /register?plan=private
router.push({ path: 'register', query: { plan: 'private' }})
```

> **注意：如果提供了 path，params 会被忽略，上述例子中的 query 并不属于这种情况。取而代之的是下面例子的做法，你需要提供路由的 name 或手写完整的带有参数的 path：**

```js
const userId = 123
router.push({ name: 'user', params: { userId }}) // -> /user/123
router.push({ path: `/user/${userId}` }) // -> /user/123
// 这里的 params 不生效
router.push({ path: '/user', params: { userId }}) // -> /user
```

> **同样的规则也适用于 `router-link` 组件的 `to` 属性。**

### router.replace（）

跟 `router.push` 很像，唯一的不同就是，它不会向 history 添加新记录，而是跟它的方法名一样 —— 替换掉当前的 history 记录。

### router.go（）

这个方法的参数是一个整数，意思是在 history 记录中向前或者后退多少步，类似 `window.history.go(n)`。

例子

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

### router.back（）

向后退

### router.forward（）

向前进

### router.getMatchedComponents

```js
const matchedComponents: Array<Component> = router.getMatchedComponents(location?)
```

返回目标位置或是当前路由匹配的组件数组 (是数组的定义/构造类，不是实例)。通常在服务端渲染的数据预加载时。

### router.resolve

解析目标位置 (格式和 `<router-link>` 的 `to` prop 一样)。

- `current` 是当前默认的路由 (通常你不需要改变它)
- `append` 允许你在 `current` 路由上附加路径 (如同 [`router-link`](https://router.vuejs.org/zh/api/#router-link.md-props))

```js
const resolved: {
  location: Location;
  route: Route;
  href: string;
} = router.resolve(location, current?, append?)
```

### router.addRoutes

动态添加更多的路由规则。参数必须是一个符合 `routes` 选项要求的数组。

```js
router.addRoutes(routes: Array<RouteConfig>)
```

### router.onReady

### router.onError



## 路由对象（this.$route）

一个路由对象 (route object) 表示当前激活的路由的状态信息，包含了当前 URL 解析得到的信息，还有 URL 匹配到的路由记录 (route records)。

路由对象是不可变 (immutable) 的，每次成功的导航后都会产生一个新的对象。

**路由对象出现在多个地方:**

- 在组件内，即 `this.$route`

- 在 `$route` 观察者回调内

- `router.match(location)` 的返回值

- 导航守卫的参数：

  ```js
  router.beforeEach((to, from, next) => {
    // `to` 和 `from` 都是路由对象
  })
  ```

- `scrollBehavior` 方法的参数:

  ```js
  const router = new VueRouter({
    scrollBehavior (to, from, savedPosition) {
      // `to` 和 `from` 都是路由对象
    }
  })
  ```



### 路由对象属性

#### $roter.path

字符串，对应当前路由的路径，总是解析为绝对路径，如 `"/foo/bar"`。

#### $route.params

一个 key/value 对象，包含了动态片段和全匹配片段，如果没有路由参数，就是一个空对象。$route.query

#### $route.query

一个 key/value 对象，表示 URL 查询参数。例如，对于路径 `/foo?user=1`，则有 `$route.query.user == 1`，如果没有查询参数，则是个空对象。

#### $route.hash

当前路由的 hash 值 (带 `#`) ，如果没有 hash 值，则为空字符串。

#### $route.fullPath

完成解析后的 URL，包含查询参数和 hash 的完整路径。

#### $route.matched

一个数组，包含当前路由的所有嵌套路径片段的**路由记录** 。路由记录就是 `routes`配置数组中的对象副本 (还有在 `children` 数组)。

```js
const router = new VueRouter({
  routes: [
    // 下面的对象就是路由记录
    { path: '/foo', component: Foo,
      children: [
        // 这也是个路由记录
        { path: 'bar', component: Bar }
      ]
    }
  ]
})
```

当 URL 为 `/foo/bar`，`$route.matched` 将会是一个包含从上到下的所有对象 (副本)。

#### $route.name

当前路由的名称，如果有的话。

#### $route.redirectedFrom

如果存在重定向，即为重定向来源的路由的名字。



## 组件注入

### 注入属性

通过在 Vue 根实例的 `router` 配置传入 router 实例，下面这些属性成员会被注入到每个子组件。

- **this.$router**

  router 实例。

- **this.$route**

  当前激活的[路由信息对象](https://router.vuejs.org/zh/api/#%E8%B7%AF%E7%94%B1%E5%AF%B9%E8%B1%A1)。这个属性是只读的，里面的属性是 immutable (不可变) 的，不过你可以 watch (监测变化) 它。

### 增加组件的配置选项

- **beforeRouteEnter**
- **beforeRouteUpdate**
- **beforeRouteLeave**

参看[组件内的守卫](https://router.vuejs.org/zh/guide/advanced/navigation-guards.html#%E7%BB%84%E4%BB%B6%E5%86%85%E7%9A%84%E5%AE%88%E5%8D%AB)



















