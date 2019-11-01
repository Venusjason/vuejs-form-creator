<template>
  <div id="app">
    iview ui 左侧是传统方式form, 右侧是FormCreator方案
    <div class="forms">
      <FormBase class="form-test" />
    </div>
    <div class="forms">
      <FormIview class="form-test"/>
      <FormElement class="form-test" />
    </div>
  </div>
</template>

<script>
import FormIview from './components/FormIview'
import FormBase from './components/FormBase'
import FormElement from './components/FormElement'

export default {
  name: 'app',
  components: {
    FormIview,
    FormBase,
    FormElement,
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.forms {
  display: flex;
  text-align: left;
}

.form-test {
  flex: 1;
}
</style>
