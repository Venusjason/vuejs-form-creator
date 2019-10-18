<template>
<div>
  <form-creator
    v-model="formValidate"
    :option="options"
    :fields="fields"
    @submit="submitForm"
    @cancel="cancel"
    ref="FormCreator"
  />
  <!-- <UserUpload v-model="value" />{{value}} -->
  <!-- <div style="padding-left: 100px;">
    <Button type="primary" @click="submit">提交</Button>
  </div> -->
</div>
</template>
<script>
import UserUpload from './user-upload'
import { maxDecimal2, email } from './../formCreator/rules'

export default {
  components: {
    // UserUpload,
  },
  data () {
    return {
      value: '1',
      options: {
        'label-width': 100,
        inline: false,
        status: 'edit',
        colon: true,
        // itemSpan: 16,
        debug: true,
        buttonGroup: true,
      },
      formValidate: {
        name: '',
        mail: '',
        city: '',
        gender: '',
        interest: [],
        date: '',
        time: '',
        desc: '',
        value: '',
      },
    }
  },
  computed: {
    fields() {
      return [
        [[{
          label: 'Name',
          name: 'name',
          placeholder: 'Enter your name',
          // formItemStatus: 'edit',
          rules: maxDecimal2,
        },
        {
          label: 'mail',
          name: 'mail',
          placeholder: 'Enter your e-mail',
          rules: [
            // 'required',
            email,
          ],
        }],
        // null,
        {
          tag: 'Select',
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
        }, {
          name: 'value', component: UserUpload, label: '自定义',
          rules: ['required'],
        }],
        [{
          tag: 'DatePicker',
          name: 'date',
          type: 'date',
          span: 11,
          placeholder: 'Select date',
          label: 'Date',
          rules: 'required',
        },{
          formItemComponent: () => (<span style="text-align: center">formItemComponent</span>),
          span: 6, rules: ['required'],
        },{
          tag: 'TimePicker',
          name: 'time',
          type: 'time',
          span: 6,
          placeholder: 'Select time',
          item: {
            label: '',
            'labelWidth': 0,
          },
          rules: ['required'],
        }],
        {
          tag: 'RadioGroup',
          name: 'gender',
          options: [
            { label: 'Male', value: 'male' },
            { label: 'Female', value: 'female' },
          ],
          rules: [
            'required'
          ],
          label: 'Gender',
        },
        {
          tag: 'CheckboxGroup',
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
        {
          label: 'Desc',
          name: 'desc',
          type: 'textarea',
          placeholder: 'Enter something...',
          autosize: {
            minRows: 2,maxRows: 5
          },
        },
      ]
    },
  },
  mounted () {
    const vals = [1, 2, 3, 4, 5].map(key => ({
      name: null,
      age: null,
      height: null,
      class: null,
      width: null,
      index: key,
    }))
    Object.assign(this.formValidate, { vals })
  },
  methods: {
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