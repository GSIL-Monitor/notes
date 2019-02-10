# this——一种更优雅的方式来代表一个对象的引用

## this中的四种绑定规则

### 默认绑定（es5）

​	this默认绑定当前作用域的对象，全局变量的this指向全局对象，即浏览器的window对象。

​	为了方便查看，本文中的所有的代码的外部模版如下，所有的js程序都是在script标签中实现的。

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body>
<script>
    //...
</script>
</body>
</html>
```

#### 非严格模式

```javascript
    var a=1;
    console.log(this);//  window
    console.log(this.a);//  1
    function f(){
        console.log(this);//  window
        console.log(this.a);//  1
    }
    f();
```

#### 严格模式

```javascript
    "use strict";
    var a=1;
    console.log(this);//  window
    console.log(this.a);//  1
    function f(){
        console.log(this);//  undefined
        console.log(this.a);//  TypeError:Cannot read property 'a' of undefined
    }
    f();
```

### 隐式绑定

​	隐式绑定值得是将函数执行的作用域改变，从而实现this绑定的问题，因为我们前面提到了，this指向的就是当前的作用域对象。

```javascript
var a="global";
function foo() {
    console.log(this);
    console.log(this.a);
}
let obj1={
    a:1,
    foo:foo,
}
let obj2={
    a:2,
    obj1:obj1,
}
obj1.foo();//  obj1  1
obj2.obj1.foo();//  obj1  1
```

​	首先，我们要提及一个概念，就是一个变量或者函数声明时所在的作用域，就是他的this指向。函数无论在哪里调用，其this都是指向声明时所在的作用域中，而我们主观认为的**调用处**的作用域就是this指向，而忽略了**声明处**才是真正的this指向。

​	看向我们的代码，第一个foo声明时，处在全局作用域下，那么他的this指向window，而this.a指向“global”。

​	在obj1中，我们重新定义了一个foo（obj1中）函数，它的作用（内部的变量与方法）与全局的foo（window中）一样，但是他是声明在obj1中的，所以foo的this一定是指向obj1，而且以后也不会改变。

​	现在开始执行`obj1.foo()`，这时执行的肯定就是obj1中的foo了，所以输出的this和this.a也就变成了obj1和1。

​	当调用`obj2.obj1.foo();`时，由上面的理解可以知道这里的obj1是obj2里面定义的obj1，此时obj1的this指向obj2，但是obj1里面的内容指向哪里？

​	`foo=function foo()`还是存在于obj1中的，而obj2中的foo:则是undefined。所以foo内部的作用指向的this还是obj1，所以得出了上述的输出结果。

### 显示绑定

​	首先回顾一下隐式绑定的特点：**this绑定在声明处**，从而也就可以理解显示绑定的含义了，即：**this绑定在调用处**。

​	显示绑定是一种强制性的this绑定，主要通过apply，call，bind将函数的this绑定到指定任意对象上，是这个对象的作用域来表示this。记住，是**任意对象**。

```javascript
var a=1;
function foo() {
    console.log(this);
    console.log(this.a);
}
let obj={
    a:2,
};
foo();  //  window  1
foo.call(obj);  //  obj  2
```

​	这里可以看到，没有使用call之前，foo内部的this指向的是window，所以内部的this.a也是指向1。而使用call()方法之后，foo内部的this强制的转换成了obj，从而内部的this.a也就指向了obj中的a了，即得到最后的输出。

​	这里提一下apply，call，bind三种方法的区别：

- apply()：接收两个参数，第一个是即将指向的对象，第二是函数foo的调用参数构成的一个完整数组；
- call()：接收n个参数，第一个是即将指向的对象，第二个以及后面的参数表示foo的调用参数，一个一个散列排列。
- bind()：在介绍bind之前，首先补充一点，就是apply与call都是在运行时绑定（foo使用call或者apply时，既绑定了this，又同时执行了foo），而bind方法则与前两种不相同，foo使用bind方法之后，仅仅只是绑定了this，但是并不回立即执行，如果需要执行，则还要调用此方法`foo.bind(obj)()`。



三种方法的区别可以展示为：

区别一：绑定后自执行的情况

```javascript
var a=0;
function foo() {
    console.log(this);
    console.log(this.a);
}
let obj1={
    a:1,
};
let obj2={
    a:2,
};
let obj3={
    a:3,
};
foo.apply(obj1);//   obj1    1
foo.call(obj2);//   obj2    2
// foo.bind(obj3);// 这样使用只是指定foo在当前this指向obj3，但是不会执行
foo.bind(obj3)();   //   obj3   3
/*无论前面强制绑定过多少次，foo的this默认都是指向a的*/
foo();
```

区别二：bind是硬绑定，之后的操作不会再改变this指向

```javascript
let obj1={
    name:"obj1",
    say:function () {
        console.log(this.name);
    }
};
let obj2={
    name:"obj2",
};

