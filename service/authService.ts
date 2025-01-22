import apiClient from './api-client'

export const login = async (data: { email: string; password: string }) => {
  try {
    const response = await apiClient.post('/user/login', data)
    const token = response.data.data.token
    localStorage.setItem('token', token)

    return true
  } catch (error) {
    console.error('Login failed:', error)
    return false
  }
}
