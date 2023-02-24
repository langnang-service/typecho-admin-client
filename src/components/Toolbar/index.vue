<template>
  <div class="toolbar" :style="{display:'inline-block'}">
    <component v-for="(item,index) in components" :key="index" :is="item.component" v-model="item.model" v-bind="item.bind||{}" v-on="item.on||{}" />
  </div>
</template>

<script>
import Vue from 'vue'
export default {
  name: "Toolbar",
  props: {
    components: {
      type: [Array, Object],
      default() {
        return []
      }
    }
  },
  created() {
    // console.log(Vue.options.components,)
    // console.log(Vue.options.components['ElButton'].options)
    // console.log(Vue.options.components['ElButton'].options.$listeners)
  }
}
</script>

<style>
</style>