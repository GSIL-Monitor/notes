### vm.$route与vm.router

使用模块注册 vue-router，将会在 Vue.prototype 中注入一个 `$route` 和 `$router` 的只读属性。

- `$route` 用于监测当前路由，`$router` 用于进行路由操作
- `$route` 与 `$router.currentRoute` 相同。
- `$route`为当前router跳转对象里面可以获取name、path、query、params等
- `$router`为VueRouter实例，想要导航到不同URL，则使用`$router.push`方法

有两种操作数据的方法

**query**

```
传参: 
this.$router.push({
        path:'/xxx'
        query:{
          id:id
        }
      })
  
接收参数:
this.$route.query.id
```

**params**

```
传参: 
this.$router.push({
        name:'xxx'
        params:{
          id:id
        }
      })
  
接收参数:
this.$route.params.id
```

**区别：**

params与name成对

query与path或者name成对

> 注意:params传参，push里面只能是 name:'xxxx',不能是path:'/xxx',因为params只能用name来引入路由，如果这里写成了path，接收参数页面会是undefined！！！
>
> 另外，二者还有点区别，直白的来说query相当于get请求，页面跳转的时候，可以在地址栏看到请求参数，而**params相当于post请求，参数不会再地址栏中显示**

**例子**

```js
/*使用query处理数据*/
// 设置query属性的值，以及要跳转到的路由的名字（goods）
this.$router.push({name:"Goods",query:id});


// 通过query属性获取数据
this.goodsId=this.$router.currentRoute.query;
//等价于
this.goodsId=this.$route.query;

// 也可以直接设置到具体的数据
this.$router.push({name:"Goods",query:{goodsId:id}});
// 也可以同样指定具体数据获取
this.goodsId=this.$route.query.goodsId;

// 使用router来实现后退
this.$router.go(-1);


/*使用param操作数据*/
// 只能用name，不能用path
this.$router.push({name:"Goods",params:{goodsId:id}});
this.goodsId=this.$route.params.goodsId;
// 好处是地址栏中不会有数据的
```

$route的基本结构

![1537671352190](E:\WebStorm_Dir\articles\images\$route.png)



$router的基本结构

![1537671410029](E:\WebStorm_Dir\articles\images\$router.png)



******



















































