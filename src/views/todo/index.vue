<template>
  <LayoutAdmin ref="layout" class="todo-list" v-loading="loading" v-bind="$attrs" :breadcrumbOptions="breadcrumbOptions">
    <el-card>
      <el-form :model="content" size="small">
        <el-form-item prop="content" style="margin-bottom:0">
          <el-input v-model="content.title" @keyup.enter.native="handleInsertItem"></el-input>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card>
      <el-row>
        <el-col class="todo-item" v-if="!table.data.some(v => (v.title).indexOf(content.title || '') > -1)">
          <el-empty />
        </el-col>
        <el-col class="todo-item" :span="24" v-for="(item) in table.data.filter(v => (v.title).indexOf(this.content.title || '') > -1)" :key="item.cid">
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
  </LayoutAdmin>
</template>

<script>
import { mapActions, mapGetters, mapState } from "vuex";
import { TypechoMetaModel } from '@/store/modules/typecho/meta'
import { TypechoContentModel } from '@/store/modules/typecho/content'
export default {
  components: {
  },
  data() {
    return {
      loading: false,
      categoryTree: [],
      breadcrumbOptions: [],
      content: new TypechoContentModel(),
      meta: new TypechoMetaModel(),
      table: {
        loading: false,
        data: [],
        selection: [],
        page: 1,
        size: 99999,
        total: 0,
      },
      done: []
    };
  },
  watch: {
    '$route'(to, from) {
      this.setBreadcrumb()
    }
  },
  computed: {
    ...mapState({
      branch: state => state.typecho.branch.info,
    }),
  },
  created() {
  },
  mounted() {
    this.$store.dispatch('typecho/meta/selectTree', { type: 'category' }).then(res => {
      this.categoryTree = res.tree;
      this.setBreadcrumb()
    })
  },
  methods: {
    /**
     * 更新面包屑配置参数
     */
    setBreadcrumb() {
      if (!this.$route.params.mids) {
        this.$refs.layout.breadcrumb = [{ ...this.$refs.layout.breadcrumb[1], path: '/todo' }]
        this.breadcrumbOptions = [this.categoryTree.map(v => ({ children: v.children, name: v.mid, mid: v.mid, path: '/todo/' + v.mid }))];
      } else {
        const mids = this.$route.params.mids.split('/');
        this.$refs.layout.breadcrumb = [...this.$refs.layout.breadcrumb.slice(0, mids.length), { meta: { name: mids[mids.length - 1] } }]
        this.breadcrumbOptions = mids.reduce((total, item, index) => {
          const parent = total[index].find(v => v.mid === item);
          total.push(parent.children.map(v => ({ children: v.children, name: v.mid, mid: v.mid, path: parent.path + '/' + v.mid })))
          return total;
        }, [this.categoryTree.map(v => ({ children: v.children, name: v.mid, mid: v.mid, path: '/todo/' + v.mid }))])
      }
      this.handleSelect()
    },
    handleSelect(val, key, row) {
      this.loading = true;
      this.$store.dispatch('typecho/content/selectList', {
        mids: this.$route.params.mids ? this.$route.params.mids.split('/')[this.$route.params.mids.split('/').length - 1] : null,
        root: this.branch.mid,
        page: this.table.page,
        size: this.table.size,
      }).then(res => {
        this.table.data = res.rows
        this.table.total = res.total
        this.table.page = res.page
        this.table.size = res.size
        console.log(this.table.data.some(v => (v.title).indexOf(this.content.title || '') > -1));
      }).finally(() => this.loading = false)
    },
    handleInsertItem() {
    },
    handleDeleteItem(item) {
    },
    handleSelectionChange(item, checked) {
      // this.$store.dispatch("typecho/content/updateItem", {
      //   ...item,
      //   type: checked ? 'done' : 'todo'
      // }).then(() => {
      //   this.handleSelectList()
      // })
    }
  },
};
</script>
