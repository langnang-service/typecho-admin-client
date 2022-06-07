<template>
  <LayoutAdmin class="typecho-meta-info" v-loading="$store.state.typecho.branch.loading" v-bind="$route.meta">
    <template #toolbar>
      <el-tooltip class="item" effect="dark" content="返回" placement="bottom">
        <el-button size="mini" circle type="info" @click="$router.push({path:'/typecho/branch/list'})">
          <font-awesome-icon icon="fa-solid fa-delete-left" />
        </el-button>
      </el-tooltip>
      <el-tooltip class="item" effect="dark" content="模拟" placement="bottom">
        <el-button size="mini" circle type="warning" @click="handleMock">
          <img src="@/assets/mockjs.svg" alt style="height:10.5px;" />
        </el-button>
      </el-tooltip>
      <el-tooltip class="item" effect="dark" content="保存" placement="bottom">
        <el-button size="mini" circle type="primary" @click="handleSubmit">
          <font-awesome-icon icon="fa-solid fa-floppy-disk" />
        </el-button>
      </el-tooltip>
    </template>
    <Item type="form" ref="form" :form="$store.state.typecho.branch.info" />
  </LayoutAdmin>
</template>

<script>
import { mapActions, mapGetters, mapState } from "vuex";
import { TypechoBranch, MOCK_KEY } from '@/store/modules/typecho/branch'
import Item from './item.vue';
export default {
  components: { Item },
  props: {
  },
  data() {
    return {}
  },
  computed: {
  },
  created() {
    console.log(this.$route)
  },
  methods: {
    handleSubmit() {
      this.$refs.form.$refs.form.validate((valid) => {
        if (valid) {
          this.$store.dispatch('typecho/branch/submitItem', {
            ...this.$refs.form.form,
          })
            .then(res => {
              this.$router.push({ path: '/typecho/branch/list' })
            })

        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    handleMock() {
      this.$store.commit('typecho/branch/SET_INFO', { ...this.$store.state.typecho.branch.info, ...new TypechoBranch(MOCK_KEY) })
    }
  }
}
</script>

<style>
</style>