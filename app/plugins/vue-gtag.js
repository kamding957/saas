import { defineNuxtPlugin } from '#app';
import VueGtag from 'vue-gtag';

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(VueGtag, {
    config: { id: 'G-KF52CV9V7F' } // 替换为您的 Google Analytics ID
  });
});