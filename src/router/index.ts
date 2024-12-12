import { createRouter, createWebHistory } from 'vue-router'
import CityWeatherView from '../views/CityWeatherView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: CityWeatherView,
    },
  ],
})

export default router
