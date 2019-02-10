**安装**

```sh
npm install mongoose --save
```

******

### connect

**connect连接数据库**

```js
const mongoose=require('mongoose')
mongoose.connect(url(s), [options], [callback])
//url(s):数据库地址,可以是多个,以`,`隔开
//options:可选,配置参数
//callback:可选,回调
mongoose.connect('mongodb://数据库地址(包括端口号)/数据库名称')
```

**指定用户连接**

```js
mongoose.connect('mongodb://用户名:密码@127.0.0.1:27017/数据库名称')
```

**连接多个数据库**

如果你的app中要连接多个数据库，只需要设置多个url以,隔开，同时设置`mongos`为true

```js
mongoose.connect('urlA,urlB,...', {
   mongos : true 
})
```

**回调参数**，控制不同状态的处理方式

```js
var mongoose = require('mongoose');
mongoose.connect("mongodb://localhost/test", function(err) {
    if(err){
        console.log('连接失败');
    }else{
        console.log('连接成功');
    }
});
```

**connnection**：处理不同连接状态的事件处理程序

```js
var mongoose = require('mongoose'),
    DB_URL = 'mongodb://localhost:27017/mongoosesample';
/**
 * 连接
 */
mongoose.connect(DB_URL);
/**
  * 连接成功
  */
mongoose.connection.on('connected', function () {    
    console.log('Mongoose connection open to ' + DB_URL);  
});    
/**
 * 连接异常
 */
mongoose.connection.on('error',function (err) {    
    console.log('Mongoose connection error: ' + err);  
});    
/**
 * 连接断开
 */
mongoose.connection.on('disconnected', function () {    
    console.log('Mongoose connection disconnected');  
}); 
```

******

### disconnect（）

```
mongoose.disconnect()
```

使用disconnect（）方法可以断开数据库连接

```js
var mongoose = require('mongoose');
mongoose.connect("mongodb://u1:123456@localhost/db1", function(err) {
    if(err){
        console.log('连接失败');
    }else{
        console.log('连接成功');
    }
});
// 连接数据库，然后两秒后断开
setTimeout(function(){
    mongoose.disconnect(function(){
        console.log("断开连接");
    })
}, 2000);
```

******

### Schema

> Schema主要用于定义MongoDB中集合Collection里文档document的结构,可以理解为mongoose对表结构的定义(不仅仅可以定义文档的结构和属性，还可以定义文档的实例方法、静态模型方法、复合索引等)，每个schema会映射到mongodb中的一个collection，schema不具备操作数据库的能力。

定义Schema非常简单，指定字段名和类型即可，支持的类型包括以下8种

```
String      字符串
Number      数字    
Date        日期
Buffer      二进制
Boolean     布尔值
Mixed       混合类型
ObjectId    对象ID    
Array       数组
```

通过`mongoose.Schema`来获取函数`Schema`，然后使用new方法来创建schema实例

```js
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var mySchema = new Schema({
  title:  String,
  author: String,
  body:   String,
  comments: [{ body: String, date: Date }],
  date: { type: Date, default: Date.now },
  hidden: Boolean,
  meta: {
    votes: Number,
    favs:  Number
  }
});
```

> 创建Schema对象时，声明字段类型有两种方法，一种是首字母大写的字段类型，另一种是引号包含的小写字段类型

```js
var mySchema = new Schema({title:String, author:String});
//或者 
var mySchema = new Schema({title:'string', author:'string'});
```

如果需要在Schema定义后添加其他字段，可以使用`add()`方法**添加额外的字段**。

```js
var MySchema = new Schema;
MySchema.add({ name: 'string', color: 'string', price: 'number' });

```

创建好的schemas需要在服务端启动的时候加载进去：

```js
// 要载入schemas必须要引入一个glob和一个resolve
exports.initSchemas = ()=>{
  //glob：node的glob模块允许你使用 * 等符号，来写一个glob规则，像在shell里一样，获取匹配对应规则文件。
  // resolve: 将一系列路径或路径段解析为绝对路径。
  // 了解两个引入的模块用法后，我们就可以 “一次性引入” 所有的Schema文件了。
  glob.sync(resolve(__dirname,'./schema','**/*.js')).forEach(require)
}
```







******

### Model

> Model是由`Schema`编译而成的假想构造器（一个schema实例），具有抽象属性和行为。Model的每一个实例（instance）就是一个document，document可以保存到数据库和对数据库进行操作。简单说就是model是由schema生成的模型，可以对数据库的操作。

使用model()方法，将Schema编译为Model。`model()`方法的第一个参数是模型名称

```js
mongoose.model(`文档名称`, Schema)
```

> **注意**：一定要将model()方法的第一个参数和其返回值设置为相同的值，否则会出现不可预知的结果

#### Mongoose.model（）

Mongoose会将集合名称设置为模型名称的小写版。

> 如果名称的最后一个字符是字母，则会变成复数；如果名称的最后一个字符是数字，则不变；如果模型名称为"MyModel"，则集合名称为"mymodels"；如果模型名称为"Model1"，则集合名称为"model1"

```js
var schema = new mongoose.Schema({ num:Number, name: String, size: String});
var MyModel = mongoose.model('MyModel', schema);
```

