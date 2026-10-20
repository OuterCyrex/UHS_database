import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      meta: { title: 'Underground Hydrogen Storage Database' },
      component: () => import('@/views/index.vue'),
    },
    {
      path: '/search',
      name: 'Search',
      meta: { title: 'Search UHS Data | UHS Database' },
      component: () => import('@/views/search.vue'),
    },
    {
      path: '/search/conditions',
      name: 'SearchConditions',
      meta: { title: 'Search Conditions | UHS Database' },
      component: () => import('@/views/search-conditions.vue'),
    },
  ],
})

router.afterEach((to) => {
  document.title = typeof to.meta.title === 'string' ? to.meta.title : 'UHS Database'
})

export default router
