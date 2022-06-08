<template>
  <div class="blog" v-loading="$store.state.typecho.content.loading">
    <el-row :gutter="10">
      <el-col :style="{width:'280px'}">
        <el-input size="mini"></el-input>
        <el-scrollbar :style="{height:'50vh',marginTop:'10px'}">
          <el-tree :data="$store.state.typecho.meta.tree" node-key="mid" :props="{children: 'children',label: 'name'}" :style="{marginTop:'20px'}" @node-click="handleCatagoryTreeNodeClick"></el-tree>
        </el-scrollbar>
        <el-checkbox-group size="small" v-model="checkedTags" @change="handleCheckedTagsChange">
          <el-checkbox-button v-for="tag in $store.state.typecho.meta.list" :label="tag.mid" :key="tag.mid">{{tag.name}}</el-checkbox-button>
        </el-checkbox-group>
      </el-col>
      <el-col :style="{width:'calc(100% - 280px)'}">
        <el-scrollbar :style="{height:'calc(100vh - 131px)'}">
          <el-empty v-if="!$store.state.typecho.content.list.some(v=>(v.title||'').indexOf(inputFilterNameValue)>-1)" />
          <el-card shadow="hover" v-for="(item) in $store.state.typecho.content.list.filter(v=>(v.title||'').indexOf(inputFilterNameValue)>-1)" :key="item.id" :style="{marginBottom:'10px',cursor:'pointer',opacity:item.type=='done'?'0.5':'1'}">
            <div slot="header" class="clearfix">
              <strong>{{item.title}}</strong>
              <el-button style="float: right; padding: 3px 0" type="text" @click="$router.push({path:'/blog/content/'+item.cid})">阅读全文</el-button>
            </div>
            {{item.text_content}}
          </el-card>
        </el-scrollbar>
        <el-footer>
          <el-pagination
            @size-change="(size)=>$store.dispatch('typecho/content/selectList',{size})"
            @current-change="(page)=>$store.dispatch('typecho/content/selectList',{page})"
            :current-page="$store.state.typecho.content.page"
            :page-sizes="[10, 20, 50, 100,200,400]"
            :page-size="$store.state.typecho.content.size"
            layout="total, sizes, prev, pager, next, jumper"
            :total="$store.state.typecho.content.total"
          ></el-pagination>
        </el-footer>
      </el-col>
    </el-row>
  </div>
</template>

<script>
// @ is an alias to /src

import { mapActions, mapGetters, mapState } from "vuex";

export default {
  components: {},
  data() {
    return {
      inputFilterNameValue: '',
      selection: [],
      parent: {},
      list: [],
      done: [],
      checkedTags: []
    };
  },
  created() {
  },
  computed: {
    ...mapState(["typecho"])
  },
  methods: {
    ...mapActions({
      handleSelectItem: "typecho/content/selectItem",
    }),
    handleSelectList() {
      this.$store.dispatch("typecho/content/selectList", {
        template: 'blog',
        parent: this.parent.cid,
      }).then(res => {
        this.list = res.rows.reduce((total, item) => {
          item.type == 'done' ? total.push(item) : total.unshift(item);
          return total;
        }, [])
        this.done = res.rows.filter(v => v.type == 'done')
      })
    },
    handleInsertItem() {
      if (this.inputFilterNameValue.trim() == '') return
      this.$store.dispatch("typecho/content/insertItem", {
        title: this.inputFilterNameValue,
        template: 'blog',
        type: 'blog',
        parent: this.parent.cid,
      }).then(() => {
        this.inputFilterNameValue = '';
        this.handleSelectList();
      })
    },
    handleDeleteItem(item) {
      this.$store.dispatch("typecho/content/deleteItem", item).then(res => {
        this.handleSelectList();
      })
    },
    handleSelectionChange(item, checked) {
      this.$store.dispatch("typecho/content/updateItem", {
        ...item,
        type: checked ? 'done' : 'blog'
      }).then(() => {
        this.handleSelectList()
      })
    },
    handleCatagoryTreeNodeClick(data, node, ref) {
      this.$store.dispatch('typecho/content/selectList', { mids: data.mid })
    },
    handleCheckedTagsChange(val) {
      this.$store.dispatch('typecho/content/selectList', { mids: val.join(',') })
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
