### 两栏布局

#### 1.float+margin（一侧定宽，一侧自动）

一边（float+定宽）和另一边（100%宽度+margin-left/right的负值，值比定宽大一点)

```css
.left{float:left; width:200px; background-color:#ccc; }
.right{margin-left:210px;  width:100%; background-color:#666;}
```

#### 2.position+margin（一侧定宽，一侧自动）

左侧元素绝对定位`left/right=0`，右侧元素`margin-left/right`比定宽大一点。

```css
.left{position: absolute; width:200px; background-color:#ccc; }
.right{margin-left:210px;  background-color:#666;}      
```

#### 3.float+BFC

不需要计算盒子的宽度，只需要计算中间的间隔。右侧盒子是`block`级别的，所以宽度能实现自适应。

```css
wrap{
    overflow: auto;
}
.left {
    float: left;
    margin-right: 20px;
}
.right {
    margin-left: 0;
    overflow: auto;
}
```

#### 4.flex

`flex`容器的一个默认属性值:`align-items: stretch;`。这个属性导致了列等高的效果。 为了让两个盒子高度自动，需要设置: `align-items: flex-start;`

```css
.wrapper-flex {
    display: flex;
    align-items: flex-start;
}
/* 表示 */
.wrapper-flex .left {
    flex: 0 0 auto;/*等价于flex:none;*/
}

.wrapper-flex .right {
    flex: 1 1 auto;/*等价于flex:auto;*/
}
```

### 三栏布局

1.float+margin（两侧定宽，中间自适应）

```cs
.left {float:left; width: 200px; background-color: #ccc;}
.right {float:right; width: 200px; background-color: #ccc;}
.center { margin: 0 210px; background-color: #666;}
```

2.position+margin（两侧定宽，中间自适应）

```css
.left {position:absolute; top:0; left:0; width: 200px; background-color: #ccc;}
.right {position:absolute; top:0; right:0;  width: 200px; background-color: #ccc;}
.center { margin: 0 210px; background-color: #666
```

3.float+负margin值：圣杯布局（两侧定宽，中间自适应）

```css
<div class="m-box">
    <div class="center">中</div>
</div>
<div class="left">左</div>
<div class="right">右</div>

.m-box{width: 100%;height: 100px; background-color: #fff;float: left;}
.m-box .center {margin:0 210px;background-color: #666;}
.left {float: left; width: 200px; margin-left: -100%; background-color: #ccc;}
.right {float: left; width: 200px; margin-left: -200px; background-color: #ccc;}
```

4.float+position+margin（两侧自动，中间定宽）

```css
<div class="warp1">
    <div class="m-box m-box1">左</div>
</div>
<div class="warp2">
    <div class="m-box m-box2">右</div>
</div>
<div class="m-box m-box3">中</div>

.m-box{ height: 200px; line-height:200px; text-align:center; background-color: #ccc;}
.warp1{float:left; width:50%;_margin-right:-3px;}
.warp2{margin-left:50%; text-align:right; _margin-left:0; _zoom:1;}
.m-box1{ margin-right:100px;}
.m-box2{margin-left:100px;}
.m-box3{ background:red;width:200px; position:absolute; left:50%; margin-left:-100px; top:0; z-index:2;}
```

5.position+margin（两侧自动，中间定宽）

```css
<div class="m-center">中</div>
<div class="left">
    <div class="main">左</div>
</div>
<div class="right">
    <div class="main">右</div>
</div>

.main,.m-center { height: 200px; line-height:200px; text-align:center; }

.m-center { z-index: 2; background-color: #666; width: 500px; margin-left: -250px; position: absolute; top: 0; left: 50%; }
.left, .right { z-index: 1; position: absolute; top: 0; width: 50%; }
.left { left: 0; }
.left .main { margin-right: 250px; background-color: #ccc; }
.right { right: 0; }
.right .main { margin-left: 250px; background-color: #ccc; }
```

### 等高布局

1.float+margin+position（两列等高布局） 

```css
<div class="wrap">
    <div class="content clearfix">
        <div class="main">
            中-等高吗？<br />
            中-等高吗？<br />
            中-等高吗？<br />
            中-等高吗？<br />
            中-等高吗？<br />
        </div>
        <div class="side">
            左-等高吗？<br />
        </div>
    </div>
</div>

.clearfix { zoom: 1 }
.clearfix:after { content: ""; display: block; height: 0; line-height: 0; font-size: 0; visibility: hidden; clear: both; }

.wrap { width: 950px; margin: 0 auto; background: #ccc; }
.content { margin-left: 150px; border-left: 1px solid #666; background: #ddd; }
.main { float: left; width: 100%; }
.side { float: left; width: 150px; margin-left: -950px; position: relative; }
```





















































