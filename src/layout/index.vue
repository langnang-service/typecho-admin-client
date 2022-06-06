<template>
  <el-container id="app">
    <el-header style="height: 61px; border-bottom: solid 1px #e6e6e6">
      <el-menu v-if="layout.menu.visible" :default-active="layout.menu.active" router class="el-menu-demo" mode="horizontal" :style="{borderBottom: 'unset',display:'inline-block'}">
        <el-menu-item index="/">首页</el-menu-item>
        <el-menu-item index="/entry">Entry</el-menu-item>
        <el-menu-item index="/typecho">Typecho</el-menu-item>
        <el-menu-item index="/todo">To Do</el-menu-item>
        <el-menu-item index="/navigation">Navigation</el-menu-item>
        <el-menu-item index="/novel">Novel</el-menu-item>
        <el-menu-item index="/public-api">Public APIs</el-menu-item>
        <el-submenu index="langnang">
          <template slot="title">Langnang</template>

          <el-menu-item
            v-for="(href,key) in {
              Home:'https://langnang.github.io/',
              VuePress:'https://langnang.github.io/langnang/',
              Toolkit:'https://langnang.github.io/toolkit/',
              'Typecho Web':'https://langnang.github.io/typecho-web/',
              Card:'https://langnang.github.io/card/',
              'Audio Player':'https://langnang.github.io/simple-audio-player/',
              Bookmark:'https://langnang.github.io/simple-bookmark/',
              Question:'https://langnang.github.io/QuestionAwesome/',
              ToDoList:'https://langnang.github.io/ToDoList/',
              Palette:'https://langnang.github.io/Palette/',
            }"
            :key="key"
            :index="key"
          >
            <el-link target="_blank" :href="href">{{key}}</el-link>
          </el-menu-item>
        </el-submenu>
        <el-menu-item>理论</el-menu-item>
        <el-menu-item>实践</el-menu-item>
        <el-menu-item>工具</el-menu-item>
        <el-menu-item>资源</el-menu-item>
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
#app .el-scrollbar__wrap {
  overflow-x: hidden !important;
}
.el-select {
  width: 100%;
}
</style>