obj1.say();//   obj1
obj1.say.call(obj2);//  obj2
obj1.say.apply(obj2);//   obj2
obj1.say.apply(obj2).call(obj1);//  报错，不是funtion类型的变量不能使用call或者apply，因为前面已经自执行了，所以不是function
obj1.say.bind(obj2).call(obj1);//  obj2
// 此处虽然call是用在function类型的变量上，但是bind有硬绑定要求，后面的绑定均无效
```

### new 绑定

​	和其他高级语言一样 JavaScript 也有 new 操作符，我们知道 new 可以用来实例化一个类，从而在内存中分配一个实例对象。 但在 JavaScript 中，万物皆对象，为什么还要通过 new 来产生对象？ 带着这个问题，我们一步步来分析和理解 new 的一些特性：

#### 1.认识new 操作符

```javascript
    function Animal(name){
        this.name = name;
    }
    Animal.color ="black";
    Animal.prototype.say = function(){
        console.log("I'm a" +this.name);
    };
    var cat =new Animal("cat");
    console.log(cat.name, cat.height);
    cat.say();
    console.log(Animal.name, Animal.color);
    Animal.say();
```

​	其中new操作符，在以Animal为构造函数的基础上，创建了一个cat实例。然而在这个new操作符的过程中经历了那些过程呢？

#### 2.剖析new内部原理

```javascript
new Animal("cat")={
    var obj={};
    obj.__proto__=Animal.prototype;
    var result=Animal.call(obj,"cat");
    return typeof result==="object"?result:obj;
}
```

上述就是一个new操作符指向之后的内部实现：

1. 首先创建一个空对象obj；
2. 把obj的`__proto__`原型链指向构造函数Animal的原型对象Animal.prototype，就由此建立起了一个obj对象的原型链：`obj.__proto__->Animal.prototype->Object.prototype->null`
3. 在obj对象的执行环境调用Animal<!--Animal.call(obj,"cat")-->函数并传递参数“cat”。相当于`var result=obj.Animal("cat")等价于(obj.name="cat")`，执行完后，obj便产生了属性name并赋值为“cat”。
4. 确定上一步返回的result是否是一个对象，如果无返回值或者不是一个对象，则将obj作为新对象返回；否则会将result作为新对象返回。

然后整个new Animal()的返回值就是前面的var obj；

然后通过cat的原型链`cat.__proto__->Animal.prototype->Object.prototype->null`可以看出，cat实例可以获取到：

- Animal内部的属性和方法；
- Animal.prototype上的属性和方法；
- Object.prototype上属性和方法。

而Animal的原型为：`Animal.__proto__->Function.prototype->Object.prototype->null`

#### 3.探索new的真正意义

**cat继承了Animal对象**

​	通过上面的分析我们发现， cat 通过原型链继承了 Animal 中的部分属性，因此我们可以简单的认为：Animal 和 cat 是继承关系。

**cat是Animal的实例**

```javascript
cat instanceof Animal;//true
```

​	上述表达式为 true，认为 cat 是 Animal 的实例对象，我们用这个方法来判断一下cat 和 Animal。

​	从结果看，cat 确实是 Animal 实例，要想更加证实这个结果，我们再来了解一下 instanceof 的内部原理：

```javascript
var L=A.__proto__;
var R=B.prototype;
if (L===R){
    return true;
}
```

​	总之，如果 A 的`__proto__` 等价于 B 的 `prototype`，就返回true。

​	因此，通过 new 创建的 对象 和 构造函数 之间建立了一条原型链，原型链的建立，让原本孤立的对象有了依赖关系和继承能力，让JavaScript 对象能以更合适的方式来映射真实世界里的对象，这是面向对象的本质。



## ES6 下的this绑定

### let与const的this绑定

#### let命令

​	ES6 新增了let命令，用来声明变量。它的用法类似于var，但是所声明的变量，只在let命令所在的代码块内有效。

```javascript
{
    let a=10;
    var b=1;
}
console.log(b);//   1
console.log(a);//   ReferenceError: a is not defined
```

​	由上面可以看出，let声明变量**拥有块级作用域**，var没有块级作用域，所以外部能访问到var变量而不能访问到let变量。

​	对于var的另外一个弊端就是在处理事件循环（event loop）的时候导致的先循环完再指向事件的情况。

```javascript
// var作用下的for循环，面对事件循环的情况
var a=[];
for (var i=0;i<3;i++){
    a[i]=function () {
        console.log(i);
    }
}
a[1]();//   3
// let作用下的for循环，面对事件循环的情况
let b=[];
for (let i=0;i<3;i++){
    b[i]=function () {
        console.log(i);
    }
}
b[1]();//   1
```

​	for循环设置循环变量的那部分作用域是一个父作用域，循环体内部的是一个子作用域

​	而且let声明并**没有**ES5中的**变量提升**的概念。

```javascript
console.log(foo);
var foo=2;
console.log(foo2);//foo2 is not defined
let foo2=10;
```

​	let由于没有声明提升的原因（let变量也**不能重复声明**），所以会造成暂时性锁区（就是在let声明之前，所有涉及到let声明的变量的语句都会报错）

```javascript
var tmp=123;
if (true) {
    // TDZ开始
    tmp = 'abc'; // ReferenceError:tmp is not defined
    console.log(tmp); // ReferenceError:tmp is not defined

    let tmp; // TDZ结束
    console.log(tmp); // undefined

    tmp = 123;
    console.log(tmp); // 123
}
```

#### const 命令

const命令表示使用声明的变量不能 “ 改变 ”。

const声明一个常量，那这个常量是只读的，一旦声明，常量的值就不能改变。

 const的作用域与let命令相同：只在声明所在的块级作用域内有效。

const命令声明的常量也是不提升，同样存在暂时性死区，只能在声明的位置后面使用。

const实际上保证的，并不是变量的值不得改动，而是变量指向的那个内存地址不得改动，那么，我们所熟悉的数组，对象，map，set等等，只要地址不改变，内部的的内容修改是允许的。

当然，如果要将不变贯彻到底，可以采用`Object.freeze(obj2)`方法，那么此对象就真的是无论如何都不能进行操作了。

#### let和const的this问题

```javascript
    var b=1;
    let a=0;
    console.log(this);  // window
    console.log(this.a);    //  undefined
    console.log(a);//0
    console.log(this.b);//1
    console.log(b);//1
