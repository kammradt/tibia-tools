import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../modules/home/HomeView'
import CoinsConverterView from "../modules/coins-converter/CoinsConverterView";
import SettingsView from "../modules/home/SettingsView";
import MiningStatisticsView from "../modules/mining-statistics/MiningStatisticsView";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'HomeView',
    component: HomeView,
    children: [
      {
        path: 'coins-converter',
        name: 'CoinsConverterView',
        component: CoinsConverterView
      },
      {
        path: 'mining-statistics',
        name: 'MiningStatisticsView',
        component: MiningStatisticsView
      },
      {
        path: 'settings',
        name: 'SettingsView',
        component: SettingsView
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
