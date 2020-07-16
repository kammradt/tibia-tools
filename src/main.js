import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue';
import Clipboard from 'v-clipboard'
import router from './router'

Vue.use(ElementUI);
Vue.use(Clipboard)

new Vue({
  el: '#app',
  router,
  render: h => h(App)
});
