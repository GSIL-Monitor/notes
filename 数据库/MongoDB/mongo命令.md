### 基本命令

------

首先连接指定位置的数据库（这里忽略了环境变量配置）

`mongod --dbpath E:\data\db`

------

再重新打开一个CMD，输入

`mongo`

进入数据库。

------

查看数据库

`show dbs`

------

进入指定数据库，如果指定数据库不存在，则创建此数据库

`use 数据库名`

------

显示当前数据库的集合（关系型数据库中叫表）

`show collections`

------

显示当前正处于哪个数据库

`db`

### 操作命令

------

新建一个数据库

`use 不存在的数据库名`

但是如果不添加数据，使用`show dbs`命令不会显示新建的数据库

------

插入一行数据（我们将其称之为文档），注意insert()方法内部是一个json数据

`db.集合名.insert({"name":"zgq"})`

------

查询数据库中的所有数据（查询的是所有行的数据，每行都是一个文档对象）

`db.集合名.find({"name":"zgq"})`

------

查询数据库中第一行数据（也就是第一个文档数据）

`db.集合名.findOne({"name":"zgq"})`

------

**更新**文档数据（前一个参数是过滤条件，后一个是更新后的结果）

`db.集合名.update({"name":"zgq"},{"name":"zgq","age":"23"})`

这里需要注意，第一个参数可以使一部分的过滤条件，但是**第二个参数却必须是完整的文档数据。**

------

删除数据行（删除一个文档）

`db.集合名.remove({"name":"zgq"});`

------

删除指定名称的整个集合（集合===数据表）

`db.集合名.drop()`

返回true表示删除成功，此时使用`show dbs`看不到这个数据库了

------

删除当前使用的数据库

`db.dropDatabase()`

这个删除必须处于某个数据库中，并且返回如下结果

{ "dropped" : "数据库名", "ok" : 1 }



### 使用JS文件写mongo命令

```javascript
// 声明一个登录名
let userName="zgq";
// 声明登录时的时间戳
let timeStamp=Date.parse(new Date());
// 组成JSON字符串
let jsonDatabase={"loginUnser":userName,"loginTime":timeStamp};
// 连接数据库
let db = connect('log');  // === use log由于log数据库不存在，所以会创建一个数据库
//插入数据
db.login.insert(jsonDatabase);

print('[demo]log  print success');  // 没有错误显示成功
```

![](E:\WebStorm_Dir\articles\images\js-for-mongo.png)

输入mongo goTask.js会得到上面的输出，表示成功创建一个名为log的数据库了。

### 批量插入

多文档插入

```sql
db.test.insert([
    {"_id":1},
    {"_id":2},
    {"_id":3}
])
```

**查看循环插入的性能**

```javascript
// 开始时间
var startTime = (new Date()).getTime();
// 链接数据库
var  db = connect('log');
// 开始循环
for(let i=0;i<1000;i++){
    db.login.insert({num:i});
}
// 计算时间差
var runTime = (new Date()).getTime()-startTime;
// 打印出来
print ('This run this is:'+runTime+'ms');
```

输出结果：

```
MongoDB shell version v4.0.0
connecting to: mongodb://127.0.0.1:27017
MongoDB server version: 4.0.0
connecting to: mongodb://127.0.0.1:27017/log
MongoDB server version: 4.0.0
This run this is:1935ms
```

**总消耗时间：1935ms**





**查看批量插入的性能**

```javascript
var startTime = (new Date()).getTime();
var  db = connect('log');

// 声明一个数组
var tempArray = [];
// 循环向数组中放入值
for(let i=0;i<1000;i++){
    tempArray.push({num:i});
}
// 批量一次插入
db.test.insert(tempArray);

var runTime = (new Date()).getTime()-startTime;
print ('This run this is:'+runTime+'ms');
```

输出结果：

```
MongoDB shell version v4.0.0
connecting to: mongodb://127.0.0.1:27017
MongoDB server version: 4.0.0
connecting to: mongodb://127.0.0.1:27017/log
MongoDB server version: 4.0.0
This run this is:72ms
```

**总消耗时间：72ms**



### update更新

**更新文档数据**（前一个参数是过滤条件，后一个是更新后的结果）

`db.集合名.update({"name":"zgq"},{"name":"zgq","age":"23"})`

