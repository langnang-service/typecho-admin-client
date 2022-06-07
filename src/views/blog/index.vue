<template>
  <div class="blog">
    <el-col class="simple-list-item" v-if="!list.some(v=>(v.title||'').indexOf(inputFilterNameValue)>-1)">
      <el-empty />
    </el-col>
    <el-card shadow="hover" v-for="(item) in list.filter(v=>(v.title||'').indexOf(inputFilterNameValue)>-1)" :key="item.id" :style="{marginBottom:'10px',cursor:'pointer',opacity:item.type=='done'?'0.5':'1'}">
      <div slot="header" class="clearfix">
        <strong>{{item.title}}</strong>
        <el-button style="float: right; padding: 3px 0" type="text" @click="$router.push({path:'/blog/content/'+item.cid})">阅读全文</el-button>
      </div>
      {{item.text_content}}
    </el-card>
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
      done: []
    };
  },
  created() {
    this.handleSelectItem({
      slug: 'blog',
      type: 'template',
    }).then(res => {
      this.parent = res;
      this.handleSelectList({
        template: 'blog',
        parent: this.parent.cid,
      })
    })
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
    }
  }
};
</script>
