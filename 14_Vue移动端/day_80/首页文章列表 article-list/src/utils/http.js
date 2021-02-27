import axios from 'axios'
import store from '@/store/index'
import JSONbig from 'json-bigint'

const http = axios.create({
  baseURL: 'http://toutiao-app.itheima.net',
  transformResponse: [
    data => {
      try {
        return JSONbig.parse(data)
      } catch (error) {
        return data
      }
    }
  ]
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