通过对原型Model1使用new方法，实例化出文档document对象

```js
var mongoose = require('mongoose');
mongoose.connect("mongodb://u1:123456@localhost/db1", function(err) {
    if(err){
        console.log('连接失败');
    }else{
        console.log('连接成功');
        var schema = new mongoose.Schema({ num:Number, name: String, size: String});
        var MyModel = mongoose.model('MyModel', schema);
        // 通过对原型Model1使用new方法，实例化出文档document对象
        var doc1 = new MyModel({ size: 'small' });
        console.log(doc1.size);//'small'
    }
});
```

#### instance.save()

通过new Model1()创建的**实例**文档doc1，必须通过save()方法，才能将创建的文档保存到数据库的集合中，集合名称为模型名称的小写复数版

回调函数是可选项，第一个参数为err，第二个参数为保存的文档对象

```
save(function (err, doc) {})
```

```js
var mongoose = require('mongoose');
mongoose.connect("mongodb://u1:123456@localhost/db1", function(err) {
    if(!err){
        var schema = new mongoose.Schema({ num:Number, name: String, size: String });
        // 创建一个实例
        var MyModel = mongoose.model('MyModel', schema);
        var doc1 = new MyModel({ size: 'small' });
        // 将文档数据存储到数据库
        doc1.save(function (err,doc) {
        //{ __v: 0, size: 'small', _id: 5970daba61162662b45a24a1 }
          console.log(doc);
        })
    }
});
```

#### 实例方法methods

Model的实例是document，内置实例方法有很多，如 save，可以通过Schema对象的methods属性给实例自定义实例方法

```js
var mongoose = require('mongoose');
mongoose.connect("mongodb://u1:123456@localhost/db1", function(err) {
    if(!err){
        var schema = new mongoose.Schema({ num:Number, name: String, size: String });        
        schema.methods.findSimilarSizes = function(cb){
            return this.model('MyModel').find({size:this.size},cb);
        }
        // 创建model并存入数据
        var MyModel = mongoose.model('MyModel', schema);
        var doc1 = new MyModel({ name:'doc1', size: 'small' });
        var doc2 = new MyModel({ name:'doc2', size: 'small' });
        var doc3 = new MyModel({ name:'doc3', size: 'big' });
        doc1.save();
        doc2.save();
        doc3.save();
        setTimeout(function(){
            doc1.findSimilarSizes(function(err,docs){
                docs.forEach(function(item,index,arr){
                    //doc1
                    //doc2
                     console.log(item.name)        
                })
            })
        },0)
    }
});
```



#### 静态方法statics

通过Schema对象的statics属性给 Model 添加静态方法

```js
var mongoose = require('mongoose');
mongoose.connect("mongodb://u1:123456@localhost/db1", function(err) {
    if(!err){
        var schema = new mongoose.Schema({ num:Number, name: String, size: String });        
        schema.statics.findByName = function(name,cb){
            return this.find({name: new RegExp(name,'i')},cb);
        }
        var MyModel = mongoose.model('MyModel', schema);
        var doc1 = new MyModel({ name:'doc1', size: 'small' });
        var doc2 = new MyModel({ name:'doc2', size: 'small' });
        var doc3 = new MyModel({ name:'doc3', size: 'big' });
        doc1.save();
        doc2.save();
        doc3.save();
        setTimeout(function(){
            MyModel.findByName('doc1',function(err,docs){
                //[ { _id: 5971e68f4f4216605880dca2,name: 'doc1',size: 'small',__v: 0 } ]
                console.log(docs);
            })  
        },0)  
    }
});
```

实例方法和静态方法的区别在于，静态方法是通过Schema对象的statics属性给model添加方法，实例方法是通过Schema对象的methods是给document添加方法

区别：

两者定义方法的方式类似：

```js
// 实例方法
schema.methods.findSimilarSizes = function(cb){
 return this.model('MyModel').find({size:this.size},cb);
}
// 静态方法
schema.statics.findByName = function(name,cb){
 return this.find({name: new RegExp(name,'i')},cb);
}
```

但是使用此方法的对象却不同：

```
// 作用于文档
doc1.findSimilarSizes(function(err,docs){
    docs.forEach(function(item,index,arr){
        //doc1
        //doc2
        console.log(item.name)        
	})
})  
// 作用于模块 
MyModel.findByName('doc1',function(err,docs){
//[ { _id: 5971e68f4f4216605880dca2,name: 'doc1',size: 'small',__v: 0 } ]
	console.log(docs);
}) 
```



#### 查询方法

通过schema对象的query属性，给model添加查询方法

```js
var mongoose = require('mongoose');
mongoose.connect("mongodb://u1:123456@localhost/db1", function(err) {
    if(!err){
       var schema = new mongoose.Schema({ age:Number, name: String});        
       schema.query.byName = function(name){
            return this.find({name: new RegExp(name)});
       }
       var temp = mongoose.model('temp', schema);   
       temp.find().byName('huo').exec(function(err,docs){
            //[ { _id: 5971f93be6f98ec60e3dc86c, name: 'huochai', age: 27 },
            // { _id: 5971f93be6f98ec60e3dc86e, name: 'huo', age: 30 } ]
            console.log(docs);
        })  
    }           
});
```



