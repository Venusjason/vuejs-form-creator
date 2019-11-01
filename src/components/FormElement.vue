<template>
<div>
  <form-creator-ele
    size="small"
    v-model="formValidate"
    :option="options"
    :fields="fields"
    @submit="submitForm"
    @cancel="cancel"
    ref="FormCreator"
  />
</div>
</template>
<script>
import FormCreatorFn from './../formCreator/createForm'
import UserUpload from './user-upload'
import { maxDecimal2, email } from './../formCreator/rules'

const FormCreatorEle = FormCreatorFn({
  ui: 'element',
})

/**
 * TODO:
 * key 重复问题，优化递归
 * row col 渲染
 * formItemComponent FormItem 属性未透传
 */


export default {
  components: {
    FormCreatorEle,
  },
  data () {
    return {
      value: '1',
      options: {
        'label-width': '100px',
        inline: false,
        status: 'edit',
        colon: true,
        // itemSpan: 16,
        debug: true,
        buttonGroup: true,
      },
      formValidate: {
        name: '张三',
        mail: '',
        city: '',
        gender: '',
        interest: [],
        date: '',
        time: '',
        desc: 'descdescdescdescdescdescdesc',
        value: '',
        detail: {
          // width: null,
          height: null,
        },
        vals: [],
      },
    }
  },
  computed: {
    fields() {
      return [
        {
          label: 'Desc',
          name: 'desc',
          type: 'textarea',
          placeholder: 'Enter something...',
          autosize: {
            minRows: 2,maxRows: 5
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
          tag: 'el-date-picker',
          name: 'date',
          type: 'date',
          span: 11,
          placeholder: 'Select date',
          label: 'Date',
          rules: 'required',
        },{
          formItemComponent: () => (<span style="text-align: center">formItemComponent</span>),
          span: 6,
        },{
          tag: 'TimePicker',
          name: 'time',
          type: 'time',
          span: 6,
          placeholder: 'Select time',
          item: {
            label: '',
            'labelWidth': '0px',
          },
          rules: ['required'],
        }],
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
        [
          {
            name: 'detail.width', label: '宽',
          },
          {
            name: 'detail.height', label: '高',
          },
        ],
        this.renderVals(),
      ]
    },
  },
  mounted () {
    const vals = [1, 2, 3, 4, 5].map(key => ({
      name: null,
      age: null,
      height: 100,
      class: null,
      width: null,
      index: key,
    }))
    Object.assign(this.formValidate, { vals })
  },
  methods: {
    renderVals() {
      const renderItem = (i) => ([
        {
          name: `vals.${i}.height`,
          label: 'vals height'
        }
      ])
      console.log(this.formValidate)
      return this.formValidate.vals.map((ele, i) => renderItem(i))
    },
    submit() {
      // this.$refs.FormCreator.getFormRef().validate(valid => {
      //   // console.log(valid, this.formValidate)
      // })
    },
    submitForm(form) {
      const { validate } = form
      validate(valid => {
        console.log(valid)
      })
    },
    cancel() {
      // console.log('取消')
    },
  },
}
</script>
<style>
</style>