<template>
  <el-container class="layout-admin">
    <el-header>
      <el-breadcrumb separator-class="el-icon-arrow-right" :style="{display:'inline-block'}">
        <el-breadcrumb-item v-for="(route, index) in $route.matched" :key="route.path">{{index===0?route.name:route.name.substr(0,route.name.length - $route.matched[0].name.length - 3)}}</el-breadcrumb-item>
      </el-breadcrumb>
      <span :style="{float:'right',marginTop:'-1px',display:'inline-block'}">
        <!-- 插槽：右侧工具栏 -->
        <slot name="toolbar"></slot>
      </span>
    </el-header>
    <el-main :style="{padding:0}">
      <el-card :body-style="{padding:'10px'}" v-loading="loading">
        <el-scrollbar ref="scroll" :style="{height: footer?'calc(100vh - 203px)':'calc(100vh - 153px)'}">
          <slot></slot>
        </el-scrollbar>
      </el-card>
    </el-main>
    <el-footer v-if="footer">
      <el-pagination
        v-if="pagination"
        @size-change="handlePaginationSizeChange"
        @current-change="handlePaginationCurrentChange"
        :current-page="$store.state[paginationModule].page"
        :page-sizes="[10, 20, 50, 100,200,400]"
        :page-size="$store.state[paginationModule].size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="$store.state[paginationModule].total"
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
    };
  },
  computed: {
  },
  created() {
  },
  methods: {
    handlePaginationSizeChange(val) {
      this.$store.commit(`${this.paginationModule}/SET_SIZE`, val)
      this.$store.dispatch(`${this.paginationModule}/selectList`)
    },
    handlePaginationCurrentChange(val) {
      this.$store.commit(`${this.paginationModule}/SET_PAGE`, val)
      this.$store.dispatch(`${this.paginationModule}/selectList`)
    }
  },
};
</script>
<style lang="scss" scoped>
::v-deep {
  .layout-admin {
    & > .el-header {
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
}
</style>