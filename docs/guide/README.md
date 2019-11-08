
> q-former 谐音 `kill form` , 成为前端开发者手中一把表单杀器

- el-form 在复杂表单上代码量较大
- 动态校验表单项比较麻烦
- 表单多字段联动在tempalte 与 js中穿插 代码混乱

::: tip

解决方案: 使用json方案描述表单，对表单数据自动更新，对elment、iview表单控件只做适配（采用jsx透传ui控件属性）

:::

特点：

* 简化 element ui、iview 表单代码
* 动态表单、联动表单在js中处理，避免template里书写js受到诸多限制
* 默认集成 row col布局，布局整齐
* 表单同时有 编辑、禁用、预览 三个状态
* 新增api极少，只需要和UI框架的api对接

> 由于使用了jsx写法，用过react的开发者可能比较熟悉，使用该库前你最好了解一下[vue jsx的写法](https://cn.vuejs.org/v2/guide/render-function.html)