这里需要注意，第一个参数可以使一部分的过滤条件，但是第二个参数却必须是完整的文档数据，**如果数据很大，则第二部分会写得很复杂**。

更新前数据：

```json
var workmate3={
    name:'MinJie',
    age:20,
    sex:1,
    job:'UI设计',
    skill:{
        skillOne:'PhotoShop',
        SkillTwo:'UI',
        SkillThree:'Word+Excel+PPT'
    },
    regeditTime:new Date()
}
```

更新后数据：

```json
var workmate3={
    name:'MinJie',
    age:20,
    sex:0,
    job:'UI设计',
    skill:{
        skillOne:'PhotoShop',
        SkillTwo:'UI',
        SkillThree:'Word+Excel+PPT'
    },
    regeditTime:new Date()
}
```

上述更新了workmate3的sex数据列，我们使用update写为：

```sql
db.workmate.update({name:'MinJie'},workmate3)
```

不能写为：

```sql
db.workmate.update({name:'MinJie'},{sex:0})
```

否则数据会变为只有{"sex":0}的数据

由于上面正确的方法需要写一个完整的数据，略显复杂，所以使用  **$set**  修改器简化修改操作，针对整个数据的某个节点进行单独的修改，而不影响整体数据

```sql
db.workmate.update({"name":"MinJie"},{"$set":{sex:2,age:21}})
```

如果修改的数据是嵌套的数据，使用方式如下：

```sql
db.workmate.update({"name":"MinJie"},{"$set":{"skill.skillThree":'word'}})
```

使用  **$unset**  用于对键值进行**删除**

```sql
db.workmate.update({"name":"MinJie"},{$unset:{"age":''}})
```

想加回来可以直接用**$set**进行添加。

```sql
db.workmate.update({"name":"MinJie"},{"$set":{age:21}})
```

使用  **$inc**  对内部数字数据进行功能计算

```sql
db.workmate.update({"name":"MinJie"},{$inc:{"age":-2}})
```

**multi选项**：表示对多行数据进行修改，而不仅仅只是一行。

```sql
db.workmate.update({},{$set:{"interset":[]}},{multi:true})
```

multi是有ture和false两个值，true代表全部修改，false代表只修改一个（默认值）

**upsert选项**：在找不到值的情况下插入一条数据。

```sql
db.workmate.update({name:'xiaoWang'},{$set:{"age":20}},{upsert:true})
```

upsert也有两个值：true代表没有就添加，false代表没有不添加(默认值)，有此数据无论upsert取什么值都执行更新

**update简写multi和upsert的位置：**

`update({初始过滤条件},{最终数据},upsert,multi)`

**$push**：为一行数据添加一个新的键值对

```sql
db.workmate.update({name:'xiaoWang'},{$push:{interest:'draw'}})
```

用于内嵌文档的形式

```sql
db.workmate.update({name:'MinJie'},{$push:{"skill.skillFour":'draw'}})
```

**$ne**：检查一个值是否存在，如果不存在再执行操作，存在就不执行

```sql
db.workmate.update({name:'xiaoWang',"interest":{$ne:'playGame'}},{$push:{interest:'Game'}})
```

如果该行数据有interest键值对，则不操作。如果，诶呦，则添加进去。

**总结：没有则修改，有则不修改。**

**$addToSet** ：升级版$ne，也是没有则修改，有则不修改。

```sql
db.workmate.update({name:"xiaoWang"},{$addToSet:{interest:"readBook"}})
```

**$each**：批量插入

```sql
var newInterset=["Sing","Dance","Code"];
db.workmate.update({name:"xiaoWang"},{$addToSet:{interest:{$each:newInterset}}})
```

**$pop** ：删除数组值

$pop只删除一次，并不是删除所有数组中的值。而且它有两个选项，一个是1和-1。

- 1：从数组末端进行删除
- -1：从数组开端进行删除

```sql
db.workmate.update({name:'xiaoWang'},{$pop:{interest:1}})
```

**数组定位修改**：只知道修改数组的第几位，但并不知道是什么，这时候我们可以使用interest.int 的形式，这里的计数是从0开始的。

```sql
db.workmate.update({name:'xiaoWang'},{$set:{"interest.2":"Code"}})
```

### 返回数据

