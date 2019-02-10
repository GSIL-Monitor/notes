### Cookie

```js
//直接复制[等同于追加]
document.cookie = "name=value";

/**
 * @description 设置cookie
 * @param name
 * @param value
 * @param expires  设置失效时间
 * @param path  设置路径
 * @param domain  设置域名
 * @param secure
 */
function setCookie(name, value, expires, path, domain, secure) {
    // cookie的 名称 和 值 必须是经过URL编码
    let cookie = encodeURIComponent(name) + "=" + encodeURIComponent(value);
    // 后面四个参数是可选的
    if (expires) {// 设置到期失效时间
        cookie += '; expires=' + expires.toGMTString();//分号后面有一个空格
    }
    if (path) {
        cookie += '; path=' + path;
    }
    if (domain) {
        cookie += '; domain=' + domain;
    }
    if (secure) {
        cookie += '; secure=' + secure;
    }
    document.cookie = cookie;
}

/**
 * @description 获取cookie
 * @param key
 * @returns {*}
 */
function getCookie(key) {
    let str = document.cookie.replace(/;\s*/, ";");//将"; " 替换成 ";"
    let cookieArr = str.split(";");// 通过";"划分
    let cookieObj = {};
    let len = cookieArr.length;
    for (let i = 0; i < len; i++) {
        let item = cookieArr[i];//一个参数，包含键值对
        let k = item.split("=")[0];//键
        let v = item.split("=")[1];//值
        cookieObj[k] = v;
    }
    if (cookieObj[key]) {
        return decodeURIComponent(cookieObj[key]);
    } else {
        return false;
    }
}

/**
 *  @description 移除cookie
 * @param name
 * @param domain
 * @param path
 */
function removeCookie(name, domain, path) {
    //输入参数为name、path、domain 这3个是唯一标识cookie的,将max-age设置为0，就可以立即删除了.
    document.cookie = 'name=' + name + '; domain=' + domain + '; path=' + path + '; max-age=0';
}
```

总的来说Cookie是一个字符串了，其基本结构是：

name=value；（后续接各种参数options）expires=xxx；path=xxx；domain=xxx；secure=xxx；

设置方法如上，其中都是写在setCookie里面的。

在获取Cookie方面，使用的是字符串的划分，将name和value提取出来之后，使用数组方式将后续参数options放在数组中。

然后移除cookie的方法是直接对cookie进行设置，将过期时间max-age设置为0，表示使用后立即删除，即移除掉了Cookie。

### Storage

storage的基本使用，其中localStorage与sessionStorage的用法相同，但是其意义不并不相同，这也是两者之间的本质区别，如下是相同的使用操作：

```js
// 使用前查看是否支持
if (!window.localStorage) {
    alert("当前浏览器不支持localStorage！")
} else {
    /*localStorage遵循同源策略，不同域名的网站，不能共用localStorage*/
    /*不管存储进去是什么类型，返回的都是string类型，localStorage只支持string类型的存储*/
    // localStorage的存储的三种方式
    localStorage["a"] = 1;
    localStorage.b = 2;
    localStorage.setItem("c", "abc");

    //localStorage的删除的两种方式
    localStorage.clear();
    localStorage.removeItem("a");

    //localStorage的三种查找方式
    console.log(localStorage.a);
    console.log(localStorage[b]);
    console.log(localStorage.getItem("c"));

    //localStorage的三种更新方式
    localStorage.a = 2;
    localStorage["b"] = 4;
    localStorage.setItem("c", 0);

    /*真实情况下，我们一般是使用JSON的格式的数据来进行存储，所以需要现序列化存储，再解析取出*/
    let data = {
        name: "chenha",
        sex: "female",
        age: "22"
    };
    stringfy = JSON.stringify(data);//json->string
    localStorage.setItem("data", stringfy);
    console.log(localStorage.getItem("data"));
    parse = JSON.parse(localStorage.getItem("data"));//string->json
    console.log(parse)
}

/*使用SessionStorage的用法与localStorage一样，仅仅只有关闭浏览器是否依然存储这个区别*/
```

上述分别示例了存储，删除，查找，更新的几种方式。