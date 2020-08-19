import Vue from 'vue';
import App from './App.vue';
import Clipboard from 'v-clipboard'
import router from './router'
import vuetify from './plugins/vuetify';
import i18n from './plugins/i18n'

Vue.use(Clipboard)

new Vue({
  el: '#app',
  router,
  vuetify,
  i18n,
  render: h => h(App)
});
