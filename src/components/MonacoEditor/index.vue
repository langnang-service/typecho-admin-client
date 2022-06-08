<template>
  <div ref="monaco" :style="{width:'100%',height:'360px'}"></div>
</template>
<script>
import * as monaco from 'monaco-editor'

export default {
  name: "MonacoEditor",
  props: {},
  data() {
    return {
      editor: {}
    }
  },
  mounted() {
    this.editor = monaco.editor.create(this.$refs.monaco, {
      value: this.form.text_content,
      readOnly: false,
      language: this.form.text_language || 'markdonw',
      theme: 'vs-dark',
      wordWrap: true,
    })
  },
  methods: {
    setOption() { },
    updateOption() { },
  }
}
</script>
<style scoped>
</style>