### 文档新增

文档新增有三种方法，一种是使用上面介绍过的文档的save()方法，另一种是使用模型model的create()方法，最后一种是模型model的insertMany()方法。

#### save（）

```js
save([options], [options.safe], [options.validateBeforeSave], [fn])
```

新建{age:10,name:'save'}文档，并保存

```js
var mongoose = require('mongoose');
mongoose.connect("mongodb://u1:123456@localhost/db1", function(err) {
    if(!err){
        var schema = new mongoose.Schema({ age:Number, name: String});        
        var temp = mongoose.model('temp', schema);
        //使用链式写法，只能model实例才能使用save方法
        new temp({age:10,name:'save'}).save(function(err,doc){
            //[ { _id: 59720bc0d2b1125cbcd60b3f, age: 10, name: 'save', __v: 0 } ]
            console.log(doc);        
        });         
    }           
});
```

#### create（）

使用save()方法，需要先实例化为文档，再使用save()方法保存文档。而create()方法，则直接在模型Model上操作，并且可以同时新增多个文档

```js
Model.create(doc(s), [callback])
```

新增{name:"xiaowang"}，{name:"xiaoli"}这两个文档

```js
var mongoose = require('mongoose');
mongoose.connect("mongodb://u1:123456@localhost/db1", function(err) {
    if(!err){
        var schema = new mongoose.Schema({ age:Number, name: String});        
        var temp = mongoose.model('temp', schema);   
        temp.create({name:"xiaowang"},{name:"xiaoli"},function(err,doc1,doc2){
            //{ __v: 0, name: 'xiaowang', _id: 59720d83ad8a953f5cd04664 }
            console.log(doc1); 
            //{ __v: 0, name: 'xiaoli', _id: 59720d83ad8a953f5cd04665 }
            console.log(doc2); 
        });       
    }           
});
```

#### insertMany（）

表示同时插入多个文档，model使用的方法。

```
Model.insertMany(doc(s), [options], [callback])
```


新增{name:"a"}，{name:"b"}这两个文档

```js
var mongoose = require('mongoose');
mongoose.connect("mongodb://u1:123456@localhost/db1", function(err) {
    if(!err){
        var schema = new mongoose.Schema({ age:Number, name: String});        
        var temp = mongoose.model('temp', schema);   
        temp.insertMany([{name:"a"},{name:"b"}],function(err,docs){
            //[ { __v: 0, name: 'a', _id: 59720ea1bbf5792af824b30c },
            //{ __v: 0, name: 'b', _id: 59720ea1bbf5792af824b30d } ]
            console.log(docs); 
        });       

    }           
});
```

### 文档查询

#### find()

　　第一个参数表示查询条件，第二个参数用于控制返回的字段，第三个参数用于配置查询参数，第四个参数是回调函数，回调函数的形式为function(err,docs){}

```
Model.find(conditions, [projection], [options], [callback])
```

使用find()方法找出所有数据，只有回调函数时的用法

```js
var mongoose = require('mongoose');
mongoose.connect("mongodb://u1:123456@localhost/db1", function(err) {
    if(!err){
        var schema = new mongoose.Schema({ age:Number, name: String});        
        var temp = mongoose.model('temp', schema);
        temp.find(function(err,docs){
            //[ { _id: 5971f93be6f98ec60e3dc86c, name: 'huochai', age: 27 },
            //{ _id: 5971f93be6f98ec60e3dc86d, name: 'wang', age: 18 },
            //{ _id: 5971f93be6f98ec60e3dc86e, name: 'huo', age: 30 },
            //{ _id: 5971f93be6f98ec60e3dc86f, name: 'li', age: 12 } ]
            console.log(docs);
        })
    }
});
```

找出年龄大于18的数据

```js
  temp.find({age:{$gte:18}},function(err,docs){
        //[ { _id: 5971f93be6f98ec60e3dc86c, name: 'huochai', age: 27 },
        //{ _id: 5971f93be6f98ec60e3dc86d, name: 'wang', age: 18 },
        //{ _id: 5971f93be6f98ec60e3dc86e, name: 'huo', age: 30 }]
        console.log(docs);
    })
```

找出年龄大于18且名字里存在'huo'的数据

```js
 temp.find({name:/huo/,age:{$gte:18}},function(err,docs){
            //[ { _id: 5971f93be6f98ec60e3dc86c, name: 'huochai', age: 27 },
            //{ _id: 5971f93be6f98ec60e3dc86e, name: 'huo', age: 30 }]
            console.log(docs);
        })
```

找出名字里存在'a'的数据，且只输出'name'字段

> [注意]   _id字段默认输出

```js
temp.find({name:/a/},'name',function(err,docs){
    //[ { _id: 5971f93be6f98ec60e3dc86c, name: 'huochai' },
    //{ _id: 5971f93be6f98ec60e3dc86d, name: 'wang' } ]
     console.log(docs);
  })
```

如果确实不需要_id字段输出，可以进行如下设置

