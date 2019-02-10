history对象的获取：window.history

![](E:\WebStorm_Dir\articles\images\history1.png)

lenght属性表示：历史堆栈中页面的数量



在history中实现跳转主要有三种方式：

history.back()：向后跳转一步

history.forward()：向前跳转一步

history.go(n)：任意向前向后跳转n步



## HTML5新增方法

### pushState（）

需要三个参数：一个状态对象，一个标题，一个URL；

**状态对象** —— 状态对象state是一个JavaScript对象，通过pushState () 创建新的历史记录条目。无论什么时候用户导航到新的状态，popstate事件就会被触发，且该事件的state属性包含该历史记录条目状态对象的副本。

**标题**——跳转的state传递一个短标题。

**URL** —— 该参数定义了新的历史URL记录。注意，调用 `pushState()` 后浏览器并不会立即加载这个URL，但可能会在稍后某些情况下加载这个URL，比如在用户重新打开浏览器时。新URL不必须为绝对路径。如果新URL是相对路径，那么它将被作为相对于当前URL处理。新URL必须与当前URL同源，否则 `pushState()` 会抛出一个异常。该参数是可选的，缺省为当前URL。

#### 使用案例

```js
var stateObj = { foo: "bar" };
history.pushState(stateObj, "page 2", "bar.html");
```

### 区别

 在某种意义上，调用 `pushState()` 与 设置 `window.location = "#foo"` 类似，二者都会在当前页面创建并激活新的历史记录。但 `pushState()` 具有如下几条优点：

- 新的 URL 可以是与当前URL同源的任意URL 。而设置 `window.location` 仅当你只修改了哈希值时才保持同一个 [`document`](https://developer.mozilla.org/zh-CN/docs/Web/API/Document)。
- 如果需要，你可以不必改变URL。而设置 `window.location = "#foo";`在当前哈希不是 `#foo` 的情况下， 仅仅是新建了一个新的历史记录项。
- 你可以为新的历史记录项关联任意数据。而基于哈希值的方式，则必须将所有相关数据编码到一个短字符串里。 
- 假如 `标题` 在之后会被浏览器用到，那么这个数据是可以被使用的（哈希则不然）。

注意 `pushState()` 绝对不会触发 `hashchange` 事件，即使新的URL与旧的URL仅哈希不同也是如此。



### replaceState（）

`history.replaceState()` 的使用与 `history.pushState()` 非常相似，区别在于  `replaceState()`  是修改了当前的历史记录项而不是新建一个。 注意这并不会阻止其在全局浏览器历史记录中创建一个新的历史记录项。

`replaceState()` 的使用场景在于为了响应用户操作，你想要更新状态对象state或者当前历史记录的URL。

#### 使用案例

```js
history.replaceState(stateObj, "page 3", "bar2.html");
```



### popState事件

每当活动的历史记录项发生变化时， `popstate` 事件都会被传递给window对象。如果当前活动的历史记录项是被 `pushState` 创建的，或者是由 `replaceState` 改变的，那么 `popstate`事件的状态属性 `state` 会包含一个当前历史记录状态对象的拷贝。

 页面加载时，或许会有个非null的状态对象。这是有可能发生的，举个例子，假如页面（通过`pushState()` 或 `replaceState()` 方法）设置了状态对象而后用户重启了浏览器。那么当页面重新加载时，页面会接收一个onload事件，但没有 popstate 事件。然而，假如你读取了history.state属性，你将会得到如同popstate 被触发时能得到的状态对象。

你可以读取当前历史记录项的状态对象state，而不必等待`popstate` 事件， 只需要这样使用`history.state` 属性： 

```js
var currentState = history.state;
```























































