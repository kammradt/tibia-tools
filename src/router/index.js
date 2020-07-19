import Vue from 'vue'
import VueRouter from 'vue-router'
import CoinsConverterVuetify from "../views/CoinsConverter";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'CoinsConverter',
    component: CoinsConverterVuetify
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
