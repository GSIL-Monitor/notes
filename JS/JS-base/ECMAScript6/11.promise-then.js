// promise中的then既可以处理不同状态（resolve，reject）的返回值，也可以自己返回一个值，作为后续的then的参数

let promise = new Promise((resolve, reject) => {
    resolve(2);
});
promise.then(value => {
    console.log(value);
    // 返回新的值
    return value * 2;
}).then(value => {
    console.log(value);
})

