<template>
  <LayoutAdmin class="typecho-content-info" v-loading="loading" v-bind="$route.meta">
    <template #prefix>
      <span>【{{branch.slug}}】</span>
    </template>
    <template #toolbar>
      <el-tooltip class="item" effect="dark" content="返回" placement="bottom">
        <el-button size="mini" circle type="info" @click="$router.push({path:'/typecho/content/list'})">
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
      <TypechoContentForm :model="form" ref="form" />
    </el-card>
  </LayoutAdmin>
</template>

<script>
import { mapActions, mapGetters, mapState } from "vuex";
import { TypechoContentModel } from '@/store/modules/typecho/content'
import TypechoContentForm from './components/form.vue'
export default {
  components: { TypechoContentForm },
  props: {},
  data() {
    return {
      loading: false,
      form: new TypechoContentModel()
    }
  },
  computed: {
    ...mapState({
      branch: state => state.typecho.branch.info,
    })
  },
  created() {
    if (['/typecho/content/insert'].includes(this.$route.path)) {
      this.form = new TypechoContentModel(this.$route.query);
    } else {
      this.loading = true
      this.$store.dispatch('typecho/content/selectItem', this.$route.params)
        .then(res => {
          this.form = res.row;
          return this.$store.dispatch('typecho/meta/selectList', {
            mids: res.row.mids,
            cids: res.row.cid,
            type: 'tag',
          })
        }).then(res => {
          this.$refs.form.tagList = res.rows;
          this.form.tags = res.rows.map(v => v.mid)
        }).finally(() => this.loading = false)
    }
  },
  methods: {
    handleSubmit() {
      this.$refs.form.$refs.form.validate((valid) => {
        if (valid) {
          this.loading = true
          this.$store.dispatch('typecho/content/submitItem', {
            ...this.form,
            text: `<!--${this.form.text_language || 'markdown'}-->${this.$refs.form.$refs.monaco.editor.getValue()}`,
            mids: [...this.$refs.form.$refs.categories.getCheckedKeys(), ...this.form.tags || []].join()
          }).then(res => {
            this.$router.push({ path: '/typecho/content/list' })
          }).finally(() => this.loading = false)
        } else {
          return false;
        }
      });
    },
    handleMock() {
      this.form = new TypechoContentModel(this.form, true)
    }
  }
}
</script>

<style>
</style>