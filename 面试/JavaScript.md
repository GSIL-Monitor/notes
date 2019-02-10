#### js的数据类型都有那些？

```
基本数据类型：undefined，string，number，Boolean，Null，Symbol

引用数据类型：Array，Object，Date，RegExp。
```

#### JS有哪些内置对象？具体的方法？

```
数据封装类对象：Object，Array，Boolean，Number，String。

其他对象：Function，Arguments，Math，Date，RegExp，Error。
```

字符串转化为数字：`parseFloat('12.3b');`

#### 简要描述一下JS原型，原型链

```
function Person(){...}
Person.prototype.xxx=function(){...}
var p1=new Person();
p1.__proto__===Person.prototype//true

// instance.__proto__ = instance.constructor.prototype

继承
function Sub(){
    Person.call(this);
}
var s1=new Sub();
s1.xxx()
```

```
当我们需要一个属性的时，Javascript引擎会先看当前对象中是否有这个属性， 如果没有的话，就会查找他的Prototype对象是否有这个属性，如此递推下去，一直检索到 Object 内建对象。
```

#### JS内存空间分布是怎样的？

```
>> 栈：存放原始数据类型（Undefined，Null，Boolean，Number、String），占据空间小、大小固定，属于被频繁使用数据，所以放入栈中存储；

>> 堆：存放引用数据类型（对象，数组，函数），占据空间大、大小不固定。如果存储在栈中，将会影响程序运行的性能；引用数据类型在栈中存储了指针，该指针指向堆中该实体的起始地址。当解释器寻找引用值时，会首先检索其在栈中的地址，取得地址后从堆中获得实体

两种类型的区别是：存储位置不同；
```

![](E:\WebStorm_Dir\articles\images\内存.png)

















































