<template>
  <ContextMenuTable ref="table" v-bind="$attrs" v-on="$listeners" size="mini" stripe border>
    <el-table-column align="center" type="selection"></el-table-column>
    <el-table-column show-overflow-tooltip prop="name" label="name">
      <template slot="header" slot-scope="{}">
        <el-input size="mini" filterable clearable v-model="form.name" placeholder="name" @blur="$emit('filter',form.name,'name',form)"></el-input>
      </template>
    </el-table-column>
    <el-table-column show-overflow-tooltip prop="slug" label="slug"></el-table-column>
    <el-table-column show-overflow-tooltip prop="metasNum" label="metasNum"></el-table-column>
    <el-table-column show-overflow-tooltip prop="contentsNum" label="contentsNum"></el-table-column>
    <el-table-column show-overflow-tooltip prop="templatesNum" label="templatesNum"></el-table-column>
    <el-table-column show-overflow-tooltip prop="commentsNum" label="commentsNum"></el-table-column>
    <template #v-contextmenu-items>
      <v-contextmenu-submenu :disabled="!refs.table || !refs.table.row">
        <template #title>
          <span>跳转</span>
        </template>
        <v-contextmenu-item @click="handleToggleRoute('/typecho/meta/list')">Metas</v-contextmenu-item>
        <v-contextmenu-item @click="handleToggleRoute('/typecho/content/list')">Contents</v-contextmenu-item>
      </v-contextmenu-submenu>
      <hr />
      <v-contextmenu-item @click="$router.push('/typecho/branch/insert')">新增</v-contextmenu-item>
      <v-contextmenu-item :disabled="!refs.table || !refs.table.row" @click="$router.push('/typecho/branch/insert')">复制</v-contextmenu-item>
      <v-contextmenu-submenu disabled>
        <template #title>
          <span>删除</span>
        </template>
        <v-contextmenu-item disabled>删除已选</v-contextmenu-item>
      </v-contextmenu-submenu>
      <v-contextmenu-item :disabled="!refs.table || !refs.table.row" @click="handleToggleRoute('/typecho/branch/' + $refs.table.row.mid)">编辑</v-contextmenu-item>
      <hr />
      <v-contextmenu-item disabled>上传</v-contextmenu-item>
      <v-contextmenu-item disabled>下载</v-contextmenu-item>
      <hr />
      <v-contextmenu-item disabled>记录</v-contextmenu-item>
      <v-contextmenu-item disabled>回收站</v-contextmenu-item>
      <hr />
      <v-contextmenu-item disabled>详情</v-contextmenu-item>
    </template>
  </ContextMenuTable>
</template>
<script>
import { TypechoBranchModel } from '@/store/modules/typecho/branch'
export default {
  name: "TypechoBranchTable",
  data() {
    return {
      form: new TypechoBranchModel(),
      refs: {
        table: null,
      }
    }
  },
  created() {
  },
  mounted() {
    this.refs = this.$refs
  },
  methods: {
    /**
     * 切换路由
     */
    handleToggleRoute(route) {
      this.$store.commit('typecho/branch/SET_INFO', this.$refs.table.row)
      this.$router.push(route)
    }
  }
}
</script>
<style scoped>
</style>
