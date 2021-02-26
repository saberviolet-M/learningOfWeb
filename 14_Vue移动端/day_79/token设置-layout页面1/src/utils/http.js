import axios from 'axios'
import store from '@/store/index'

const http = axios.create({
  baseURL: 'http://toutiao-app.itheima.net'
})

http.interceptors.request.use(
  config => {
    const token = store.state.user.tokenInfo.token
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)
export default http
