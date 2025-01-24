import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '@/views/LoginView.vue'
import KycCreateView from '@/views/KycCreateView.vue'
import apiClient from '../../service/api-client'
import AdminLayoutView from '@/views/AdminLayoutView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/login', name: 'login', component: LoginView },
    { path: '/kyc-create', name: 'kycCreate', component: KycCreateView },
    { path: '/register', name: 'register', component: () => import('@/views/RegisterView.vue') },
    {
      path: '/admin',
      component: AdminLayoutView,
      meta: { requiresAuth: true, role: 'admin' },
      children: [
        {
          path: '/kyc-create',
          name: 'kycCreate',
          component: KycCreateView,
        },
      ],
    },
  ],
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
  // s
})

export default router