上述的update都是非应答式修改，只是你主观上的修改，他不会返回任何值。

**db.runCommand（）**：数据库运行命令的执行器，执行命令首选就要使用它，因为它在Shell和驱动程序间提供了一致的接口。（几乎操作数据库的所有操作，都可以使用runCommand来执行）现在我们试着用runCommand来修改数据库，看看结果和直接用db.collections.update有什么不同。

```sql
db.workmate.update({sex:1},{$set:{money:1000}},false,true)
var resultMessage=db.runCommand({getLastError:1})
printjson(resultMessage);
```

- getLastError:1 :表示返回功能错误，这里的参数很多，如果有兴趣请自行查找学习，这里不作过多介绍。
- printjson：表示以json对象的格式输出到控制台。

可以看到执行结果在控制台返回了。

```sql
{
        "connectionId" : 1,
        "updatedExisting" : true,
        "n" : 2,
        "syncMillis" : 0,
        "writtenTo" : null,
        "err" : null,
        "ok" : 1
}
```

当然，这里也可以对返回的数据进行处理。

**db.listCommands( )**：查看所有的Commad命令，内容很多。

`db.runCommand({ping:1})`

查看是否和数据库链接成功了

返回ok：1就代表链接正常。

**findAndModify**：查找并修改的意思

```javascript
var myModify={
    findAndModify:"workmate",//集合名为workmate
    query:{name:'JSPang'},// 过滤条件，name为jspang
    update:{$set:{age:18}}, // 修改指定数据
    new:true    //更新完成，需要查看结果，如果为false不进行查看结果
}
var ResultMessage=db.runCommand(myModify);

printjson(ResultMessage)
```

findAndModify的性能是没有直接使用db.collections.update的性能好，但是在实际工作中都是使用它，毕竟要商用的程序安全性还是比较重要的。

findAndModify属性值：

- query：需要查询的条件/文档
- sort:    进行排序
- remove：[boolean]是否删除查找到的文档，值填写true，可以删除。
- update用来表示更新指定数据。**remove与update只能存在一个**。
- new：[boolean]返回更新前的文档还是更新后的文档。
- fields：需要返回的字段
- upsert：没有这个值是否增加。



通过返回的updateExisting来判断是否反悔了结果，也就用于判断与处理返回的数据

```javascript
if(ResultMessage.updateExisting){

}else{

}
```



### 查询功能

#### 简单查找

```sql
db.workmate.find({"skill.skillOne":"HTML+CSS"})
```

#### 筛选查找字段

将查询到的数据再进行过滤出来。第一个参数是查找过滤，第二个参数是显示过滤。用来表示查询到数据后，只将某部分数据显示出来。

```javascript
db.workmate.find(
    {"skill.skillOne":"HTML+CSS"},
    {name:true,"skill.skillOne":true}
)
```

上述返回的有三项，_id，name，skill.skillone。id是默认返回的，如果不需要，则将 _id设置为false。

```
db.workmate.find(
    {"skill.skillOne":"HTML+CSS"},
    {name:true,"skill.skillOne":true,"_id":false}
)
```

上述显示与否，都是用true与false决定的，同样可以使用0和1来代替。

**不等修饰符**

- 小于($lt):英文全称less-than
- 小于等于($lte)：英文全称less-than-equal
- 大于($gt):英文全称greater-than
- 大于等于($gte):英文全称greater-than-equal
- 不等于($ne):英文全称not-equal



查找大于25小于30

```sql
db.workmate.find(
    {age:{$lte:30,$gte:25}},
  {name:true,age:true,"skill.skillOne":true,_id:false}
)
```

查找日期

```javascript
var startDate= new Date('01/01/2018');
db.workmate.find(
    {regeditTime:{$gt:startDate}},
    {name:true,age:true,"skill.skillOne":true,_id:false}
)
```

#### 多条件查询

**$in修饰符**

in修饰符可以轻松解决一键多值的查询情况。

指定查询age为25和33的

```sql
db.workmate.find({age:{$in:[25,33]}},
    {name:1,"skill.skillOne":1,age:1,_id:0}
)
```

**$nin修饰符**

表示age为25与33以外的数据。

```sql
db.workmate.find({age:{$nin:[25,33]}},
    {name:1,"skill.skillOne":1,age:1,_id:0}
)
```

