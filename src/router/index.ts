import { createRouter, createWebHistory } from 'vue-router'
import LandingPageView from '../views/lp/LandingPage.vue'
import authRoutes from './auth'
import productRoutes from './product'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'lp',
      component: LandingPageView,
    },
    ...authRoutes,
    ...productRoutes,
  ],
})

export default router
