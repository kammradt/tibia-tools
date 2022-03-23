import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../modules/home/views/HomeView'
import CoinsConverterView from "../modules/coins-converter/views/CoinsConverterView";
import SettingsView from "../modules/home/views/SettingsView";
import MiningStatisticsView from "../modules/mining-statistics/views/MiningStatisticsView";
import DamageStatisticsView from "../modules/damage-statistics/views/DamageStatisticsView";
import App from "@/App";

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'App',
        component: App,
        exact: true,
        redirect: '/home',
        children: [
            {
                path: '/home',
                name: 'HomeView',
                component: HomeView,
            },
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
                path: 'damage-statistics',
                name: 'DamageStatisticsView',
                component: DamageStatisticsView
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
