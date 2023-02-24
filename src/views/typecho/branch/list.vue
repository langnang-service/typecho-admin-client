<template>
  <LayoutAdmin class="typecho-content-list" v-loading="loading" v-bind="$route.meta" :pagination="{visible:true,...table}" @pagination-change="handlePaginationChange">
    <template #toolbar>
      <el-tooltip class="item" effect="dark" content="查询" placement="bottom">
        <el-button size="mini" circle type="primary" @click="handleSelect(null,null,$refs.table.form)">
          <font-awesome-icon icon="fa-solid fa-magnifying-glass" />
        </el-button>
      </el-tooltip>
    </template>
      <TypechoBranchTable ref="table" v-loading="table.loading" :data="table.data" @filter="handleSelect" @selection-change="(val) => table.selection = val" />
  </LayoutAdmin>
</template>

<script>
import { mapActions, mapGetters, mapState } from "vuex";
import { readExcel } from '@/utils/fileReader'
import { TypechoBranchModel } from '@/store/modules/typecho/branch'
import TypechoBranchTable from './components/table.vue'
export default {
  components: {
    TypechoBranchTable
  },
  data() {
    return {
      loading: false,
      form: new TypechoBranchModel(),
      table: {
        loading: false,
        data: [],
        selection: [],
        page: 1,
        size: 10,
        total: 0,
      },
      searchVisible: false,
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
  },
  created() {
    this.handleSelect();
  },
  methods: {
    handleSelect(val, key, row) {
      this.loading = true;
      this.$store.dispatch('typecho/branch/selectList', {
        ...row,
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
      this.$store.dispatch('typecho/branch/deleteList', this.selection.slice(0))
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
      this.$store.dispatch('typecho.content/insertItem', this.dialog.form)
      this.handleCancelDialog();
    },
    handleUpload(data) {
      readExcel(data.file)
    },
    handleClickRow(item) {
      this.$store.commit('typecho.content/SET_INFO', item);
      // this.$router.push({ path: '/typecho.content/info' })
    },
    handlePaginationChange(pagination) {
      this.table.total = pagination.total
      this.table.page = pagination.page
      this.table.size = pagination.size
      this.handleSelect();
    }
  },
};
</script>
