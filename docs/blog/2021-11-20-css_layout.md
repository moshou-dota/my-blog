---
title: CSS布局排版技巧 
date: 2021-11-20
tags:
  - css
summary: 记录一些好用的css布局排版技巧
author: Wupeng
location: Shanghai
---

## 背景

想着将日常开发中遇到的有趣的、实用的、特殊的css处理方式记录下来

## 布局常用属性

- 浮动布局：float
- 定位布局：position/left/right/top/bottom/z-index
- 弹性布局：display:flex/inline-flex、flex系列属性
- 盒子模型：box-sizing/margin/padding/border/width/height

## CSS 选择器分类

### 基础选择器

| 选择器 | 别名       | 说明           | 版本 | 常用    |
| ------ | ---------- | -------------- | ---- | ------- |
| tag    | 标签选择器 | 指定类型的标签 | 1    | &check; |
| #id    | ID选择器   | 指定身份的标签 | 1    | &check; |
| .class | 类选择器   | 指定类名的标签 | 1    | &check; |
| *      | 通配选择器 | 所有类型的标签 | 2    | &check; |

### 层次选择器

| 选择器      | 别名           | 说明               | 版本 | 常用    |
| ----------- | -------------- | ------------------ | ---- | ------- |
| elemP elemC | 后代选择器     | 元素的后代元素     | 1    | &check; |
| elemP>elemC | 子代选择器     | 元素的子代元素     | 2    | &check; |
| elem1+elem2 | 相邻同胞选择器 | 元素相邻的同胞元素 | 2    | &check; |
| elem1~elem2 | 通用同胞选择器 | 元素后面的同胞元素 | 3    | &check; |

### 集合选择器

| 选择器      | 别名       | 说明           | 版本 | 常用    |
| ----------- | ---------- | -------------- | ---- | ------- |
| elem1,elem2 | 并集选择器 | 多个指定的元素 | 1    | &check; |
| elem.class  | 交集选择器 | 指定类名的元素 | 1    | &check; |

### 条件选择器

| 选择器      | 说明                                 | 版本 | 常用    |
| ----------- | ------------------------------------ | ---- | ------- |
| :lang       | 指定标记语言的元素                   | 2    | &cross; |
| :dir()      | 指定编写方向的元素                   | 4    | &cross; |
| :has        | 包含指定元素的元素                   | 4    | &cross; |
| :is         | 指定条件的元素                       | 4    | &cross; |
| :not        | 非指定条件的元素                     | 4    | &check; |
| :where      | 指定条件的元素                       | 4    | &cross; |
| :scope      | 指定元素作为参考点                   | 4    | &cross; |
| :any-link   | 所有包含href的链接元素               | 4    | &cross; |
| :local-link | 所有包含href且属于绝对地址的链接元素 | 4    | &cross; |

### 状态选择器

| 选择器             | 说明                           | 版本 | 常用    |
| ------------------ | ------------------------------ | ---- | ------- |
| :active            | 鼠标激活的元素                 | 1    | &cross; |
| :hover             | 鼠标悬浮的元素                 | 1    | &check; |
| :link              | 未访问的链接元素               | 1    | &cross; |
| :visited           | 已访问的链接元素               | 1    | &cross; |
| :target            | 当前锚点的元素                 | 3    | &cross; |
| :focus             | 输入聚焦的表单元素             | 2    | &check; |
| :required          | 输入必填的表单元素             | 3    | &check; |
| :valid             | 输入合法的表单元素             | 3    | &check; |
| :invalid           | 输入非法的表单元素             | 3    | &check; |
| :in-range          | 输入范围以内的表单元素         | 3    | &cross; |
| :out-of-range      | 输入范围以外的表单元素         | 3    | &cross; |
| :checked           | 选项选中的表单元素             | 3    | &check; |
| :optional          | 选项可选的表单元素             | 3    | &cross; |
| :enabled           | 事件启用的表单元素             | 3    | &cross; |
| :disabled          | 事件禁用的表单元素             | 3    | &check; |
| :read-only         | 只读的表单元素                 | 3    | &cross; |
| :read-write        | 可读可写的表单元素             | 3    | &cross; |
| :target-within     | 内部锚点元素处于激活状态的元素 | 4    | &cross; |
| :focus-within      | 内部表单元素处于聚焦状态的元素 | 4    | &check; |
| :focus-visible     | 输入聚焦的表单元素             | 4    | &cross; |
| :blank             | 输入为空的表单元素             | 4    | &cross; |
| :user-invalid      | 输入合法的表单元素             | 4    | &cross; |
| :indeterminate     | 选项未定的表单元素             | 4    | &cross; |
| :placeholder-shown | 占位显示的表单元素             | 4    | &check; |
| :current()         | 浏览中的元素                   | 4    | &cross; |
| :past()            | 已浏览的元素                   | 4    | &cross; |
| :future()          | 未浏览的元素                   | 4    | &cross; |
| :playing           | 开始播放的媒体元素             | 4    | &cross; |
| :paused            | 暂停播放的媒体元素             | 4    | &cross; |

### 结构选择器

| 选择器               | 说明                     | 版本 | 常用    |
| -------------------- | ------------------------ | ---- | ------- |
| :root                | 文档的根元素             | 3    | &cross; |
| :empty               | 无子元素的元素           | 3    | &check; |
| :nth-child(n)        | 元素中指定顺序索引的元素 | 3    | &check; |
| :nth-last-child(n)   | 元素中指定逆序索引的元素 | 3    | &cross; |
| :first-child         | 元素中为首的元素         | 2    | &check; |
| :last-child          | 元素中为尾的元素         | 3    | &check; |
| :only-child          | 父元素仅有该元素的元素   | 3    | &check; |
| :nth-of-type(n)      | 标签中指定顺序索引的标签 | 3    | &check; |
| :nth-last-of-type(n) | 标签中指定逆序索引的标签 | 3    | &cross; |
| :first-of-type       | 标签中为首的标签         | 3    | &check; |
| :last-of-type        | 标签中为尾标签           | 3    | &check; |
| :only-of-type        | 父元素仅有该标签的标签   | 3    | &check; |

