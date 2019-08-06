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
  <!-- <div style="padding-left: 100px;">
    <Button type="primary" @click="submit">提交</Button>
  </div> -->
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
        autoAuffix: true,
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
          rules: [
            { required: true, message: 'The name cannot be empty', trigger: 'blur' }
          ],
        },
        {
          label: 'mail',
          name: 'mail',
          placeholder: 'Enter your e-mail',
          rules: [
            { required: true, message: 'Mailbox cannot be empty', trigger: 'blur' },
            { type: 'email', message: 'Incorrect email format', trigger: 'blur' }
          ],
        }],
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
            { required: true, message: 'Please select the city', trigger: 'change' }
          ],
        }, {
          component: h=> (
            <span>jkjk</span>
          )
        }],
        [{
          tag: 'DatePicker',
          name: 'date',
          type: 'date',
          span: 11,
          placeholder: 'Select date',
          label: 'Date',
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
            'label-width': 0,
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
            { required: true, type: 'array', min: 1, message: 'Choose at least one hobby', trigger: 'change' },
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
      this.$refs.FormCreator.getFormRef().validate(valid => {
        console.log(valid, this.formValidate)
      })
    },
    submitForm(form) {
      const { validate } = form
      validate(valid => {
        console.log(valid)
      })
    },
    cancel() {
      console.log('取消')
    },
  },
}
</script>
<style>
</style>