import { RouteItem } from '../types'

const routes: RouteItem[] = [
  {
    path: '/',
    name: 'main',
    component: () => import('@/views/layout/index.vue'),
    children: [
      {
        path: '',
        name: 'home',
        component: () => import('@/views/main/index.vue'),
      },
    ],
  },
]

export default routes
