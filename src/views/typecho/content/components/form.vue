<template>
  <el-form ref="form" :model="model" v-bind="$attrs" v-on="$listeners" :rules="rules" size="small" label-width="60px" :show-message="false" status-icon>
    <el-row :gutter="10">
      <el-col :style="{width:'calc(100% - 280px)'}">
        <el-col :span="24">
          <el-form-item prop="title" label="title">
            <el-input v-model="model.title" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="slug" label="slug">
            <el-input v-model="model.slug" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="type" label="type">
            <el-select v-model="model.type" filterable allow-create>
              <el-option v-for="item in typeOptions" :key="item.value" :value="item.value" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="status" label="status">
            <el-select v-model="model.status" filterable allow-create>
              <el-option v-for="item in statusOptions" :key="item.value" :value="item.value" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <VueMonacoEditor ref="monaco" :options="{value:model.text_content}" />
        </el-col>
      </el-col>
      <el-col :style="{width:'280px'}">
        <el-form-item prop="categories" label="Categories" label-width="0">
          <el-scrollbar :style="{height:'400px',marginTop:'32px'}">
            <el-tree ref="categories" show-checkbox :data="categoryTree" node-key="mid" :props="{children: 'children',label: 'name'}" :default-checked-keys="model.mids? model.mids.split(','): []"></el-tree>
          </el-scrollbar>
        </el-form-item>
        <el-form-item prop="tags" label="Tags" label-width="0">
          <el-select v-model="model.tags" multiple filterable allow-create remote :remote-method="handleFormTagRemote" @change="$forceUpdate()">
            <el-option v-for="item in tagList" :key="item.mid" :value="item.mid" :label="item.name" />
          </el-select>
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
</template>
<script>
import { mapActions, mapGetters, mapState } from "vuex";
import { TypechoContentModel } from '@/store/modules/typecho/content'
export default {
  name: "TypechoContentForm",
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
      labels: TypechoContentModel.getLabels(),
      rules: TypechoContentModel.getRules(),
      categoryTree: [],
      tagList: [],
    }
  },
  computed: {
    ...mapState({
      typeOptions: state => state.typecho.content.distinct.type.rows,
      statusOptions: state => state.typecho.content.distinct.status.rows,
    })
  },
  created() {
    this.$store.dispatch('typecho/meta/selectTree', { type: 'category' }).then(res => {
      this.categoryTree = res.tree;
    })
  },
  methods: {
    handleFormTagRemote(val) {
      this.$store.dispatch('typecho/meta/selectList', { name: val, type: 'tag', page: 1, size: 99999 }).then(res => {
        this.tagList = res.rows;
      })
    }
  }
}
</script>
<style scoped>
</style>