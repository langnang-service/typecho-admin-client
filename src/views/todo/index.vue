<template>
  <div class="todolist">
    <!-- <Jumbotron route="/todolist/list" title="ToDoList" /> -->
    <el-row>
      <el-col :span="20" :offset="2">
        <el-card :body-style="{padding:'10px'}">
          <el-input v-model="inputFilterNameValue" @keyup.enter.native="handleInsertItem"></el-input>
        </el-card>
      </el-col>
    </el-row>
    <el-card :style="{marginTop:'10px'}">
      <el-row class="simple-list">
        <el-col class="simple-list-item" v-if="!list.some(v=>(v.title||'').indexOf(inputFilterNameValue)>-1)">
          <el-empty />
        </el-col>
        <el-col class="simple-list-item" :span="24" v-for="(item) in list.filter(v=>(v.title||'').indexOf(inputFilterNameValue)>-1)" :key="item.id">
          <el-card shadow="hover" :style="{marginBottom:'10px',cursor:'pointer',opacity:item.type=='done'?'0.5':'1'}" :body-style="{ padding: '10px' }">
            <el-row :gutter="10">
              <el-col :style="{width:'30px',textAlign:'center'}">
                <el-checkbox v-model="done" :label="item" :style="{width:'19px',overflow:'hidden',verticalAlign:'top',fontSize:'18px'}" @change="(checked)=>handleSelectionChange(item,checked)">&nbsp;</el-checkbox>
              </el-col>
              <el-col :style="{width:'calc(100% - 65px)',fontSize:'18px',textDecoration:item.type=='done'?'line-through':'none'}" @click.native="handleClickRow(item)">{{item.title}}</el-col>
              <el-col :style="{width:'30px',}">
                <el-button size="mini" circle type="danger" @click="handleDeleteItem(item)">
                  <font-awesome-icon icon="fa-regular fa-trash-can" />
                </el-button>
              </el-col>
            </el-row>
          </el-card>
        </el-col>
      </el-row>
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
      slug: 'todo'
    }).then(res => {
      this.parent = res;
      this.handleSelectList({
        template: 'todo',
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
        parent: this.parent.cid,
        template: 'todo',
        size: 99999,
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
        template: 'todo',
        type: 'todo',
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
        type: checked ? 'done' : 'todo'
      }).then(() => {
        this.handleSelectList()
      })
    }
  }
};
</script>
