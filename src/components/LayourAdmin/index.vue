<template>
  <el-container class="simple-list-admin">
    <el-header>
      <el-breadcrumb separator-class="el-icon-arrow-right" :style="{display:'inline-block'}">
        <el-breadcrumb-item>SimpleList</el-breadcrumb-item>
      </el-breadcrumb>
      <span :style="{float:'right',marginTop:'-1px',display:'inline-block'}">
        <!-- 插槽：右侧工具栏 -->
        <slot name="toolbar"></slot>
      </span>
    </el-header>
    <el-main :style="{padding:0}">
      <el-card :body-style="{padding:'10px'}" v-loading="loading">
        <el-scrollbar ref="scroll" style="height: calc(100vh - 153px)">
          <slot></slot>
        </el-scrollbar>
      </el-card>
    </el-main>
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
