<template>
  <div class="signin" v-loading="loading">
    <el-row :gutter="10">
      <el-col :md="{span: 12, offset: 6}">
        <el-form ref="form" :model="form" :rules="rules" label-width="80px" :show-message="false" status-icon>
          <el-form-item prop="name" :label="labels.name">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item prop="password" :label="labels.password">
            <el-input v-model="form.password" type="password"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" style="width: 100%;" @click="handleSubmit">登录</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { TypechoUserModel } from '@/store/modules/typecho/user'
export default {
  data() {
    return {
      loading: false,
      form: new TypechoUserModel(),
      rules: TypechoUserModel.getRules(),
      labels: TypechoUserModel.getLabels(),
    }
  },
  methods: {
    handleSubmit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.loading = true
          this.$store.dispatch('typecho/user/signInItem', this.form).then(res => {
            this.$router.push({ path: '/' })
          }).finally(() => this.loading = false)

        } else {
          return false;
        }
      });
    },
  }
}
</script>

<style>
</style>