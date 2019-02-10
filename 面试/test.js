/* 千位数加逗号
function commafy(num){
    return num && num.toString().replace(/(\d)(?=(\d{3})+\.)/g,function(args1,args2){
        return args2+',';
    });
}
console.log(commafy(120000000000.111111111));
*/

// 数组随机排序方法一
function randomSortArr(arr){
    let len=arr.length;
    for(let i=0;i<arr.length;i++){
        let rand=parseInt(Math.random()*len);
        if(rand===i){
            continue;
        }else{
            let temp=arr[rand];
            arr[rand]=arr[i];
            arr[i]=temp;
        }
    }
    return arr;
}
let arr1=[5,1,7,3,9,4,8,6,2,0];
console.log(randomSortArr(arr1))

