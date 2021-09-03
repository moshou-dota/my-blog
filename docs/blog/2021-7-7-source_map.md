---
title: source map4
date: 2021-07-07
tags:
  - source map
summary: source map的相关知识点
author: Wupeng
location: Shanghai
---

## 概念

以下是 MDN 对于 source map 的解释：

> 调试原始源代码会比浏览器下载的转换后的代码更加容易。 [source map](https://www.html5rocks.com/en/tutorials/developertools/sourcemaps/) 是从已转换的代码映射到原始源的文件，使浏览器能够重构原始源并在调试器中显示重建的原始源。

**注意**: source map 一般在生产环境不会部署上去的(因为可以通过下载sourceMap通过reverse-sourcemap插件反编译得到你的源代码)，一般都是开发环境。假如是监控系统要结合的话，应该是上传到内部服务，当生产环境报错的时候，根据相关的信息结合对应的 source map 定位到具体的问题.对于 source map 如何和监控系统结合与使用的监控系统有关,这里推荐一篇相关文章: [基于Sentry搭建前端异常监控系统](https://juejin.cn/post/6974424800563298341#comment)

## sourcemap：devTools 配置项二三事

对于 `sourcemap` 而言，我们最常见的，莫过于在 webpack 的配置项`devTools` 中进行使用，而有多少种供我们选择的配置呢？

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/37ee852b6a534db0bcffd716449376ec~tplv-k3u1fbpfcp-zoom-1.image)

所谓变中取定，这么多种配置项其实只是五个关键字 eval、source-map、cheap、module 和 inline 的组合罢了，请牢记这张表，破阵心法，忽悠时方可娓娓道来。

| 关键字 | 含义 |
| ------:| -----------|
| source-map | 产生.map 文件 |
| eval | 使用 eval 包裹模块代码 |
| cheap | 不包含列信息（关于列信息的解释下面会有详细介绍)也不包含 loader 的 sourcemap |
| module | 包含 loader 的 sourcemap（比如 jsx to js ，babel 的 sourcemap）,否则无法定义源文件 |
| inline | 将.map 作为 DataURI 嵌入，不单独生成.map 文件 |

### 举例详解

如下源码使用不同配置的输出结果

```js
let a = 1,b;
b = a;
```

#### source-map 处理后输出结果:

```js
//# sourceMappingURL=bundle.js.map
```

| 关键字 | 特点 |
| ------:| -----------|
| source-map | 定位信息最全，但也.map 文件最大，效率最低 |

#### eval 处理后输出结果:

```js
eval("var a = 1,\n    b;\nb = a;\n\n//////////////////\n// WEBPACK FOOTER\n// ./src/index.js\n// module id = 0\n// module chunks = 0\n\n//# sourceURL=webpack:///./src/index.js?");
```

| 关键字 | 特点 | 解决问题 |
| ------:| -----------| --- |
| eval | 用 eval 包裹源代码进行执行 | 利用字符串可缓存从而提效 |

关于解决问题的解释,套用原作者的话:

> devtool: "source-map" cannot cache SourceMaps for modules and need to regenerate complete SourceMap for the chunk. It's something for production.

> devtool: "eval-source-map" is really as good as devtool: "source-map", but can cache SourceMaps for modules. It's much faster for rebuilds.

我的理解: `eval-source-map` 效果和 `source-map` 差不多, 不过由于可以缓存开发模式下的 `source map`, 再打包正式环境的时候更快点

#### Inline-source-map处理后输出结果:

```js
//# sourceMappingURL=data: ...（base64 字符串）
```
| 关键字 | 特点 | 解决问题 |
| ------:| -----------| --- |
| inline | 将 map 作为 DataURI 嵌入，不单独生成.map 文件 | 减少文件数 |

#### cheap-source-map处理后输出结果

```js
//# sourceMappingURL=bundle.js.map
```

咋一看和 source map 的输出结果一摸一样,但是其生成的 bundle.js.map 文件存在差别

对于`cheap-source-map`而言，只会定义到出错的这一行,且定位的代码时经由 babel 之类工具转义后的代码,而不是源码

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ee00dbb1771d40e09d416e97b4c2b34c~tplv-k3u1fbpfcp-zoom-1.image)

而对于`source-map`而言，则会精准到列

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9ff06fbbeaa145b9bc738362d962ee0f~tplv-k3u1fbpfcp-zoom-1.image)

| 关键字 | 特点 | 解决问题 | 存在的问题 |
| ------:| -----------| --- | - |
| cheap | 错误信息只会定义到行，而不会定义到列 | 精准度降低换取文件内容的缩小 | 错误信息只会定义到行，而不会定义到列. 对于经由 babel 之类工具转义的代码，只能定位到转换后的代码

#### cheap-module-source-map处理后输出结果

```js
//# sourceMappingURL=bundle.js.map
```

| 关键字 | 特点 | 解决问题 |
| ------:| -----------| --- |
| module | 会保留 loader 处理前后的文件信息映射 | 解决对于使用 cheap 配置项导致无法定位到 loader 处理前的源代码问题 |

