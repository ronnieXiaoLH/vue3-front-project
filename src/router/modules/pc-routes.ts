import { RouteItem } from '../types'

const routes: RouteItem[] = [
  {
    path: '/',
    name: 'main',
    component: () => import('@/views/layout/index.vue'),
    children: [],
  },
]

export default routes