### 属性选择器

| 选择器       | 说明                                         | 版本 | 常用    |
| ------------ | -------------------------------------------- | ---- | ------- |
| [attr]       | 指定属性的元素                               | 2    | &check; |
| [attr=val]   | 属性等于指定值的元素                         | 2    | &check; |
| [attr*=val]  | 属性包含指定值的元素                         | 3    | &check; |
| [attr^=val]  | 属性以指定值开头的元素                       | 3    | &check; |
| [attr$=val]  | 属性以指定值结尾的元素                       | 3    | &check; |
| [attr~=val]  | 属性包含指定值(完整单词)的元素(不推荐使用)   | 2    | &cross; |
| [attr\|=val] | 属性以指定值(完整单词)开头的元素(不推荐使用) | 2    | &cross; |

### 伪元素

| 选择器         | 说明               | 版本 | 常用    |
| -------------- | ------------------ | ---- | ------- |
| ::before       | 在元素前插入的内容 | 2    | &check; |
| ::after        | 在元素后插入的内容 | 2    | &check; |
| ::first-letter | 元素的首字母       | 1    | &cross; |
| ::first-line   | 元素的首行         | 1    | &cross; |
| ::selection    | 鼠标选中的元素     | 3    | &cross; |
| ::backdrop     | 全屏模式的元素     | 4    | &cross; |
| ::placeholder  | 表单元素的占位     | 4    | &check; |

## 技巧

以下主要记录如何巧妙运用各种纯CSS开发技巧完成一些常见或特殊的布局排版

### 主体布局

**主体布局**指在大部分情况下通用且具备统一特征的占位布局。掌握`主体布局`是一个前端必不可少的技能，<span style="border-bottom:2px dashed yellow;">养成看设计图就能大概规划出整体布局的前提是必须熟悉这些`主体布局`的特点与构造</span>。

#### 全屏布局

经典的全屏布局由`顶部`、`底部`和`主体`三部分组成，其特点为三部分左右满屏拉伸、顶部底部高度固定和主体高度自适应。该布局很常见，也是大部分Web应用主体的主流布局。通常使用`<header>`、`<footer>`和`<main>`三个标签语义化排版，`<main>`内还可插入`<aside>`侧栏或其他语义化标签。

``` html
<div class="fullscreen-layout">
    <header></header>
    <main></main>
    <footer></footer>
</div>
```

![全体布局](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b027069fdce54c128813d3886eef59a6~tplv-k3u1fbpfcp-watermark.awebp)

> calc

``` scss
.fullscreen-layout {
    width: 400px;
    height: 400px;
    header {
        height: 50px;
        background-color: #f66;
    }
    footer {
        height: 50px;
        background-color: #66f;
    }
    main {
        height: calc(100% - 50px - 50px); // 注意空格
        background-color: #3c9;
    }
}
```

> position + left/right/top/bottom

三部分统一声明`left:0`和`right:0`将其左右满屏拉伸；顶部和底部分别声明`top:0`和`bottom:0`将其吸顶和吸底，并声明俩高度为固定值；将主体的`top`和`bottom`分别声明为顶部高度和底部高度。通过绝对定位的方式将三部分固定在特定位置，使其互不影响。

``` scss
.fullscreen-layout {
    position: relative;
    width: 400px;
    height: 400px;
    header,
    footer,
    main {
        position: absolute;
        left: 0;
        right: 0;
    }
    header {
        top: 0;
        height: 50px;
        background-color: #f66;
    }
    footer {
        bottom: 0;
        height: 50px;
        background-color: #66f;
    }
    main {
        top: 50px;
        bottom: 50px;
        background-color: #3c9;
    }
}
// 其他类似参考
.fullscreen-layout {
    position: relative;
    width: 400px;
    height: 400px;
    header,
    footer {
        position: absolute;
        left: 0;
        right: 0;
    }
    header {
        top: 0;
        height: 50px;
        background-color: #f66;
    }
    footer {
        bottom: 0;
        height: 50px;
        background-color: #66f;
    }
    main {
        height: 100%;
        padding: 50px 0;
        background-color: #3c9;
    }
}
```

> flex

使用`flex`实现会更简洁。`display:flex`默认会令子节点横向排列，需声明`flex-direction:column`改变子节点排列方向为纵向排列；顶部和底部高度固定，所以主体需声明`flex:1`让高度自适应。

```scss
.fullscreen-layout {
    display: flex;
    flex-direction: column;
    width: 400px;
    height: 400px;
    header {
        height: 50px;
        background-color: #f66;
    }
    footer {
        height: 50px;
        background-color: #66f;
    }
    main {
        flex: 1;
        background-color: #3c9;
    }
}

```

**注意**：若`<main>`需表现成可滚动状态，千万不要声明`overflow:auto`让容器自适应滚动，这样做有可能因为其他格式化上下文的影响而导致自适应滚动失效或产生其他未知效果。需在`<main>`内插入一个`<div>`并声明如下。
```scss
div {
    overflow: hidden;
    height: 100%;
}
```

#### 两列布局

经典的**两列布局**由左右两列组成，其特点为`一列宽度固定`、`另一列宽度自适应`和`两列高度固定且相等`。以下以左列宽度固定和右列宽度自适应为例，反之同理。

```html
<div class="two-column-layout">
    <div class="left"></div>
    <div class="right"></div>
</div>
```

