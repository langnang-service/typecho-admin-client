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
      <v-contextmenu-item @click="$router.push({ path: '/typecho/meta/insert', query: { parent: $refs.table.row.mid } })">新建子节点</v-contextmenu-item>
      <v-contextmenu-item disabled>删除</v-contextmenu-item>
      <v-contextmenu-item @click="$router.push('/typecho/meta/'+$refs.table.row.mid)">编辑</v-contextmenu-item>
      <v-contextmenu-item disabled>查看</v-contextmenu-item>
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
    }
  },
  computed: {
    ...mapState({
      typeOptions: state => state.typecho.meta.distinct.type.rows
    })
  },
  created() {
  },
  methods: {
  }
}
</script>
<style scoped>
</style>