```

使用let定义的变量属于当前块级作用域，不再属于window了，因为a变量并不在window对象中。

通过debug可以看到，这里的`let a=0;`把变量定义到了我们写代码的script中了，其作用域也就是Script。

### 箭头函数的this指向

首先，箭头函数没有一个自己的this，但当你在内部使用了 this，常规的局部作用域准则就起作用了，它会指向最近一层作用域内的 this。

```JavaScript
var x=1;
var obj={
    x:2,
    say:function () {
        console.log(this.x);
    }
};
obj.say();//2

var x=1;
var obj={
    x:2,
    say:()=>{
        console.log(this.x)
    }
}
obj.say();//1
```

通过上面两段代码，我们可以看出第一个的this指向与我们所理解的是一样的，但是第二段代码this指向却是有点奇怪，好像指向的是window？，接下来就来探究一下具体的原因。

通过实验可以看出ES6中的箭头函数好像是针对运行时所在作用域来决定的，这样就有点类似于使用apply等方法将函数显式绑定在指向时所在的作用域。也就是说，箭头函数的this指定的就是他的执行上下文（作用域）。

```javascript
    var x=1;
    function f1() {
        console.log(this);//f1
        var a=1;
        console.log(this.a);//undefined
        this.x=2;
        console.log(this.x);//2
        var y=function () {
            console.log(this);//window
            console.log(this.x);//1
        };
        y();
    }
    new f1();
```

首先，这个地方我们先来理解一下在f1()中的变量与属性的区别，上边代码上有一个var定义的a，有一个this包含的x，由上面的代码输出可以看出，在f1()函数内部定义的变量并没有在f1的this上，所以输出的是undefined，而x则是指定位于this上的，所以this.x等于2。

**这里要提及一个概念，就是f1()内部的函数声明，他的this指向默认是指向window的。**

```javascript
    function f1() {
        this.x=1;
        function f2() {
            console.log(this);//window
            function f3() {
                console.log(this);//window
            }
            f3();
        }
        f2();
    }
    f1();
```

上面只是使用函数表达式的方式改变的，但是function内部的this依然指向的是window。但是在一个函数内部使用新的函数构成闭包，只是我们常常用到的，因此默认指向window肯定就不是我们希望的，所以这里可以使用箭头函数来“纠正”this指向。

```javascript
var x=1;
function f1() {
    this.x=2;
    var y=()=>{
        console.log(this);//f1
        console.log(this.x);//2
    }
    y();
}
new f1();
```

此时函数体内部的this就是指向他运行时的作用域，也就是y的作用域，此时明显y的作用域就是f1函数，所以this就指向了f1。

当然，如果不想使用箭头函数，或者感觉不好掌控，也可以使用apply，call，bind

```javascript
    var x=1;
    function f1() {
        this.x=2;
        var y=function () {
            console.log(this);
            console.log(this.x);
        };
        y.apply(this);// f1,2
        y.call(this);// f1,2
        y.bind(this)();// f1,2
        y();// window 1
    }
    new f1();
```

使用这三种方法改变this之后也可以得出需要的结果。并且在之后也可以使用默认情况下的y，具体使用，可以根据情况灵活判断，这里就不做过多赘述。

本文 终...