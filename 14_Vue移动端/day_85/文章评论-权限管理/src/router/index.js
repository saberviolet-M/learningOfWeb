import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/Login'
import Layout from '@/views/Layout'
import Search from '@/views/Search'

import HomeIndex from '@/views/Layout/Home'
import QuestionIndex from '@/views/Layout/Question'
import VideoIndex from '@/views/Layout/Video'
import UserIndex from '@/views/Layout/User'

import SearchResult from '@/views/Search/components/SearchResult'
import ArticleIndex from '@/views/Article'

import store from '@/store'

Vue.use(VueRouter)

const routes = [
  { path: '/login', component: Login },
  {
    path: '/',
    component: Layout,
    children: [
      { path: '/', component: HomeIndex },
      { path: '/question', component: QuestionIndex },
      { path: '/video', component: VideoIndex },
      { path: '/user', component: UserIndex }
    ]
  },
  { path: '/search', component: Search },
  { path: '/result', component: SearchResult },
  { path: '/article/:id', component: ArticleIndex, props: true },
  { path: '/*', component: Login }
]

const router = new VueRouter({
  routes
})

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

// 需要认证的页面
const AuthLinks = ['/user']
router.beforeEach((to, from, next) => {
  console.log('to==>', to)
  // 如果是需要授权的页面
  if (AuthLinks.includes(to.path)) {
    // 进行验证身份
    if (store.state.user.tokenInfo.token) {
      next()
    } else {
      // 拦截到登录
      next({
        path: '/login',
        query: {
          backTo: to.fullPath
        }
      })
    }
  } else {
    next()
  }
})
export default router
