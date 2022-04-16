<template>
  <div id="app">
    <el-scrollbar ref="scroll" style="height: 100vh">
      <el-header style="height: 61px; border-bottom: solid 1px #e6e6e6">
        <el-menu
          :default-active="activeIndex"
          router
          class="el-menu-demo"
          mode="horizontal"
          @select="handleSelect"
          style="border-bottom: unset"
        >
          <el-menu-item index="/">首页</el-menu-item>
          <el-submenu index="list">
            <template slot="title">列表</template>
            <el-menu-item index="list">清单列表</el-menu-item>
            <el-menu-item index="todolist">代办事项列表</el-menu-item>
          </el-submenu>
          <el-submenu index="5">
            <template slot="title">
              <el-avatar size="large"></el-avatar>
            </template>
            <el-menu-item index="login">登录</el-menu-item>
            <el-menu-item index="admin">后台管理</el-menu-item>
            <el-menu-item index="logout">登出</el-menu-item>
          </el-submenu>
        </el-menu>
      </el-header>
      <el-main>
        <router-view> </router-view>
      </el-main>
    </el-scrollbar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeIndex: "/",
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
  },
};
</script>

<style lang="scss">
body {
  margin: 0;
  padding: 0;
}
a {
  text-decoration: none;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.el-header {
  .el-menu.el-menu--horizontal {
    float: right;
    .el-avatar + .el-submenu__icon-arrow {
      display: none;
    }
  }
}
.el-scrollbar__wrap {
  overflow-x: hidden !important;
}
</style>
