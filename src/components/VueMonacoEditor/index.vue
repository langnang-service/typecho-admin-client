<template>
  <div class="monaco-editor_wrapper" :style="{height:'480px'}">
    <header>
      <span>default template</span>&nbsp;
      <select v-model="form.language" :style="{width:'140px',height:'30px'}" @change="setLanguage(null)">
        <option v-for="item in monaco.languages.getLanguages()" :key="item.id" :style="{height:'30px'}" :value="item.id">{{item.id}}</option>
      </select>
      <select v-model="form.theme" :style="{width:'140px',height:'30px'}" @change="setTheme(null)">
        <option v-for="(item, key) in editorOptions.themes" :key="key" :style="{height:'30px'}" :value="key">{{key}}</option>
      </select>
    </header>
    <main ref="monaco" :style="{width:'100%',height:'100%'}"></main>
  </div>
</template>
<script>
import * as monaco from 'monaco-editor'
import * as editorOptions from './options';

export default {
  name: "VueMonacoEditor",
  props: {
    options: {
      type: Object,
      default() {
        return {}
      }
    },
  },
  data() {
    return {
      form: {
        language: 'markdown',
        theme: 'vs-dark'
      },
      monaco,
      editor: null,
      model: null,
      editorOptions,
      languages: monaco.languages.getLanguages(),
    }
  },
  watch: {
    'options.value': {
      handler(val) {
        if (!this.editor) return
        this.editor.setValue(val);
      }
    }
  },
  computed: {
    _editor: () => this.editor,
    _model: () => this.editor.getModel(),
    // _language() { },
    // _theme() { },
    _options: () => ({
      ...Object.values(monaco.editor.EditorOptions).reduce((total, item) => {
        total[item.name] = item.defaultValue
        return total
      }, {}),
      // ...this.options,
    })
  },
  created() {
  },
  mounted() {
    this.editor = monaco.editor.create(this.$refs.monaco, {
      readOnly: false,
      language: 'markdown',
      theme: 'vs-dark',
      wordWrap: true,
      ...this.options,
    })
    // console.log(monaco);
    // console.log(this)
    // console.log(this._options);
  },
  methods: {


    updateOptions(options = {}) {
      this.editor.updateOptions(options);
    },

    setLanguage(language = null) {
      language = language || this.form.language
      monaco.editor.setModelLanguage(this._model, language);
      this.form.language = language;
      // this.$forceUpdate()
    },
    getLanguage() {
      return this.form.language;
    },

    setTheme(theme = null) {
      theme = theme || this.form.theme
      monaco.editor.setTheme(theme);
      this.form.theme = theme;
    },
    getTheme() {
      return this.form.theme;
    },
  }
}
</script>
<style scoped>
</style>