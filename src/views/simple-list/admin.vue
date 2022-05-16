<template>
  <LayoutAdmin class="simple-list" :loading="simpleList.loading">
    <template #toolbar>
      <el-input v-model="inputSearchValue" size="mini" circle clearable prefix-icon="el-icon-search" :style="{display:'inline-block',marginRight:'10px',width:'180px'}" />
      <el-button size="mini" circle icon="el-icon-refresh" @click="handleRefresh"></el-button>
      <el-button size="mini" circle type="primary" icon="el-icon-plus" @click="handleInsert"></el-button>
      <el-button size="mini" circle type="danger" icon="el-icon-delete" :disabled="selection.length === 0" @click="handleDelete"></el-button>
      <el-upload action="#" accept=".xls, .xlsx" :show-file-list="false" :http-request="handleUpload" :style="{display:'inline-block',margin:'0 10px'}">
        <el-button size="mini" circle type="primary">
          <font-awesome-icon icon="fa-solid fa-upload" />
        </el-button>
      </el-upload>
      <el-button size="mini" circle type="primary">
        <font-awesome-icon icon="fa-solid fa-download" />
      </el-button>
      <el-button size="mini" circle type="primary">
        <font-awesome-icon icon="fa-solid fa-clock-rotate-left" />
      </el-button>
      <el-button size="mini" circle type="primary">
        <font-awesome-icon icon="fa-solid fa-recycle" />
      </el-button>
    </template>
    <el-row class="simple-list">
      <el-col class="simple-list-item" v-if="!simpleList.list.some(v=>v.name.indexOf(inputSearchValue)>-1)">
        <el-empty />
      </el-col>
      <el-col class="simple-list-item" :span="24" v-for="(item) in simpleList.list.filter(v=>v.name.indexOf(inputSearchValue)>-1)" :key="item.id">
        <el-card shadow="hover" :style="{marginBottom:'10px',cursor:'pointer'}" :body-style="{ padding: '10px' }">
          <el-row :gutter="10">
            <el-col :style="{width:'20px',textAlign:'center'}">
              <el-checkbox v-model="selection" :label="item" :style="{width:'19px',overflow:'hidden',verticalAlign:'top'}">&nbsp;</el-checkbox>
            </el-col>
            <el-col :style="{width:'26px',textAlign:'center'}">
              <font-awesome-icon v-if="item.file" icon="fa-solid fa-file" />
              <font-awesome-icon v-else icon="fa-solid fa-folder" />
            </el-col>
            <el-col :style="{width:'calc(100% - 50px)'}">{{item.name}}</el-col>
          </el-row>
        </el-card>
      </el-col>
    </el-row>
    <template #append>
      <el-dialog :title="dialog.title" :visible.sync="dialog.visible" :before-close="handleCancelDialog">
        <el-form :ref="dialog.form.ref" :model="dialog.form">
          <el-form-item>
            <el-input v-model="dialog.form.name"></el-input>
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
      inputSearchValue: '',
      // 已选列表
      selection: [],
      activeMenu: '/simple-list/admin',
      dialog: {
        title: '',
        visible: false,
        form: {
          ref: 'dialog-form',
          name: ''
        }
      }
    };
  },
  computed: {
    // ...mapGetters(["simpleList"]),
    ...mapState(["simpleList"])
  },
  created() {
    this.handleRefresh()
  },
  methods: {
    ...mapActions({
      handleRefresh: "simpleList/selectList"
    }),
    handleDelete() {
      this.$store.dispatch('simpleList/deleteList', this.selection)
    },
    handleInsert() {
      this.dialog.title = 'Insert'
      this.dialog.visible = true
    },
    handleCancelDialog() {
      this.dialog.form.name = ''
      this.dialog.visible = false
    },
    handleSubmitDialog() {
      this.$store.dispatch('simpleList/insertItem', this.dialog.form)
      this.handleCancelDialog();
    },
    handleUpload() { },
  },
};
</script>
