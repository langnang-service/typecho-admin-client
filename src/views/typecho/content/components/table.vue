<template>
  <ContextMenuTable ref="table" v-bind="$attrs" v-on="$listeners" size="mini" stripe border>
    <el-table-column align="center" type="selection"></el-table-column>
    <el-table-column show-overflow-tooltip prop="title" label="title">
      <template slot="header" slot-scope="{}">
        <el-input size="mini" filterable clearable v-model="form.title" placeholder="title" @blur="$emit('filter',form.title,'title',form)"></el-input>
      </template>
    </el-table-column>
    <el-table-column show-overflow-tooltip prop="slug" label="slug"></el-table-column>
    <el-table-column show-overflow-tooltip prop="status" label="status" width="150px">
      <template slot="header" slot-scope="{}">
        <el-select size="mini" filterable clearable v-model="form.status" placeholder="status" @change="$emit('filter',form.status,'status',form)">
          <el-option v-for="item in statusOptions" :key="item.value" :value="item.value" />
        </el-select>
      </template>
    </el-table-column>
    <el-table-column show-overflow-tooltip prop="type" label="type" width="150px">
      <template slot="header" slot-scope="{}">
        <el-select size="mini" filterable clearable v-model="form.type" placeholder="type" @change="$emit('filter',form.type,'type',form)">
          <el-option v-for="item in typeOptions" :key="item.value" :value="item.value" />
        </el-select>
      </template>
    </el-table-column>
    <el-table-column show-overflow-tooltip prop="commentsNum" label="commentsNum"></el-table-column>
    <template #v-contextmenu-items>
      <v-contextmenu-submenu>
        <template #title>
          <span @click="$router.push({ path: '/typecho/content/insert' })">新建</span>
        </template>
        <v-contextmenu-submenu :disabled="!refs.table || !refs.table.row">
          <template #title>
            <span @click="$router.push({ path: '/typecho/content/insert', query: { parent: $refs.table.row.cid, } })">子节点</span>
          </template>
          <v-contextmenu-item disabled @click="$router.push({ path: '/typecho/content/insert', query: { parent: $refs.table.row.cid, type: 'template' } })">模板</v-contextmenu-item>
        </v-contextmenu-submenu>
        <hr />
        <v-contextmenu-item :disabled="!refs.table || !refs.table.row" @click="$router.push({ path: '/typecho/content/insert', query: { type: 'template' } })">模板</v-contextmenu-item>
      </v-contextmenu-submenu>
      <v-contextmenu-submenu disabled>
        <template #title>
          <span>删除</span>
        </template>
        <v-contextmenu-item disabled>删除已选</v-contextmenu-item>
      </v-contextmenu-submenu>
      <v-contextmenu-item :disabled="!refs.table || !refs.table.row" @click="$router.push('/typecho/content/'+$refs.table.row.cid)">编辑</v-contextmenu-item>
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
import { TypechoContentModel } from '@/store/modules/typecho/content'
export default {
  name: "TypechoContentTable",
  data() {
    return {
      form: new TypechoContentModel(),
      // 暂存 $refs
      refs: {
        table: null,
      }
    }
  },
  computed: {
    ...mapState({
      typeOptions: state => state.typecho.content.distinct.type.rows,
      statusOptions: state => state.typecho.content.distinct.status.rows
    })
  },
  created() {
  },
  mounted() {
    this.refs = this.$refs
  },
  methods: {
    hanldeInsert(vm, event) {
      console.log('hanldeInsert', arguments);
      this.$refs.table.handleMouseDown()
    },
    hanldeInsertChild() {
      console.log('hanldeInsertChild', arguments);
    }
  }
}
</script>
<style scoped>
</style>
