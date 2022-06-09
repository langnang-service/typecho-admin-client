<template>
  <LayoutAdmin class="typecho-meta-info" v-loading="loading" v-bind="$route.meta">
    <template #prefix>
      <span>【{{branch.slug}}】</span>
    </template>
    <template #toolbar>
      <el-tooltip class="item" effect="dark" content="返回" placement="bottom">
        <el-button size="mini" circle type="info" @click="$router.push({name:'List - Typecho Meta'})">
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
      <TypechoMetaForm :model="form" ref="form" />
    </el-card>
  </LayoutAdmin>
</template>

<script>
import { mapActions, mapGetters, mapState } from "vuex";
import { TypechoMetaModel } from '@/store/modules/typecho/meta'
import TypechoMetaForm from './components/form.vue'
export default {
  components: { TypechoMetaForm },
  props: {
  },
  data() {
    return {
      loading: false,
      form: new TypechoMetaModel()
    }
  },
  computed: {
    ...mapState({
      branch: state => state.typecho.branch.info,
    })
  },
  created() {
    if (['/typecho/meta/insert'].includes(this.$route.path)) {
      this.form = new TypechoMetaModel(this.$route.query);
    } else {
      this.loading = true
      this.$store.dispatch('typecho/meta/selectItem', this.$route.params)
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
          this.$store.dispatch('typecho/meta/submitItem', {
            ...this.form,
          }).then(res => {
            this.$router.push({ path: '/typecho/meta/list' })
          }).finally(() => this.loading = false)
        } else {
          return false;
        }
      });
    },
    handleMock() {
      this.form = new TypechoMetaModel(this.form, true)
    }
  }
}
</script>

<style>
</style>