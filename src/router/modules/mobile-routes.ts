import { RouteItem } from '../types'

const routes: RouteItem[] = [
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
]

export default routes