**$or修饰符**

age大于30或者技能为PHP的

```sql
db.workmate.find({$or:[
    {age:{$gte:30}},
    {"skill.skillThree":'PHP'}
]},
    {name:1,"skill.skillThree":1,age:1,_id:0}
)
```

**$and修饰符**

age大于30并且技能为PHP的

```sql
db.workmate.find({$and:[
    {age:{$gte:30}},
    {"skill.skillThree":'PHP'}
]},
    {name:1,"skill.skillThree":1,age:1,_id:0}

)
```

**$not修饰符**

除age大于20并且小于30的

```sql
db.workmate.find({
    age:{
        $not:{
            $lte:30,
            $gte:20
        }
    }
},
{name:1,"skill.skillOne":1,age:1,_id:0}
)
```

#### 数组查询

**基本数组查询**

```sql
db.workmate.find({interest:['画画','聚会','看电影']},
    {name:1,interest:1,age:1,_id:0} 
)
```

匹配数组中的一项的情况

```javascript
db.workmate.find({interest:['看电影']},
    {name:1,interest:1,age:1,_id:0} 
)
```

上面的代码无法获取到内容，需要将中括号[]去掉，就可以获取到：

```javascript
db.workmate.find({interest:'看电影'},
    {name:1,interest:1,age:1,_id:0} 
)
```

这就是我们在数组中查询一项的方法，这也是数组查询的最简单用法。

#### 复杂数组查询

**$all-数组多项查询**

既有看电影又有看书的人员。

```sql
db.workmate.find(
    {interest:{$all:["看电影","看书"]}},
    {name:1,interest:1,age:1,_id:0} 
)
```

**$in-数组的或者查询**

 `$in` 主要满足数组中的一项就可以被查出来（有时候会跟$or弄混）。

```sql
db.workmate.find(
    {interest:{$in:["看电影","看书"]}},
    {name:1,interest:1,age:1,_id:0} 
)
```

**$size-数组个数查询**

$size修饰符可以根据数组的数量查询出结果。

```sql
db.workmate.find(
    {interest:{$size:5}},
    {name:1,interest:1,age:1,_id:0} 
)
```

**$slice-显示选项**

有时候我并不需要显示出数组中的所有值，而是只显示前两项，比如我们现在想显示每个人兴趣的前两项，而不是把每个人所有的兴趣都显示出来。

```sql
db.workmate.find(
    {},
    {name:1,interest:{$slice:2},age:1,_id:0} 
)
```

如果我们想显示兴趣的最后一项，可以直接使用slice:-1，来进行查询。

```sql
db.workmate.find(
    {},
    {name:1,interest:{$slice:-1},age:1,_id:0} 
)
```

#### find参数使用

**find参数：**

- query：这个就是查询条件，MongoDB默认的第一个参数。
- fields：（返回内容）查询出来后显示的结果样式，可以用true和false控制是否显示。
- limit：返回的数量，后边跟数字，控制每次查询返回的结果数量。
- skip:跳过多少个显示，和limit结合可以实现分页。
- sort：排序方式，从小到大排序使用1，从大到小排序使用-1。

**分页Demo：**

现在可以作一个最简单的分页，我们把同事集合（collections）进行分页，每页显示两个，并且按照年龄从小到大的顺序排列。

```sql
db.workmate.find({},{name:true,age:true,_id:false}).limit(0).skip(2).sort({age:1});
```

limit(0)表示不限制显示个数。

**$where修饰符**

可以让我们在条件里使用javascript的方法来进行复杂查询

```sql
db.workmate.find(
    {$where:"this.age>30"},
    {name:true,age:true,_id:false}
)
```

这里的this指向的是workmate（查询集合）本身。这样我们就可以在程序中随意调用。虽然强大和灵活，但是这种查询对于数据库的压力和安全性都会变重，所以在工作中尽量减少$where修饰符的使用。

#### JS中使用find

**hasNext循环结果**

在文本中执行我们的find语句要用到游标和循环的操作

```javascript
var db = connect("company")  //进行链接对应的集合collections
var result = db.workmate.find() //声明变量result，并把查询结果赋值给result
//利用游标的hasNext()进行循环输出结果。
while(result.hasNext()){
    printjson(result.next())  //用json格式打印结果
}
```

