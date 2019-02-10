let fs = require('fs');
// fs.readFile('input',function (err, data) {
//     if (err){
//         return console.log(err);
//     }
//     console.log(data.toString());
// });


let promise=new Promise(function (resolve, reject) {
    console.log("before");
    fs.readFile('input',function (err, data) {
        if (err) {
            reject(new Error(err));
        }
        resolve(data);
    });
    console.log("after");
});
promise.then((value => {
    console.log(value.toString())
}),(error)=>{
    console.log(error);
});
