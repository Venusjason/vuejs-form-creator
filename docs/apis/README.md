## qformer api

> qformer 对外暴露一个 getFormRef() 来返回el-form的ref

参数 | 说明 | 类型 
---|--- | ---
v-model | 表单值（对应el-form model）| object
option | el-form 配置透传，除了disabled以外,详见 option| object
fields | 表单域数组 | Array( item 可以是object 或 array )
@submit | options.buttonGroup 为true时,提交点击| function(form)
@cancel | options.buttonGroup 为true时,取消点击 | 

>示例:

```
<template>
  <q-former
    v-model="formData"
    :option="option"
    :fields="fields"
    @submit="onSubmit"
    @cancel="onCancel"
    ref="qFormer"
  />
</template>

<script>
export default {
  data() {
    return {
      option: {
        ...
      }
    },
  },
  computed() {
    fields() {
      return [ ... ]
    },
  },
  methods() {
    onSubmit(form) {
      const { validate } = form
    },
  },
}
</script>
```