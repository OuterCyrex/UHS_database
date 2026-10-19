import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: () => import('@/views/index.vue'),
    },
    {
      path: '/search',
      name: 'Search',
      component: () => import('@/views/search.vue'),
    },
  ],
})

export default router
