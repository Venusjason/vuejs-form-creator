import Vue from 'vue'
import iView from 'iview'
import 'iview/dist/styles/iview.css'

import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import App from './App.vue'
import FormCreator from './formCreator/index.js'

Vue.config.productionTip = false
Vue.use(iView)
Vue.use(Element)
Vue.use(FormCreator, 'iview')

new Vue({
  render: h => h(App),
}).$mount('#app')