![两列布局](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/12f7992b853b4762b058be3407576606~tplv-k3u1fbpfcp-watermark.awebp)

> float + margin-left/right

左列声明`float:left`和固定宽度，由于`float`使节点脱流，右列需声明`margin-left`为左列宽度，以保证两列不会重叠。

``` scss
.two-column-layout {
    width: 400px;
    height: 400px;
    .left {
        float: left;
        width: 100px;
        height: 100%;
        background-color: #f66;
    }
    .right {
        margin-left: 100px;
        height: 100%;
        background-color: #66f;
    }
}
```

> overflow + float

左列声明同上，右列声明`overflow:hidden`使其形成`BFC区域`与外界隔离。

```scss
.two-column-layout {
    width: 400px;
    height: 400px;
    .left {
        float: left;
        width: 100px;
        height: 100%;
        background-color: #f66;
    }
    .right {
        overflow: hidden;
        height: 100%;
        background-color: #66f;
    }
}
```

> flex

使用`flex`实现会更简洁。左列声明固定宽度，右列声明`flex:1`自适应宽度。

``` scss
.two-column-layout {
    display: flex;
    width: 400px;
    height: 400px;
    .left {
        width: 100px;
        background-color: #f66;
    }
    .right {
        flex: 1;
        background-color: #66f;
    }
}
```

> position: absolute/fixed

``` scss
.two-column-layout {
    position: relative;
    width: 400px;
    height: 400px;
    .left {
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0
        width: 100px;
        background-color: #f66;
    }
    .right {
        margin-left: 100px;
        height: 100%;
        background-color: #66f;
    }
}
```

#### 三列布局

经典的**三列布局**由`左中右三列`组成，其特点为`连续两列宽度固定`、`剩余一列宽度自适应`和`三列高度固定且相等`。以下以左中列宽度固定和右列宽度自适应为例，反之同理。整体的实现原理与上述两列布局一致。

![三列布局](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/892ab25b75894be082eac171dc6c780c~tplv-k3u1fbpfcp-watermark.awebp)

```html
<div class="three-column-layout">
    <div class="left"></div>
    <div class="center"></div>
    <div class="right"></div>
</div>
```

> overflow + float

``` scss
.three-column-layout {
    width: 400px;
    height: 400px;
    .left {
        float: left;
        width: 50px;
        height: 100%;
        background-color: #f66;
    }
    .center {
        float: left;
        width: 100px;
        height: 100%;
        background-color: #66f;
    }
    .right {
        overflow: hidden;
        height: 100%;
        background-color: #3c9;
    }
}
```

> flex

```scss
.three-column-layout {
    display: flex;
    width: 400px;
    height: 400px;
    .left {
        width: 50px;
        background-color: #f66;
    }
    .center {
        width: 100px;
        background-color: #66f;
    }
    .right {
        flex: 1;
        background-color: #3c9;
    }
}
```

#### 圣杯布局/双飞翼布局

经典的**圣杯布局**和**双飞翼布局**都是由`左中右三列`组成，其特点为`左右两列宽度固定`、`中间一列宽度自适应`和`三列高度固定且相等`。*其实也是上述两列布局和三列布局的变体*，整体的实现原理与上述N列布局一致，可能就是一些细节需注意。

`圣杯布局`和`双飞翼布局`在大体相同下也存在一点不同，区别在于`双飞翼布局`中间列需插入一个子节点。在常规实现方式里也是在这个中间列里做文章，`如何使中间列内容不被左右列遮挡`。

+ 相同
  
  - 中间列放首位且声明其宽高占满父节点
  - 被挤出的左右列使用float和margin负值将其拉回与中间列处在同一水平线上

+ 不同
  
  - 圣杯布局：父节点声明padding为左右列留出空位，将左右列固定在空位上
  - 双飞翼布局：中间列插入子节点并声明margin为左右列让出空位，将左右列固定在空位上

![圣杯布局/双飞翼布局](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8dc38beabb574eff98e18497189cf66f~tplv-k3u1fbpfcp-watermark.awebp)

> 圣杯布局float + margin-left/right + padding-left/right

```html
<div class="grail-layout-x">
    <div class="left"></div>
    <div class="right"></div>
    <div class="center"></div>
</div>
```

由于浮动节点在位置上不能高于前面或平级的非浮动节点，否则会导致浮动节点下沉。因此在编写HTML结构时，将中间列节点挪到右列节点后面。

```scss
.grail-layout-x {
    padding: 0 100px;
    width: 400px;
    height: 400px;
    .left {
        float: left;
        margin-left: -100px;
        width: 100px;
        height: 100%;
        background-color: #f66;
    }
    .right {
        float: right;
        margin-right: -100px;
        width: 100px;
        height: 100%;
        background-color: #66f;
    }
    .center {
        height: 100%;
        background-color: #3c9;
    }
}
```

> 双飞翼布局float + margin-left/right

HTML结构大体同上，只是在中间列里插入一个子节点`<div>`。根据两者区别，CSS声明会与上述圣杯布局有一点点出入，可观察对比找出不同地方。

```html
<div class="grail-layout-y">
    <div class="left"></div>
    <div class="right"></div>
    <div class="center">
        <div></div>
    </div>
</div>
```

```scss
.grail-layout-y {
    width: 400px;
    height: 400px;
    .left {
        float: left;
        width: 100px;
        height: 100%;
        background-color: #f66;
    }
    .right {
        float: right;
        width: 100px;
        height: 100%;
        background-color: #66f;
    }
    .center {
        margin: 0 100px;
        height: 100%;
        background-color: #3c9;
    }
}
```

> 圣杯布局/双飞翼布局flex

使用flex实现`圣杯布局/双飞翼布局`可忽略上述分析，左右两列宽度固定，中间列宽度自适应

