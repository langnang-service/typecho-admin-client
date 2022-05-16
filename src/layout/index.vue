<template>
  <el-container id="app">
    <el-header style="height: 61px; border-bottom: solid 1px #e6e6e6">
      <el-menu v-if="layout.menu.visible" :default-active="layout.menu.active" router class="el-menu-demo" mode="horizontal" :style="{borderBottom: 'unset',display:'inline-block'}">
        <el-menu-item index="/">首页</el-menu-item>
        <el-menu-item index="/simple-list">SimpleList</el-menu-item>
      </el-menu>
      <span v-if="layout.toolbar.visible" :style="{ 
            float: 'right' ,
            height:'60px',
            lineHeight:'60px',
            marginLeft:'20px'
          }">
        <el-button type="primary">Sign Up</el-button>
        <el-button type="primary">Sign In</el-button>
      </span>
    </el-header>
    <el-scrollbar ref="scroll" style="height: calc(100vh - 61px)">
      <el-main :style="{
        padding:'10px'
      }">
        <LayoutRouterView />
      </el-main>
    </el-scrollbar>
  </el-container>
</template>

<script>
import { mapState } from 'vuex';
import LayoutRouterView from "./router-view.vue";
export default {
  name: "Layout",
  components: {
    LayoutRouterView,
  },
  data() {
    return {
      activeIndex: "/",
      searchInputValue: ''
    };
  },
  computed: {
    ...mapState({
      layout: 'layout'
    })
  },
  created() {
  },
  methods: {
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
  // text-align: center;
  color: #2c3e50;
}
.el-header {
  .el-menu.el-menu--horizontal {
    // float: right;
    .el-avatar + .el-submenu__icon-arrow {
      display: none;
    }
  }
}
.el-scrollbar__wrap {
  overflow-x: hidden !important;
}
</style>
