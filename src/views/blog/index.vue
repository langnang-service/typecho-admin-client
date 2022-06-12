<template>
  <div class="blog" v-loading="loading">
    <el-row :gutter="10">
      <el-col :sm="4">
        <el-input v-model="form.title" size="small" clearable>
          <template slot="append">
            <el-button size="small" @click="handleSelectList">
              <el-icon class="el-icon-search"></el-icon>
            </el-button>
          </template>
        </el-input>
        <h4>Category</h4>
        <el-scrollbar style="padding-bottom:30px;">
          <el-tree ref="category" :data="category.data" highlight-current node-key="mid" :props="{children: 'children',label: 'name'}" @node-click="handleCatagoryTreeNodeClick"></el-tree>
        </el-scrollbar>
        <h4>Tag</h4>
        <el-scrollbar style="padding-bottom:30px;">
          <el-checkbox-group size="small" v-model="tag.selection" @change="handleSelectList">
            <el-checkbox-button v-for="tag in tag.data" :label="tag.mid" :key="tag.mid">{{tag.name}}</el-checkbox-button>
          </el-checkbox-group>
        </el-scrollbar>
      </el-col>
      <el-col :sm="20" v-loading="table.loading">
        <el-scrollbar :style="{height:'calc(100vh - 131px)'}">
          <el-tag v-for="meta in metas" :key="meta.mid" :closable="meta.type=='category'" @close="handleCloseMeta" style="margin:0 10px 10px 0;">{{meta.name}}</el-tag>
          <el-card v-if="table.data.length == 0">
            <el-empty />
          </el-card>
          <el-card shadow="hover" v-for="(item) in table.data" :key="item.id" :style="{marginBottom:'10px',cursor:'pointer'}">
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
      table: {
        loading: false,
        data: [],
        selection: [],
        page: 1,
        size: 10,
        total: 0,
      },
      category: {
        data: [],
        selection: [],
      },
      tag: {
        data: [],
        selection: [],
      },
      form: new TypechoContentModel(),
      metas: [],
    };
  },
  created() {
    this.$store.dispatch('typecho/meta/selectTree', { type: 'category' }).then(res => {
      this.category.data = res.tree
    })
    this.$store.dispatch('typecho/meta/selectList', { type: 'tag' }).then(res => {
      this.tag.data = res.rows
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
      this.metas = [...this.category.selection, ...this.tag.data.filter(v => [...new Set(this.tag.selection)].includes(v.mid))];
      this.$store.dispatch('typecho/content/selectList', {
        ...this.form,
        size: this.table.size,
        page: this.table.page,
        mids: this.metas.map(v => v.mid).join(','),
      }).then(res => {
        this.table.data = res.rows
        this.table.total = res.total
        this.table.page = res.page
        this.table.size = res.size
      }).finally(() => this.table.loading = false)
    },
    handleCatagoryTreeNodeClick(data, node, ref) {
      this.category.selection = [data];
      this.handleSelectList()
    },
    handleCheckedTagsChange(val) {
      this.handleSelectList()
    },
    /**
     * 关闭选中标签
     */
    handleCloseMeta() {
      this.$refs.category.setCurrentKey(null)
      this.category.selection = []
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
