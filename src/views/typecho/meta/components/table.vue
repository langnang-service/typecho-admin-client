<template>
  <ContextMenuTable ref="table" v-bind="$attrs" v-on="$listeners" size="mini" stripe border>
    <el-table-column align="center" type="selection"></el-table-column>
    <el-table-column show-overflow-tooltip prop="name" label="name">
      <template slot="header" slot-scope="{}">
        <el-input size="mini" filterable clearable v-model="form.name" placeholder="name" @blur="$emit('filter',form.name,'name',form)"></el-input>
      </template>
    </el-table-column>
    <el-table-column show-overflow-tooltip prop="slug" label="slug"></el-table-column>
    <el-table-column show-overflow-tooltip prop="type" label="type" width="150px">
      <template slot="header" slot-scope="{}">
        <el-select size="mini" filterable clearable v-model="form.type" placeholder="type" @change="$emit('filter',form.type,'type',form)">
          <el-option v-for="opt in typeOptions" :key="opt.value" :value="opt.value" />
        </el-select>
      </template>
    </el-table-column>
    <el-table-column show-overflow-tooltip prop="description" label="description"></el-table-column>
    <el-table-column show-overflow-tooltip prop="count" label="count" width="80px"></el-table-column>
    <el-table-column show-overflow-tooltip prop="order" label="order" width="80px"></el-table-column>
    <template #v-contextmenu-items>
      <v-contextmenu-submenu>
        <template #title>
          <span @click="$router.push({ path: '/typecho/meta/insert' })">新建</span>
        </template>
        <v-contextmenu-submenu :disabled="!refs.table || !refs.table.row">
          <template #title>
            <span @click="$router.push({ path: '/typecho/meta/insert', query: { parent: $refs.table.row.cid, } })">子节点</span>
          </template>
          <v-contextmenu-item disabled @click="$router.push({ path: '/typecho/meta/insert', query: { parent: $refs.table.row.cid, type: 'category' } })">Category</v-contextmenu-item>
        </v-contextmenu-submenu>
        <hr />
        <v-contextmenu-item @click="$router.push({ path: '/typecho/meta/insert', query: { type: 'category' } })">Category</v-contextmenu-item>
        <v-contextmenu-item @click="$router.push({ path: '/typecho/meta/insert', query: { type: 'tag' } })">Tag</v-contextmenu-item>
      </v-contextmenu-submenu>
      <v-contextmenu-submenu disabled>
        <template #title>
          <span>删除</span>
        </template>
        <v-contextmenu-item disabled>删除已选</v-contextmenu-item>
      </v-contextmenu-submenu>
      <v-contextmenu-item :disabled="!refs.table || !refs.table.row" @click="$router.push('/typecho/meta/'+$refs.table.row.mid)">编辑</v-contextmenu-item>
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
import { mapActions, mapGetters, mapState } from "vuex";
import { TypechoMetaModel } from '@/store/modules/typecho/meta'
export default {
  name: "TypechoMetaTable",
  data() {
    return {
      form: new TypechoMetaModel(),
      refs: {
        table: null,
      }
    }
  },
  computed: {
    ...mapState({
      typeOptions: state => state.typecho.meta.distinct.type.rows
    })
  },
  created() {
  },
  mounted() {
    this.refs = this.$refs
  },
  methods: {
  }
}
</script>
<style scoped>
</style>
