# vue-form-creator (element ui/ iview适配版本)

- el-form 在复杂表单上代码量较大
- 动态校验表单项比较麻烦
- 表单多字段联动在tempalte 与 js中穿插 代码混乱


解决方案 使用json方案描述表单，对表单数据自动更新，对elment表单控件只做适配（采用jsx透传ui控件属性）

#### vue-cli 3.0引入jsx写法编译

*vue 版本要求 > 2.6.0*

```
npm install @vue/babel-preset-jsx @vue/babel-helper-vue-jsx-merge-props -D
```
修改 babel.config.js/.babelrc

```
module.exports = {
    presets: [
       ['@vue/app', {
           useBuiltIns: 'entry'
       }],
        ['@vue/babel-preset-jsx',
        {
            "injectH": false
        }]
    ]
}
```
> 注意：@vue/babel-preset-jsx默认会注入一个h语法糖，会与vue本身冲突，这个配置要设置false，否则项目启动会报错


#### form-creator api

参数 | 说明 | 类型 
---|--- | ---
v-model | 表单值（对应el-form model）| object
option | el-form 配置透传，除了disabled以外,详见 option| object
fields | 表单域数组 | Array( item 可以是object 或 array )
@submit | options.buttonGroup 为true时,提交点击| function(form)
@cancel | options.buttonGroup 为true时,取消点击 | 

> form-creator 对外暴露一个 getFormRef() 来返回el-form的ref

#### option api

参数 | 说明 | 类型 | 可选值 | 默认值
---|--- |--- |--- |---
status | 代替disabled(boolean)| string |edit、disabled、 preview| edit
debug | boolean, 快捷调试入口 | boolean | - | false
autoAuffix(后续会使用colon替代) | el-form-item label 后缀自动补齐(如： '姓名' -> '姓名：') | boolean | - | false
colon | 是否自动补齐label冒号 | boolean | - | false
itemSpan | formItem span全局参数,优先级itemSpan < formItem.span | number | 0~24 | 24
itemGutter | el-row gutter参数 | number | 0~24 | 0
buttonGroup | 表单 submit、cancel按钮组合| boolean/function| true/false,function 返回按钮数组| false

#### fields item api

参数 | 说明 | 类型 | 可选值 | 默认值
---|--- |--- |--- |---
tag | 标签, 与component不同时使用| string | - | el-input
component | 组件，适用于自定义表单控件值 | function | - | -
formItemComponent（0.12.0） | 组件,适用纯ui展示 | function | - | -
label | label展示值,同下item(label),优先级 label < item.label
name | 表单对应字段 | string | - | -
options| select checkbox-group时使用 | {label: '', value: ''}[] | 
formItemStatus （0.12.0） | 优先级高于 option.status，便于表单部分字段特殊状态处理 | string | edit、preview | edit
previewFormItemValue| 可选参数,当option.status 为preview时生效,展示文字自定义 | - | (value, h) => value| form[name]
scopedSlots | 可选参数,动态slot，必须使用h函数 | jsx component[]
on | 控件事件透传，在需要做字段联动时使用| object
rules | 该字段校验规则,与el-form一致
gutter | 可选参数,布局 对应el-row, 只在config item 为Array时配置在Array[0]上
span | 可选参数,布局 对应el-col
item| 对应el-form-item 属性透传，(prop 对应 name, 不需要再声明prop)| object| | {label: ''}

##### 在component/scopedSlots中 组件书写方式(0.10.0之前版本)

- component: import 过来以.vue结尾的，以jsx functional component 实现的，直接写变量; 
- scopedSlots: 要以jsx形式书写 `h => jsx component`

> 0.10.0以后的版本不需要再写 h 函数了（可选）

##### example

- 全局引入

```
import VueFormCreator from '@yowant/vue-form-creator'
Vue.use(VueFormCreator, {
    // 默认使用element-ui,可不填写,可选element、iview
  ui: 'element',
  // 默认在开发模式开启表单debug, 可不填写
  debug: process.env.NODE_ENV === 'development', 可不填写
  // 组件名默认 form-creator, 可不填
  name: 'form-creator',
})
```


