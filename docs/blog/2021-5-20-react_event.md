---
title: JS 触发 React 项目的事件
date: 2021-05-20
tags:
  - react
  - event
summary: 用 JS 模拟用户操作触发 React 事件
author: Wupeng
location: Shanghai
---

## 背景

我的一个朋友，他想要弄个自动填表单的工具，但是 `jQuery` 操作 `React` 页面的表单的时候，输上东西没啥用呢，提交的时候输的内容没变化。问我怎么破。

## 思考

这几年我主要接触的都是 `Vue(2.x)` 的项目，`React`的认知还停留在根据官方文档写几个简单demo的程度。但是我想其底层原理应该都大同小异。

`Vue` 中的 `view` 改变 `data` 都是通过监听事件实现的，如双向绑定通过监听 `input` DOM的 `input` 事件，触发 `data` 的变化，以实现 `view` 的更新。

我想，`React` 亦是如此。因此，我给我的朋友提出我的想法：
你虽然通过 `JQuery`，更新了页面上的内容但是网页提交是拿 `React` 实例中 state下保存的数据，你用 `Jquery` 手动改没有触发 `React` 的更新机制，即 `state` 下的数据没有动态更新，所以，提交的时候的数据还是老数据。如果需要改，你需要触发表单的 `input` 事件。然后给他推荐了一篇文章 [通过js给input框的value赋值触发input事件](https://blog.csdn.net/u012197726/article/details/108143530)。

到此，我觉得应该为啥问题解决了。

## 后续

后来我朋友和我说方法不管用，我思考应该存在我所忽略的细节
+ 我：你可以先自己写个 `html`，监听 `input` 的 `input` 事件，然后自己再通过网页在外部触发它，看代码里面监听的 `input` 事件有没有触发， 有没有拿到值。先区分下是事件没有触发成功，还是触发成功，但由于 `react` 代码问题，没有更新。
+ 朋友：`html` 的可以这么操作，然后 `react` 弄出来的不行
+ 我：`react` 的监听的事件有触发么？
+ 朋友：我在别人网页改的，我看不到他代码。事件确实是触发了，我看到输入框高亮全选了。
+ 我：我本地起个简单的 `react` 服务看下吧

## 研究

我按照官网文档起了一个简单的 `React` 项目，核心代码也是直接复制的官网文档表单一栏的代码：
```jsx
class NameForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    console.log('onChange=====')
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    alert('提交的名字: ' + this.state.value);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          名字:
          <input type="text" value={this.state.value} onChange={this.handleChange} />
        </label>
        <input type="submit" value="提交" />
      </form>
    );
  }
}
```
然后我通过如下代码，尝试触发 `React` 的 `onChange` 事件:
```js
var elem = document.querySelector('input');
elem.value = 123;
var event = new Event('change', { bubbles: true });
elem.dispatchEvent(event);
```
我发现 `handleChange` 方法并没有执行，我陷入的困惑：难道是触发方式不对？为了进一步确认，我将代码修改如下：
```jsx
class NameForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    console.log('onChange===', event.target.value)
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    alert('提交的名字: ' + this.state.value);
    event.preventDefault();
  }

  handleInput (e) {
    console.log('onInput===', e.target.value)
    this.setState({value: e.target.value});
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          名字:
          <input type="text" value={this.state.value} onInput={this.handleInput} onChange={this.handleChange} />
        </label>
        <input type="submit" value="提交" />
      </form>
    );
  }
}
```
然后尝试触发 `React` 的 `Input` 事件：
```js
var elem = document.querySelector('input');
elem.value = 111;
var event = new Event('input', { bubbles: true });
elem.dispatchEvent(event);
```
我发现 `handleInput` 成功执行，且 `handleSubmit` 亦可通过类似的方式触发。同时，我又通过 `dom.addEventListener('change', handleFunc, false)` 的方式，发现原生的 `change` 事件是可以通过上面的方式触发的。

再结合官网文档 [事件处理](https://react.docschina.org/docs/handling-events.html) 以及 [合成事件](https://react.docschina.org/docs/events.html) 里面的内容，我确定应该是 `React` 的 `Change` 事件是并不是原生的 `change` 事件。

## 解决

既然知道原因出在 `React` 本身对 `change` 事件的特殊处理上，那么后续就很简单了：baidu。在过滤一些无用的文章，找到了这篇：[What is the best way to trigger onchange event in react js](https://stackoverflow.com/questions/23892547/what-is-the-best-way-to-trigger-onchange-event-in-react-js)。其中说明了 `change` 事件没有触发的原因：

>For React 16 and React >=15.6

>Setter .value= is not working as we wanted because React library overrides input value setter but we can call the function directly on the input as context.

这里贴下核心代码：
```js
// 对于React 16和React > = 15.6
var nativeInputValueSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, "value").set;
nativeInputValueSetter.call(input, 'react 16 value');

var ev2 = new Event('input', { bubbles: true});
input.dispatchEvent(ev2);

// 仅适用于React <= 15.5的过时答案
var ev = new Event('input', { bubbles: true});
ev.simulated = true;
element.value = 'Something new';
element.dispatchEvent(ev);

// React <= 15.5 的源码，地址：https://github.com/jquense/react/blob/9a93af4411a8e880bbc05392ccf2b195c97502d1/src/renderers/dom/client/eventPlugins/ChangeEventPlugin.js#L128
function getInstIfValueChanged(targetInst, nativeEvent) {
  var updated = inputValueTracking.updateValueIfChanged(targetInst);
  var simulated = (
    nativeEvent.simulated === true &&
    ChangeEventPlugin._allowSimulatedPassThrough
  );

  if (updated || simulated) {
    return targetInst;
  }
}

```

## 深入解析

但是上述并没有完全说明，为啥可以触发 `React` 的 `onInput` 却不能触发 `onChange` 事件，在通过进一步的文章查找阅读和观看部分 `React` 源码后，发现：
```js
// 截取核心源码部分：
// react/packages/react-dom/src/events/plugins/ChangeEventPlugin.js

function extractEvents(
  dispatchQueue: DispatchQueue,
  domEventName: DOMEventName,
  targetInst: null | Fiber,
  nativeEvent: AnyNativeEvent,
  nativeEventTarget: null | EventTarget,
  eventSystemFlags: EventSystemFlags,
  targetContainer: null | EventTarget,
) {
  // ...

   else if (isTextInputElement(((targetNode: any): HTMLElement))) {
    if (isInputEventSupported) {
      getTargetInstFunc = getTargetInstForInputOrChangeEvent;
    } else {
      // ...
    }
  } else if (shouldUseClickEvent(targetNode)) {
    // ...
  }

  if (handleEventFunc) {
    handleEventFunc(domEventName, targetNode, targetInst);
  }
}

function getTargetInstForInputOrChangeEvent(
  domEventName: DOMEventName,
  targetInst,
) {
  if (domEventName === 'input' || domEventName === 'change') {
    return getInstIfValueChanged(targetInst);
  }
}

function getInstIfValueChanged(targetInst: Object) {
  const targetNode = getNodeFromInstance(targetInst);
  if (updateValueIfChanged(((targetNode: any): HTMLInputElement))) {
    return targetInst;
  }
}

// react/packages/react-dom/src/client/inputValueTracking.js
function updateValueIfChanged(node: ElementWithValueTracker) {
  if (!node) {
    return false;
  }

  const tracker = getTracker(node);
  // if there is no tracker at this point it's unlikely
  // that trying again will succeed
  if (!tracker) {
    return true;
  }

  const lastValue = tracker.getValue();
  const nextValue = getValueFromNode(node);
  if (nextValue !== lastValue) {
    tracker.setValue(nextValue);
    return true;
  }
  return false;
}

function getValueFromNode(node: HTMLInputElement): string {
  let value = '';
  if (!node) {
    return value;
  }

  if (isCheckable(node)) {
    value = node.checked ? 'true' : 'false';
  } else {
    value = node.value;
  }

  return value;
}

function getTracker(node: ElementWithValueTracker) {
  return node._valueTracker;
}

```
代码验证：
```js
// 第一步
var input = document.querySelector('form:last-child input');
var nativeInputValueDesc = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, "value");
var nativeInputValueSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, "value").set;
Object.defineProperty(window.HTMLInputElement.prototype, "value", Object.assign(nativeInputValueDesc, {
  set: function (newVal) {
    console.log(input.value + ' , ' + input._valueTracker.getValue())
    nativeInputValueSetter.call(this, newVal)
    console.log(input.value + ' , ' + input._valueTracker.getValue())
  }
}));
var newFunc = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, "value").set
newFunc.call(input, 'React 16 value');
// 结果输出如下
//  , 
// React 16 value , 

// 第二步
input.value = 'aaa';
input._valueTracker.getValue();
// 结果输出为：'aaa'
```

通过上述代码分析，`React onChange` 事件是否触发，依赖 `updateValueIfChanged` 方法的判断结果，即 `inputDOM.value !== inputDOM._valueTracker.getValue()`。

利用 `nativeInputValueSetter.call(input, 'react 16 value')` 方法修改 `inputDOM`，`inputDOM.value` 变成 `react 16 value`，但是 `inputDOM._valueTracker.getValue()` 还是默认值空。

但通过 `inputDOM.value = 'xxx'` 修改值时，`inputDOM._valueTracker.getValue()` 会变得和 `inputDOM.value` 一致。即此时触发 原生的 `input` 事件，只会触发 `onInput` 而不会触发 `onChange`。



## 总结

+ `React` 事件都是合成事件，是对原生事件的封装处理
+ `React` 的 `onChange` 监听的是原生的 `input` 事件
+ `React` 复写 `HTMLInputElement` 上 `value` 的 `setter` 方法来保持输入值的同步。
+ 直接通过 `inputDOM.value = 'xxx'` 修改 `DOM` 值，会使得 `inputDOM._valueTracker.getValue() === inputDOM.value` 无法触发 `React` 自身封装的 `onChange` 事件


## 其他相关文章

[创建和触发 events](https://developer.mozilla.org/zh-CN/docs/orphaned/Web/Guide/Events/Creating_and_triggering_events)

[More comprehensive fix is needed for React 16 to fire change events](https://github.com/cypress-io/cypress/issues/647)

[源码 version < 15.5 ：ChangeEventPlugin.js](https://github.com/jquense/react/blob/9a93af4411a8e880bbc05392ccf2b195c97502d1/src/renderers/dom/client/eventPlugins/ChangeEventPlugin.js#L128)

[源码 version 新版：ChangeEventPlugin.js](https://github.com/facebook/react/blob/0e100ed00fb52cfd107db1d1081ef18fe4b9167f/packages/react-dom/src/events/plugins/ChangeEventPlugin.js#L245)