#### 配置项关键字小结

至此，我们`source-map`的五个关键词的学习也就告一段落了，而最开始提到官网给出的二十几种配置无非是选词组合而已，再附送下一些常见配置项的关键参数对比吧。


![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b6d1ed68645848688ab9cb5a5790724d~tplv-k3u1fbpfcp-zoom-1.image)

#### 配置项最佳实践

**开发环境**

- 我们在开发环境对 sourceMap 的要求是：快（eval），信息全（module）
- 且由于此时代码未压缩，我们并不那么在意代码列信息(cheap),

所以开发环境比较推荐配置：`devtool: cheap-module-eval-source-map`

**生产环境**

- 一般情况下，我们并不希望任何人都可以在浏览器直接看到我们未编译的源码
- 所以我们不应该直接提供 sourceMap 给浏览器。但我们又需要 sourceMap 来定位我们的错误信息
- 一方面 webpack 会生成 sourcemap 文件以提供给错误收集工具比如 sentry，另一方面又不会为 bundle 添加引用注释，以避免浏览器使用。

这时我们可以设置`devtool: hidden-source-map`

至此，关于sourcemap在 webpack 中的应用层面我们就算是了解个七七八八了。

## source map 原理介绍

但是不知道各位读者有没有对 source map 的原理产生过疑问？笔者列出了四个疑问，不知道各位是不是也存在过这样的问题：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7221a39259a648ac9135c6db1889bdef~tplv-k3u1fbpfcp-zoom-1.image)

接下来的内容会逐步为读者解答这四问。

## source map 文件是否影响网页性能

这个答案肯定是不会影响，否则构建相关的优化就肯定会涉及到对于 source map 的处理了，毕竟 source map 文件也不小。

其实 source map 只有在打开 dev tools 的情况下才会开始下载，相信大部分用户都不会去打开这个面板，所以这也就不是问题了。

这时可能会有读者想说：哎，但是我好像从来没有在 Network 里看到 source map 文件的加载呀？其实这只是浏览器隐藏了而已，如果大家使用抓包工具的话就能发现在打开 dev tools 的时候开始下载 source map 了。

总结: 会影响打包构建速度(因为要多构建一份 source map),但是不会影响网页访问性能(不打开 开发者模式不会下载 source map)

## source map 存在标准嘛？

