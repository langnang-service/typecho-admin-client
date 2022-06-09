<template>
  <el-row>
    <slot size="mini" />
    <slot size="small" />
    <slot />
    <slot />
    <slot />
    <slot />
  </el-row>
</template>
<script>
export default {
  name: "Adaptive"
}
</script>
<style scoped>
</style>
