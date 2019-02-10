#### 字符串转数字

`parstFloat('12.3b');`

#### 数字每隔千位符加逗号

```js
function commafy(num){
    return num && num.toString().replace(/(\d)(?=(\d{3})+\.)/g,function(args1,args2){
        return args2+',';
    });
}
```

#### 实现数组随机排序

