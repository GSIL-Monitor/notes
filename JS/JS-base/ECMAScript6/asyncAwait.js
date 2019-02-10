/*
async function testAsync() {
    return "Hello";
}
async function testAsync2() {
    return "Hello2";
}

async function test(){
    const v1=await testAsync();
    const v2=await testAsync2();
    console.log(v1,v2);
}

test();
*/

function takeLongTime() {
    return new Promise(resolve => {
        setTimeout(() => resolve("long_time_value"), 1000);
    });
}

async function test() {
    const v = await takeLongTime();
    console.log(v);
}

test();
