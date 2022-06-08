<template>
  <el-container class="layout-admin">
    <el-header v-if="header">
      <span :style="{float:'left',marginTop:'-1px',display:'inline-block'}">
        <!-- 插槽：左侧信息 -->
        <slot name="prefix"></slot>
      </span>
      <el-breadcrumb separator-class="el-icon-arrow-right" :style="{display:'inline-block'}">
        <el-breadcrumb-item v-for="(item,index) in breadcrumb" :key="item.path">
          <span v-if="!breadcrumbOptions[index]">{{item.meta.name}}</span>
          <el-menu v-else :default-active="$route.path" router mode="horizontal">
            <el-submenu :index="''+index">
              <template slot="title">{{item.meta.name}}</template>
              <el-menu-item v-for="option in breadcrumbOptions[1]" :key="option.path" :index="option.path">{{option.name}}</el-menu-item>
            </el-submenu>
          </el-menu>
        </el-breadcrumb-item>
      </el-breadcrumb>
      <span :style="{float:'right',marginTop:'-1px',display:'inline-block'}">
        <!-- 插槽：右侧工具栏 -->
        <slot name="toolbar"></slot>
      </span>
    </el-header>
    <el-main :style="{padding:0}">
      <el-card :body-style="{padding:'10px'}" v-loading="loading">
        <el-scrollbar ref="scroll" :style="{height: `calc(100vh - 103px - ${header?50:0}px - ${footer?50:0}px)`}">
          <slot></slot>
        </el-scrollbar>
      </el-card>
    </el-main>
    <el-footer v-if="footer">
      <el-pagination
        v-if="pagination"
        @size-change="handlePaginationSizeChange"
        @current-change="handlePaginationCurrentChange"
        :current-page="paginationModule.split('.').reduce((total, key) => total[key], $store.state).page"
        :page-sizes="[10, 20, 50, 100,200,400]"
        :page-size="paginationModule.split('.').reduce((total, key) => total[key], $store.state).size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="paginationModule.split('.').reduce((total, key) => total[key], $store.state).total"
      ></el-pagination>
      <slot name="footer"></slot>
    </el-footer>
    <!-- 插槽：附加 -->
    <slot name="append"></slot>
  </el-container>
</template>

<script>
export default {
  name: "LayoutAdmin",
  components: {},
  props: {
    loading: {
      type: Boolean,
      default: false
    },
    breadcrumbOptions: {
      type: Array,
      default() {
        return []
      }
    },
    // 顶部
    header: {
      type: Boolean,
      default: true
    },
    // 底部
    footer: {
      type: Boolean,
      default: false
    },
    // 底部分页
    pagination: {
      type: Boolean,
      default: false
    },
    paginationAlign: {
      type: String,
      default: 'center'
    },
    // 分页对应的状态类
    paginationModule: {
      type: String,
      default: null
    },
  },
  data() {
    return {
      breadcrumb: [],
    };
  },
  computed: {
  },
  created() {
    console.log(this.$route.matched);
    this.breadcrumb = this.$route.matched.slice(0).reduce((total, value, index) => {
      if (!value.name) {
        const name = value.path.split('/').slice(-1)[0];
        value.meta.name = name.charAt(0).toUpperCase() + name.substring(1);
      } else {
        value.meta.name = value.name.split(' - ')[0]
      }
      total.push(value);
      return total;
    }, [])
  },
  methods: {
    handlePaginationSizeChange(val) {
      this.$store.commit(`${this.paginationModule.split('.').join('/')}/SET_SIZE`, val)
      this.$store.dispatch(`${this.paginationModule.split('.').join('/')}/selectList`)
    },
    handlePaginationCurrentChange(val) {
      this.$store.commit(`${this.paginationModule.split('.').join('/')}/SET_PAGE`, val)
      this.$store.dispatch(`${this.paginationModule.split('.').join('/')}/selectList`)
    }
  },
};
</script>
<style lang="scss" scoped>
.el-breadcrumb__inner {
  display: inline-block;
}
.el-breadcrumb__item {
  display: inline-block;
}
.layout-admin {
  & > .el-header {
    margin-bottom: 10px;
    height: 40px !important;
    line-height: 38px;
    overflow: hidden;
    border: 1px solid #ebeef5;
    border-radius: 4px;
    // box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
    .el-breadcrumb {
      line-height: inherit;
    }
    .el-breadcrumb__inner {
      display: inline-block;
    }
    .el-menu.el-menu--horizontal {
      border-bottom: 0;
    }
    ::v-deep .el-submenu__title {
      height: inherit !important;
      line-height: inherit !important;
      border-bottom: 0 !important;
      padding: 0;
      .el-submenu__icon-arrow {
        // display: none;
      }
    }
  }

  & > .el-main {
  }
  & > .el-footer {
    border: 1px solid #ebeef5;
    border-radius: 4px;
    margin-top: 10px;
    height: 40px !important;
    line-height: 40px;
  }
}
</style>