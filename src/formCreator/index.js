import formCreator from './form.js'

const install = (Vue, options = {ui: 'element'}) => {
  if (install.installed) return
  if (typeof options === 'string') {
    options = {
      ui: options
    }
  }
  const Form = formCreator(options)
  Vue.component(Form.name, Form)
}

export default {
  install,
}
