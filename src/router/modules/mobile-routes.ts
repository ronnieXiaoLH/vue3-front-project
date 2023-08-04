import { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/main/index.vue'),
  },
  {
    path: '/pins/:id',
    name: 'pins',
    component: () => import('@/views/pins/index.vue'),
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login-register/login/index.vue'),
  },
  {
    path: '/profile',
    name: 'profile',
    component: () => import('@/views/profile/index.vue'),
    // 标记当前页面只有当用户登录后才可见
    meta: {
      user: true,
    },
  },
]

export default routes
