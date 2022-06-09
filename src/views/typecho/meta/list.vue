<template>
  <LayoutAdmin class="typecho-meta-list" v-loading="loading" v-bind="$route.meta" :pagination="{visible:true,...table}">
    <template #prefix>
      <span>【{{branch.slug}}】</span>
    </template>
    <template #toolbar>
      <el-tooltip class="item" effect="dark" content="查询" placement="bottom">
        <el-button size="mini" circle type="info" @click="$store.dispatch('typecho/meta/selectList')">
          <font-awesome-icon icon="fa-solid fa-search" />
        </el-button>
      </el-tooltip>
      <el-tooltip class="item" effect="dark" content="新增" placement="bottom">
        <el-button size="mini" circle type="primary" icon="el-icon-plus" @click="$router.push({path:'/typecho/meta/insert'})"></el-button>
      </el-tooltip>
      <el-tooltip class="item" effect="dark" content="模板" placement="bottom">
        <el-button size="mini" circle type="info">
          <font-awesome-icon icon="fa-solid fa-stamp" />
        </el-button>
      </el-tooltip>
      <el-tooltip class="item" effect="dark" content="删除" placement="bottom">
        <el-button size="mini" circle type="danger" icon="el-icon-delete" :disabled="selection.length === 0" @click="handleDelete"></el-button>
      </el-tooltip>
      <el-tooltip class="item" effect="dark" content="上传" placement="bottom">
        <el-upload action="#" accept=".xls, .xlsx" :show-file-list="false" :http-request="handleUpload" :style="{display:'inline-block',margin:'0 10px'}">
          <el-button size="mini" circle type="primary">
            <font-awesome-icon icon="fa-solid fa-upload" />
          </el-button>
        </el-upload>
      </el-tooltip>
      <el-tooltip class="item" effect="dark" content="下载" placement="bottom">
        <el-button size="mini" circle type="primary">
          <font-awesome-icon icon="fa-solid fa-download" />
        </el-button>
      </el-tooltip>
      <el-tooltip class="item" effect="dark" content="记录" placement="bottom">
        <el-button size="mini" circle type="info">
          <font-awesome-icon icon="fa-solid fa-clock-rotate-left" />
        </el-button>
      </el-tooltip>
      <el-tooltip class="item" effect="dark" content="回收站" placement="bottom">
        <el-button size="mini" circle type="info">
          <font-awesome-icon icon="fa-solid fa-recycle" />
        </el-button>
      </el-tooltip>
    </template>
    <el-card>
      <TypechoMetaTable ref="table" v-loading="table.loading" :data="table.data" @filter="handleSelect" @selection-change="(val) => table.selection = val" />
    </el-card>
  </LayoutAdmin>
</template>

<script>
import { mapActions, mapGetters, mapState } from "vuex";
import TypechoMetaTable from './components/table.vue'
import { TypechoMetaModel } from '@/store/modules/typecho/meta'
export default {
  components: { TypechoMetaTable },
  data() {
    return {
      loading: false,
      form: new TypechoMetaModel(),
      table: {
        loading: false,
        data: [],
        selection: [],
        page: 1,
        size: 10,
        total: 0,
      },
      inputFilterNameValue: '',
      inputFilterTagValue: '',
      // 已选列表
      selection: [],
      activeMenu: '/simple-list/admin',
      dialog: {
        title: '',
        visible: false,
        form: {
          ref: 'dialog-form',
          title: ''
        }
      }
    };

  },
  computed: {
    ...mapState({
      branch: state => state.typecho.branch.info,
    }),
  },
  created() {
    this.handleSelect();
  },
  methods: {
    handleSelect(val, key, row) {
      this.loading = true;
      this.$store.dispatch('typecho/meta/selectList', {
        ...row,
        root: this.branch.mid,
        page: this.table.page,
        size: this.table.size,
      }).then(res => {
        this.table.data = res.rows
        this.table.total = res.total
        this.table.page = res.page
        this.table.size = res.size
      }).finally(() => this.loading = false)
    },
    handleDelete() {
      this.$store.dispatch('typecho/meta/deleteList', this.selection)
      this.selection = [];
    },
    handleInsert() {
      this.dialog.title = 'Insert'
      this.dialog.visible = true
    },
    handleCancelDialog() {
      this.dialog.form.title = ''
      this.dialog.visible = false
    },
    handleSubmitDialog() {
      this.$store.dispatch('typecho/meta/insertItem', this.dialog.form)
      this.handleCancelDialog();
    },
    handleUpload() { },
    handleClickRow(item) {
      // console.log('handleClickRow', arguments)
      // this.$store.commit('typecho/meta/SET_INFO', item);
    },
    handleTableSelectionChange(val) {
      this.selection = val
    }
  },
};
</script>
