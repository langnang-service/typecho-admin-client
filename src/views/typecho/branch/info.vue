<template>
  <LayoutAdmin class="typecho-meta-info" v-loading="loading" v-bind="$route.meta">
    <template #toolbar>
      <el-tooltip class="item" effect="dark" content="返回" placement="bottom">
        <el-button size="mini" circle type="info" @click="$router.push({path:'/typecho/branch/list'})">
          <font-awesome-icon icon="fa-solid fa-delete-left" />
        </el-button>
      </el-tooltip>
      <el-tooltip class="item" effect="dark" content="模拟" placement="bottom">
        <el-button size="mini" circle type="warning" @click="handleMock">
          <img src="http://mockjs.com/assets/img/logo-2.svg" alt style="height:10.5px;" />
        </el-button>
      </el-tooltip>
      <el-tooltip class="item" effect="dark" content="保存" placement="bottom">
        <el-button size="mini" circle type="primary" @click="handleSubmit">
          <font-awesome-icon icon="fa-solid fa-floppy-disk" />
        </el-button>
      </el-tooltip>
    </template>
    <el-card>
      <TypechoBranchForm :model="form" ref="form" />
    </el-card>
  </LayoutAdmin>
</template>

<script>
import { TypechoBranchModel, MOCK_KEY } from '@/store/modules/typecho/branch'
import TypechoBranchForm from './components/form.vue'
export default {
  components: { TypechoBranchForm },
  props: {
  },
  data() {
    return {
      loading: false,
      form: new TypechoBranchModel()
    }
  },
  computed: {
  },
  created() {
    if (['/typecho/branch/insert'].includes(this.$route.path)) {
      this.form = new TypechoBranchModel();
    } else {
      this.loading = true
      this.$store.dispatch('typecho/branch/selectItem', this.$route.params)
        .then(res => {
          this.form = res.row;
        }).finally(() => this.loading = false)
    }
  },
  methods: {
    handleSubmit() {
      this.$refs.form.$refs.form.validate((valid) => {
        if (valid) {
          this.loading = true
          this.$store.dispatch('typecho/branch/submitItem', {
            ...this.form,
          }).then(res => {
            this.$router.push({ path: '/typecho/branch/list' })
          }).finally(() => this.loading = false)
        } else {
          return false;
        }
      });
    },
    handleMock() {
      this.form = new TypechoBranchModel(this.form, true)
    }
  }
}
</script>

<style>
</style>