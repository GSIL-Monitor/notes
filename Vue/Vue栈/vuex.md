## 1、安装

安装vuex

```bash
npm install vuex --save
```

必须显式地通过 `Vue.use()` 来安装 Vuex

```js
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
```

## 2、什么是vuex

Vuex 是一个专为 Vue.js 应用程序开发的状态管理模式。它采用集中式存储管理应用的所有组件的状态，并以相应的规则保证状态以一种可预测的方式发生变化。Vuex 也集成到 Vue 的官方调试工具 devtools extension，提供了诸如零配置的 time-travel 调试、状态快照导入导出等高级调试功能。

从一个简单的 Vue 计数应用开始：

```js
new Vue({
  // state
  data () {
    return {
      count: 0
    }
  },
  // view
  template: `
    <div>{{ count }}</div>
  `,
  // actions
  methods: {
    increment () {
      this.count++
    }
  }
})
```

这个状态自管理应用包含以下几个部分：

- **state**，驱动应用的数据源；
- **view**，以声明方式将 **state** 映射到视图；
- **actions**，响应在 **view** 上的用户输入导致的状态变化。

单向数据流的顺序是：state->view->action->state 循环



但是遇到**多个组件共享状态**时，单向数据流的简洁性很容易被破坏：

- **多个视图依赖于同一状态**

  传参的方法对于多层嵌套的组件将会非常繁琐，并且对于兄弟组件间的状态传递无能为力。

- **来自不同视图的行为需要变更同一状态**

  经常会采用父子组件直接引用或者通过事件来变更和同步状态的多份拷贝。



> 这里我们就要考虑将组件中的共享状态提取出来，以一个全局单例模式管理起来，在这种模式下，我们的组件构成了一个巨大的“视图”，不管在树的那个位置，任何组件都能获取状态或触发行为。

<span style="color:#f00">这就是vuex背后的基本思想</span>

vuex是专门为Vue.js设计的状态管理库。以利用Vue.js的细粒度数据响应机制来进行高效的状态更新。

![vuex.png](E:\WebStorm_Dir\articles\images\vuex.png)

vuex本身就是用于管理大量的数据的，所以，我们应该在大型的单页面应用中进行使用，否则会给简单的应用带来繁琐的操作。

## 3、开始使用

vuex的核心就是使用一个仓库store来管理应用中的大部分的状态。vuex与单纯的全局对象由如下两个不同：

1. vuex的状态存储是响应式的。当数据变化时，对应的视图也会获得对应的更新。
2. 你不能直接修改store里面的数据，必须显示的提交mutation来追踪、修改每一个状态。

首先需要创建一个store对象，里面有状态和状态的mutations：

```js
const store = new Vuex.Store({
  state: {
    count: 0
  },
  mutations: {
    increment (state) {
      state.count++
    }
  }
})
```

这里是直接使用Vuex.Store（{}）的方法生成store实例的，所以需要引入相关的内容：

```js
import Vuex from 'vuex'
import Vue from 'vue'
Vue.use(Vuex);
```

然后再在组件中对store中的数据进行操作（获取数据：store.state.xxx），操作的方式是调用store中的mutations来修改数据（操作数据：store.commit(mutation)）：

```js
export default {
  name: "compute",
    // 操作数据
  methods:{
    increment(){
      // 这里的incre方法等价于调用store里面的incre方法，commit表示媒介
      store.commit("increment");
    },
    decrement(){
      store.commit("decrement");
    }
  },
  computed:{
      // 获取数据
    count:function () {
      return store.state.count
    }
  }
}
```

## 4、核心概念

### state状态

#### 单一状态树

Vuex使用单一状态树：即每一个组件只能仅仅包含一个store实例

#### 获取状态

vue中获取store的状态使用的方式是：`store.state.xxx`，而且一般都是在computed计算属性阶段处理，方便视图获取到正确的数据格式。

状态属性的改变也会触发视图的及时更新，也就会触发DOM的更新。

> 这种模式导致组件依赖全局状态单例。在模块化的构建系统中，在每个需要使用 state 的组件中需要频繁地导入，并且在测试组件时需要模拟状态。

因此，Vue通过store选项，提供了一种机制将状态从根组件"注入"到每一个子组件中，因此在最组件中就有比较方便的方法来获取父组件中的状态store：

```js
const app = new Vue({
  el: '#app',
  // 把 store 对象提供给 “store” 选项，这可以把 store 的实例注入所有的子组件
    //===
  	store,
    //===
  components: { Counter },
  template: `
    <div class="app">
      <counter></counter>
    </div>
  `
})
```

上面的store是`store:store`的简写

通过在根实例中注册 `store` 选项，该 store 实例会注入到根组件下的所有子组件中，并且所有的数据都会放在`this.$store.state`中用于获取状态，且子组件能通过 `this.$store` 访问到。让我们更新下 `Counter` 的实现：

```js
computed: {
    count () {
      return this.$store.state.count
    }
  }
```

#### mapState辅助函数

当一个组件需要获取多个状态时候，将这些状态都声明为计算属性会有些重复和冗余。为了解决这个问题，我们可以使用 `mapState` 辅助函数帮助我们生成计算属性，让你少按几次键：

```js
// 在单独构建的版本中辅助函数为 Vuex.mapState
import { mapState } from 'vuex'

export default {
  // ...
  computed: mapState({
    // 箭头函数可使代码更简练
    count: state => state.count,

    // 传字符串参数 'count' 等同于 `state => state.count`
    countAlias: 'count',

    // 为了能够使用 `this` 获取局部状态，必须使用常规函数
    countPlusLocalState (state) {
      return state.count + this.localCount
    }
  })
}
```

当映射的计算属性的名称与 state 的子节点名称相同时，我们也可以给 `mapState` 传一个字符串数组。

```js
computed: mapState([
  // 映射 this.count 为 store.state.count
  'count'
])
```

`mapState` 函数返回的是一个对象。通常，我们需要使用一个工具函数将多个对象合并为一个，以使我们可以将最终对象传给 `computed` 属性。我们可以极大地简化写法：

```js
computed: {
  localComputed () { /* ... */ },
  // 使用对象展开运算符将此对象混入到外部对象中
  ...mapState({
    // ...
  })
}
```

> 使用 Vuex 并不意味着你需要将**所有的**状态放入 Vuex。虽然将所有的状态放到 Vuex 会使状态变化更显式和易调试，但也会使代码变得冗长和不直观。如果有些状态严格属于单个组件，最好还是作为组件的局部状态。你应该根据你的应用开发需要进行权衡和确定。























