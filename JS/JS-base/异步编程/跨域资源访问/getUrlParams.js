let url = "http://www.nowcoder.com?key=1&key=2&key=3&test=4#hehe";
let key = "key";

function getUrlParam(sUrl, sKey) {
    let urlRight = sUrl.split("?")[1];//key=1&key=2&key=3&test=4#hehe
    let param = urlRight.split("#")[0];//key=1&key=2&key=3&test=4
    let hashArr = param.split("&");//[ 'key=1', 'key=2', 'key=3', 'test=4' ]
    if (sKey) {
        let arrs = [];
        hashArr.forEach(function (item) {
            let hash = item.split("=");
            if (hash[0] === sKey) {
                arrs.push(hash[1])
            }
        });
        if (arrs.length === 1) {//返回参数的值
            return arrs[0];
        } else if (arrs.length === 0) {//没有则返回空字符串
            return "";
        } else {
            return arrs;//有多个则返回数组
        }
    } else {
        let obj = {};
        hashArr.forEach(function (item) {
            let hash = item.split("=");
            /*              精华部分              */
            /*===================================*/
            if (!(hash[0] in obj)) {//第一次出现
                obj[hash[0]] = [];
            }
            obj[hash[0]].push(hash[1]);
            /*===================================*/
        });
        return obj;
    }
}

console.log(getUrlParam(url, key));












