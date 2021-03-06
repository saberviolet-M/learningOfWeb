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
import ArticleIndex from '@/views/Search/components/Article'

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

export default router