source map 是存在一个标准的，为 Google 及 Mozilla 的工程师制定，[文档地址](https://docs.google.com/document/d/1U1RGAehQwRypUTovF1KRlpiOFze0b-_2gc6fAH0KY0k/edit)。正是因为存在这份标准，各个打包器及浏览器才能生成及使用 source map，否则就乱套了。

各个打包器基本都基于[该库](https://github.com/mozilla/source-map)来生成 source map，当然也存在一些魔改的方案，但是标准都是统一的。

通过上面的库生成出来的 source map 格式大致如下，大家也可以对比各个打包器的产物，格式及内容大部分都是一致的：
```json
{
  version: 3,
  file: "min.js",
  names: ["bar", "baz", "n"],
  sources: ["one.js", "two.js"],
  sourceRoot: "http://example.com/www/js/",
  mappings: "CAAC,IAAI,IAAM,SAAUA,GAClB,OAAOC,IAAID;CCDb,IAAI,IAAM,SAAUE,GAClB,OAAOA"
}

```

接下来笔者介绍下重要字段的作用：

- version：顾名思义，指代了版本号，目前 source map 标准的版本为 3，也就是说这份 source map 使用的是第三版标准产出的
- file：编译后的文件名
- sourceRoot: 转换前的文件所在的目录。如果与转换前的文件在同一目录，该项为空
- names：转换前的所有变量名和属性名
- sources：转换前的文件,该项是一个数组,表示可能存在多个文件合并
- mappings：这是最重要的内容，表示了源代码及编译后代码的关系，记录位置信息的字符串.但是先略过这块，下文中会详细解释

另外大部分应用都是由 webpack 来打包的，可能有些读者会发现 webpack 的 source map   产出的字段于上面的略微有些不一致。
这是因为 webpack 魔改了一些东西，但是底下还是基于这个库实现的，只是变动了一些不涉及核心的字段，[具体地址](https://github.com/webpack/webpack-sources/blob/master/lib/SourceMapSource.js)

## 浏览器怎么知道源文件和 source map 的关系？

这里我们以 webpack 做个实验，通过 webpack5 对于以下代码进行打包：

```js
// index.js
const a = 1
console.log(a);
```

当我们开启 source map 选项以后，产物应该为两个文件，分别为 `bundle.js` 以及 `bundle.js.map`。

查看 `bundle.js` 文件以后我们会发现代码中存在这一一段注释：

```js
console.log(1);
//# sourceMappingURL=bundle.js.map
```

`sourceMappingURL` 就是标记了该文件的 source map 地址。

当然除此之外还有别的方式，通过查阅 [MDN 文档](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/SourceMap) 发现还可以通过 response header 的 `SourceMap: <url>` 字段来表明。

## source map 是如何对应到源代码的？

大家应该还记得上文中没介绍的 mapping 字段吧，接下来我们就来详细了解这个字段的用处。

我们还是以刚才打包的文件为例，来看看产出的 source map 长啥样（去掉了无关紧要的）：

```json
{
  sources:["webpack://webpack-source-demo/./src/index.js"],
  names: ['console', 'log'],
  mappings: 'AACAA,QAAQC,IADE',
}
```

首先 `mappings` 的内容其实是 Base64 VLQ 的编码表示。

内容由三部分组成，分别为：

- 英文，分词信息, 表示源码及压缩代码的位置关联, 以 VLQ 编码表示，代表记录该位置对应的转换前的源码位置、原来属于那个文件等信息。
- 逗号，位置对应, 分隔一行代码中的内容。每个逗号对应`转换后源码`的一个位置。所以，第一个逗号前的内容，就对应该行源码的第一个位置，以此类推。比如说 `console.log(a)` 就由 `console` 、`log` 及 `a` 三部分组成，所以存在两个逗号。
- 分号，行对应, 代表换行, 每个分号对应`转换后源码`的一行。所以，第一个分号前的内容，就对应源码的第一行，以此类推。

逗号和分号想必大家没啥疑问，但是对于这几个英文内容应该会很困惑。

其实这就是一种压缩数字内容的编码方式，毕竟源代码可能很庞大，用数字表示行数及列数的话 source map 文件将也会很庞大，因此选用 `Base 64 VlQ` 来代表数字用以减少文件体积。

思考: 为啥用`Base 64 VlQ`会减少文件体积

我们希望解决坐标信息占用空间过大的问题，主要在于两点

- 编译后文件列号过大问题：因为会编译成一行，可以想象靠后的元素纵坐标是很大的
- 数据结构占据空间问题：数组自然比字符串更耗费空间

### 相对位置解决列号过大问题

对于第一点输出后的位置元素的列号特别大的问题，可以采用相对位置的方案进行解决，具体规则如下: 

- 第一次记录的输入位置和输出位置是绝对的，往后的输入位置和输出位置都是相对上一次的位置移动了多少

### base64VLQ 解决数据结构占据空间问题

规定二进制某些位具有特定含义，从而节省空间


接着回到这里, 比如说 `A` 代表了数字 0，`C` 代表了数字 1 等等，有兴趣的读者可以通过[该网站](https://www.murzwin.com/base64vlq.html)了解映射关系。


了解了这层编码的映射关系，我们再来聊聊这一串串英文到底代表了什么。

其实这每串英文中的字母都代表了一个位置：

1. 转换后代码的第几列
2. 哪个源代码文件，毕竟可以多个文件打包成一个，对应 `sources` 字段中的索引
3. 源代码第几行
4. 源代码第几列
5. `names` 字段里的索引

这时读者可能有个疑惑，为啥没有压缩代码的第几行表示？这是因为压缩后的代码就一行，所以只需要表示第几列就行了。

**更新**：有读者询问 Base64 表达的数字是有上限的，如果需要表示的数字很大的话该怎么办。实际上除了每个分号中的第一串英文是用来表示代码的第几行第几列的绝对位置之外，后面的都是相对于之前的位置来做加减法的。

了解完以上知识以后，我们就来根据上文的内容解析下 `AACAA` 的具体含义吧，通过该网站我们可以知道 `AACAA` 对应了 `[0,0,1,0,0]`，这里需要注意的是数字都从 0 开始，笔者表述的时候会自动加一，毕竟代码第零行听起来怪怪的。

1. 压缩代码的第一列
2. 第一个源代码文件，也就是 `index.js` 文件了
3. 源代码第二行了
4. 源代码的第一列
5. `names` 数组中的第一个索引，也就是 `console`

通过以上的解析，我们就能知道 `console` 在源代码及压缩文件中的具体位置了。

但是为什么 source map 会知道编译后的代码具体在什么位置呢？这里就要用到 AST 了。让我们打开[网站](https://astexplorer.net/)输入 `console.log(a)` 后观察右边的内容，你应该会发现如图所示的数据：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d7f590b8c7b149369f0641fd12bb196d~tplv-k3u1fbpfcp-zoom-1.image)

因为 source map 是由 AST 产出的，所以我们能用上 AST 中的这个数据。

## source map 的应用

一般来说 source map 的应用都是在监控系统中，开发者构建完应用后，通过插件将源代码及 source map 上传至平台中。一旦客户端上报错误后，我们就可以通过[该库](https://github.com/mozilla/source-map)来还原源代码的报错位置（具体 API 看文档即可），方便开发者快速定位线上问题。


## 参考链接

[绝了，没想到一个 source map 居然涉及到那么多知识盲区](https://juejin.cn/post/6963076475020902436)

[万字长文：关于sourcemap，这篇文章就够了](https://juejin.cn/post/6969748500938489892)