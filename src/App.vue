<template>
  <div id="app">
    iview ui 左侧是传统方式form, 右侧是FormCreator方案
    <div class="forms">
      <FormBase class="form-test" />
      <FormDemo class="form-test"/>
    </div>
  </div>
</template>

<script>
import FormDemo from './components/FormDemo'
import FormBase from './components/FormBase'

export default {
  name: 'app',
  components: {
    FormDemo,
    FormBase,
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