```
<template>
<form-creator 
  v-model="formData"
  :option="option"
  :fields="fields"
/>
</template>

<script>


export default {
    data() {
        return {
            option: {
                'label-width': '100px',
                inline: false,
                colon: true,
                buttonGroup: true, // 默认false
                status: 'edit', // 表单状态 edit disabled preview
                debug: process.env.NODE_ENV === 'development', // 高于全局优先级
            },
            formData: {
                title: '标题',
                age: null,
                selectVal: ['1', '2'],
                goods: [
                    { id: '', name: '2' },
                ],
            }
        }
    },
    computed: {
        fields() {
            return [
                {
                    item: {// el-form-item
                        label: '标题',
                        style: { // 自定义style
                            'border-bottom': '1px solid red',
                        },
                        class: '', // 自定义class
                    },
                    tag: 'el-input',
                    name: 'title',
                    span: 12, // 布局 el-col 对应的span   
                },
                {
                    label: '年龄',
                    item: {
                        label: '展示年龄', // 优先级高于label
                    },
                    tag: 'el-input-input',
                    name: 'age',
                    span: 12, // 布局 el-col 对应的span   
                },
                {
                  tag: 'el-select',
                  span: 14,
                  item: {
                    label: 'select',
                    scopedSlots: [
                      h => (<span>元</span>),
                    ],
                  },
                  name: 'selectVal',
                  clearable: true,
                  multiple: true,
                  options: [
                    { label: '下拉1', value: '1' },
                    { label: '下拉2', value: '2' },
                    { label: '下拉3', value: '3' },
                  ],
                  on: {
                    change: this.selectValChange
                  },
                  scopedSlots: [
                  ]
                },
                ...this.getGoods(), // 注意这里是一个数组 数组每一项在一个row里,主要是为了做布局
                
            ]
        }
    },
    methods() {
        getGoods() {
          const goodItem = (i) => [
            {
              tag: 'el-input',
              suffixIcon: 'el-icon-date',
              gutter: 10, // gutter 必须在数组第一个
              span: 4,
              item: {
                label: `goodid ${i}`,
              },
              name: `goods[${i}].id`,
              on: {
                change: this.titleChange
              },
              rules: [
                { required: true, message: '请输入编号' }
              ]
            },
            {
              // tag: 'el-input',
              span: 8,
              item: {
                label: `goodname ${i}`,
              },
              name: `goods[${i}].name`,
              on: {
                change: this.titleChange
              },
              rules: [
                { required: true, message: '请输入name' }
              ]
            },
            {
              component: (h) => (
                <span>
                  <el-button type="primary" icon="el-icon-plus" circle onClick={this.addGood} ></el-button>
                  <el-button type="danger" icon="el-icon-minus" circle onClick={() => this.minus(i)}></el-button>
                </span>
              )
            }
          ]
    
          return this.formData.goods.map((ele, i) => goodItem(i))
        },
        selectValChange(value) {
            console.log('slelect回调', value)  
        },
        submit() {
          this.$refs.formbuild.getFormRef().validate(valid => {
            console.log(valid)
          })
        },
    },
}

</script>
```

> 注意 表单fields 不要放在data里, computed 里可以自动关联this、依赖更新响应

一个带有校验、布局配置的复杂form实现了
- 编辑状态(edit)

![edit](https://static.dingtalk.com/media/lADPDgQ9qxTklB3NAafNA4I_898_423.jpg_620x10000q90g.jpg)

- 禁用状态(disabled)

![image](https://static.dingtalk.com/media/lADPDgQ9qxThyA_NAezNA88_975_492.jpg_620x10000q90g.jpg)

- 预览状态(preview)

![image](https://static.dingtalk.com/media/lADPDgQ9qxTjPbvNAczNA5I_914_460.jpg_620x10000q90g.jpg)

- iview 版本demo

![image](http://jykt-js-one-test.oss-cn-hangzhou.aliyuncs.com/trialImg/2019/06/4596621415358968.png)
项目代码示例 
element

```
http://gitlab.ywwl.com/H5/xiaoy-zhibo-saas/blob/formcreate/src/views/Demo/FormBuild.vue
```


iview 
```
http://gitlab.ywwl.com/yfe/vue-form-creator/blob/master/src/components/FormDemo.vue
```

项目内网git地址`http://gitlab.ywwl.com/yfe/vue-form-creator`