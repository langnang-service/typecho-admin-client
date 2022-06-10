<template>
  <el-breadcrumb-item class="el-breadcrumb-menu-item" v-bind="$attrs" v-on="$listeners">
    <span v-if="menus.length == 0">{{title.length > wordLimit ? (title.substring(0, wordLimit) + '...'): title}}</span>
    <el-menu v-else :default-active="$route.path" router mode="horizontal">
      <el-submenu :index="''">
        <template slot="title">{{title.length > wordLimit ? (title.substring(0, wordLimit) + '...'): title}}</template>
        <slot />
        <el-menu-item v-for="item in menus.filter(v => v.title.indexOf(value) > -1 )" :key="item.path" :index="item.path" v-bind="item">{{item.title}}</el-menu-item>
      </el-submenu>
    </el-menu>
  </el-breadcrumb-item>
</template>

<script>
export default {
  name: "ElBreadcrumbMenuItem",
  props: {
    title: {
      type: String,
      default: ''
    },
    wordLimit: {
      type: Number,
      default: 20
    },
    value: {
      type: String,
      default: ''
    },
    // 输入框
    input: {
      type: Boolean,
      default: false
    },
    // 可过滤的
    filterable: {},
    // 
    // 下拉菜单数据
    menus: {
      type: Array,
      default() {
        return []
      }
    },
  },
  data() {
    return {}
  },
  methods: {
    handleEnterKeyUp() { }
  }
}
</script>
<style scoped>
</style>
