// plugins/vue-gtag.js
import Vue from 'vue';
import VueGtag from 'vue-gtag';

export default ({ app }) => {
  Vue.use(VueGtag, {
    config: { id: 'G-KF52CV9V7F' } // 替换为您的 Google Analytics ID
  }, app.router);
};