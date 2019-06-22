import Vue from 'vue'
import App from './App.vue'
import iView from 'iview'
import 'iview/dist/styles/iview.css'

import FormCreator from './formCreator/index.js'

Vue.config.productionTip = false
Vue.use(iView)
Vue.use(FormCreator, 'iview')

new Vue({
  render: h => h(App),
}).$mount('#app')
