<template>
  <el-menu style="display: inline-block; vertical-align: top;" v-bind="$attrs">
    <el-submenu index="1" v-if="!$attrs.collapse">
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
    <span>
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
    </span>
  </el-menu>
</template>

<script>
export default {

}
</script>

<style>
</style>