```html
<div class="grail-layout">
    <div class="left"></div>
    <div class="center"></div>
    <div class="right"></div>
</div>
```

```scss
.grail-layout {
    display: flex;
    width: 400px;
    height: 400px;
    .left {
        width: 100px;
        background-color: #f66;
    }
    .center {
        flex: 1;
        background-color: #3c9;
    }
    .right {
        width: 100px;
        background-color: #66f;
    }
}
```

#### 均分布局

经典的均分布局由`多列`组成，其特点为`每列宽度相等`和`每列高度固定且相等`。总体来说也是最简单的经典布局，由于每列宽度相等，所以很易找到合适的方式处理。

![均分布局](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4cd0dec75a784851a94454184bd85625~tplv-k3u1fbpfcp-watermark.awebp)

```html
<div class="average-layout">
    <div class="one"></div>
    <div class="two"></div>
    <div class="three"></div>
    <div class="four"></div>
</div>
```

```scss
.one {
    background-color: #f66;
}
.two {
    background-color: #66f;
}
.three {
    background-color: #f90;
}
.four {
    background-color: #09f;
}
```

> float + width

每列宽度声明为相等的百分比，若有4列则声明`width:25%`。N列就用公式`100 / n`求出最终百分比宽度，记得保留2位小数，懒人还可用`width:calc(100% / n)`自动计算呢。

```scss
.average-layout {
    width: 400px;
    height: 400px;
    div {
        float: left;
        width: 25%;
        height: 100%;
    }
}
```

> flex

使用flex实现会更简洁。节点声明`display:flex`后，生成的`FFC容器`里所有子节点的高度都相等，因为容器的`align-items`默认为`stretch`，所有子节点将占满整个容器的高度。每列声明`flex:1`自适应宽度。

```scss
.average-layout {
    display: flex;
    width: 400px;
    height: 400px;
    div {
        flex: 1;
    }
}
```

#### 居中布局*

居中布局由`父容器`与`若干个子容器`组成，子容器在父容器中横向排列或竖向排列且呈水平居中或垂直居中。居中布局是一个很经典的问题，相信大家都会经常遇到。

![居中布局](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8f5311497f6b413e8418a14d45f812d7~tplv-k3u1fbpfcp-watermark.awebp)

```html
<div class="center-layout">
    <div></div>
</div>
```

在此直接上一个目前最简单最高效的居中方式。`display:flex`与`margin:auto`的强行组合。

```scss
.center-layout {
    display: flex;
    width: 400px;
    height: 400px;
    background-color: #f66;
    div {
        margin: auto;
        width: 100px;
        height: 100px;
        background-color: #66f;
    }
}
```

不过我个人更推荐`display:flex`一步到位

```scss
.center-layout {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 400px;
    height: 400px;
    background-color: #f66;
    div {
        width: 100px;
        height: 100px;
        background-color: #66f;
    }
}
```

### 自适布局

**自适布局**指相对视窗任何尺寸都能占据特定百分比的占位布局。`自适布局`的容器都是根据视窗尺寸计算，即使`父节点`或`祖先节点`的尺寸发生变化也不会影响`自适布局`的容器尺寸。

搭建`自适布局`就离不开**视窗比例单位**。在`CSS3`里增加了与`viewport`相关的四个长度单位，随着时间推移，目前大部分浏览器对这四个长度单位都有较好的兼容性，这也是未来最建议在伸缩方案里使用的长度单位。

- `1vw`表示`1%`视窗宽度
- `1vh`表示`1%`视窗高度
- `1vmin`表示`1%`视窗宽度和`1%`视窗高度里最小者
- `1vmax`表示`1%`视窗宽度和`1%`视窗高度里最大者

视窗宽高在JS里分别对应`window.innerWdith`和`window.innerHeight`。若不考虑低版本浏览器兼容性，完全可用一行CSS代码秒杀所有移动端的伸缩方案。

```css
/* 基于UI width=750px DPR=2的网页 */
html {
    font-size: calc(100vw / 7.5);
}
```

上述代码使用`calc()`实现`font-size`的动态计算。`calc()`是`自适布局里`的**核心**存在，无它就不能愉快地实现`自适布局`所有动态计算了。

`calc()`用于动态计算单位，`数值`、`长度`、`角度`、`时间`和`百分比`都能作为参数。由于执行`数学表达式`后返回运算后的计算值，所以可减少大量人工计算甚至无需人工计算。

`calc()`饥不择食，所有计量单位都能作为参数参加整个动态计算。

- 数值：`整数`、`浮点数`
- 长度：`px`、`em`、`rem`、`vw`、`vh`等
- 角度：`deg`、`turn`
- 时间：`s`、`ms`
- 百分比：`%`

`calc()`虽然好用，但新手难免会遇到一些坑，谨记以下特点，相信就能玩转`calc()`了。

- 四则运算：只能使用`+`、`-`、`*`、`/`作为运算符号
- 运算顺序：遵循加减乘除运算顺序，可用`()`提升运算等级
- 符号连接：**每个运算符号必须使用`空格`间隔起来**
- 混合计算：可混合不同计量单位动态计算

<span style="border-bottom:2px dashed yellow;">在SPA里有遇过因为有滚动条或无滚动条而导致页面路由在跳转过程里发生向左或向右的抖动吗？</span>这让强迫症患者很难受，此时可用`calc()`巧妙解决该问题。

```css
.elem {
    padding-left: calc(100vw - 100%);
}
/* elem: 滚动容器元素下的直接子元素，适用于全局滚动 */
```

### 吸附布局

