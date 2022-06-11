<template>
  <div class="blog" v-loading="loading">
    <el-row :gutter="10">
      <el-col :span="4">
        <el-input v-model="form.title" size="mini" clearable @blur="handleSelectList"></el-input>
        <el-scrollbar :style="{height:'50vh',marginTop:'10px'}">
          <el-tree :data="categories" highlight-current node-key="mid" :props="{children: 'children',label: 'name'}" :style="{marginTop:'20px'}" @node-click="handleCatagoryTreeNodeClick"></el-tree>
        </el-scrollbar>
        <el-checkbox-group size="small" v-model="checkedTags" @change="handleCheckedTagsChange">
          <el-checkbox-button v-for="tag in tags" :label="tag.mid" :key="tag.mid">{{tag.name}}</el-checkbox-button>
        </el-checkbox-group>
      </el-col>
      <el-col :span="20" v-loading="table.loading">
        <el-scrollbar :style="{height:'calc(100vh - 131px)'}">
          <el-card v-if="!table.data.some(v=>(v.title||'').indexOf(inputFilterNameValue)>-1)">
            <el-empty />
          </el-card>
          <el-card shadow="hover" v-for="(item) in table.data.filter(v=>(v.title||'').indexOf(inputFilterNameValue)>-1)" :key="item.id" :style="{marginBottom:'10px',cursor:'pointer',opacity:item.type=='done'?'0.5':'1'}">
            <div slot="header" class="clearfix">
              <strong>{{item.title}}</strong>
              <el-button style="float: right; padding: 3px 0" type="text" @click="$router.push({path:'/blog/content/'+item.cid})">阅读全文</el-button>
            </div>
            {{item.text_content}}
          </el-card>
        </el-scrollbar>
        <el-footer>
          <el-pagination
            @size-change="(size) => handlePaginationChange(table.page, size)"
            @current-change="(page) => handlePaginationChange(page, table.size)"
            :current-page="table.page"
            :page-sizes="[10, 20, 50, 100,200,400]"
            :page-size="table.size"
            layout="total, sizes, prev, pager, next, jumper"
            :total="table.total"
          ></el-pagination>
        </el-footer>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from "vuex";
import { TypechoContentModel } from '@/store/modules/typecho/content'
export default {
  components: {},
  data() {
    return {
      loading: false,
      inputFilterNameValue: '',
      selection: [],
      parent: {},
      list: [],
      done: [],
      table: {
        loading: false,
        data: [],
        selection: [],
        page: 1,
        size: 10,
        total: 0,
      },
      form: new TypechoContentModel(),
      checkedTags: [],
      categories: [],
      tags: [],
    };
  },
  created() {
    this.$store.dispatch('typecho/meta/selectTree', { type: 'category' }).then(res => {
      this.categories = res.tree
    })
    this.$store.dispatch('typecho/meta/selectList', { type: 'tag' }).then(res => {
      this.tags = res.rows
    })
    this.handleSelectList();

  },
  computed: {
    ...mapState(["typecho"]),
    ...mapState({
      branch: state => state.typecho.branch.info,
    }),
  },
  methods: {
    ...mapActions({
      handleSelectItem: "typecho/content/selectItem",
    }),
    handleSelectList() {
      this.table.loading = true
      this.$store.dispatch('typecho/content/selectList', {
        ...this.form,
        size: this.table.size,
        page: this.table.page,
      }).then(res => {
        this.table.data = res.rows
        this.table.total = res.total
        this.table.page = res.page
        this.table.size = res.size
      }).finally(() => this.table.loading = false)
    },
    handleCatagoryTreeNodeClick(data, node, ref) {
      console.log("handleCatagoryTreeNodeClick", arguments)
      this.form.mids = data.mid;
      this.handleSelectList()
    },
    handleCheckedTagsChange(val) {
      this.form.mids = val.join(',')
      this.handleSelectList()
    },
    handlePaginationChange(page, size) {
      this.table.page = page
      this.table.size = size
      this.handleSelectList()
    }
  }
};
</script>
<style scoped>
.el-footer {
  border: 1px solid #ebeef5;
  border-radius: 4px;
  margin-top: 10px;
  height: 40px !important;
  line-height: 40px;
}
</style>
