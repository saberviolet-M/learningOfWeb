import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/Login'
import Layout from '@/views/Layout'
import Search from '@/views/Search'
import HomeIndex from '@/views/Layout/HomeIndex'
import QuestionIndex from '@/views/Layout/QuestionIndex'
import VideoIndex from '@/views/Layout/VideoIndex'
import UserIndex from '@/views/Layout/UserIndex'

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
  { path: '/search', component: Search }
]

const router = new VueRouter({
  routes
})

export default router