```js
  temp.find({name:/a/},{name:1,_id:0},function(err,docs){
    //[ { name: 'huochai' }, { name: 'wang' } ]
     console.log(docs);
  })
```

找出跳过前两条数据的其他所有数据

> [注意]  如果使用第三个参数，前两个参数如果没有值，需要设置为null

```js
temp.find(null,null,{skip:2},function(err,docs){
        //[ { _id: 5971f93be6f98ec60e3dc86e, name: 'huo', age: 30 },
        //{ _id: 5971f93be6f98ec60e3dc86f, name: 'li', age: 12 } ]
        console.log(docs);
    })
```

#### findById()

```
Model.findById(id, [projection], [options], [callback])
```

显示第0个元素的所有字段

```js
var aIDArr = [];
    temp.find(function(err,docs){
        docs.forEach(function(item,index,arr){
            // 先把所有id存入一个数组中
            aIDArr.push(item._id);
        })
        // 针对指定id获取到对应的doc文档
        temp.findById(aIDArr[0],function(err,doc){
            //{ _id: 5971f93be6f98ec60e3dc86c, name: 'huochai', age: 27 }
            console.log(doc);
        })            
    })
```

另一种写法如下

```js
temp.findById(aIDArr[0]).exec(function(err,doc){
            //{ _id: 5971f93be6f98ec60e3dc86c, name: 'huochai', age: 27 }
            console.log(doc);
        })  
```

只输出name字段

```js
 temp.findById(aIDArr[0],{name:1,_id:0},function(err,doc){
        //{  name: 'huochai'}
        console.log(doc);
    })
```

输出最少的字段

```js
    temp.findById(aIDArr[0],{lean:true},function(err,doc){
        //{ _id: 5971f93be6f98ec60e3dc86c }
        console.log(doc);
    })   
    temp.findById(aIDArr[0],{lean:true}).exec(function(err,doc){
        //{ _id: 5971f93be6f98ec60e3dc86c }
        console.log(doc);
    })     
```

#### findOne()

该方法返回查找到的所有实例的第一个

```
Model.findOne([conditions], [projection], [options], [callback])
```

找出age>20的文档中的第一个文档，有两种实现方法如下

```js
// 方法一
temp.findOne({age:{$gt : 20}},function(err,doc){
        //{ _id: 5971f93be6f98ec60e3dc86c, name: 'huochai', age: 27 }
        console.log(doc);
    }) 
// 方法二
temp.findOne({age:{$gt : 20}}).exec(function(err,doc){
        //{ _id: 5971f93be6f98ec60e3dc86c, name: 'huochai', age: 27 }
    console.log(doc);
}) 
```

找出age>20的文档中的第一个文档，且只输出name字段



```js
temp.findOne({age:{$gt : 20}},{name:1,_id:0},function(err,doc){
    //{ name: 'huochai' }
    console.log(doc);
})   
temp.findOne({age:{$gt : 20}},{name:1,_id:0}).exec(function(err,doc){
    //{ name: 'huochai' }
    console.log(doc);
})
```

找出age>20的文档中的第一个文档，且输出包含name字段在内的最短字段

```js
temp.findOne({age:{$gt : 20}},"name",{lean:true},function(err,doc){
    //{ _id: 5971f93be6f98ec60e3dc86c, name: 'huochai' }
    console.log(doc);
})   
temp.findOne({age:{$gt : 20}},"name").lean().exec(function(err,doc){
    //{ _id: 5971f93be6f98ec60e3dc86c, name: 'huochai' }
    console.log(doc);
})   
```

#### 文档查询中，常用的查询条件如下

```
$or　　　　或关系
$nor　　　 或关系取反
$gt　　　　大于
$gte　　　 大于等于
$lt　　　　小于
$lte　　　 小于等于
$ne　　　　不等于
$in　　　　在多个值范围内
$nin　　　 不在多个值范围内
$all　　　 匹配数组中多个值
$regex　　 正则，用于模糊查询
$size　　　匹配数组大小
$maxDistance　范围查询，距离（基于LBS）
$mod　　　　取模运算
$near　　　 邻域查询，查询附近的位置（基于LBS）
$exists　　 字段是否存在
$elemMatch　匹配内数组内的元素
$within　　　范围查询（基于LBS）
$box　　　　 范围查询，矩形范围（基于LBS）
$center　　　范围醒询，圆形范围（基于LBS）
$centerSphere　范围查询，球形范围（基于LBS）
$slice　　　　查询字段集合中的元素（比如从第几个之后，第N到第M个元素
```

#### $where



如果要进行更复杂的查询，需要使用$where操作符，$where操作符功能强大而且灵活，它可以使用任意的JavaScript作为查询的一部分，包含JavaScript表达式的字符串或者JavaScript函数

**使用字符串**

```js
temp.find({$where:"this.x == this.y"},function(err,docs){
	//[ { _id: 5972ed35e6f98ec60e3dc887,name: 'wang',age: 18,x: 1,y: 1 },
	//{ _id: 5972ed35e6f98ec60e3dc889, name: 'li', age: 20, x: 2, y: 2 } ]
	console.log(docs);
})
temp.find({$where:"obj.x == obj.y"},function(err,docs){
	//[ { _id: 5972ed35e6f98ec60e3dc887,name: 'wang',age: 18,x: 1,y: 1 },
	//{ _id: 5972ed35e6f98ec60e3dc889, name: 'li', age: 20, x: 2, y: 2 } ]
	console.log(docs);
})
```

