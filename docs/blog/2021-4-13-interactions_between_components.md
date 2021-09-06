---
title: Vue组件间的通信
date: 2021-04-13
tags:
  - vue
  - EventBus
  - 组件通信
summary: 关于Vue组件间通信的一些个人理解和思考
author: Wupeng
location: Shanghai
---

## 事件车

### 代码

```js
// 第一种实现思路
// 摘录之iview组件库
// 基于 Vue 实现的父级和后台组件的通信方法，通过 Mixin 方式使用
function broadcast(componentName, eventName, params) {
    this.$children.forEach(child => {
        const name = child.$options.name;

        if (name === componentName) {
            child.$emit.apply(child, [eventName].concat(params));
        } else {
            // todo 如果 params 是空数组，接收到的会是 undefined
            broadcast.apply(child, [componentName, eventName].concat([params]));
        }
    });
}
export default {
    methods: {
        dispatch(componentName, eventName, params) {
            let parent = this.$parent || this.$root;
            let name = parent.$options.name;

            while (parent && (!name || name !== componentName)) {
                parent = parent.$parent;

                if (parent) {
                    name = parent.$options.name;
                }
            }
            if (parent) {
                parent.$emit.apply(parent, [eventName].concat(params));
            }
        },
        broadcast(componentName, eventName, params) {
            broadcast.call(this, componentName, eventName, params);
        }
    }
};

// 第二种实现思路
// 基于 Vuex 思想自己封装的事件管理模块，可通过 Plugin 方式将其注入到原型链中全局使用
// eventBus.js
function eventBus () {
  const EventMap = {
    // [eventName]: [{
    //    limit: 组件名称/其他限制条件,
    //    func: 处理函数
    // }]
  }

  function on (eventName, limit, handleFunc) {
    if (!eventName || typeof handleFunc !== 'function') return
    if (!EventMap[eventName]) EventMap[eventName] = []
    if (EventMap[eventName].findIndex(item => item.limit === limit) >= 0) return
    EventMap[eventName].push({
      limit,
      func: handleFunc
    })
  }

  function off (eventName, limit) {
    if (!eventName || !EventMap[eventName]) return
    if (!limit) return (EventMap[eventName] = null)
    const Index = EventMap[eventName].findIndex(item => item.limit === limit)
    if (Index < 0) return
    EventMap[eventName].splice(Index, 1)
    if (EventMap[eventName].length === 0) EventMap[eventName] = null
  }

  function emit (eventName, limt, ...params) {
    if (!eventName || !EventMap[eventName]) return
    const EventList = limt ? EventMap[eventName].filter(item => item.limit === limt) : EventMap[eventName]
    EventList.forEach(eventObj => {
      eventObj.func(...params)
    })
  }

  function clear (eventName) {
    off(eventName)
  }

  return {
    $on: on,
    $off: off,
    $emit: emit,
    $clear: clear
  }
}

export default eventBus()
```

### 思考

> **`优点`**：对于多层嵌套组件（父级/后代、兄弟组件）的交互和通信很方便，且不用在意监听事件的实现逻辑，对于后续迭代比较方便
>
> **`缺点`**：要指定组件名称，且如要使用，需要针对业务对组件进行调整。耦合程度中等，不是很利于组件的复用
>
> **`总结`**：不适合基础组件，建议在业务组件（高阶组件--在基础组件上封装）中使用

## provide / inject

###  类型

- provide：`Object | () => Object`
- inject：`Array<string> | { [key: string]: string | Symbol | Object }`

### demo

```js
// 父级组件提供 'foo'
var Provider = {
  provide: {
    foo: 'bar'
  },
  // ...
}

// 子组件注入 'foo'
var Child = {
  inject: ['foo'],
  created () {
    console.log(this.foo) // => "bar"
  }
  // ...
}
```

### 思考

通过 `provide / inject` 方式向后代组件注入依赖的方式，相比较于前者，无需知晓组件名称，如果后代组件需要，则通过 `inject` 方式获取即可。

给我的感觉更像是可以深层传递的 `props`，但两者之前很大的不同是：**`provide` 和 `inject` 绑定并不是可响应的。这是Vue刻意为之的。然而，如果你传入了一个可监听的对象，那么其对象的 property 还是可响应的。**


>优点：
>>相较于 `事件车` 耦合程度低
>
>缺点：
>>同样不建议在基础组件上使用，同样建议在高阶组件中使用，官方文档也是这么说的
>>无法实现后代通知父级的操作，不过可通过如下代码变相实现。

```js
var Provider = {
  provide: {
    foo: (...rest) => this.handleFunc(...rest) // 利用 vue methods 里面的方法的 this 会被 bind 强制绑定所在的 vue实例，以此实现后代组件操作父级组件
  },
  methods: {
    handleFunc (...rest) {
      // dosomething(...rest)
    }
  }
  // ...
}
```

<Vssue :title="$title" />