**吸附布局**指相对视窗任何滚动都能占据特定位置的占位布局。视窗滚动到特定位置，布局固定在该位置，后续不随视窗滚动而滚动。该布局产生的效果俗称`吸附效果`，是一种常见网页效果。譬如`吸顶效果`和`吸底效果`都是该范畴，经常在`跟随导航`、`移动广告`和`悬浮提示`等应用场景里出现。

在`jQuery时代`就有很多吸附效果插件，现在三大前端框架也有自身第三方的吸附效果组件。它们都有着共通的实现原理：监听`scroll`事件，判断`scrollTop`和目标节点的位置范围，符合条件则将`目标节点`的`position`声明为`fixed`使`目标节点`相对于视窗定位，让用户看上去就像钉在视窗指定位置上。

JS实现吸附效果的代码在网上一搜一大堆，更何况笔者喜欢耍CSS，在此就不贴相关的JS代码了。在此推荐一个很少见很少用的CSS属性`position:sticky`。简单的两行核心CSS代码就能完成十多行核心JS代码的功能，何乐而不为呢。

简单回顾`position`属性值，怎样用就不说了，大家应该都熟悉。

| 取值     | 功能     | 版本 |
| -------- | -------- | ---- |
| inherit  | 继承     | 2    |
| static   | 标准流   | 2    |
| relative | 相对定位 | 2    |
| absolute | 绝对定位 | 2    |
| fixed    | 固定定位 | 2    |
| sticky   | 粘性定位 | 3    |

当值为`sticky`时将节点变成`粘性定位`。**粘性定位**是`相对定位`和`固定定位`的结合体，节点在`特定阈值`跨越前为`相对定位`，跨越后为`固定定位`。

![吸附布局](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c183ad26a1e54aecb5fe2e97e94e54a6~tplv-k3u1fbpfcp-watermark.awebp)

```html
<div class="adsorption-position">
    <ul>
        <li>Top 1</li>
        <li>Top 2</li>
        <li>Normal</li>
        <li>Bottom 1</li>
        <li>Bottom 2</li>
    </ul>
</div>
```

```scss
.adsorption-position {
    overflow: auto;
    position: relative;
    width: 400px;
    height: 280px;
    outline: 1px solid #3c9;
    ul {
        padding: 200px 0;
    }
    li {
        position: sticky;
        height: 40px;
        line-height: 40px;
        text-align: center;
        color: #fff;
        &:nth-child(1) {
            top: 0;
            z-index: 9;
            background-color: #f66;
        }
        &:nth-child(2) {
            top: 40px;
            z-index: 9;
            background-color: #66f;
        }
        &:nth-child(3) {
            background-color: #f90;
        }
        &:nth-child(4) {
            bottom: 0;
            z-index: 9;
            background-color: #09f;
        }
        &:nth-child(5) {
            bottom: 40px;
            z-index: 9;
            background-color: #3c9;
        }
    }
}
```

两行核心CSS代码分别是`position:sticky`和`top/bottom:npx`。上述5个节点都声明`position:sticky`，但由于`top/bottom`赋值有所不同就产生不同吸附效果。

- 第1个`<li>`：`top`为0px，滚动到容器顶部就固定
- 第2个`<li>`：`top`为40px，滚动到距离容器顶部40px就固定
- 第3个`<li>`：未声明`top/bottom`，就一直保持相对定位
- 第4个`<li>`：`bottom`为40px，滚动到距离容器底部40px就固定
- 第5个`<li>`：`bottom`为0px，滚动到容器底部就固定

**注意**: `粘性定位`的参照物并不一定是`position:fixed`。当目标节点的任意祖先节点都未声明`position:relative|absolute|fixed|sticky`，才与`position:fixed`表现一致。当离目标节点最近的祖先节点声明p`osition:relative|absolute|fixed|sticky`，目标节点就相对该`祖先节点`产生粘性定位。<span style="border-bottom: 1px solid yellow;">简单来说确认参照物的方式与position:absolute一致。</span>

兼容性勉强还行，近2年发版的浏览器都能支持，`Safari`和`Firefox`的兼容性还是挺赞的。有`吸附效果`需求的同学建议一试，要兼容`IExplorer`就算了。期待该属性有更好的发展，毕竟`吸附布局`真的是一种常见布局。

![sticky兼容性](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c83b8f97ae764f7780dd293699927cec~tplv-k3u1fbpfcp-watermark.awebp)


### 横向布局

横向布局指容器内节点以水平方向排列且溢出部分被隐藏的占位布局。`竖向布局`很常见，声明`overflow:hidden;width:xpx;height:ypx`就能实现，但`横向布局`却不能使用类似方式实现。

为了方便使用多种方式实现`横向布局`，以下将通用代码拆分出来。

![横向布局](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c911a4ee6410451fb0004daf1fa24336~tplv-k3u1fbpfcp-watermark.awebp)

```html
<div class="horizontal-layout">
    <ul>
        <li>Alibaba</li>
        <li>Tencent</li>
        <li>Baidu</li>
        <li>Jingdong</li>
        <li>Ant</li>
        <li>Netease</li>
        <li>Meituan</li>
        <li>ByteDance</li>
        <li>360</li>
        <li>Sina</li>
    </ul>
</div>
```

```scss
.horizontal-layout {
    overflow: hidden;
    width: 300px;
    height: 100px;
    ul {
        overflow-x: auto;
        cursor: pointer;
        &::-webkit-scrollbar {
            height: 10px;
        }
        &::-webkit-scrollbar-track {
            background-color: #f0f0f0;
        }
        &::-webkit-scrollbar-thumb {
            border-radius: 5px;
            background-color: #f66;
        }
    }
    li {
        overflow: hidden;
        height: 90px;
        background-color: #66f;
        line-height: 90px;
        text-align: center;
        font-size: 16px;
        color: #fff;
        &:not(:first-child) {
            margin-left: 10px;
        }
    }
}
```

