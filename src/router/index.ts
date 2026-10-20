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
    {
      path: '/search/conditions',
      name: 'SearchConditions',
      component: () => import('@/views/search-conditions.vue'),
    },
  ],
})

export default router
