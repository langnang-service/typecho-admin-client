<template>
  <el-breadcrumb class="el-breadcrumb-menu" v-bind="$attrs" v-on="$listeners">
    <el-breadcrumb-menu-item v-for="(item) in data" :key="item.path" :title="item.title" v-bind="item" @open="handleOpenMenuItem">
      <template #prepend>
        <slot name="menu-prepend" />
      </template>
      <template #append>
        <slot name="menu-append" />
      </template>
    </el-breadcrumb-menu-item>
  </el-breadcrumb>
</template>

<script>
import "./index.scss";
import ElBreadcrumbMenuItem from './item.vue'
export default {
  // 面包屑导航菜单
  name: "ElBreadcrumbMenu",
  components: { ElBreadcrumbMenuItem },
  props: {
    data: {
      type: Array,
      default() {
        return []
      }
    },
    input: {
      type: Boolean,
      default: false
    },
    value: {},
  },
  data() {
    return {
    }
  },
  watch: {
    data(newV, oldV) {
      console.log('data', newV, oldV)
    }
  },
  created() {
  },
  methods: {
    handleOpenMenuItem() {
      console.log('handleOpenMenuItem', arguments)
    }
  }
}
</script>