**forEach循环**

利用hasNext循环结果，需要借助while的帮助，MongoDB也为我们提供了forEach循环，现在修改上边的代码，使用forEach循环来输出结果。

```javascript
var db = connect("company")  //进行链接对应的集合collections
var result = db.workmate.find() //声明变量result，并把查询结果赋值给result
//利用游标的hasNext()进行循环输出结果。
result.forEach(function(result){
    printjson(result)
})
```



### 索引

#### 构建百万级数据

```javascript
// 生成随机数
function getRandom(min,max) {
    let range=max-min;
    let rand=min+Math.round(Math.random()*range);
    return rand;
}

// 生成随机用户名
function getRandomUser(min,max) {
    let tempStringArray="1234567890qwertyuiopasdfghjklzxcvbnm".split("");
    let outputText="";
    for (let i=1;i<getRandom(min,max);i++){
        outputText=outputText+tempStringArray[getRandom(0,tempStringArray.length)];
    }
    return outputText;
}

// 插入200万条数据
var db=connect("company");
db.randomInfo.drop();
var startTime=(new Date()).getTime();
var tempInfo=[];
for (let i=0;i<2000000;i++){
    tempInfo.push({
        userName:getRandomUser(7,16),
        regTime:new Date(),
        random1:getRandom(100000,9999999),
        random2:getRandom(100000,9999999),
        random3:getRandom(100000,9999999),
        random4:getRandom(100000,9999999),
        random5:getRandom(100000,9999999),
        random6:getRandom(100000,9999999),
        random7:getRandom(100000,9999999),
        random8:getRandom(100000,9999999),
        random9:getRandom(100000,9999999),
        random10:getRandom(100000,9999999),
    })
}
db.randomInfo.insert(tempInfo);
var endTime=(new Date()).getTime();
var time=endTime-startTime;
print(`${time}ms`);
```



查询数据的性能

```javascript
var start=(new Date()).getTime();
var db=connect("company");
var rs=db.randomInfo.find({username:"knyl8tigw"});
rs.forEach(rs=>{
    printjson(rs);
});

var end=(new Date()).getTime();

print((end-start));
```

经过上面代码可以看出估计查找时间为：700-800ms

获取集合的索引（一开始之后默认的_id有索引）：

`db.randomInfo.getIndexes（）`

索引结构：

```
[
        {
                "v" : 2,
                "key" : {
                        "_id" : 1
                },
                "name" : "_id_",
                "ns" : "company.randomInfo"
        }
]
```

建立索引：

```
// 建立索引
db.randomInfo.ensureIndex({username:1})
```

索引结构：

```
[
        {
                "v" : 2,
                "key" : {
                        "_id" : 1
                },
                "name" : "_id_",
                "ns" : "company.randomInfo"
        },
        {
                "v" : 2,
                "key" : {
                        "username" : 1
                },
                "name" : "username_1",
                "ns" : "company.randomInfo"
        }
]
```

建立索引之后的时间：10-30ms

> 注意：一个集合只允许建立64个索引

**索引的使用情况：**

- 数据不超万条时，不需要使用索引。性能的提升并不明显，而大大增加了内存和硬盘的消耗。
- 查询数据超过表数据量30%时，不要使用索引字段查询。实际证明会比不使用索引更慢，因为它大量检索了索引表和我们原表。
- 数字索引，要比字符串索引快的多，在百万级甚至千万级数据量面前，使用数字索引是个明确的选择。
- 把你经常查询的数据做成一个内嵌数据（对象型的数据），然后集体进行索引。

**复合索引：**

```javascript
db.randomInfo.ensureIndex({random1:1})
db.randomInfo.getIndexes()
db.randomInfo.find({username:"zlrihaysl",random1:1986518});
```

这样依然会根据索引结构的顺序来查找，在索引结构中username在random1之前，所以此复合索引与之前的单索引也是差不多的。

**指定索引查询**

我们将username忽略，以random1来进行查找的方式是：

```sql
db.randomInfo.find({username:"zlrihaysl",random1:1986518}).hint({random1:1});
```

**删除索引**

当索引性能不佳或起不到作用时，我们需要删除索引，删除索引的命令是**dropIndex()**.

db.randomInfo.dropIndex（"random1_1"）; 

