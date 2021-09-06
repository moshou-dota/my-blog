---
title: 前端虚拟列表的实现
date: 2021-02-23
tags:
  - React
  - Virtual List
  - Optimizing Performance
summary: 前端虚拟列表的实现原理
author: Wupeng
location: Shanghai
---

## 背景

因为 DOM 元素的创建和渲染需要的时间成本很高，<b>在大数据的情况下，完整渲染列表所需要的时间不可接收。</b>其中一个解决思路就是在任何情况下只对「可见区域」进行渲染，可以达到极高的初次渲染性能。（还可以通过前端假分页的处理方式，前提是产品能接受这种交互方式。）

## 概念

虚拟列表指的就是「可视区域渲染」的列表，重要的基本就是两个概念：

+ 可滚动区域：假设有 1000 条数据，每个列表项的高度是 30，那么可滚动的区域的高度就是 1000 * 30。当用户改变列表的滚动条的当前滚动值的时候，会造成可见区域的内容的变更。
+ 可见区域：比如列表的高度是 300，右侧有纵向滚动条可以滚动，那么视觉可见的区域就是可见区域。

## 实现思路

实现虚拟列表就是处理滚动条滚动后的可见区域的变更，其中具体步骤如下：
1. 计算当前可见区域起始数据的 startIndex
2. 计算当前可见区域结束数据的 endIndex
3. 计算当前可见区域的数据，并渲染到页面中
4. 计算 startIndex 对应的数据在整个列表中的偏移位置 startOffset，并设置到列表上
![Virtual List](@assets/2021_02_23/virtual-list.png)

## 优化点

| Option | Description |
| ------:| -----------:|
| 缓存计算结果   | path to data files to supply the data that will be passed into templates. |
| 优化 contentHeight 的计算 |避免第一次渲染就调用所有项的 `itemSizeGetter` |
| 优化已缓存结果的搜索性能    | 二分查找 |
| 优化为缓存结果的搜索性能    | 按指数数量查找，比如 1、2、4、8、16、32… 的顺序来查找范围，然后使用二分查找，建议看下代码 |

## 核心代码

用 React 实现的 虚拟列表核心code

```jsx
class List extends React.Component {
  constructor (props) {
    super(props)
    this.myRef = React.createRef()
    this.state = {
      offset: 0,
      start: 0,
      end: 0,
      visibleData: [],
      lastMeasuredIndex: -1,
      sizeAndOffsetCahce: {}
    }
  }

  render () {
    const estimatedItemSize = 30
    const bgArr = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']
    const listItems = this.state.visibleData.map((item, index) =>
      <div key={index} className={`list-view-item ${bgArr[index % bgArr.length]}`} style={{ height: this.props.itemSizeGetter(index) + 'px', lineHeight: this.props.itemSizeGetter(index) + 'px' }}>{item}</div>
    )

    function getContentHeight () {
      if (this.state.lastMeasuredIndex > 0) {
        return this.state.sizeAndOffsetCahce[this.state.lastMeasuredIndex].offset + this.state.sizeAndOffsetCahce[this.state.lastMeasuredIndex].size + (this.props.data.length - this.state.lastMeasuredIndex - 1) * estimatedItemSize
      }
      return this.props.data.length * estimatedItemSize
    }

    function getTranslateY () {
      return (this.state.sizeAndOffsetCahce[this.state.start] || {}).offset || 0
    }

    return (
      <div className='list-view' ref={this.myRef} onScroll={this.handleScroll.bind(this)}>
        <div className='list-view-phantom' style={{ height: getContentHeight.call(this) + 'px' }} />
        <div className='list-view-content' style={{ transform: `translate3d(0, ${getTranslateY.call(this)}px, 0)` }}>
          {listItems}
        </div>
      </div>
    )
  }

  componentDidMount () {
    this.updateVisibleData()
  }

  getLastMeasuredSizeAndOffset () {
    return this.state.lastMeasuredIndex >= 0 ? this.state.sizeAndOffsetCahce[this.state.lastMeasuredIndex] : { offset: 0, size: 0 }
  }

  binarySearch (low, high, offset) {
    while (low <= high) {
      const middle = Math.floor((high + low) / 2)
      const middleOffset = this.getItemSizeAndOffset(middle).offset
      if (middleOffset === offset) {
        return middle
      } else if (middleOffset > offset) {
        high = middle - 1
      } else {
        low = middle + 1
      }
    }
    return low > 0 ? (low - 1) : 0
  }

  exponentialSearch (scrollTop) {
    let bound = 1
    const start = this.state.lastMeasuredIndex > 0 ? this.state.lastMeasuredIndex : 0
    while ((start + bound) < this.props.data.length && this.getItemSizeAndOffset(start + bound).offset < scrollTop) {
      bound *= 2
    }
    return this.binarySearch(start + bound / 2, Math.min(start + bound, this.props.data.length - 1), scrollTop)
  }

  findNearestItemIndex (scrollTop = 0) {
    const lastMeasuredOffset = this.getLastMeasuredSizeAndOffset().offset
    if (lastMeasuredOffset > scrollTop) {
      return this.binarySearch(0, this.state.lastMeasuredIndex, scrollTop)
    } else {
      return this.exponentialSearch(scrollTop)
    }
  }

  getItemSizeAndOffset (index) {
    const { itemSizeGetter } = this.props
    const { lastMeasuredIndex, sizeAndOffsetCahce } = this.state
    if (lastMeasuredIndex >= index) {
      return sizeAndOffsetCahce[index]
    }
    let offset = 0
    if (lastMeasuredIndex > -1) {
      const lastMeasured = sizeAndOffsetCahce[lastMeasuredIndex]
      if (lastMeasured) {
        offset = lastMeasured.offset + lastMeasured.size
      }
    }
    for (let i = lastMeasuredIndex + 1; i <= index; i++) {
      const size = itemSizeGetter(i)
      sizeAndOffsetCahce[i] = {
        size,
        offset
      }
      offset += size
    }
    this.setState({
      lastMeasuredIndex: index
    })
    return sizeAndOffsetCahce[index]
  }

  updateVisibleData (scrollTop = 0) {
    const El = this.myRef.current

    const start = this.findNearestItemIndex(scrollTop)
    const end = this.findNearestItemIndex(scrollTop + El.clientHeight) + 1
    this.setState({
      start,
      end,
      visibleData: this.props.data.slice(start, Math.min(end + 1, this.props.data.length))
    })
  }

  handleScroll (e) {
    this.updateVisibleData(e.target.scrollTop)
  }
}

class VNodeList extends React.Component {
  render () {
    const data = new Array(1000).fill().map((item, index) => index)
    return <List data={data} itemSizeGetter={this.itemSizeGetter} />
  }

  itemSizeGetter (index) {
    const heightArr = [30, 35, 42, 50, 60]
    return heightArr[index % heightArr.length]
  }
}

ReactDOM.render(<VNodeList />, document.getElementById('root'))

```

> 关于 `itemSizeGetter` 的说明  ----  列表一般都是统一的布局，至多是根据当前 item 的数据 有些不显示，有些额外显示，但总体是共用一个组件的。在上述前提条件下，使得内容不渲染也能获取高度变成了可能。我目前想到的笨方法就是枚举，即根据每个列表的数据 对应到 不同的高度。

<Vssue :title="$title" />
