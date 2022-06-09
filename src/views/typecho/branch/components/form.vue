<template>
  <el-form ref="form" :model="model" v-bind="$attrs" v-on="$listeners" :rules="rules" size="small" label-width="60px" :show-message="false" status-icon>
    <el-row :gutter="10">
      <el-col :span="24">
        <el-form-item prop="name" :label="labels.name">
          <el-input v-model="model.name" />
        </el-form-item>
      </el-col>
      <el-col :span="24">
        <el-form-item prop="slug" :label="labels.slug">
          <el-input v-model="model.slug" />
        </el-form-item>
      </el-col>
      <el-col :span="24">
        <el-form-item prop="description" :label="labels.description">
          <el-input v-model="model.description" type="textarea" rows="6" />
        </el-form-item>
      </el-col>
      <el-col :span="24">
        <VueMonacoEditor />
      </el-col>
    </el-row>
  </el-form>
</template>
<script>
export default {
  name: "TypechoBranchForm",
  props: {
    model: {
      type: Object,
      default() {
        return {}
      }
    },
  },
  data() {
    return {
      labels: {
        name: "名称",
        slug: '编码',
        description: "描述"
      },
      rules: {
        name: [
          { required: true, message: '请输入分支名称', trigger: 'blur' },
        ],
        slug: [
          { required: true, message: '请输入分支编码', trigger: 'blur' },
        ],
      },
    }
  },
  created() {
  },
  methods: {
  }
}
</script>
<style scoped>
</style>