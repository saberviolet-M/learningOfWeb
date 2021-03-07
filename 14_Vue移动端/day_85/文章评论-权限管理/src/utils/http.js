import axios from 'axios'
import store from '@/store/index'
import JSONbig from 'json-bigint'
import router from '@/router'

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
http.interceptors.response.use(
  response => {
    return response
  },
  error => {
    console.dir(error)
    if (error.response.status === 401) {
      const refreshToken = store.state.user.tokenInfo.refresh_token
      if (refreshToken) {
        console.log('刷新')
      } else {
        store.commit('user/removeTokenInfo')
        router.push({
          path: '/login',
          query: {
            backTo: router.currentRoute.fullPath
          }
        })
      }
    }
    return Promise.reject(error)
  }
)
export default http
