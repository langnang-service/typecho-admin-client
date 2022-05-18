<template>
  <LayoutAdmin class="entry-list" v-loading="$store.state.entry.loading" footer pagination pagination-module="entry">
    <template #toolbar>
      <el-tooltip class="item" effect="dark" content="查询" placement="bottom">
        <el-button size="mini" circle type="info" @click="handleRefresh">
          <font-awesome-icon icon="fa-solid fa-filter" />
        </el-button>
      </el-tooltip>
      <el-tooltip class="item" effect="dark" content="新增" placement="bottom">
        <el-button size="mini" circle type="primary" icon="el-icon-plus" @click="$router.push({path:'/entry/insert'})"></el-button>
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
    <el-row class="simple-list">
      <el-col class="simple-list-item" v-if="!entry.list.some(v=>(v.title||'').indexOf(inputFilterNameValue)>-1)">
        <el-empty />
      </el-col>
      <el-col class="simple-list-item" :span="24" v-for="(item) in entry.list.filter(v=>(v.title||'').indexOf(inputFilterNameValue)>-1)" :key="item.id">
        <el-card shadow="hover" :style="{marginBottom:'10px',cursor:'pointer'}" :body-style="{ padding: '10px' }">
          <el-row :gutter="10">
            <el-col :style="{width:'20px',textAlign:'center'}">
              <el-checkbox v-model="selection" :label="item" :style="{width:'19px',overflow:'hidden',verticalAlign:'top'}">&nbsp;</el-checkbox>
            </el-col>
            <el-col :style="{width:'26px',textAlign:'center'}">
              <font-awesome-icon v-if="item.file" icon="fa-solid fa-file" />
              <font-awesome-icon v-else icon="fa-solid fa-folder" />
            </el-col>
            <el-col :style="{width:'calc(100% - 50px)'}">
              <router-link :to="'/entry/'+item.id">{{item.title}}</router-link>
            </el-col>
          </el-row>
        </el-card>
      </el-col>
    </el-row>
    <template #append>
      <el-dialog :title="dialog.title" :visible.sync="dialog.visible" :before-close="handleCancelDialog">
        <el-form :ref="dialog.form.ref" :model="dialog.form">
          <el-form-item>
            <el-input v-model="dialog.form.title"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer">
          <el-button @click="handleCancelDialog">Cancel</el-button>
          <el-button type="primary" @click="handleSubmitDialog">Submit</el-button>
        </span>
      </el-dialog>
    </template>
  </LayoutAdmin>
</template>

<script>
import { mapActions, mapGetters, mapState } from "vuex";
export default {
  components: {},
  data() {
    return {
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
    // ...mapGetters(["entry"]),
    ...mapState(["entry"])
  },
  created() {
  },
  methods: {
    ...mapActions({
      handleRefresh: "entry/selectList"
    }),
    handleDelete() {
      this.$store.dispatch('entry/deleteList', this.selection)
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
      this.$store.dispatch('entry/insertItem', this.dialog.form)
      this.handleCancelDialog();
    },
    handleUpload() { },
    handleClickRow(item) {
      console.log('handleClickRow', arguments)
      this.$store.commit('entry/SET_INFO', item);
      // this.$router.push({ path: '/entry/info' })
    }
  },
};
</script>
