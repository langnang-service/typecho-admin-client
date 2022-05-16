<template>
  <router-view></router-view>
</template>
<script>

export default {
  created() {
    if (this.$route.matched.length > 0) {
      this.$store.commit('layout/SET_MENU_ACTIVE', this.$route.matched[0].path)
    }
  }
}
</script>
<style lang="scss" scoped>
::v-deep {
  .el-header {
    margin-bottom: 10px;
    height: 40px !important;
    line-height: 38px;
    overflow: hidden;
    border: 1px solid #ebeef5;
    border-radius: 4px;
    // box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
    & > .el-breadcrumb {
      line-height: inherit;
    }
  }
  .el-submenu__title {
    height: inherit !important;
    line-height: inherit !important;
    padding: 0;
    .el-submenu__icon-arrow {
      // display: none;
    }
  }
}
</style>