> display:inline-block; + white-space: nowrap; + overflow-x: auto;

**注意**：使用`行内元素`实现横向排版，但**必须声明**`overflow-y:hidden`使容器在`Y轴`方向隐藏溢出部分。由于`行内元素`在当前行排版产生溢出会自动将其余节点排版到下一行，因此还需声明`white-space:nowrap`使所有`行内元素`在一行内排版完毕。若产生滚动条，还需对容器的`height`做适当的微调。

```scss
.horizontal-layout.inline {
    height: 102px;
    ul {
        overflow-y: hidden;
        white-space: nowrap;
    }
    li {
        display: inline-block;
        width: 90px;
    }
}
```

> flex + overflow-x: auto;

```scss
.horizontal-layout.flex {
    ul {
        display: flex;
        flex-wrap: nowrap;
        justify-content: space-between;
    }
    li {
        flex-shrink: 0;
        flex-basis: 90px;
    }
}
```

### 凸显布局

**凸显布局**指容器内节点以同一方向排列且存在一个节点在某个方向上较突出的占位布局。该布局描述起来可能比较拗口，直接看以下效果吧，这是一个横向列表，节点从左往右排列，最右边的节点特别突出。这就是`凸显布局`的特征，凸显的节点可在凸显布局任意位置，`上下左右`，`左上左下`，`右上右下`都行。

![凸显布局](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4536a34ddf934529bd6ef2a85340ddac~tplv-k3u1fbpfcp-watermark.awebp)

这里巧妙运用`margin-*:auto`实现了凸显布局。相信大家实现水平居中固定宽度的块元素都会使用`margin:0 auto`。
在此同样原理，当节点声明`margin-*:auto`时，浏览器会自动计算剩余空间并将该值赋值给该节点。在使用该技巧时**必须基于**`flex`布局。

```html
<ul class="highlight-layout">
    <li>Alibaba</li>
    <li>Tencent</li>
    <li>Baidu</li>
    <li>Jingdong</li>
    <li>Ant</li>
    <li>Netease</li>
</ul>
```

```scss
.highlight-layout {
    display: flex;
    align-items: center;
    padding: 0 10px;
    width: 600px;
    height: 60px;
    background-color: #3c9;
    li {
        padding: 0 10px;
        height: 40px;
        background-color: #3c9;
        line-height: 40px;
        font-size: 16px;
        color: #fff;
    }
    &.left li {
        &:not(:first-child) {
            margin-left: 10px;
        }
        &:last-child {
            margin-left: auto;
        }
    }
    &.right li {
        &:not(:last-child) {
            margin-right: 10px;
        }
        &:first-child {
            margin-right: auto;
        }
    }
    &.top {
        flex-direction: column;
        width: 120px;
        height: 400px;
        li {
            &:not(:first-child) {
                margin-top: 10px;
            }
            &:last-child {
                margin-top: auto;
            }
        }
    }
    &.bottom {
        flex-direction: column;
        width: 120px;
        height: 400px;
        li {
            &:not(:last-child) {
                margin-bottom: 10px;
            }
            &:first-child {
                margin-bottom: auto;
            }
        }
    }
}
```

###  间距布局*

大部分同学可能只认得`:nth-child(n)`、`:nth-child(2n-1)`、`:nth-child(2n)`和`:nth-child(xn)`的日常用法，但其实还有一些你可能未见过的用法。在此笔者借这次机会将`:nth-child()`所有用法总结下，`n/x/y`代表正整数，最小值为`1`。

- [√] **:nth-child(n)**：选择第`n`个元素
- [√] **:nth-child(odd)**：选择`奇数位置`元素，相当于`:nth-child(2n-1)`
- [√] **:nth-child(even)**：选择`偶数位置`元素，相当于`:nth-child(2n)`
- [√] **:nth-child(xn)**：选择第`x*n`个元素
- [√] **:nth-child(x-n)**：选择前`x`个元素
- [√] **:nth-child(y-n):nth-child(n+x)**：选择第`x~y`个元素

分析间距布局的一切特点，捕获特征很有利于将特征转换成CSS代码。

- A：确定容器间的间距，使用`margin`声明
- B：确定容器内的间距，使用`padding`声明，后续方便声明`background-color`(该步骤很易与上一步骤混淆，请特别注意)
- C：确定靠近容器边界的节点与容器的间距，使用`padding`声明容器而不是使用margin声明节点(该步骤说明上一步骤的处理结果)
- D：确认每行节点的左右间距，使用`margin-left/margin-right`(二选一)声明节点
- E：确认最左列节点或最右列节点与容器的间距，使用`margin-left:0`声明最左列节点或使用`margin-right:0`声明最右列节点
- F：除了首行节点，使用`margin-top`声明其余节点
- G：若希望容器顶部底部留空，使用`border-top/border-bottom`代替`padding-top/padding-bottom`

![间距布局](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2129c1227dff4aeca47660744c815fa2~tplv-k3u1fbpfcp-watermark.awebp)

```html
<ul class="spacing-layout">
    <li>1</li>
    <li>2</li>
    <li>3</li>
    <li>4</li>
    <li>5</li>
    <li>6</li>
    <li>7</li>
    <li>8</li>
</ul>
```

```scss
.spacing-layout {
    display: flex;
    overflow: auto;
    flex-wrap: wrap;
    margin-top: 20px; // 对应A
    padding: 20px; // 对应B和C
    // padding-top: 0; // 对应G
    // padding-bottom: 0; // 对应G
    // border-top: 20px solid #f66; // 对应G
    // border-bottom: 20px solid #f66; // 对应G
    width: 700px; // 稍微留空用于显示滚动条
    height: 400px;
    background-color: #f66;
    li {
        width: 200px;
        height: 200px;
        background-color: #66f;
        line-height: 200px;
        text-align: center;
        font-size: 20px;
        color: #fff;
        &:not(:nth-child(3n)) {
            margin-right: 20px; // 对应D和E
        }
        &:nth-child(n+4) {
            margin-top: 20px; // 对应F
        }
    }
}
```

