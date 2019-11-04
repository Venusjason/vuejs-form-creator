import formCreator from './createForm'

const install = (Vue, options = {}) => {
  if (install.installed) return
  const defaultOptions = {
    // 默认使用element-ui
    ui: 'element',
    // 默认在开发模式开启表单debug
    debug: process.env.NODE_ENV === 'development',
    // 组件名默认 form-creator
    name: 'q-form',
  }
  if (typeof options === 'string') {
    options = {
      ui: options
    }
  }
  const newOptions = Object.assign({}, defaultOptions, options)
  const Form = formCreator(newOptions)
  Vue.component(Form.name, Form)
}

export const formCreatorFunc = formCreator

export default {
  install,
}
