import { RouteItem } from '../types'

const routes: RouteItem[] = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/main/index.vue'),
  },
]

export default routes