### 空载布局*

**空载布局**指容器内无任何节点时使用其他形式代替的占位布局。还有使用JS判断列表集合为空时显示占位符吗？相信很多使用MVVM框架开发的同学都会使用条件判断的方式渲染虚拟DOM，若列表长度不为0则渲染列表，否则渲染占位符。

```html
<div>
    <ul v-if="list.length">...</ul>
    <div v-esle>Empty</div>
</div>
```

然而CSS提供一个空判断的选择器`:empty`，这应该很少同学会注意到吧。

`:empty`作用于无子节点的节点，该子节点也包括行内匿名盒(`单独的文本内容`)。**以下三种情况均视为非空状态**，若不出现这三种状态则视为空状态，此时`:empty`才会触发。

- [√] 仅存在节点：`<div><p>CSS</p></div>`
- [√] 仅存在文本：`<div>CSS</div>`
- [√] 同时存在节点和文本：`<div>Hello <p>CSS</p></div>`

![空载布局](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/70f19d77a64f48ee8bdb5fd89fcf01c4~tplv-k3u1fbpfcp-watermark.awebp)

```html
<ul class="empty-layout">
    <li>1</li>
    <li>2</li>
    <li>3</li>
    <li>4</li>
    <li>5</li>
    <li>6</li>
    <li>7</li>
    <li>8</li>
    <li>9</li>
</ul>
<ul class="empty-layout"></ul>
```

```scss
$empty: "https://yangzw.vip/img/empty.svg";
.empty-layout {
    overflow: auto;
    width: 200px;
    height: 150px;
    outline: 1px solid #3c9;
    &:empty {
        display: flex;
        justify-content: center;
        align-items: center;
        background: url($empty) no-repeat center/100px auto;
        &::after {
            margin-top: 90px;
            font-weight: bold;
            content: "没钱就没数据";
        }
    }
    li {
        padding: 0 10px;
        height: 30px;
        background-color: #09f;
        line-height: 30px;
        color: #fff;
        &:nth-child(even) {
            background-color: #f90;
        }
    }
}
```

另外还存在一种`特殊的空载布局`，就是不做任何处理。这样最终渲染的DOM只有容器，若已声明`margin/padding/border`但未声明`width/height`的情况下，就会出现以下占位效果。无任何子节点的容器还声明着`margin/padding/border`，看着都尴尬。

![img](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a681a88037a24deb8932eb85f839f873~tplv-k3u1fbpfcp-watermark.awebp)

没事，`:empty`帮你搞掂！对于无任何子节点的容器直接声明`display:none`解决所有无效占位，当然也可作用于指定节点。一招制敌，劲！

```scss
// 作用于所有节点
:empty {
    display: none;
}
// 作用于指定节点
.empty-layout:empty {
    display: none;
}
```

### 多格布局*

**多格布局**指容器内节点以动态数量的格子形式排列的占位布局。微信朋友圈的相册就是最常见的`多格布局`了，当单张照片排列、两张照片排列、三张照片排列等等，每种情况下照片的尺寸都可能不一致。笔者制作了一个动态多格相册怀念我家狗狗AB。大家感受下纯CSS实现动态数量的多格布局吧。

在此留个悬念，不讲解如何实现，看看大家能不能根据笔者列出的提示尝试将该效果复原。主要原理是`根据结构选择器限制节点范围`实现，在本文也可找到原理的答案喔！记得实现完再看以下源码哈！

![多格布局](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/56ff22e5ceac4867942b1da1d148510d~tplv-k3u1fbpfcp-watermark.awebp)

```html
<ul class="multigrid-layout">
    <li class="item"><img src="https://static.yangzw.vip/codepen/ab-3.jpg"></li>
    <li class="item"><img src="https://static.yangzw.vip/codepen/ab-3.jpg"></li>
    <li class="item"><img src="https://static.yangzw.vip/codepen/ab-3.jpg"></li>
    <li class="item"><img src="https://static.yangzw.vip/codepen/ab-3.jpg"></li>
    <li class="item"><img src="https://static.yangzw.vip/codepen/ab-3.jpg"></li>
    <li class="item"><img src="https://static.yangzw.vip/codepen/ab-3.jpg"></li>
    <li class="item"><img src="https://static.yangzw.vip/codepen/ab-3.jpg"></li>
    <li class="item"><img src="https://static.yangzw.vip/codepen/ab-3.jpg"></li>
    <li class="item"><img src="https://static.yangzw.vip/codepen/ab-3.jpg"></li>
</ul>
```

