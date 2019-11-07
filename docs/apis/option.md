

参数 | 说明 | 类型 | 可选值 | 默认值
---|--- |--- |--- |---
status | 代替disabled(boolean)| string |edit、disabled、 preview| edit
debug | boolean, 快捷调试入口 | boolean | - | false
autoAuffix(后续会使用colon替代) | el-form-item label 后缀自动补齐(如： '姓名' -> '姓名：') | boolean | - | false
colon | 是否自动补齐label冒号 | boolean | - | false
itemSpan | formItem span全局参数,优先级itemSpan < formItem.span | number | 0~24 | 24
itemGutter | el-row gutter参数 | number | 0~24 | 0
buttonGroup | 表单 submit、cancel按钮组合| boolean/function| true/false,function 返回按钮数组| false

> 示例

```
<template>
<q-former
  v-model="formData"
  :option="option"
  @submit="onSubmit"
  @cancel="onCancel"
  ref="qFormer"
/>
</template>


data() {
  return {
    option: {
      labelWidth: '100px',
      colon: true,
      buttonGroup: true,
      status: 'edit',
      debug: process.env.NODE_ENV === 'development',
      inline: false,
    },
  }
},
methods: {
  onSubmit(form) {
    form.validate(valid => {
      // 校验结果逻辑
    })
  },
  onCancel() {
    console.log('你点击了取消按钮')
  },

},
```