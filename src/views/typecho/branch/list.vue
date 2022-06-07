<template>
  <LayoutAdmin class="typecho-content-list" v-loading="$store.state.typecho.content.loading" v-bind="$route.meta">
    <template #toolbar>
      <el-tooltip class="item" effect="dark" content="查询" placement="bottom">
        <el-button size="mini" circle type="info" @click="handleSelect">
          <font-awesome-icon icon="fa-solid fa-search" />
        </el-button>
      </el-tooltip>
      <el-tooltip class="item" effect="dark" content="新增" placement="bottom">
        <el-button size="mini" circle type="primary" icon="el-icon-plus" @click="$router.push({path:'/typecho/branch/insert'})"></el-button>
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
      <el-tooltip class="item" effect="dark" content="模板" placement="bottom">
        <el-button size="mini" circle type="primary">
          <font-awesome-icon icon="fa-solid fa-file-excel" />
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
    <Item type="table" ref="table" :form="$store.state.typecho.branch.info" @select="(form)=>handleSelect(form)" :data="typecho.branch.list.filter(v=>(v.title||'').indexOf(inputFilterNameValue)>-1)" @selection-change="handleTableSelectionChange" />
  </LayoutAdmin>
</template>

<script>
import { mapActions, mapGetters, mapState } from "vuex";
import Item from './item.vue'
import { readExcel } from '@/utils/fileReader'
export default {
  components: {
    Item
  },
  data() {
    return {
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
    ...mapState(["typecho"])
  },
  created() {
  },
  methods: {
    ...mapActions({
      handleSelect: "typecho/branch/selectList",
    }),
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
    handleTableSelectionChange(val) {
      this.selection = val
    }
  },
};
</script>
