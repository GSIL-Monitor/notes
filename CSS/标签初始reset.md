现在的网站设计中使用reset.css用重置整个站点的标签的CSS属性的做法很常见，但有时候我们已经为了reset而reset，我们经常看到这样的reset代码

```css
div{
  padding:0px;
  margin:0px;
}

span{
  margin:0px;   
}
```

### 标签属性默认值

由于大部分的CSS reset都是针对padding、border、margin，我们就先看看常用标签的这三个属性的默认值(Chrome)

| **标签**               | **padding** | **border** | **margin** |
| ---------------------- | ----------- | ---------- | ---------- |
| html                   | 0           | 0          | 0          |
| body                   | 0           | 0          | 8          |
| form                   | 0           | 0          | 0          |
| div                    | 0           | 0          | 0          |
| span                   | 0           | 0          | 0          |
| p                      | 0           | 0          | 16         |
| th、td                 | 1           | 0          | 0          |
| input(text、password)  | 1           | 2          | 2          |
| input(checkbox、radio) | 0           | 0          | 3 0.5ex    |
| input button           | 8           | 0          | 2          |
| textarea               | 2           | 1          | 2          |
| select                 | 0           | 0          | 2          |
| option                 | 0           | 0          | 0          |
| h1~h6                  | 0           | 0          | ?px 0      |
| ul、ol                 | 0 0 0 40px  | 0          | 16px 0     |
| li                     | 0           | 0          | 0          |
| dl                     | 0           | 0          | 16px 0     |
| dt                     | 0           | 0          | 0          |
| dd                     | 0           | 0          | 0 0 0 40px |
| label                  | 0           | 0          | 0          |
| em、strong             | 0           | 0          | 0          |
| label                  | 0           | 0          | 0          |
| img                    | 0           | 0          | 0          |
| a                      | 0           | 0          | 0          |

虽然只是在Chrome下，但通过上面表可以看出很多标签默认的padding、border、margin就是0，如果还在CSS reset中写一遍岂不是画蛇添足了，除了浏览器的默认值，还有一些标签的属性值得我们注意。

#### 行内元素的width、height、padding、margin

1. 行内元素不会应用width属性，其长度是由内容撑开的
2. 行内元素不会应用height属性，其高度也是由内容撑开的，但是高度可以通过line-height调节
3. 行内元素的padding属性只用padding-left和padding-right生效，padding-top和padding-bottom会改变元素范围，但不会对其它元素造成影响
4. 行内元素的margin属性只有margin-left和margin-right有效，margin-top和margin-bottom无效
5. 行内元素的overflow属性无效，这个不用多说了
6. 行内元素的vertical-align属性无效（height属性无效）

```
<div style="background-color: #a44;">
        <span style="padding:4px; margin:8px; height: 500px; width:1000px; background-color:#0e0;">123456789123456789</span>
    </div>

    <div style="background-color: #a44;">
        <span style="padding:4px; margin:8px; height: 500px; width:1000px; background-color:#0a0;">123456789</span>
    </div>
```

通过例子可以看出，我们对span设置的width和height属性并没有生效，margin-top和margin-bottom无效，padding-top和padding-bottom会改变元素范围（背景区域变大了），但并没有影响下面元素位置

在CSS reset中我们不应该设置对行内元素无效的属性

#### 一些互斥的属性

- 对于absolute和fixed定位的固定尺寸（设置了width和height属性值）元素，如果设置了top和left属性，那么设置bottom和right值就没有作用了，应该是top和left优先级高，否则同时写了浏览器怎么知道按照谁定位
- 对于absolute和fixed定位的元素，如果设置了top、left、bottom、right的值后margin属性也就不起作用了
- 对于absolute和fixed定位的元素，如果设置了top、left、bottom、right的值后float属性同样会失效
- 块元素如果设置了float属性或者是absolute、fixed定位，那么vertical-align属性不再起作用 



CSS reset标准文件

```css
html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed, 
figure, figcaption, footer, header, hgroup, 
menu, nav, output, ruby, section, summary,
time, mark, audio, video {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
}
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure, 
footer, header, hgroup, menu, nav, section {
    display: block;
}
body {
    line-height: 1;
}
ol, ul {
    list-style: none;
}
blockquote, q {
    quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
    content: '';
    content: none;
}
table {
    border-collapse: collapse;
    border-spacing: 0;
}
```

将一些不常用的标签去掉，缩写成如下样式

```css
html, body, div, span, iframe,
h1, h2, h3, h4, h5, h6, p, a, 
del, dfn, em, img,
small, strong,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed, 
figure, figcaption, footer, header, hgroup, 
menu, nav, section, summary
 {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
}
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure, 
footer, header, hgroup, menu, nav, section {
    display: block;
}
body {
    line-height: 1;
}
ol, ul {
    list-style: none;
}
blockquote, q {
    quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
    content: '';
    content: none;
}
table {
    border-collapse: collapse;
    border-spacing: 0;
}
```





























