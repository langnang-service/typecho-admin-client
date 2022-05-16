<template>
  <!-- <el-menu class="menu-breadcrumb" router mode="horizontal" :default-active="active" :style="{display:'inline-block'}">
    <el-menu-item v-for="route in $route.matched" :key="route.path" :index="route.path">{{route.name}}</el-menu-item>
     <i class="el-breadcrumb__separator el-icon-arrow-right"></i>
  </el-menu>-->
  <el-breadcrumb separator-class="el-icon-arrow-right" :style="{display:'inline-block'}">
    <el-breadcrumb-item>SimpleList</el-breadcrumb-item>
    <el-breadcrumb-item>
      <el-menu :default-active="actives[1]" router mode="horizontal" :style="{borderBottom: 'unset',display:'inline-block'}">
        <component :is="'el-submenu'" index="/">
          <template slot="title">{{actives[1]}}</template>
          <el-menu-item v-for="item in routes[1]" :key="item.path" :index="item.fullPath">{{item.fullPath}}</el-menu-item>
        </component>
      </el-menu>
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script>
export default {
  name: "MenuBreadcrumb",
  data() {
    return {
      actives: [],
      routes: [],
    }
  },
  created() {
    console.log(this.$router)
    console.log(this.$route)
    this.$route.matched.forEach((route, index) => {
      console.log(route, index)
      if (index == 0) {
        this.routes.push(this.$router.options.routes.find(v => v.path == route.path))
        this.actives.push(this.routes[index].path)
      } else {
        this.routes.push(this.routes[index - 1].children.filter(v => v.path != '').map(v => ({ ...v, fullPath: `${this.routes[index - 1].path}/${v.path}` })))
        this.actives.push(`${this.routes[index - 1].path}/${route.path}`)
      }
    });
    console.log(this.$data);
  },
  beforeRouteUpdate() {
    console.log('beforeRouteUpdate')
  },
}
</script>

<style lang="scss" scoped>
::v-deep {
  .el-menu {
    border-bottom: unset;
    display: inline-block;
  }
  .el-menu-item,
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