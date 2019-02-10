let mongoose = require("mongoose");
let db = mongoose.connect("mongodb://localhost/MongDBStudy");
console.log(db);
mongoose.connection.on('error', function (error) {
    console.log("数据库连接失败：" + error);
});
mongoose.connection.once("open", function () {
    console.log("数据库连接成功");
});
mongoose.connection.on('disconnected', function () {
    console.log('Mongoose connection disconnected');
});
// 配置模板
let TestSchema = new mongoose.Schema({
    name: {type: String},
    age: {type: Number, default: 0},
    email: {type: String},
    time: {type: Date, default: Date.now()}
});
let TestModel1 = mongoose.model("test1", TestSchema);
let TestModel2 = mongoose.model("test2", TestSchema);
// 插入
/*// 创建模版写入数据

let TestEntity=new TestModel1({
    name:"Hello world",
    age:28,
    email: "hello@qq.com",
});
// 实例数据插入
TestEntity.save(function (error,doc) {
    console.log("in");
    if (error) {
        console.log("error:"+error);
    } else {
        console.log(doc);
    }
});

/!*模板数据插入*!/
TestModel2.create([
    {name: "test1", age: 8},
    {name: "test2", age: 18},
    {name: "test3", age: 28},
    {name: "test4", age: 38},
    {name: "test5", age: 48},
    {name: "test6", age: 58, email:"tttt@qq.com"},
    {name: "test7", age: 68, email:"ssss@qq.com"},
    {name: "test8", age: 18},
    {name: "test9", age: 18, email:"rrrr@qq.com"},
    {name: "test10",age: 18}
],function (error, doc) {
    if (error) {
        console.log(error)
    } else {
        console.log("create save")
        console.log(doc);
    }
});*/
// 查找
/*
// 查询所有数据，只显示name
TestModel2.find({},{name:1,_id:0},function (err, docs) {
    if (err) {
        console.log(err);
    } else {
        console.log(docs);
    }
});
// 查询age范围内的内容
TestModel2.find({age: {$gte: 28, $lte: 48}}, {name:1, age:1, _id:0}, function(err, docs){
    if (err) {
        console.log('查询出错：' + err);
    } else {
        console.log('大于28小于48查询结果为：');
        console.log(docs);
    }
});
// 查询name为test3、或者age为18的全部数据
TestModel2.find({$or: [{name: 'test3'}, {age: 18}]}, {name:1, age:1, _id:0}, function(err, docs){
    if (err) {
        console.log('查询出错：' + err);
    } else {
        console.log('$or查询结果为：');
        console.log(docs);
    }
});*/
// 更新
/*
TestModel2.update({name:'test1'},{$set:{age:11}},function (err) {
    if (err) {
        console.log(err)
    } else {
        console.log("success");
        TestModel2.find({name:'test1'},{name:1,age:1,_id:0},function (error,docs) {
            if (error) {
                console.log(error)
            } else {
                console.log(docs);
            }
        })
    }
});
*/
// 移除
/*TestModel2.remove({name:'test2'},function (error) {
    if (error) {
        console.log(error)
    } else {
        console.log("delete success");
        // 查看删除的哪一项，如果为[]表示删除了，否则删除失败
        TestModel2.find({name:'test2'},{name:1,age:1,_id:0},function (error, docs) {
            console.log(docs);
        })
    }
});*/



