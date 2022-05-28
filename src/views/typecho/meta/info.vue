<template>
  <LayoutAdmin class="typecho-meta-info" v-loading="$store.state.typecho.meta.loading" v-bind="$route.meta">
    <template #toolbar>
      <el-tooltip class="item" effect="dark" content="返回" placement="bottom">
        <el-button size="mini" circle type="info" @click="$router.push({name:'List - Typecho Meta'})">
          <font-awesome-icon icon="fa-solid fa-delete-left" />
        </el-button>
      </el-tooltip>
      <el-tooltip class="item" effect="dark" content="保存" placement="bottom">
        <el-button size="mini" circle type="primary" @click="handleSubmit">
          <font-awesome-icon icon="fa-solid fa-floppy-disk" />
        </el-button>
      </el-tooltip>
    </template>
    <Item type="form" ref="form" :form="$store.state.typecho.info" />
  </LayoutAdmin>
</template>

<script>
import { mapActions, mapGetters, mapState } from "vuex";
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
          this.$store.dispatch('typecho/meta/submitItem', this.$refs.form.form).then(res => {
            console.log(res);
            this.$router.push({ path: '/typecho/meta/list' })
          })

        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
  }
}
</script>

<style>
</style>