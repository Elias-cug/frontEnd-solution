## 思考的点

1. 什么样式覆盖比较好
2. 什么样式配置比较好

- text-align
- width

## API

1. table

```js
{
  columns: [Array, 描述列],
  datasource: [Array, 列表数据],
  rowKey: [String, 行唯一标识],
  thStyle: [Object, 表头样式],
  trStyle: [Object, 每一行样式],
  oddBg: [String, 奇数行背景],
  evenBg: [String, 偶数行背景],

  loading: [Boolean, 是否加载中],
}
```

2. columns

```js
{
  dataIndex: [String | ReactElement, 列字段],
  title: [String | ReactElement, 列名],
  align: ['center' | 'right' | 'left', 列对齐方式, 默认center]
  width: [number, 列宽],
  render: [ReactElement, 表示如何渲染Cell],

  ellipsis: [String, 超出宽度省略, 默认不省略]
}
```