```scss
@mixin square($count: 2) {
    $length: calc((100% - #{$count} * 10px) / #{$count});
    width: $length;
    height: $length;
}
.multigrid-layout {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    align-content: flex-start;
    padding: 5px;
    border: 1px solid #ccc;
    border-radius: 5px;
    width: 400px;
    height: 400px;
    li {
        display: flex;
        overflow: hidden;
        justify-content: center;
        margin: 5px;
        background-color: #f0f0f0;
        @include square(3);
    }
    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
}
// 一个元素
.item:only-child {
    border-radius: 10px;
    width: auto;
    max-width: 80%;
    height: auto;
    max-height: 80%;
}
// 两个元素
.item:first-child:nth-last-child(2),
.item:first-child:nth-last-child(2) ~ .item:nth-child(2) {
    @include square(2);
}
.item:first-child:nth-last-child(2) {
    border-radius: 10px 0 0 10px;
}
.item:first-child:nth-last-child(2) ~ .item:nth-child(2) {
    border-radius: 0 10px 10px 0;
}
// 三个元素
.item:first-child:nth-last-child(3),
.item:first-child:nth-last-child(3) ~ .item:nth-child(2),
.item:first-child:nth-last-child(3) ~ .item:nth-child(3) {
    @include square(2);
}
.item:first-child:nth-last-child(3) {
    border-top-left-radius: 10px;
}
.item:first-child:nth-last-child(3) ~ .item:nth-child(2) {
    border-top-right-radius: 10px;
}
.item:first-child:nth-last-child(3) ~ .item:nth-child(3) {
    border-bottom-left-radius: 10px;
}
// 四个元素
.item:first-child:nth-last-child(4),
.item:first-child:nth-last-child(4) ~ .item:nth-child(2),
.item:first-child:nth-last-child(4) ~ .item:nth-child(3),
.item:first-child:nth-last-child(4) ~ .item:nth-child(4) {
    @include square(2);
}
.item:first-child:nth-last-child(4) {
    border-top-left-radius: 10px;
}
.item:first-child:nth-last-child(4) ~ .item:nth-child(2) {
    border-top-right-radius: 10px;
}
.item:first-child:nth-last-child(4) ~ .item:nth-child(3) {
    border-bottom-left-radius: 10px;
}
.item:first-child:nth-last-child(4) ~ .item:nth-child(4) {
    border-bottom-right-radius: 10px;
}
// 五个元素
.item:first-child:nth-last-child(5) {
    border-top-left-radius: 10px;
}
.item:first-child:nth-last-child(5) ~ .item:nth-child(3) {
    border-top-right-radius: 10px;
}
.item:first-child:nth-last-child(5) ~ .item:nth-child(4) {
    border-bottom-left-radius: 10px;
}
// 六个元素
.item:first-child:nth-last-child(6) {
    border-top-left-radius: 10px;
}
.item:first-child:nth-last-child(6) ~ .item:nth-child(3) {
    border-top-right-radius: 10px;
}
.item:first-child:nth-last-child(6) ~ .item:nth-child(4) {
    border-bottom-left-radius: 10px;
}
.item:first-child:nth-last-child(6) ~ .item:nth-child(6) {
    border-bottom-right-radius: 10px;
}
// 七个元素
.item:first-child:nth-last-child(7) {
    border-top-left-radius: 10px;
}
.item:first-child:nth-last-child(7) ~ .item:nth-child(3) {
    border-top-right-radius: 10px;
}
.item:first-child:nth-last-child(7) ~ .item:nth-child(7) {
    border-bottom-left-radius: 10px;
}
// 八个元素
.item:first-child:nth-last-child(8) {
    border-top-left-radius: 10px;
}
.item:first-child:nth-last-child(8) ~ .item:nth-child(3) {
    border-top-right-radius: 10px;
}
.item:first-child:nth-last-child(8) ~ .item:nth-child(7) {
    border-bottom-left-radius: 10px;
}
// 九个元素
.item:first-child:nth-last-child(9) {
    border-top-left-radius: 10px;
}
.item:first-child:nth-last-child(9) ~ .item:nth-child(3) {
    border-top-right-radius: 10px;
}
.item:first-child:nth-last-child(9) ~ .item:nth-child(7) {
    border-bottom-left-radius: 10px;
}
.item:first-child:nth-last-child(9) ~ .item:nth-child(9) {
    border-bottom-right-radius: 10px;
}
```

### 返回顶部

![返回顶部](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1acd493c4f454d7eafd324d06a815f13~tplv-k3u1fbpfcp-watermark.awebp)

实现要点：

1. CSS sticky 可以实现粘性滚动效果，可以设置负值
2. transformY(100vh)可以偏移1屏幕高度，不影响占位
3. 浮动可以脱离文档流，不影响高度
4. 负的 margin 可以抵消浮动的环绕效果
5. scroll-behavior: smooth 可以实现平滑滚动
6. 兼容性取决于 sticky，不兼容IE

```html
<body>
  <a class="back" href="#"></a><!--这里注意需要将.back 放在前面，不然没法触发粘性定位-->
  <article>
  ...很多内容
  </article>
</body>
```

```css
html,body{
  scroll-behavior: smooth;
}
.back{
  position: sticky;
  float: right;
  top: -110px;
  margin-top: -50px;
  border-radius: 50%;
  background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 320 512'%3E %3Cpath fill='%23ffffff' d='M177 159.7l136 136c9.4 9.4 9.4 24.6 0 33.9l-22.6 22.6c-9.4 9.4-24.6 9.4-33.9 0L160 255.9l-96.4 96.4c-9.4 9.4-24.6 9.4-33.9 0L7 329.7c-9.4-9.4-9.4-24.6 0-33.9l136-136c9.4-9.5 24.6-9.5 34-.1z'%3E%3C/path%3E %3C/svg%3E") center no-repeat dodgerblue;
  background-size: 50%;
  width: 50px;
  height: 50px;
  transform: translateY(calc(100vh + 50px));
}
```

### 特殊现象

#### transform + position:fixed

`position:fixed;`布局的元素，在其父容器包含`transform`属性的时候会降格成`position:absolute;`

如在某些滚动加载动画中，会用到`transform`提升交互效果，此时如果内部有用到`position:fixed`布局，就会出现闪烁现象（在滚动加载动画出现时消失，动画结束后又再次出现固定在原地）

### 参考文章

[8则未必知道且超级实用的纯CSS布局排版技巧 | 网易四年实践](https://juejin.cn/post/6986873449721364510)
[CSS sticky实现返回顶部](https://juejin.cn/post/6992018973856383013)
