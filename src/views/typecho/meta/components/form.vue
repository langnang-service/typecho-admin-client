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
        <el-form-item prop="type" :label="labels.type">
          <el-select v-model="model.type" filterable allow-create>
            <el-option v-for="item in typeOptions" :key="item.value" :value="item.value" />
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="24">
        <el-form-item prop="order" :label="labels.order">
          <el-input-number v-model="model.order" />
        </el-form-item>
      </el-col>
      <el-col :span="24">
        <el-form-item prop="description" :label="labels.description">
          <el-input v-model="model.description" type="textarea" rows="6" />
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
</template>
<script>
import { mapActions, mapGetters, mapState } from "vuex";
import { TypechoMetaModel } from '@/store/modules/typecho/meta'
export default {
  name: "TypechoMetaForm",
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
      labels: TypechoMetaModel.getLabels(),
      rules: TypechoMetaModel.getRules(),
    }
  },
  computed: {
    ...mapState({
      typeOptions: state => state.typecho.meta.distinct.type.rows
    })
  },
  created() {
  },
  methods: {
  }
}
</script>
<style scoped>
</style>