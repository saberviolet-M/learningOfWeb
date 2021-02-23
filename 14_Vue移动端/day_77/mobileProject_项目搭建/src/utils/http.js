import axios from 'axios'

const http = axios.create({
  baseURL: 'http://toutiao-app.itheima.net'
})

export default http
