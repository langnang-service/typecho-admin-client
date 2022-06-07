<template>
  <div class="blog">
    <el-row :gutter="10">
      <el-col :style="{width:'280px'}">
        <el-input size="mini"></el-input>
        <el-tree :data="$store.state.typecho.meta.tree" node-key="mid" :props="{children: 'children',label: 'name'}" :style="{marginTop:'20px'}" @node-click="handleCatagoryTreeNodeClick"></el-tree>
        <el-checkbox-group size="small" v-model="checkedTags">
          <el-checkbox-button v-for="tag in $store.state.typecho.meta.list" :label="tag.mid" :key="tag.mid">{{tag.name}}</el-checkbox-button>
        </el-checkbox-group>
      </el-col>
      <el-col :style="{width:'calc(100% - 280px)'}">
        <el-empty v-if="!$store.state.typecho.content.list.some(v=>(v.title||'').indexOf(inputFilterNameValue)>-1)" />
        <el-card shadow="hover" v-for="(item) in $store.state.typecho.content.list.filter(v=>(v.title||'').indexOf(inputFilterNameValue)>-1)" :key="item.id" :style="{marginBottom:'10px',cursor:'pointer',opacity:item.type=='done'?'0.5':'1'}">
          <div slot="header" class="clearfix">
            <strong>{{item.title}}</strong>
            <el-button style="float: right; padding: 3px 0" type="text" @click="$router.push({path:'/blog/content/'+item.cid})">阅读全文</el-button>
          </div>
          {{item.text_content}}
        </el-card>
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
      console.log(data, node, ref)
    }
  }
};
</script>