**使用函数**

```js
temp.find({$where:function(){
        return obj.x !== obj.y;
    }},function(err,docs){
    //[ { _id: 5972ed35e6f98ec60e3dc886,name: 'huochai',age: 27,x: 1,y: 2 },
    //{ _id: 5972ed35e6f98ec60e3dc888, name: 'huo', age: 30, x: 2, y: 1 } ]
    console.log(docs);
}) 
```

```js
temp.find({$where:function(){
        return this.x !== this.y;
    }},function(err,docs){
    //[ { _id: 5972ed35e6f98ec60e3dc886,name: 'huochai',age: 27,x: 1,y: 2 },
    //{ _id: 5972ed35e6f98ec60e3dc888, name: 'huo', age: 30, x: 2, y: 1 } ]
    console.log(docs);
}) 
```



### 文档更新

#### update（）

```
Model.update(conditions, doc, [options], [callback])
```

第一个参数conditions为查询条件，第二个参数doc为需要修改的数据，第三个参数options为控制选项，第四个参数是回调函数

options有如下选项

```
safe (boolean)： 默认为true。安全模式。
upsert (boolean)： 默认为false。如果不存在则创建新记录。
multi (boolean)： 默认为false。是否更新多个查询记录。
runValidators： 如果值为true，执行Validation验证。
setDefaultsOnInsert： 如果upsert选项为true，在新建时插入文档定义的默认值。
strict (boolean)： 以strict模式进行更新。
overwrite (boolean)： 默认为false。禁用update-only模式，允许覆盖记录。
```

现在使用update()方法查询age大于20的数据，并将其年龄更改为40岁

```js
var mongoose = require('mongoose');
mongoose.connect("mongodb://u1:123456@localhost/db1", function(err) {
    if(!err){
        var schema = new mongoose.Schema({ age:Number, name: String});        
        var temp = mongoose.model('temp', schema);   
        temp.update({age:{$gte:20}},{age:40},function(err,raw){
            //{ n: 1, nModified: 1, ok: 1 }
            console.log(raw);
        })

    }           
});
```

如果要同时更新多个记录，需要设置options里的multi为true。下面将名字中有'a'字符的年龄设置为10岁

```js
var mongoose = require('mongoose');
mongoose.connect("mongodb://u1:123456@localhost/db1", function(err) {
    if(!err){
        var schema = new mongoose.Schema({ age:Number, name: String});        
        var temp = mongoose.model('temp', schema);   
        temp.update({name:/a/},{age: 10},{multi:true},function(err,raw){
            //{ n: 2, nModified: 2, ok: 1 }
            console.log(raw);
        })
    }           
});
```

如果设置的查找条件，数据库里的数据并不满足，默认什么事都不发生

```js
temp.update({age:100},{name: "hundred"},function(err,raw){
    //{ n: 0, nModified: 0, ok: 1 }
    console.log(raw);
})
```

如果设置options里的upsert参数为true，若没有符合查询条件的文档，mongo将会综合第一第二个参数向集合插入一个新的文档（存在即修改，不存在即添加）

```js
temp.update({age:100},{name: "hundred"},{upsert:true},function(err,raw){
    //{ n: 1, nModified: 0,upserted: [ { index: 0, _id: 5972c202d46b621fca7fc8c7 } ], ok: 1 }
    console.log(raw);
})
```

> [注意]   update()方法中的回调函数不能省略，否则数据不会被更新。如果回调函数里并没有什么有用的信息，则可以使用exec()简化代码

```js
temp.update({name:/aa/},{age: 0},{upsert:true}).exec();
```

#### updateMany（）

updateMany()与update()方法唯一的区别就是默认更新多个文档，即使设置{multi:false}也无法只更新第一个文档。

```
Model.updateMany(conditions, doc, [options], [callback])
```

将数据库中名字中带有'huo'的数据，年龄变为50岁

```js
temp.updateMany({name:/huo/},{age:50},function(err,raw){
    //{ n: 2, nModified: 2, ok: 1 }
    console.log(raw);
});
```

#### find（）+save（）

如果需要更新的操作比较复杂，可以使用find()+save()方法来处理，比如找到年龄小于30岁的数据，名字后面添加'30'字符

```js
temp.find({age:{$lt:20}},function(err,docs){
    //[ { _id: 5971f93be6f98ec60e3dc86d, name: 'wang', age: 10 },
    //{ _id: 5971f93be6f98ec60e3dc86f, name: 'li', age: 12 }]
    console.log(docs);
    docs.forEach(function(item,index,arr){
        item.name += '30';
        item.save();
    })
    //[ { _id: 5971f93be6f98ec60e3dc86d, name: 'wang30', age: 10 },
    // { _id: 5971f93be6f98ec60e3dc86f, name: 'li30', age: 12 }]
    console.log(docs);
});
```

#### updateOne（）

