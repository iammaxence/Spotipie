import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '@/views/LoginView.vue'
import { useUserStore } from '@/stores/userAuth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/',
      name: 'home',
      component: HomeView
    }
  ]
})

router.beforeEach(async (to, _) => {
  const userAuth = useUserStore()
  if (!userAuth.getUser() && to.name !== 'login') {
    return { name: 'login' }
  }
})

export default router
