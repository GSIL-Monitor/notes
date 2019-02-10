let mongoose = require("mongoose");

let TestSchema = new mongoose.Schema({
    name: {type: String},
    age: {type: Number, default: 0},
    email: {type: String},
    time: {type: Date, default: Date.now()}
});
let TestModel = mongoose.model("test1", TestSchema);
let TestEntity = new TestModel({
    name: "Hello world",
    age: 28,
    email: "hello@qq.com",
});
TestEntity.save(function (error, doc) {
    console.log("in");
    if (error) {
        console.log("error:" + error);
    } else {
        console.log(doc);
    }
});
