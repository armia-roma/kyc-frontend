import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '@/views/LoginView.vue'
import apiClient from '../../service/api-client'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [{ path: '/login', name: 'login', component: LoginView }],
})
router.beforeEach(async (to, from) => {
  const token = localStorage.getItem('token')
  let isAuthenticated = false
  let userRole = null

  if (token) {
    try {
      const userData = await apiClient.post('/user/verify-token', { token })
      isAuthenticated = true
      userRole = userData.data.data.role
    } catch (error) {
      localStorage.removeItem('token')
    }
  }

  if (!isAuthenticated && to.name !== 'login') {
    return { name: 'login' }
  }
  if (isAuthenticated && userRole === 'user' && to.name !== 'kycCreate') {
    return { name: 'kycCreate' }
  }
})

export default router
