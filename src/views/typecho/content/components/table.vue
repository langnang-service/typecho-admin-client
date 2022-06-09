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
      <v-contextmenu-item @click="$router.push({ path: '/typecho/content/insert', query: { parent: $refs.table.row.cid } })">新建子节点</v-contextmenu-item>
      <v-contextmenu-item disabled>删除</v-contextmenu-item>
      <v-contextmenu-item @click="$router.push('/typecho/content/'+$refs.table.row.cid)">编辑</v-contextmenu-item>
      <v-contextmenu-item disabled>查看</v-contextmenu-item>
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
  methods: {
  }
}
</script>
<style scoped>
</style>
