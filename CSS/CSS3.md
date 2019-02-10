### CSS3新增属性

1、box-shadow（阴影效果）

```css
box-shadow: 10px（水平右位置） 10px（垂直下位置） 5px（模糊距离） 3px（阴影尺寸） #888888;
```

2、border-color（为边框设置多种颜色）

```css
border-color:red;
```

3、border-image（图片边框）

```css
border-image: url("/images/border.png")（图片资源） 30px（图片高度） 30px（图片宽度） repeat-x（图片重复方式）
```

4、text-shadow（文本阴影）

```css
text-shadow: 5px（水平右） 5px（垂直下） 5px（模糊距离） #FF0000;
```

5、text-overflow（文本截断）

```
text-overflow: clip（修剪文本）|ellipsis（显示省略符号来代表被修剪的文本）|string（使用给定的字符串来代表被修剪的文本）;
```

6、word-wrap（自动换行）

```css
word-wrap: normal（只在允许的断字点换行）|break-word（在长单词或 URL 地址内部进行换行）;
```

7、border-radius（圆角边框）（可以分别设置四个角：上左，上右，下右，下左）

```css
border-radius: 1-4 length（长度）|%（百分比） / 1-4 length|%;
```

8、opacity（透明度）

```css
opacity: value（0-1决定透明度）;
```

9、box-sizing（控制盒模型的组成模式）

```css
box-sizing: content-box(标准盒子模型)|border-box（怪异盒子模型）;
```

10、resize（元素缩放）

```css
resize: none(无法调整元素的尺寸)|both(可调整元素的高度和宽度。)|horizontal（可调整元素的宽度。）|vertical;
```

11、outline（外边框）

```css
outline:#00FF00（颜色） dotted（线条） thick（宽度）;
```

outline-style：

| none   | 默认。定义无轮廓。                                  |
| ------ | --------------------------------------------------- |
| dotted | 定义点状的轮廓。                                    |
| dashed | 定义虚线轮廓。                                      |
| solid  | 定义实线轮廓。                                      |
| double | 定义双线轮廓。双线的宽度等同于 outline-width 的值。 |
| groove | 定义 3D 凹槽轮廓。此效果取决于 outline-color 值。   |
| ridge  | 定义 3D 凸槽轮廓。此效果取决于 outline-color 值。   |
| inset  | 定义 3D 凹边轮廓。此效果取决于 outline-color 值。   |
| outset | 定义 3D 凸边轮廓。此效果取决于 outline-color 值。   |

outline-width：

| thin     | 规定细轮廓。             |
| -------- | ------------------------ |
| medium   | 默认。规定中等的轮廓。   |
| thick    | 规定粗的轮廓。           |
| *length* | 允许您规定轮廓粗细的值。 |

12、background-size（指定背景图片尺寸）

```css
background-size: length|percentage（百分比）|cover（宽或高达到最大范围）|contain（宽高都扩大到最大范围）;
```

13、background-origin（指定背景图片从哪里开始显示）

```css
background-origin: padding-box（相对于内边距框来定位）|border-box（相对于边框盒来定位）|content-box（对于内容框来定位）;
```

14、background-clip（指定背景图片从什么位置开始裁剪）

```css
background-clip: border-box（裁剪到边框盒）|padding-box（裁剪到内边距框）|content-box（裁剪到内容框）;
```

15、background（为一个元素指定多个背景）

16、hsl（通过色调、饱和度、亮度来指定颜色颜色值）

17、hsla（在hsl的基础上增加透明度设置）

18、rgba（基于rgb设置颜色，a设置透明度）