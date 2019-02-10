# 1 判断IE浏览器与非IE 浏览器

IE浏览器与非IE浏览器的区别是IE浏览器支持ActiveXObject，但是非IE浏览器不支持ActiveXObject。在IE11浏览器还没出现的时候我们判断IE和非IE经常是这么写的

```js
function isIe(){
    return window.ActiveXObject ? true : false;
}
```

兼容IE11判断IE与非IE浏览器的方法。

```js
function isIe(){
    return ("ActiveXObject" in window);
 }
```

# 2 判断IE6浏览器

从IE7开始IE是支持XMLHttpRequest对象的，唯独IE6是不支持的。根据这个特性和前面判断IE的函数isIe()我们就知道怎么判断IE6了吧。判断方法如下

```js
function isIe6() {
   // ie6是不支持window.XMLHttpRequest的
    return isIe() && !window.XMLHttpRequest;
 }
```

# 3 判断IE7浏览器

因为从IE8开始是支持文档模式的，它支持document.documentMode。IE7是不支持的，但是IE7是支持XMLHttpRequest对象的。判断方法如下

```js
function isIe7() {
   //只有IE8+才支持document.documentMode
   return isIe() && window.XMLHttpRequest && !document.documentMode;
 }
```

# 4 判断IE8浏览器

在从IE9开始，微软慢慢的靠近标准,我们把IE678称为非标准浏览器，IE9+与其他如chrome,firefox浏览器称为标准浏览器。两者的区别其中有一个是。大家测试下如下代码。返回的是什么

```
alert(-[1,]);//在IE678中打印的是NaN,但是在标准浏览器打印的是-1
```

那么我们就可以根据上面的区别来判断是IE8浏览器。方法如下

```js
function isIe8(){
   // alert(!-[1,])//->IE678返回NaN 所以!NaN为true 标准浏览器返回-1 所以!-1为false
  return isIe() &&!-[1,]&&document.documentMode;
}
```

# 5 判断IE9、IE10、IE11浏览器

从IE8浏览器是支持JSON内置对象的，从IE10开始支持js的严格模式，关于JS中的严格模式请参考这篇文章<http://www.ruanyifeng.com/blog/2013/01/javascript_strict_mode.html>

IE9+下alert(!-[1,])返回的是false,IE9+是支持addEventListener的，但是IE11浏览器中是不支持原来IE中独有的事件绑定attachEvent。根据这些区别我们就能区分出IE9、IE10、IE11浏览器了。

# 6  判断其他浏览器

```js
/****来自曾经项目中封装的公共类函数***/
//检测函数
var check = function(r) {
        return r.test(navigator.userAgent.toLowerCase());
 };
var statics = {
        /**
         * 是否为webkit内核的浏览器
         */
        isWebkit : function() {
          return check(/webkit/);
        },
        /**
         * 是否为火狐浏览器
         */
        isFirefox : function() {
          return check(/firefox/);
        },
        /**
         * 是否为谷歌浏览器
         */
        isChrome : function() {
          return !statics.isOpera() && check(/chrome/);
        },
        /**
         * 是否为Opera浏览器
         */
        isOpera : function() {
          return check(/opr/);
        },
        /**
         * 检测是否为Safari浏览器
         */
        isSafari : function() {
          // google chrome浏览器中也包含了safari
          return !statics.isChrome() && !statics.isOpera() && check(/safari/);
        }
};
```

# 7 使用IE注释来按需导入js，css

```html
<!--[if !IE]><!--> 除IE外都可识别 <!--<![endif]--> 
<!--[if IE]> 所有的IE可识别 <![endif]--> 
<!--[if IE 5.0]> 只有IE5.0可以识别 <![endif]--> 
<!--[if IE 5]> 仅IE5.0与IE5.5可以识别 <![endif]--> 
<!--[if gt IE 5.0]> IE5.0以及IE5.0以上版本都可以识别 <![endif]--> 
<!--[if IE 6]> 仅IE6可识别 <![endif]--> 
<!--[if lt IE 6]> IE6以及IE6以下版本可识别 <![endif]--> 
<!--[if gte IE 6]> IE6以及IE6以上版本可识别 <![endif]--> 
<!--[if IE 7]> 仅IE7可识别 <![endif]--> 
<!--[if lt IE 7]> IE7以及IE7以下版本可识别 <![endif]--> 
<!--[if gte IE 7]> IE7以及IE7以上版本可识别 <![endif]-->
```