这里的  random1_1 是索引结构中的name值，并不是random1。



**全文索引**

首先插入两条数据

```sql
db.info.insert({contextInfo:"I am a programmer, I love life, love family. Every day after work, I write a diary."})
db.info.insert({contextInfo:"I am a programmer, I love PlayGame, love drink. Every day after work, I playGame and drink."}
```

建立全文索引

```sql
db.info.ensureIndex({contextInfo:'text'})
```

全文索引查找

建立好了全文索引就可以查找了，查找时需要两个关键修饰符:

- $text:表示要在全文索引中查东西。
- $search:后边跟查找的内容。

```sql
db.info.find({$text:{$search:"programmer"}})
```

查找多个词

```sql
db.info.find({$text:{$search:"programmer family diary drink"}})
```

转义符

全文搜索中是支持转义符的，比如我们想搜索的是两个词（love PlayGame和drink），这时候需要使用\斜杠来转意。

```sql
db.info.find({$text:{$search:"\"love PlayGame\" drink"}})
```



### 管理MongoDB

#### 创建用户

创建用户可以用db.createUser方法来完成

```sql
db.createUser({
    user:"jspang",
    pwd:"123456",
    customData:{
        name:'技术胖',
        email:'web0432@126.com',
        age:18,
    },
    roles:['read']
})
```

创建用户成功

```
Successfully added user: {
        "user" : "zgq",
        "customData" : {
                "name" : "zgq",
                "email" : "123123123",
                "age" : "18"
        },
        "roles" : [
                {
                        "role" : "readWrite",
                        "db" : "aompany"
                },
                "read"
        ]
}
```



还可以单独配置一个数据库的权限，比如我们现在要配置compay数据库的权限为读写：

```sql
db.createUser({
    user:"jspang",
    pwd:"123456",
    customData:{
        name:'技术胖',
        email:'web0432@126.com',
        age:18,
    },
    roles:[
        {
            role:"readWrite",
            db:"company"
        },
        'read'
    ]
})
```

上述对用户这是角色权限role的可能性如下：

1. 数据库用户角色：read、readWrite；
2. 数据库管理角色：dbAdmin、dbOwner、userAdmin;
3. 集群管理角色：clusterAdmin、clusterManager、clusterMonitor、hostManage；
4. 备份恢复角色：backup、restore；
5. 所有数据库角色：readAnyDatabase、readWriteAnyDatabase、userAdminAnyDatabase、dbAdminAnyDatabase
6. 超级用户角色：root
7. 内部角色：__system

**查看用户**

```sql
dbd .system.users.find()
```

**删除一个用户**

```sql
db.system.users.remove(user:"zgq")
```

**建权**

有时候我们要验证用户的用户名密码是否正确，就需要用到MongoDB提供的健全操作。也算是一种登录操作，不过MongoDB把这叫做建权。

```sql
db.auth("jspang","123456")
```

如果正确返回1，如果错误返回0。（Error：Authentication failed。）

**启动建权**

重启MongoDB服务器，然后设置必须使用建权登录。

```sql
mongod --auth
```

启动后，用户登录只能用用户名和密码进行登录，原来的mongo形式链接已经不起作用了。相应的用户权限也对应妥当。实际项目中我们启动服务器必须使用建权形式。

**登录**

如果在配置用户之后，用户想登录，可以使用mongo的形式，不过需要配置用户名密码：

```sql
mongom  -u jspang -p 123456 127.0.0.1:27017/admin
```

就可以用给我们的权限对数据库操作了。



### 数据库备份

#### 数据备份

```
mongodump

    --host 127.0.0.1

    --port 27017

    --out D:/databack/backup

    --collection myCollections

    --db test

    --username username

    --password password
```

备份所有MongoDB里的库到D盘的databack文件夹下，就可以把命令写成这样

```sql
mongodump --host 127.0.0.1 --port 27017 --out D:/databack/
```

#### 数据恢复

```sql
mongorestore

    --host 127.0.0.1

    --port 27017

    --username username

    --password password

    <path to the backup>
```

发生了意外，删除了一个表

```
 db.randomInfo.drop()
```

还原刚才删除的表

```sql
mongorestore --host 127.0.0.1 --port 27017 D:/databack/
```



























































































