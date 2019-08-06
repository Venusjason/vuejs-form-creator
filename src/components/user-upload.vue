<template>
<div>
  <input type="text" placeholder="自定义input" :value="value" @input="onChange" />
</div>
</template>
<script>
export default {
  props: {
    value: {
      required: true,
    },
  },
  data () {
    return {
    }
  },
  computed: {},
  mounted () {},
  methods: {
    onChange(e) {
      this.$emit('input', e.target.value)
    }
  },
}
</script>
<style>
</style>