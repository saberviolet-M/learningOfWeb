import axios from 'axios'
const instance = axios.create({
  baseURL: 'http://api-toutiao-web.itheima.net',
  timeout: 3000
})
export default instance