updateOne()方法只能更新找到的第一条数据，即使设置{multi:true}也无法同时更新多个文档

将数据库中名字中带有'huo'的数据，年龄变为60岁

```js
temp.updateOne({name:/huo/},{age:60},function(err,raw){
    //{ n: 1, nModified: 1, ok: 1 }
    console.log(raw);
});
```

#### findOne() + save()

　　如果需要更新的操作比较复杂，可以使用findOne()+save()方法来处理，比如找到名字为'huochai'的数据，年龄加100岁

```js
temp.findOne({name:'huochai'},function(err,doc){
    //{ _id: 5971f93be6f98ec60e3dc86c, name: 'huochai', age: 10 }
    console.log(doc);
    doc.age += 100;
    doc.save();
    //{ _id: 5971f93be6f98ec60e3dc86c, name: 'huochai', age: 110 }
    console.log(doc);
});
```

#### findOneAndUpdate()

fineOneAndUpdate()方法的第四个参数回调函数的形式如下function(err,doc){}

```
Model.findOneAndUpdate([conditions], [update], [options], [callback])
```

#### findByIdAndUpdate

fineByIdAndUpdate()方法的第四个参数回调函数的形式如下function(err,doc){}

```
Model.findOneAndUpdate([conditions], [update], [options], [callback])
```

### 文档删除

#### remove()

　　remove有两种形式，一种是文档的remove()方法，一种是Model的remove()方法

　　下面介绍Model的remove()方法，该方法的第一个参数conditions为查询条件，第二个参数回调函数的形式如下function(err){}　　

```
model.remove(conditions, [callback])
```

删除数据库中名称包括'30'的数据

```js
temp.remove({name:/30/},function(err){})
```

> [注意]   remove()方法中的回调函数不能省略，否则数据不会被删除。

当然，可以使用exec()方法来简写代码

```js
temp.remove({name:/30/}).exec()
```

下面介绍文档的remove()方法，该方法的参数回调函数的形式如下function(err,doc){}

```
document.remove([callback])
```

删除数据库中名称包含'huo'的数据

> [注意]    文档的remove()方法的回调函数参数可以省略

```js
temp.find({name:/huo/},function(err,doc){
    doc.forEach(function(item,index,arr){
        item.remove(function(err,doc){
            //{ _id: 5971f93be6f98ec60e3dc86c, name: 'huochai', age: 30 }
            //{ _id: 5971f93be6f98ec60e3dc86e, name: 'huo', age: 60 }
            console.log(doc);
        })
    })
})  
```

#### findOneAndRemove()

model的remove()会删除符合条件的所有数据，如果只删除符合条件的第一条数据，则可以使用model的findOneAndRemove()方法

```
Model.findOneAndRemove(conditions, [options], [callback])
```

现在删除第一个年龄小于20的数据

```js
temp.findOneAndRemove({age:{$lt:20}},function(err,doc){
    //{ _id: 5972d3f3e6f98ec60e3dc873, name: 'wang', age: 18 }
    console.log(doc);
})
```

与model的remove()方法相同，回调函数不能省略，否则数据不会被删除。当然，可以使用exec()方法来简写代码

```js
temp.findOneAndRemove({age:{$lt:20}}).exec()
```

#### findByIdAndRemove()

```
Model.findByIdAndRemove(id, [options], [callback])
```

删除第0个元素

```js
var aIDArr = [];
temp.find(function(err,docs){
    docs.forEach(function(item,index,arr){
        aIDArr.push(item._id);
    })
    temp.findByIdAndRemove(aIDArr[0],function(err,doc){
        //{ _id: 5972d754e6f98ec60e3dc882, name: 'huochai', age: 27 }
        console.log(doc);
    })            
})
```

类似的，该方法也不能省略回调函数，否则数据不会被删除。当然，可以使用exec()方法来简写代码

```js
var aIDArr = [];
temp.find(function(err,docs){
    docs.forEach(function(item,index,arr){
        aIDArr.push(item._id);
    })
    temp.findByIdAndRemove(aIDArr[0]).exec()            
})
```

### 前后钩子

前后钩子即pre()和post()方法，又称为中间件，是在执行某些操作时可以执行的函数。中间件在schema上指定，类似于静态方法或实例方法等

可以在数据库执行下列操作时，设置的前后钩子有

```
validate
save
remove
count
find
findOne
findOneAndRemove
findOneAndUpdate
insertMany
update
```

#### pre()

以find()方法为例，pre()方法表示在执行find()方法之前的行为。使用next的方式来跳转到下一个方法

```js
var schema = new mongoose.Schema({ age:Number, name: String,x:Number,y:Number});  
schema.pre('find',function(next){
    console.log('我是pre方法1');
    next();
});
schema.pre('find',function(next){
    console.log('我是pre方法2');
    next();
});  
var temp = mongoose.model('temp', schema);
temp.find(function(err,docs){
    console.log(docs[0]);
})    
/*
我是pre方法1
我是pre方法2
{ _id: 5972ed35e6f98ec60e3dc886,name: 'huochai',age: 27,x: 1,y: 2 }
*/
```

#### post()

post()方法并不是在执行某些操作后再去执行的方法，而在**执行某些操作前最后执行的方法**，post()方法里不可以使用next()

