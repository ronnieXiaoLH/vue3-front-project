import axios from 'axios'
import store from '../store'

const service = axios.create({
  baseURL: import.meta.env.VITE_BASE_API,
  timeout: 5000,
})

service.interceptors.request.use(
  (config: any) => {
    if (store.state.user.token) {
      config.headers.Authorization = `Bearer ${store.state.user.token}`
    }
    return config
  },
  (err) => {
    Promise.reject(err)
  }
)

service.interceptors.response.use(
  (response) => {
    const { success, message, data } = response.data
    if (success) return data
    return Promise.reject(new Error(message))
  },
  (err) => {
    if (err.response?.data?.code === 401) {
      // 退出登录
      store.dispatch('user/logout')
    }
    Promise.reject(err)
  }
)

export default service
