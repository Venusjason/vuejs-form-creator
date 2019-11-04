### 1.0.0
- changed
 - 仓库更名 q-former
 - 优化部分api: previewFormItemValue 等价于 previewValue
 - 增加item api：prepend 、append便于在formItem的控件前后插值
 - 优化 表单字段name未声明时，会引发undefined报错，导致难以调试
 - 优化 开发时不需要刻意规避row内嵌套row元素引起的组件被遮盖问题

- fix
 - element iview写rule一致

- refactor
 - 重构 formItem渲染, 对key值重复的问题从内部设置不重复下标

### 0.14.0
- added
 - 增加 rules 库，便于快速开发校验表单
- changed
 - 调整 debug位置

### 0.13.0
- fix
  - 防止表单控件 超出边界,设置 默认 maxWidth: '100%'

### 0.12.0
- added
 - 增加 formItemStatus 字段，优先级高于 option.status，便于表单部分字段特殊状态处理
 - 增加 formItemComponent 字段，便于展示 formItem 下 component样式对齐,这样component使用场景更适合于name搭配的自定义form控件

### 0.10.0
- fixed
 - 多级数组结构嵌套，row渲染不对导致布局无法换行问题
- added
 - vue文件中jsx形式component 可以不用写h函数了（也可以沿用以前写法）
- changed
 - json view展示控件优化

### 0.9.0
- fixed
 - 修复pkg bug
- added
 - 增加默认宽度，表单itemGutter配置

### 0.7.0 | 0.8.0
- added
 - 全局配置增加 debug、组件name
 - 增加表单option buttonGroup 配置
 - 引入版本号差异处理机制，保障api设计的稳定

### 0.6.0
- added
 - 支持递归式 嵌套表单布局

### 0.5.0
- fix
 - 修复map函数 没有设置key 导致视图异常的情况