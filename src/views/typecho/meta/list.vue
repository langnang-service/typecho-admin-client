<template>
  <LayoutAdmin class="typecho-meta-list" v-loading="loading" v-bind="$route.meta" :pagination="{visible:true,...table}" @pagination-change="handlePaginationChange">
    <template #prefix>
      <span>【{{branch.slug}}】</span>
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
