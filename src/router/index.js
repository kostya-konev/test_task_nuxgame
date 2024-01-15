import { createRouter, createWebHistory } from 'vue-router';
import { checkAuthorizationToken } from '@/utils/auth';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/HomePage.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/LoginPage.vue')
    },
    {
      path: '/profile',
      name: 'profile',
      component: () => import('@/views/ProfilePage.vue'),
      beforeEnter: (to, from, next) => {
        const hasAuthToken = checkAuthorizationToken();
        if (hasAuthToken) {
          next();
        } else {
          next("/login");
        }
      },
    }
  ]
})

export default router