```js
var schema = new mongoose.Schema({ age:Number, name: String,x:Number,y:Number});  
schema.post('find',function(docs){
    console.log('我是post方法1');
});
schema.post('find',function(docs){
    console.log('我是post方法2');
});
var temp = mongoose.model('temp', schema);
temp.find(function(err,docs){
    console.log(docs[0]);
}) 
/*
我是post方法1
我是post方法2
{ _id: 5972ed35e6f98ec60e3dc886,name: 'huochai',age: 27,x: 1,y: 2 }
 */  
```

### 查询后处理

常用的查询后处理的方法如下所示

```
sort     排序
skip     跳过
limit    限制
select   显示字段
exect    执行
count    计数
distinct 去重
```

#### sort()

按age从小到大排序

```js
temp.find().sort("age").exec(function(err,docs){
    //[ { _id: 5972ed35e6f98ec60e3dc887,name: 'wang',age: 18,x: 1,y: 1 },
    //{ _id: 5972ed35e6f98ec60e3dc889, name: 'li', age: 20, x: 2, y: 2 },
    //{ _id: 5972ed35e6f98ec60e3dc886,name: 'huochai',age: 27,x: 1,y: 2 },
    //{ _id: 5972ed35e6f98ec60e3dc888, name: 'huo', age: 30, x: 2, y: 1 } ]
    console.log(docs);
}); 
```

按x从小到大，age从大到小排列

```js
temp.find().sort("x -age").exec(function(err,docs){
    //[ { _id: 5972ed35e6f98ec60e3dc886,name: 'huochai',age: 27,x: 1,y: 2 },
    //{  _id: 5972ed35e6f98ec60e3dc887,name: 'wang',age: 18,x: 1,y: 1 },
    //{ _id: 5972ed35e6f98ec60e3dc888, name: 'huo', age: 30, x: 2, y: 1 },
    //{ _id: 5972ed35e6f98ec60e3dc889, name: 'li', age: 20, x: 2, y: 2 } ]
    console.log(docs);
}); 
```

#### skip()

跳过1个，显示其他

```js
temp.find().skip(1).exec(function(err,docs){
    //[ { _id: 5972ed35e6f98ec60e3dc887,name: 'wang',age: 18,x: 1,y: 1 },
    //{ _id: 5972ed35e6f98ec60e3dc888, name: 'huo', age: 30, x: 2, y: 1 },
    //{ _id: 5972ed35e6f98ec60e3dc889, name: 'li', age: 20, x: 2, y: 2 } ]
    console.log(docs);
}); 
```

#### limit()

显示2个

```js
temp.find().limit(2).exec(function(err,docs){
    //[ { _id: 5972ed35e6f98ec60e3dc886,name: 'huochai',age: 27,x: 1,y: 2 },
    //{ _id: 5972ed35e6f98ec60e3dc887,name: 'wang',age: 18,x: 1,y: 1 } ]
    console.log(docs);
}); 
```

#### select()

显示name、age字段，不显示_id字段

```js
temp.find().select("name age -_id").exec(function(err,docs){
    //[ { name: 'huochai', age: 27 },{ name: 'wang', age: 18 },{ name: 'huo', age: 30 },{ name: 'li', age: 20 } ]
    console.log(docs);
}); 
```

下面将以上方法结合起来使用，跳过第1个后，只显示2个数据，按照age由大到小排序，且不显示_id字段

```js
temp.find().skip(1).limit(2).sort("-age").select("-_id").exec(function(err,docs){
    //[ { name: 'huochai', age: 27, x: 1, y: 2 },
    //{ name: 'li', age: 20, x: 2, y: 2 } ]
    console.log(docs);
}); 
```

#### count()

显示集合temps中的文档数量

```js
temp.find().count(function(err,count){
    console.log(count);//4
}); 
```

#### distinct()

返回集合temps中的x的值

```js
temp.find().distinct('x',function(err,distinct){
    console.log(distinct);//[ 1, 2 ]
}); 
```

### 文档验证

```js
var schema = new mongoose.Schema({ age:Number, name: String,x:Number,y:Number});
```

如果不进行文档验证，保存文档时，就可以不按照Schema设置的字段进行设置，分为以下几种情况

1. 缺少字段的文档可以保存成功

   ```js
   var temp = mongoose.model('temp', schema);
   new temp({age:10}).save(function(err,doc){
       //{ __v: 0, age: 10, _id: 597304442b70086a1ce3cf05 }
       console.log(doc);
   }); 
   ```

2. 包含未设置的字段的文档也可以保存成功，未设置的字段不被保存

   ```js
   new temp({age:100,abc:"abc"}).save(function(err,doc){
       //{ __v: 0, age: 100, _id: 5973046a2bb57565b474f48b }
       console.log(doc);
   }); 
   ```

3. 包含字段类型与设置不同的字段的文档也可以保存成功，不同字段类型的字段被保存为设置的字段类型

   ```js
   new temp({age:true,name:10}).save(function(err,doc){
       //{ __v: 0, age: 1, name: '10', _id: 597304f7a926033060255366 }
       console.log(doc);
   }); 
   ```

