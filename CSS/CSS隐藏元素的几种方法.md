#### CSS隐藏元素的几种方法：

```
display：none
```

直接不显示在页面里

```
visiablity：hidden
```

在页面里存在，但是不可见，占据位置

```
position：absolute；
top：-9999px；
left：-9999px；
```

把元素挪到很远的地方，在显示页面部分不会显示

```
z-index：-9999；
```

将页面的层数放到很低，只要有元素覆盖就不会显示

```
opacity：0；
```

直接透明度设置为0

```
overflow：hidden；
```

将容器范围设置为0，超出部分隐藏

```
transform：scale（0）；
```

将一个缩放为0，也就没有了。





