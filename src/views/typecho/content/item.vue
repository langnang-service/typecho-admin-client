<template>
  <el-card :class="'typecho-content-'+type+'-item'" :shadow="type==='list'?'hover':'never'">
    <el-row v-if="type==='list'" :gutter="10">
      <el-col class="simple-list-item" :span="24" v-for="(item) in typecho.content.list.filter(v=>(v.title||'').indexOf(inputFilterNameValue)>-1)" :key="item.id">
        <el-col :style="{width:'20px',textAlign:'center'}">
          <el-checkbox v-model="selection" :label="item" :style="{width:'19px',overflow:'hidden',verticalAlign:'top'}">&nbsp;</el-checkbox>
        </el-col>
        <el-col :style="{width:'30px',textAlign:'center'}">
          <font-awesome-icon v-if="item.file" icon="fa-solid fa-file" />
          <font-awesome-icon v-else icon="fa-solid fa-folder" />
        </el-col>
        <el-col :style="{width:'calc(100% - 60px)'}" @click.native="$router.push({path:'/typecho/content/'+data.cid})">
          <h3>{{item.title}}</h3>
          <p>{{item.text}}</p>
        </el-col>
      </el-col>
    </el-row>
    <el-table v-if="type==='table'" :data="data" size="mini" stripe @selection-change="(val)=>$emit('selection-change',val)" @row-dblclick="handleTableRowDblClick">
      <template #empty>
        <el-empty />
      </template>
      <el-table-column type="expand">
        <template slot-scope="{row}">{{row.text}}</template>
      </el-table-column>
      <el-table-column align="center" type="selection"></el-table-column>
      <el-table-column show-overflow-tooltip prop="title" label="title">
        <template slot="header" slot-scope="{}">
          <el-input size="mini" filterable clearable v-model="form.title" placeholder="title" @blur="$emit('select',form)"></el-input>
        </template>
      </el-table-column>
      <el-table-column show-overflow-tooltip prop="slug" label="slug"></el-table-column>
      <el-table-column show-overflow-tooltip prop="status" label="status" width="150px">
        <template slot="header" slot-scope="{}">
          <el-select size="mini" filterable clearable v-model="form.status" placeholder="status" @focus="handleFormStatusFocus" @change="$emit('select',form)">
            <el-option v-for="opt in statusOptions" :key="opt.value" :value="opt.value" />
          </el-select>
        </template>
      </el-table-column>
      <el-table-column show-overflow-tooltip prop="type" label="type" width="150px">
        <template slot="header" slot-scope="{}">
          <el-select size="mini" filterable clearable v-model="form.type" placeholder="type" @focus="handleFormTypeFocus" @change="$emit('select',form)">
            <el-option v-for="opt in typeOptions" :key="opt.value" :value="opt.value" />
          </el-select>
        </template>
      </el-table-column>
      <el-table-column show-overflow-tooltip prop="commentsNum" label="commentsNum"></el-table-column>
    </el-table>
    <el-form v-if="type==='form'" ref="form" :model="form" :rules="rules" label-width="80px">
      <el-row :gutter="16">
        <el-col :span="24">
          <el-form-item prop="title" label="title">
            <el-input v-model="form.title" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="slug" label="slug">
            <el-input v-model="form.slug" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="type" label="type">
            <el-select v-model="form.type" filterable allow-create @focus="handleFormTypeFocus">
              <el-option v-for="opt in typeOptions" :key="opt.value" :value="opt.value" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="status" label="status">
            <el-select v-model="form.status" filterable allow-create @focus="handleFormStatusFocus">
              <el-option v-for="opt in statusOptions" :key="opt.value" :value="opt.value" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item prop="text" label="text">
            <el-input v-model="form.text" type="textarea" />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div ref="monaco" :style="{height:'360px',width:'100%'}"></div>
  </el-card>
</template>

<script>
import { TypechoMeta } from '@/store/modules/typecho/meta'
import { mapActions, mapGetters, mapState } from "vuex";
import { select_typecho_content_type_list, select_typecho_content_status_list } from '@/apis/typecho/content'
import * as monaco from 'monaco-editor'
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
          { required: true, message: '请输入名称', trigger: 'blur' },
        ],
        slug: [
          { required: true, message: '请输入别名', trigger: 'blur' },
        ],
        type: [
          { required: true, message: '请至少选择一个性质', trigger: 'change' }
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
    this.monacoEditor = monaco.editor.create(this.$refs.monaco, {
      value: '',
      readOnly: true,
      language: 'markdonw',
      theme: 'vs-dark',
    })
  },
  methods: {
    handleFormTypeFocus() {
      select_typecho_content_type_list().then(res => {
        this.typeOptions = res.rows;
      })
    },
    handleFormStatusFocus() {
      select_typecho_content_status_list().then(res => {
        this.statusOptions = res.rows;
        this.$forceUpdate()
      })
    },
    handleTableRowDblClick(row, column, event) {
      this.$router.push({
        path: "/typecho/content/" + row.cid
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