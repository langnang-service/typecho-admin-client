<template>
  <el-container class="simple-list-admin">
    <el-header>
      <el-breadcrumb separator-class="el-icon-arrow-right" :style="{display:'inline-block'}">
        <el-breadcrumb-item>Entry</el-breadcrumb-item>
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
      <el-pagination v-if="pagination" background layout="prev, pager, next" :total="1000"></el-pagination>
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
    }
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
  },
};
</script>
<style lang="scss" scoped>
::v-deep {
  .el-footer {
    border: 1px solid #ebeef5;
    border-radius: 4px;
    margin-top: 10px;
    height: 40px !important;
    line-height: 40px;
  }
}
</style>