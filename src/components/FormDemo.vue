<template>
<div>
  <form-creator
    v-model="formValidate"
    :option="options"
    :fields="fields"
    ref="FormCreator"
  />
  <div style="padding-left: 100px;">
    <Button type="primary" @click="submit">提交</Button>
  </div>
  <pre>{{JSON.stringify(formValidate, null, 2)}}</pre>
</div>
</template>
<script>
// import FormCreator from './../FormCreator'

export default {
  components: {
    // FormCreator,
  },
  data () {
    return {
      options: {
        'label-width': 100,
        inline: false,
        status: 'edit',
      },
      formValidate: {
        name: '',
        mail: '',
        city: '',
        gender: '',
        interest: [],
        date: '',
        time: '',
        desc: ''
      },
    }
  },
  computed: {
    fields() {
      return [
        {
          name: 'name',
          placeholder: 'Enter your name',
          rules: [
            { required: true, message: 'The name cannot be empty', trigger: 'blur' }
          ],
          item: {
            label: 'Name',
          },
        },
        {
          name: 'mail',
          placeholder: 'Enter your e-mail',
          rules: [
            { required: true, message: 'Mailbox cannot be empty', trigger: 'blur' },
            { type: 'email', message: 'Incorrect email format', trigger: 'blur' }
          ],
          item: {
            label: 'mail',
          },
        },
        {
          tag: 'Select',
          name: 'city',
          placeholder: 'Select your city',
          options: [
            { label: 'New York', value: 'beijing' },
            { label: 'London', value: 'shanghai' },
            { label: 'Sydney', value: 'shenzhen' },
          ],
          rules: [
            { required: true, message: 'Please select the city', trigger: 'change' }
          ],
          item: {
            label: 'city',
          },
        },
        [{
          tag: 'DatePicker',
          name: 'date',
          type: 'date',
          span: 11,
          placeholder: 'Select date',
          item: {
            label: 'Date',
          },
        },{
          component: (h) => (<Col style="text-align: center">-</Col>),
          span: 2,
        },{
          tag: 'TimePicker',
          name: 'time',
          type: 'time',
          span: 10,
          placeholder: 'Select time',
          item: {
            label: '',
          },
        }],
        {
          tag: 'RadioGroup',
          name: 'gender',
          options: [
            { label: 'Male', value: 'male' },
            { label: 'Female', value: 'female' },
          ],
          rules: [
            { required: true, message: 'Please select gender', trigger: 'change' }
          ],
          item: {
            label: 'Gender',
          },
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
            { required: true, type: 'array', min: 1, message: 'Choose at least one hobby', trigger: 'change' },
            { type: 'array', max: 2, message: 'Choose two hobbies at best', trigger: 'change' }
          ],
          item: {
            label: 'Hobby',
          },
        },
        {
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
  mounted () {},
  methods: {
    submit() {
      this.$refs.FormCreator.getFormRef().validate(valid => {
        console.log(valid, this.formValidate)
      })
    },
  },
}
</script>
<style>
</style>