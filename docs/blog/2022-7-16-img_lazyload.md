---
title: 图片懒加载
date: 2022-07-16
tags:
  - vue
  - lazy load
  - IntersectionObserver
  - Optimizing Performance
summary: 图片懒加载的实现的实现原理
author: Wupeng
location: Shanghai
---

## 背景

在传音开发小程序平台需要实现 image 内置组件，主要功能对表微信的 image 的功能实现。其中，对于懒加载的实现，需要检测当前 image 元素是否可见。

过去，要检测一个元素是否可见或者两个元素是否相交并不容易，很多解决办法不可靠或性能很差。然而，随着互联网的发展，这种需求却与日俱增，比如，下面这些情况都需要用到相交检测：

- 图片懒加载——当图片滚动到可见时才进行加载
- 内容无限滚动——也就是用户滚动到接近内容底部时直接加载更多，而无需用户操作翻页，给用户一种网页可以无限滚动的错觉
- 检测广告的曝光情况——为了计算广告收益，需要知道广告元素的曝光情况
- 在用户看见某个区域时执行任务或播放动画

过去，相交检测通常要用到事件监听，并且需要频繁调用 `Element.getBoundingClientRect()` 方法以获取相关元素的边界信息。事件监听和调用 `Element.getBoundingClientRect()` 都是在主线程上运行，因此频繁触发、调用可能会造成性能问题。这种检测方法极其怪异且不优雅。

假如有一个无限滚动的网页，开发者使用了一个第三方库来管理整个页面的广告，又用了另外一个库来实现消息盒子和点赞，并且页面有很多动画（译注：动画往往意味着较高的性能消耗）。两个库都有自己的相交检测程序，都运行在主线程里，而网站的开发者对这些库的内部实现知之甚少，所以并未意识到有什么问题。但当用户滚动页面时，这些相交检测程序就会在页面滚动回调函数里不停触发调用，造成性能问题，体验效果让人失望。

## IntersectionObserver

`Intersection Observer API` 提供了一种异步检测目标元素与祖先元素或 viewport 相交情况变化的方法。

`Intersection Observer API` 会注册一个回调函数，每当被监视的元素进入或者退出另外一个元素时 (或者 viewport )，或者两个元素的相交部分大小发生变化时，该回调方法会被触发执行。这样，我们网站的主线程不需要再为了监听元素相交而辛苦劳作，浏览器会自行优化元素相交管理。

**注意** `Intersection Observer API` 无法提供重叠的像素个数或者具体哪个像素重叠，他的更常见的使用方式是——当两个元素相交比例在 N% 左右时，触发回调，以执行某些逻辑。

## 核心代码

```js
export default {
  // ...
  mounted() {
    if (this.lazyLoad) {
      const imgWrap = this.$el;
      const options = {
        root: null,
        thresholds: 0,
      };
      var io = new IntersectionObserver((entries) => {
        entries.forEach((item) => {
          // isIntersecting是一个Boolean值，判断目标元素当前是否可见
          if (item.isIntersecting) {
            if (item.target.dataset.src) {
              this.imgSrc = item.target.dataset.src;
            }
            // 图片加载后即停止监听该元素
            io.unobserve(imgWrap);
          }
        });
      }, options);
      // observe监听img节点
      io.observe(imgWrap);
      this.$once('hook:beforeDestroy', () => {
        io.unobserve(imgWrap);
      });
    }
  },
  // ...
  template: `
    <div @click="tap" :class="['img-wrap', ..._mode]">
      <img :src="imgSrc" v-bind="attrs" @load="_onLoad" @error="_onError"/>
    </div>
    `,
};
```

## 兼容性

技术是为业务服务的，根据自己的宿主环境选择最适合的实现方式

## 参考文章

[Intersection Observer API](https://developer.mozilla.org/zh-CN/docs/Web/API/Intersection_Observer_API)
