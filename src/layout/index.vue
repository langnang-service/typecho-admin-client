<template>
  <el-container id="app">
    <el-header class="layout-header" style="padding:0 10px;height: 61px; border-bottom: solid 1px #e6e6e6;">
      <el-row :gutter="10">
        <el-col :span="24">
          <el-menu default-active="layout.menu.active" collapse style="display: inline-block; vertical-align: top;">
            <el-submenu index="1">
              <template slot="title">
                <i class="el-icon-s-home"></i>
              </template>
              <el-menu-item index="/">首页</el-menu-item>
              <el-menu-item index="/entry">Entry</el-menu-item>
              <el-menu-item index="/blog">Blog</el-menu-item>
              <el-menu-item index="/todo">ToDoList</el-menu-item>
              <el-submenu index="typecho">
                <template slot="title">Typecho</template>
                <el-menu-item index="/typecho">Admin</el-menu-item>
                <el-menu-item index="/template">Template</el-menu-item>
                <el-menu-item index="/navigation">Navigation</el-menu-item>
                <el-menu-item index="/public-api">Public APIs</el-menu-item>
                <el-menu-item index="/snippet">Snippet</el-menu-item>
                <el-menu-item index="/novel">Novel</el-menu-item>
              </el-submenu>
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
            </el-submenu>
          </el-menu>
          <el-menu class="hidden-sm-and-down" v-if="layout.menu.visible" :default-active="layout.menu.active" router mode="horizontal" :style="{borderBottom: 'unset',display:'inline-block'}">
            <el-menu-item index="/">首页</el-menu-item>
            <el-menu-item index="/entry">Entry</el-menu-item>
            <el-menu-item index="/blog">Blog</el-menu-item>
            <el-menu-item index="/todo">ToDoList</el-menu-item>
            <el-submenu index="typecho">
              <template slot="title">Typecho</template>
              <el-menu-item index="/typecho">Admin</el-menu-item>
              <el-menu-item index="/template">Template</el-menu-item>
              <el-menu-item index="/navigation">Navigation</el-menu-item>
              <el-menu-item index="/public-api">Public APIs</el-menu-item>
              <el-menu-item index="/snippet">Snippet</el-menu-item>
              <el-menu-item index="/novel">Novel</el-menu-item>
            </el-submenu>
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
            <el-button size="small" type="primary" @click="$router.push('/signup')">Sign Up</el-button>
            <el-button size="small" type="primary" @click="$router.push('/signin')">Sign In</el-button>
          </span>
        </el-col>
      </el-row>
    </el-header>
    <el-scrollbar ref="scroll" style="height: calc(100vh - 61px)">
      <el-main class="layout-main" :style="{
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

.layout-main > .el-row > .el-col {
  // margin-top: 10px;
}
</style>
