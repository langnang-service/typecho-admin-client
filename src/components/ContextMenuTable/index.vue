<template>
  <el-table v-bind="$attrs" v-on="$listeners" @row-contextmenu="handleRowContextMenu" @mousedown.native="handleMouseDown">
    <template #empty>
      <el-empty />
    </template>
    <slot />
    <template #append>
      <v-contextmenu ref="contextmenu">
        <slot name="v-contextmenu-items" />
      </v-contextmenu>
    </template>
  </el-table>
</template>
<script>
export default {
  name: "ContextMenuTable",
  data() {
    return {
      row: null,
    }
  },
  created() {
    console.log(this);
  },
  methods: {
    /**
     * 右键表格行，显示菜单
     */
    handleRowContextMenu(row, column, event) {
      event.preventDefault()
      this.row = row;
      this.$refs.contextmenu.show({ top: event.clientY, left: event.clientX });
    },
    /**
     * 隐藏菜单
     */
    handleMouseDown() {
      this.row = null
      this.$refs.contextmenu.hide()
    },
  }
}
</script>
<style scoped>
</style>
