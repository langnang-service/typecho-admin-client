<template>
  <el-card class="jumbotron" shadow="never">
    <h1 v-if="title">{{title}}</h1>
    <p v-if="description">{{description}}</p>
    <router-link v-if="route" class="el-button el-button--primary" :to="route">Start Now</router-link>
  </el-card>
</template>

<script>
export default {
  // 巨幕
  name: "Jumbotron",
  props: {
    // 地址
    route: {
      type: String,
      default: null,
    },
    title: {
      type: String,
      default: null,
    },
    // 描述
    description: {
      type: String,
      default: null,
    },
  },
};
</script>

<style lang="scss" scoped>
.jumbotron {
  text-align: center;
}
</style>