而通过文档验证，就可以避免以下几种情况发生

文档验证在SchemaType中定义，格式如下

```json
{name: {type:String, validator:value}}
```

```
required: 数据必须填写
default: 默认值
validate: 自定义匹配
min: 最小值(只适用于数字)
max: 最大值(只适用于数字)
match: 正则匹配(只适用于字符串)
enum:  枚举匹配(只适用于字符串)
```

#### required

将age设置为必填字段，如果没有age字段，文档将不被保存，且出现错误提示

`age:{type:Number,required:true}`

```js
var schema = new mongoose.Schema({ age:{type:Number,required:true}, name: String,x:Number,y:Number});  
var temp = mongoose.model('temp', schema);
new temp({name:"abc"}).save(function(err,doc){
    //Path `age` is required.
    console.log(err.errors['age'].message);
}); 
```

#### default

设置age字段的默认值为18，如果不设置age字段，则会取默认值

` age:{type:Number,default:18}`

```js
var schema = new mongoose.Schema({ age:{type:Number,default:18}, name:String,x:Number,y:Number});  
var temp = mongoose.model('temp', schema);
new temp({name:'a'}).save(function(err,doc){
    //{ __v: 0, name: 'a', _id: 59730d2e7a751d81582210c1, age: 18 }
    console.log(doc);
}); 
```

#### min | max

将age的取值范围设置为[0,10]。如果age取值为20，文档将不被保存，且出现错误提示`age:{type:Number,min:0,max:10}`

```js
var schema = new mongoose.Schema({ age:{type:Number,min:0,max:10}, name: String,x:Number,y:Number});  
var temp = mongoose.model('temp', schema);
new temp({age:20}).save(function(err,doc){
    //Path `age` (20) is more than maximum allowed value (10).
    console.log(err.errors['age'].message);
}); 
```

#### match

将name的match设置为必须存在'a'字符。如果name不存在'a'，文档将不被保存，且出现错误提示`name:{type:String,match:/a/}`

```js
var schema = new mongoose.Schema({ age:Number, name:{type:String,match:/a/},x:Number,y:Number});  
var temp = mongoose.model('temp', schema);
new temp({name:'bbb'}).save(function(err,doc){
    //Path `name` is invalid (bbb).
    console.log(err.errors['name'].message);
}); 
```

#### enum

将name的枚举取值设置为['a','b','c']，如果name不在枚举范围内取值，文档将不被保存，且出现错误提示`name:{type:String,enum:['a','b','c']}`

```js
var schema = new mongoose.Schema({ age:Number, name:{type:String,enum:['a','b','c']},x:Number,y:Number});  
var temp = mongoose.model('temp', schema);
new temp({name:'bbb'}).save(function(err,doc){
    //`bbb` is not a valid enum value for path `name`.
    console.log(err.errors['name'].message);

}); 
```

#### validate

　　validate实际上是一个函数，函数的参数代表当前字段，返回true表示通过验证，返回false表示未通过验证。利用validate可以自定义任何条件。比如，定义名字name的长度必须在4个字符以上`name:{type:String,validate:validateLength}`

```js
var validateLength = function(arg){
    if(arg.length > 4){
        return true;
    }
    return false;
};
var schema = new mongoose.Schema({ name:{type:String,validate:validateLength}, age:Number,x:Number,y:Number});  
var temp = mongoose.model('temp', schema);
new temp({name:'abc'}).save(function(err,doc){
    //Validator failed for path `name` with value `abc`
    console.log(err.errors['name'].message);
}); 
```



### 实例

#### 连接数据库

```js
let mongoose=require("mongoose");
let db=mongoose.connect("mongodb://localhost/log");
mongoose.connection.on('error',function (error) {
    console.log("数据库连接失败："+error);
});
mongoose.connection.once("open",function () {
    console.log("数据库连接成功");
});
mongoose.connection.on('disconnected', function () {
    console.log('连接断开');
});   
```

写一个能够被服务器主文件index.js调用的数据库初始化连接文件init.js

```js
// 1、引入mongoose模块
const mongoose=require('mongoose')
// 2、找到指定连接的数据库
const db="mongodb://localhost/smileVue"
// 
mongoose.Promise=global.Promise

// 将这个connectDatabase借口暴露给外部，方便index.js直接引入
exports.connectDatabase=()=>{
  // 连接数据库
  mongoose.connect(db);
	//必须确保先连接数据库后，再作其他事情，所以我们需要在所有代码的外层增加一个Promise。
  return new Promise((resolve, reject) => {
    // 增加数据库连接的事件监听
    mongoose.connection.on("disconnected",()=>{
        // 重连
      mongoose.connect(db)
    })

    // 错误处理
    mongoose.connection.on("error",err=>{
      console.log("*******数据库错误*******")
      if (maxConnectTimes<3){
        maxConnectTimes++;
        // 重连
        mongoose.connect(db)
      } else {
        reject(err);
        throw new Error("数据库连接失败！")
      }
    })

    // 连接打开时触发事件
    mongoose.connection.once("open",()=>{
      console.log("Success Connect!");
      resolve();
    })
  })
}
```







































































































































































































































