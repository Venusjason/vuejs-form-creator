### 全局引入

> 入口文件 main.js

```
import QFormerCreator from 'q-former'

Vue.use(QFormerCreator, {
    // 默认使用element-ui,可不填写,可选element、iview, 以项目中使用的ui库为准
  ui: 'element',
  // 默认在开发模式开启表单debug, 可不填写
  debug: process.env.NODE_ENV === 'development',
  // 组件名默认 q-former, 可不填写
  name: 'q-former',
})
```

### 局部组件引入

```
<template>
<div>
  <q-former
    v-model="formData"
    :option="options"
    :fields="fields"
    @submit="submitForm"
    @cancel="cancel"
    ref="FormCreator"
  ></q-former>
</div>
</template>

<script>
import QFormerCreator from 'q-former'

const QFormer = QFormerCreator({
  ui: 'element',
  debug: process.env.NODE_ENV === 'development',
})

export default {
  components: {
    QFormer
  },
  data() {
    return {
      options: {
        labelWidth: '100px',
        inline: false,
        status: 'edit',
        colon: true,
        // itemSpan: 16,
        debug: true,
        buttonGroup: true,
      },
      formData: {
        name: '张三',
        mail: '',
        city: '',
        gender: '',
        date: '',
        time: '',
        desc: 'descdescdescdescdescdescdesc',
      },
    },
  },
  computed() {
    fields() {
      return [
        {
          label: 'Desc',
          name: 'desc',
          type: 'textarea',
          placeholder: 'Enter something...',
          autosize: {
            minRows: 2, maxRows: 5
          },
        },
        [
          [
            [
              {
                label: 'Name',
                name: 'name',
                placeholder: 'Enter your name',
                // formItemStatus: 'edit',
                rules: maxDecimal2,
              },
            ],
            {
              label: 'mail',
              name: 'mail',
              placeholder: 'Enter your e-mail',
              rules: [
                // 'required',
                email,
              ],
            }
          ],
          // null,
          [{
            tag: 'el-select',
            label: 'city',
            name: 'city',
            placeholder: 'Select your city',
            options: [
              { label: 'New York', value: 'beijing' },
              { label: 'London', value: 'shanghai' },
              { label: 'Sydney', value: 'shenzhen' },
            ],
            rules: [
              'required',
            ],
          }],
          [{
            name: 'value', component: UserUpload, label: '自定义',
            rules: ['required'],
          }]
        ],
        [{
          tag: 'el-radio-group',
          name: 'gender',
          options: [
            { label: 'Male', value: 'male' },
            { label: 'Female', value: 'female' },
          ],
          rules: [
            'required'
          ],
          label: 'Gender',
        }],
        {
          tag: 'el-checkbox-group',
          name: 'interest',
          options: [
            { label: 'Eat', value: 'Eat' },
            { label: 'Sleep', value: 'Sleep' },
            { label: 'Run', value: 'Run' },
            { label: 'Movie', value: 'Movie' },
          ],
          rules: [
            'required',
            { type: 'array', max: 2, message: 'Choose two hobbies at best', trigger: 'change' }
          ],
          label: 'Hobby',
        },
      ]
    },
  },
}

</script>
```