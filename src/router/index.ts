import { createRouter, createWebHistory } from 'vue-router'
// import { beforeGuard } from './helper/guardHelper'

/**
 * @desc 命名规范
 * path: '/personal-center',
 * name: PersonalCenter,
 * component: PersonalCenter
 */
const routes: any = [
  {
    path: '/',
    redirect: '/chat',
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login/index.vue'),
  },
  {
    path: '/chat',
    name: 'Chat',
    component: () => import('@/views/chat/index.vue'),
  },
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})

// beforeGuard()
