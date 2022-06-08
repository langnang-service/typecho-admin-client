<template>
  <el-card :class="'typecho-meta-'+type+'-item'" :shadow="type==='list'?'hover':'never'">
    <el-row v-if="type==='list'" :gutter="10">
      <el-col class="simple-list-item" v-if="!typecho.meta.list.some(v=>(v.name||'').indexOf(inputFilterNameValue)>-1)">
        <el-empty />
      </el-col>
      <el-col class="simple-list-item" :span="24" v-for="(item) in typecho.meta.list.filter(v=>(v.name||'').indexOf(inputFilterNameValue)>-1)" :key="item.id">
        <el-card shadow="hover" :style="{marginBottom:'10px',cursor:'pointer'}" :body-style="{ padding: '10px' }">
          <el-row :gutter="10">
            <el-col :style="{width:'20px',textAlign:'center'}">
              <el-checkbox v-model="selection" :label="item" :style="{width:'19px',overflow:'hidden',verticalAlign:'top'}">&nbsp;</el-checkbox>
            </el-col>
            <el-col :style="{width:'26px',textAlign:'center'}">
              <font-awesome-icon v-if="item.file" icon="fa-solid fa-file" />
              <font-awesome-icon v-else icon="fa-solid fa-folder" />
            </el-col>
            <el-col :style="{width:'calc(100% - 50px)'}" @click.native="handleClickRow(item)">{{item.name}}</el-col>
          </el-row>
        </el-card>
      </el-col>
    </el-row>
    <el-table v-if="type==='table'" :data="data" size="mini" stripe border @selection-change="(val)=>$emit('selection-change',val)" @row-dblclick="handleTableRowDblClick">
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
      <el-table-column show-overflow-tooltip prop="type" label="type" width="150px">
        <template slot="header" slot-scope="{}">
          <el-select size="mini" filterable clearable v-model="form.type" placeholder="type" @focus="handleFormTypeFocus" @change="$emit('select',form)">
            <el-option v-for="opt in typeOptions" :key="opt.value" :value="opt.value" />
          </el-select>
        </template>
      </el-table-column>
      <el-table-column show-overflow-tooltip prop="description" label="description"></el-table-column>
      <el-table-column show-overflow-tooltip prop="count" label="count" width="80px"></el-table-column>
      <el-table-column show-overflow-tooltip prop="order" label="order" width="80px"></el-table-column>
    </el-table>
    <el-form v-if="type==='form'" ref="form" :model="form" :rules="rules" label-width="80px">
      <el-row :gutter="16">
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
        <el-col :span="8">
          <el-form-item prop="type" label="type">
            <el-select v-model="form.type" filterable allow-create @focus="handleFormTypeFocus">
              <el-option v-for="opt in typeOptions" :key="opt.value" :value="opt.value" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="order" label="order">
            <el-input-number v-model="form.order" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="parent" label="parent">
            <el-select v-model="form.parent" />
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item prop="description" label="description">
            <el-input v-model="form.description" type="textarea" />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </el-card>
</template>

<script>
import { TypechoMeta } from '@/store/modules/typecho/meta'
import { mapActions, mapGetters, mapState } from "vuex";
import { select_typecho_meta_distinct } from '@/apis/typecho/meta'
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
      typeOptions: [],
      rules: {
        name: [
          { required: true, trigger: 'blur' },
        ],
        type: [
          { required: true, trigger: 'change' }
        ],
      }
    }
  },
  computed: {
  },
  methods: {
    handleFormTypeFocus() {
      select_typecho_meta_distinct({
        column: 'type',
        root: this.$store.state.typecho.branch.info?.mid
      }).then(res => {
        this.typeOptions = res.rows;
      })
    },
    handleTableRowDblClick(row, column, event) {
      this.$router.push({
        path: "/typecho/meta/" + row.mid
      })
    },
    handleTableSelectionChange(val) {
      this.selection = val
    },
  }
}
</script>

<style>
</style>