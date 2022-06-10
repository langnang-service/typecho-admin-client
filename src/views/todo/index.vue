<template>
  <el-row :gutter="10" v-loading="loading">
    <el-col :md="16" :lg="18">
      <el-card>
        <ElBreadcrumbMenu :data="breadcrumbMenuData" input separator="/" style="height: 32px;line-height: 32px;" @menu-open="handleBreadcrumbMenuOpen">
          <template #menu-prepend>
            <el-input ref="input" size="small" v-model="meta.name" @keyup.enter.native="handleInsertMeta" />
          </template>
        </ElBreadcrumbMenu>
      </el-card>
    </el-col>
    <el-col :md="8" :lg="6">
      <el-card>
        <el-form :model="content" size="small">
          <el-form-item prop="content" style="margin-bottom:0">
            <el-input clearable v-model="content.title" @keyup.enter.native="handleInsertContent">
              <template slot="prepend">{{ table.data.filter(v => (v.title).indexOf(content.title || '') > -1).length }}</template>
            </el-input>
          </el-form-item>
        </el-form>
      </el-card>
    </el-col>
    <el-col :span="24" style="margin-top: 10px;">
      <el-row :gutter="10" v-loading="table.loading">
        <el-scrollbar style="height: calc(100vh - 146px)">
          <el-col class="todo-item" v-if="!table.data.some(v => (v.title).indexOf(content.title || '') > -1)">
            <el-card>
              <el-empty v-if="!table.data.some(v => (v.title).indexOf(content.title || '') > -1)" />
            </el-card>
          </el-col>
          <el-col class="todo-item" :span="24" v-for="(item) in table.data.filter(v => (v.title).indexOf(content.title || '') > -1)" :key="item.cid">
            <el-card shadow="hover" :style="{marginBottom:'10px',cursor:'pointer',opacity:item.type=='done'?'0.5':'1'}" :body-style="{ padding: '4px 10px' }">
              <el-row :gutter="10" style="line-height: 29px">
                <el-col :style="{width:'30px',textAlign:'center'}">
                  <el-checkbox v-model="done" :label="item" :style="{width:'19px',overflow:'hidden',verticalAlign:'top',fontSize:'18px'}" @change="(checked)=>handleContentSelectionChange(item,checked)">&nbsp;</el-checkbox>
                </el-col>
                <el-col :style="{width:'calc(100% - 65px)',fontSize:'18px',textDecoration:item.type=='done'?'line-through':'none'}">{{item.title}}</el-col>
                <el-col :style="{width:'30px',}">
                  <el-button size="mini" circle type="danger" @click="handleDeleteContent(item)">
                    <font-awesome-icon icon="fa-regular fa-trash-can" />
                  </el-button>
                </el-col>
              </el-row>
            </el-card>
          </el-col>
        </el-scrollbar>
      </el-row>
    </el-col>
  </el-row>
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
      breadcrumbMenuData: [],
      content: new TypechoContentModel({ type: 'todo' }),
      meta: new TypechoMetaModel({ type: 'category' }),
      table: {
        loading: false,
        data: [],
        selection: [],
        page: 1,
        size: 99999,
        total: 0,
      },
      menuData: [],
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
    this.content = new TypechoContentModel({ type: 'todo', parent: this.branch.cid, mids: this.branch.mid })
  },
  mounted() {
    this.handleSelectCategoryTree();
  },
  methods: {
    handleSelectCategoryTree() {
      this.loading = true;
      this.$store.dispatch('typecho/meta/selectTree', { type: 'category' }).then(res => {
        this.categoryTree = res.tree;
        this.setBreadcrumb()
      }).finally(() => this.loading = false)
    },
    /**
     * 更新面包屑配置参数
     */
    setBreadcrumb() {
      this.breadcrumbMenuData = this.$route.matched.slice(0).reduce((total, item, index) => {
        if (!item.name) return total;
        total.push({
          mid: this.branch.mid,
          title: item.name.split(' - ')[0],
          // input: true,
          // filterable: true,
          menus: this.categoryTree.map(v => ({ children: v.children, title: v.name, mid: v.mid, path: '/todo/' + v.mid })),
        });
        return total;
      }, [])
      if (this.$route.params.mids) {
        const mids = this.$route.params.mids.split('/');
        this.breadcrumbMenuData = mids.reduce((total, mid, index) => {
          const meta = total[index].menus.find(v => v.mid == mid);
          total.push({
            mid,
            title: meta.title,
            // input: true,
            // filterable: true,
            menus: meta.children.map(v => ({
              children: v.children, title: v.name
              , mid: v.mid, path: meta.path + '/' + v.mid
            })),
          })
          return total;
        }, this.breadcrumbMenuData)
      }
      this.handleSelect()
    },
    handleSelect(val, key, row) {
      this.table.loading = true;
      this.$store.dispatch('typecho/content/selectList', {
        mids: this.$route.params.mids ? this.$route.params.mids.split('/')[this.$route.params.mids.split('/').length - 1] : null,
        root: this.branch.mid,
        page: this.table.page,
        size: this.table.size,
      }).then(res => {
        const metas = res.rows.reduce((total, item) => {
          if (!total[item.type]) total[item.type] = [];
          total[item.type].push(item);
          return total;
        }, {});
        this.table.data = [...metas.todo || [], ...metas.done || []];
        this.table.total = res.total
        this.table.page = res.page
        this.table.size = res.size
        this.done = metas.done || [];
      }).finally(() => this.table.loading = false)
    },
    handleInsertContent() {
      if (this.content.title.trim() == '') return
      this.$store.dispatch('typecho/content/insertItem', this.content).then(() => {
        this.content.title = ''
        this.handleSelect()
      })
    },
    handleDeleteContent(item) {
      console.log(item);
      this.$store.dispatch('typecho/content/deleteItem', item).then(() => {
        this.handleSelect();
      })
    },
    handleContentSelectionChange(item, checked) {
      this.$store.dispatch("typecho/content/updateItem", {
        ...item,
        type: checked ? 'done' : 'todo'
      }).then(() => {
        this.handleSelect()
      })
    },
    handleBreadcrumbMenuOpen(row) {
      this.meta.parent = row.mid
    },
    handleInsertMeta() {
      this.$store.dispatch('typecho/meta/insertItem', this.meta).then(res => {
        this.meta.name = '';
        this.handleSelectCategoryTree();
      })
    }
  },
};
</script>
