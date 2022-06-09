import Vue from "vue";
import App from "./layout";
import router from "./router";
import store from "./store";
import "./style/index.scss"
import './components'
import './plugins'
import './directives'
import './filters'

Vue.config.productionTip = false;


// 设定body文字尺寸
// const setHtmlFontSize = () => {
//   // 640 默认设计稿大小; 640px = 6.4rem ;每个元素px基础上/100
//   const htmlWidth = document.documentElement.clientWidth || document.body.clientWidth;
//   // 得到html的Dom元素
//   const htmlDom = document.getElementsByTagName('html')[0];
//   // 设置根元素字体大小
//   htmlDom.style.fontSize = htmlWidth / 6.4 + 'px';
// };
// window.onresize = setHtmlFontSize;
// setHtmlFontSize();

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
