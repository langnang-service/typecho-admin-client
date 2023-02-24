<template>
  <el-card>
    <!-- skeleton  -->
    <slot name="skeleton"></slot>
    <!-- table -->
    <slot name="table"></slot>
    <!-- form -->
    <slot name="form"></slot>
    <!-- descriptions  -->
    <slot name="descriptions"></slot>
  </el-card>
</template>
<script>

export default {
  name: "LayoutAdminItem"
}
</script>
<style lang="scss" scoped>
</style>
