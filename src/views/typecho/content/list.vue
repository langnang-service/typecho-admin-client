<template>
  <LayoutAdmin class="typecho-content-list" v-loading="loading" v-bind="$route.meta" :pagination="{visible:true,...table}" @pagination-change="handlePaginationChange">
    <template #prefix>
      <span>【{{$store.state.typecho.branch.info.slug}}】</span>
    </template>
    <el-card>
      <TypechoContentTable ref="table" v-loading="table.loading" :data="table.data" @filter="handleSelect" @selection-change="(val) => table.selection = val" />
    </el-card>
  </LayoutAdmin>
</template>

<script>
import { mapActions, mapGetters, mapState } from "vuex";
import Item from './components/item.vue'
import { readExcel } from '@/utils/fileReader'
import { TypechoContentModel } from '@/store/modules/typecho/content'
import TypechoContentTable from './components/table.vue'
export default {
  components: {
    TypechoContentTable
  },
  data() {
    return {
      loading: false,
      form: new TypechoContentModel(),
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
    ...mapState({
      branch: state => state.typecho.branch.info,
    }),
  },
  created() {
    this.handleSelect()
  },
  methods: {
    handleSelect(val, key, row) {
      this.loading = true;
      this.$store.dispatch('typecho/content/selectList', {
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
      this.$store.dispatch('typecho/content/deleteList', this.selection.slice(0))
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
    },
    handleTableSelectionChange(val) {
      this.selection = val
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
