import { createRouter, createWebHistory } from 'vue-router'
import Cart from '@/pages/Cart.vue'

const routes = [
  { path: '/', component: () => import('@/pages/Home.vue') },
  { path: '/cart', component: Cart },
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})
