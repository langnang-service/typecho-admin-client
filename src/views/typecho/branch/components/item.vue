<template>
  <el-card :class="'typecho-branch-'+type+'-item'" :shadow="type==='list'?'hover':'never'">
    <el-row v-if="type==='list'" :gutter="10">
      <el-col class="simple-list-item" :span="24" v-for="(item) in typecho.branch.list.filter(v=>(v.title||'').indexOf(inputFilterNameValue)>-1)" :key="item.id">
        <el-col :style="{width:'20px',textAlign:'center'}">
          <el-checkbox v-model="selection" :label="item" :style="{width:'19px',overflow:'hidden',verticalAlign:'top'}">&nbsp;</el-checkbox>
        </el-col>
        <el-col :style="{width:'30px',textAlign:'center'}">
          <font-awesome-icon v-if="item.file" icon="fa-solid fa-file" />
          <font-awesome-icon v-else icon="fa-solid fa-folder" />
        </el-col>
        <el-col :style="{width:'calc(100% - 60px)'}" @click.native="$router.push({path:'/typecho/branch/'+data.cid})">
          <h3>{{item.title}}</h3>
          <p>{{item.text}}</p>
        </el-col>
      </el-col>
    </el-row>
    <el-table v-if="type==='table'" :data="data" size="mini" stripe border @selection-change="(val)=>$emit('selection-change',val)" @row-contextmenu="handleShowContextMenu" @mousedown.native="()=>$refs.contextmenu.hide()">
      <template #empty>
        <el-empty />
      </template>
      <el-table-column align="center" type="selection"></el-table-column>
      <el-table-column show-overflow-tooltip prop="name" label="name">
        <template slot="header" slot-scope="{}">
          <el-input size="mini" filterable clearable v-model="form.name" placeholder="name" @blur="$emit('select',form)"></el-input>
        </template>
      </el-table-column>
      <el-table-column show-overflow-tooltip prop="slug" label="slug"></el-table-column>
      <el-table-column show-overflow-tooltip prop="metasNum" label="metasNum"></el-table-column>
      <el-table-column show-overflow-tooltip prop="contentsNum" label="contentsNum"></el-table-column>
      <el-table-column show-overflow-tooltip prop="templatesNum" label="templatesNum"></el-table-column>
      <el-table-column show-overflow-tooltip prop="commentsNum" label="commentsNum"></el-table-column>
    </el-table>
    <el-form v-if="type==='form'" ref="form" :model="form" :rules="rules" size="small" label-width="80px">
      <el-row :gutter="10">
        <el-col :span="12">
          <el-form-item prop="name" label="name">
            <el-input v-model="form.name" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item prop="slug" label="slug">
            <el-input v-model="form.slug" />
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item prop="description" label="description">
            <el-input v-model="form.description" type="textarea" />
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <VueMonacoEditor />
        </el-col>
      </el-row>
    </el-form>
    <v-contextmenu ref="contextmenu">
      <v-contextmenu-item @click="$router.push('/typecho/meta/list')">Metas</v-contextmenu-item>
      <v-contextmenu-item @click="$router.push('/typecho/content/list')">Contents</v-contextmenu-item>
      <v-contextmenu-item disabled>删除</v-contextmenu-item>
      <v-contextmenu-item @click="$router.push('/typecho/branch/'+$store.state.typecho.branch.info.mid)">编辑</v-contextmenu-item>
      <v-contextmenu-item disabled>查看</v-contextmenu-item>
    </v-contextmenu>
  </el-card>
</template>

<script>
import { TypechoMeta } from '@/store/modules/typecho/meta'
import { mapActions, mapGetters, mapState } from "vuex";
export default {
  props: {
    readonly: {
      type: Boolean,
      defaule: true
    },
    type: {
      type: String,
      default: '',
    },
    data: {
      type: [Object, Array],
      defaule() {
        return {}
      }
    },
    form: {
      type: Object,
      default() {
        return {}
      }
    },
  },
  data() {
    return {
      selection: [],
      typeOptions: [],
      statusOptions: [],
      rules: {
        name: [
          { required: true, trigger: 'blur' },
        ],
        slug: [
          { required: true, trigger: 'blur' },
        ],
        type: [
          { required: true, trigger: 'change' }
        ],
      },
      monacoEditor: {}
    }
  },
  computed: {
  },
  created() {
  },
  mounted() {
  },
  methods: {
    handleShowContextMenu(row, column, event) {
      event.preventDefault()
      this.$store.commit('typecho/branch/SET_INFO', row)
      this.$refs.contextmenu.show({ top: event.clientY, left: event.clientX });
    },
    handleTableColCick(path, row) {
      this.$store.commit('typecho/branch/SET_INFO', row)
      this.$router.push({
        path
      })
    },
    handleTableSelectionChange(val) {
      this.selection = val
    },
  }
}
</script>

<style lang="scss" scoped>
.typecho-content-list-item {
  margin-bottom: 10px;
  line-height: 38px;
  cursor: pointer;
  ::v-deep {
    .el-card__body {
      padding: 0 20px;
    }
  }
}
.typecho-content-table-item {
  border: 0;
  ::v-deep {
    .el-card__body {
      padding: 0;
      // background-color: #ccc;
    }
    .el-table {
      background-color: transparent;
      &::before {
        height: 0;
      }
      .el-table__body {
        border-spacing: 0 8px;
        border-color: red;
        // -webkit-border-vertical-spacing: 10px;
        .el-table__expanded-cell {
          padding-left: 48px;
        }
      }
      td.el-table__cell,
      th.el-table__cell {
        border-top: 1px solid #ebeef5;
        cursor: pointer;
        &:first-child {
          border-left: 1px solid #ebeef5;
          border-top-left-radius: 4px;
          border-bottom-left-radius: 4px;
        }
        &:last-child {
          border-right: 1px solid #ebeef5;
          border-top-right-radius: 4px;
          border-bottom-right-radius: 4px;
        }
      }
      th.el-table__cell:nth-last-child(2) {
        border-right: 1px solid #ebeef5;
        border-top-right-radius: 4px;
        border-bottom-right-radius: 4px;
      }
    }
  }
}
</style>