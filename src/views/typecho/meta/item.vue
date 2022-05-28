<template>
  <el-card>
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
            <el-select v-model="form.type" filterable allow-create @focus="handleFocusType">
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
import { select_typecho_meta_type_list } from '@/apis/typecho/meta'
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
          { required: true, message: '请输入名称', trigger: 'blur' },
        ],
        slug: [
          { required: true, message: '请输入别名', trigger: 'blur' },
        ],
        type: [
          { required: true, message: '请至少选择一个性质', trigger: 'change' }
        ],
      }
    }
  },
  computed: {
  },
  methods: {
    handleFocusType() {
      select_typecho_meta_type_list().then(res => {
        this.typeOptions = res.rows;
      })
    }
  }
}
</script>

<style>
</style>