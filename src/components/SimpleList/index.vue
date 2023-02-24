<template>
  <el-row class="simple-list">
    <el-col class="simple-list-item" v-if="!data.some(v=>v[labelProp].indexOf(toolbar.children.pageSearch.model)>-1)">
      <el-empty />
    </el-col>
    <el-col class="simple-list-item" :span="24" v-for="item in data.filter(v=>v[labelProp].indexOf(toolbar.children.pageSearch.model)>-1)" :key="item[keyProp]">
      <el-card shadow="hover" :body-style="{ display: 'none' }">
        <div slot="header" class="clearfix">
          <el-checkbox v-model="selection" :label="item"></el-checkbox>
          <small>{{ item[labelProp] }}</small>
        </div>
      </el-card>
    </el-col>
  </el-row>
</template>

<script>
import { mapState } from 'vuex';
export default {
  // 简单列表
  name: "SimpleList",
  props: {
    data: {
      type: Array,
      default() {
        return [];
      },
    },
    // 循环关键字
    keyProp: {
      type: String,
      default: "id",
    },
    // 显示内容
    labelProp: {
      type: String,
      default: "label",
    },
  },
  data() {
    return {
      // 页面查询输入框内容
      filterInputValue: '',
      // 已选列表
      selection: [],
    };
  },
  computed: {
    ...mapState({
      toolbar: state => state.layout.toolbar
    })
  },
  created() {
  },
  methods: {
    /**
     * 增
     */
    handleInsert() { },
    /**
     * 删
     */
    handleDelete() { },
    /**
     * 改
     */
    handleUpdate() { },
    /**
     * 查
     */
    handleSelect() { },
  }
};
</script>

<style lang="scss" scoped>
::v-deep {
  .el-checkbox {
    .el-checkbox__input {
      padding: 12px;
      border-radius: 50%;
      .el-checkbox__inner {
        height: 18px;
        width: 18px;
        &:hover {
          border-color: transparent;
          // border: 1px solid #dcdfe6;
        }
        &::after {
          height: 10px;
          left: 6px;
        }
      }
    }
    .el-checkbox__label {
      display: none;
    }
    &:hover,
    &:active {
      .el-checkbox__input {
        background-color: darkgray;
      }
    }
  }
  .el-card {
    cursor: pointer;

    .el-card__header {
      padding: 4px 10px;
    }
  }
}
.simple-list-item {
  & + .simple-list-item {
    margin-top: 10px;
  }
}
</style>
