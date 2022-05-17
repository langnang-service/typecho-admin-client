<template>
  <LayoutAdmin class="entry-info" v-loading="$store.state.entry.loading">
    <template #toolbar>
      <el-tooltip class="item" effect="dark" content="返回" placement="bottom">
        <el-button size="mini" circle type="info" @click="$router.push({path:'/entry/list'})">
          <font-awesome-icon icon="fa-solid fa-delete-left" />
        </el-button>
      </el-tooltip>
      <el-tooltip class="item" effect="dark" content="保存" placement="bottom">
        <el-button size="mini" circle type="primary" @click="handleSubmit">
          <font-awesome-icon icon="fa-solid fa-floppy-disk" />
        </el-button>
      </el-tooltip>
    </template>
    <el-form :model="entry" label-width="80px">
      <el-form-item label="title">
        <el-input v-model="entry.title"></el-input>
      </el-form-item>
      <el-form-item label="description">
        <el-input type="textarea" :rows="5" v-model="entry.description"></el-input>
      </el-form-item>
      <el-form-item label="keywords">
        <el-select v-model="entry.keywords" multiple filterable allow-create></el-select>
      </el-form-item>
    </el-form>
  </LayoutAdmin>
</template>

<script>
import { mapActions, mapGetters, mapState } from "vuex";
export default {
  props: {
  },
  data() {
    return {}
  },
  computed: {
    ...mapGetters(['entry'])
  },
  created() {
    console.log(this.$route)
  },
  methods: {
    async handleSubmit() {
      const id = this.entry.id
      await this.$store.dispatch('entry/submitItem')
      if (!id) {
        this.$router.push('/entry/list')
      }
    },
  }

}
</script>

<style>
</style>