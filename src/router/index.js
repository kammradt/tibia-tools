import Vue from 'vue'
import VueRouter from 'vue-router'
import CoinsConverterView from "../modules/coins-converter/CoinsConverterView";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'CoinsConverterView',
    component: CoinsConverterView
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
