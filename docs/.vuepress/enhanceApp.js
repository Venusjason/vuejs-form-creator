import Vue from 'vue'
import hljs from 'highlight.js'
import 'highlight.js/styles/color-brewer.css'
// import './public/index.scss'

Vue.directive('highlight',function (el) {
  let blocks = el.querySelectorAll('pre code');
      blocks.forEach((block)=>{
      hljs.highlightBlock(block)
  })
})

export default ({
  Vue,
}) => {
  // ...做一些其他的应用级别的优化
}