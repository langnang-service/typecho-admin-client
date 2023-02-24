/**
 * 第三方公共接口
 * 目录多选框：第三方品牌
 * 标签多选框：子标签
 * 分组多选框：标签分组
 */
<template>
  <div class="public_api">
    <Jumbotron route="/public-api/content/list" :title="$store.state.typecho.meta.info.name" />
    <el-card>
      <el-form>
        <el-form-item label="Category">
          <el-checkbox-group size="small" v-model="checkedCategories">
            <el-checkbox-button v-for="category in categories" :label="category.mid" :key="category.mid">{{category.name}}</el-checkbox-button>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="Tag">
          <el-checkbox-group size="small" v-model="checkedTags">
            <el-checkbox-button v-for="tag in tags" :label="tag.mid" :key="tag.mid">{{tag.name}}</el-checkbox-button>
          </el-checkbox-group>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      categories: [],
      checkedCategories: [],
      tags: [],
      checkedTags: [],
    };
  },
  created() {
    this.$store.dispatch('typecho/meta/selectItem', {
      type: "prefix",
      slug: "public_api"
    }).then(res => {
      this.$store.dispatch('typecho/meta/selectList', {
        parent: res.mid,
        type: "category",
        size: 99999
      }).then(res => {
        this.categories = res.rows;
      })
      this.$store.dispatch('typecho/meta/selectList', {
        parent: res.mid,
        type: "tag",
        size: 99999
      }).then(res => {
        this.tags = res.rows;
      })
    })
  },
};
</script>
