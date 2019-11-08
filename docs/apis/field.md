> field为表单域配置,我们先来看一段el-form文档上示例代码的写法

``` vue
<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
  <el-form-item label="活动名称" prop="name">
    <el-input v-model="ruleForm.name"></el-input>
  </el-form-item>
  <el-form-item label="活动区域" prop="region">
    <el-select v-model="ruleForm.region" placeholder="请选择活动区域">
      <el-option label="区域一" value="shanghai"></el-option>
      <el-option label="区域二" value="beijing"></el-option>
    </el-select>
  </el-form-item>
  <el-form-item label="活动时间" required>
    <el-col :span="11">
      <el-form-item prop="date1">
        <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.date1" style="width: 100%;"></el-date-picker>
      </el-form-item>
    </el-col>
    <el-col class="line" :span="2">-</el-col>
    <el-col :span="11">
      <el-form-item prop="date2">
        <el-time-picker placeholder="选择时间" v-model="ruleForm.date2" style="width: 100%;"></el-time-picker>
      </el-form-item>
    </el-col>
  </el-form-item>
  <el-form-item label="即时配送" prop="delivery">
    <el-switch v-model="ruleForm.delivery"></el-switch>
  </el-form-item>
  <el-form-item label="活动性质" prop="type">
    <el-checkbox-group v-model="ruleForm.type">
      <el-checkbox label="美食/餐厅线上活动" name="type"></el-checkbox>
      <el-checkbox label="地推活动" name="type"></el-checkbox>
      <el-checkbox label="线下主题活动" name="type"></el-checkbox>
      <el-checkbox label="单纯品牌曝光" name="type"></el-checkbox>
    </el-checkbox-group>
  </el-form-item>
  <el-form-item label="特殊资源" prop="resource">
    <el-radio-group v-model="ruleForm.resource">
      <el-radio label="线上品牌商赞助"></el-radio>
      <el-radio label="线下场地免费"></el-radio>
    </el-radio-group>
  </el-form-item>
  <el-form-item label="活动形式" prop="desc">
    <el-input type="textarea" v-model="ruleForm.desc"></el-input>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
    <el-button @click="resetForm('ruleForm')">重置</el-button>
  </el-form-item>
</el-form>
<script>
  export default {
    data() {
      return {
        ruleForm: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
        rules: {
          name: [
            { required: true, message: '请输入活动名称', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          region: [
            { required: true, message: '请选择活动区域', trigger: 'change' }
          ],
          date1: [
            { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
          ],
          date2: [
            { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
          ],
          type: [
            { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
          ],
          resource: [
            { required: true, message: '请选择活动资源', trigger: 'change' }
          ],
          desc: [
            { required: true, message: '请填写活动形式', trigger: 'blur' }
          ]
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  }
</script>
```

> 观察上述代码，我们不难发现 `formItem`上较为常用的字段 `label`、`prop`、`rules`,而`prop`与`v-model`是一一对应关系, 在template里写动态rules有很多限制,所以我们在field里把`formItem`的`label`、`prop`（就是field的name）、`rules`三项做了提取（本来这三个属性应该在item里的，这么做是为了便于书写）

参数             | 说明 | 类型 | 可选值 | 默认值
-----|---------------- |--- |--- |---
tag     | 标签, 与component不同时使用| string | - | el-input
component | 组件，适用于自定义表单控件值 | function | - | -
formItemComponent（0.12.0） | 组件,适用纯ui展示 | function | - | -
label | label展示值,同下item(label),优先级 label < item.label
name | 表单对应字段 | string | - | -
options| select checkbox-group时使用 | {label: '', value: ''}[] | 
formItemStatus （0.12.0） | 优先级高于 option.status，便于表单部分字段特殊状态处理 | string | edit、preview | edit
previewValue/previewFormItemValue| 可选参数,当option.status 为preview时生效,展示文字自定义 | - | (value, h) => value| form[name]
scopedSlots | 可选参数,动态slot，必须使用h函数 | jsx component[]
on | 控件事件透传，在需要做字段联动时使用| object
rules | 该字段校验规则,与el-form一致
gutter | 可选参数,布局 对应el-row, 只在config item 为Array时配置在Array[0]上
span | 可选参数,布局 对应el-col
item| 对应el-form-item 属性透传，(prop 对应 name, 不需要再声明prop)| object| | {label: ''}




- component: import 过来以.vue结尾的，以jsx functional component 实现的，直接写变量; 
- scopedSlots: 要以jsx形式书写 `() => jsx component`

> 上边的表单，我们使用field来实现

``` js
computed() {
  fields() {
    return [
      {
        label: '活动名称', name: 'name',
        placeholder: '请输入活动名称',
        rules: ['required', { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }]
      },
      {
        label: '活动区域', name: 'region',
        tag: 'el-select', placeholder: '请选择活动区域',
        options: [
          { label: '区域一', value: 'shanghai' },
          { label: '区域二', value: 'beijing' },
        ],
        rules: ['required']
      },
      [
        {
          label: '活动时间', name: 'date1', span: 11,
          tag: 'el-date-picker', type: 'date',
          style: { width: '100%' },
        },
        {
          span: 2, formItemComponent: '-',
          item: {
            labelWidth: '0px',
          },
        },
        {
          label: '活动时间', name: 'date2', span: 11,
          tag: 'el-time-picker',
          style: { width: '100%' },
        },
      ],
      {
        label: '即时配送', name: 'delivery',
        tag: 'el-switch',
        rules: ['required']
      },
      {
        label: '活动性质', name: 'type',
        tag: 'el-checkbox-group', options: [
          { label: '美食/餐厅线上活动', value: '美食/餐厅线上活动' },
          { label: '地推活动', value: '地推活动' },
          { label: '线下主题活动', value: '线下主题活动' },
          { label: '单纯品牌曝光', value: '单纯品牌曝光' },
        ],
        rules: ['required', { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }]
      },
      {
        label: '特殊资源', name: 'resource',
        tag: 'el-radio-group', options: [
          { label: '线上品牌商赞助', value: '线上品牌商赞助' },
          { label: '线下场地免费', value: '线下场地免费' },
        ],
      },
      {
        label: '活动形式', name: 'desc',
        type: 'textarea',
      },
    ]
  }
},
```