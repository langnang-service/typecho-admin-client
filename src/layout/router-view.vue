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
</style>