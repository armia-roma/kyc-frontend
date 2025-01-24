import apiClient from './api-client'

export const login = async (data: { email: string; password: string }) => {
  try {
    const response = await apiClient.post('/user/login', data)
    const token = response.data.data.token
    localStorage.setItem('token', token)

    return response.data.data
  } catch (error) {
    console.error('Login failed:', error)
    return error
  }
}
export const register = async (data: {
  userName: string
  email: string
  password: string
  role: string
}) => {
  try {
    const response = await apiClient.post('/user/register', data)
    return response.data.data
  } catch (error) {
    return error
  }
}
