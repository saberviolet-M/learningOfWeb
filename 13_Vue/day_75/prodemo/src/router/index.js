import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/Login/index.vue'
import Layout from '@/views/Layout/index.vue'
import NotFound from '@/views/NotFound/index.vue'
import Home from '@/views/Layout/Home/index.vue'
import Articles from '@/views/Layout/Articles/index.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    component: Login
  },
  {
    path: '/',
    component: Layout,
    children: [
      {
        path: '/',
        component: Home
      },
      {
        path: '/articles',
        component: Articles
      }
    ]
  },
  {
    path: '*',
    component: NotFound
  }
]

const router = new VueRouter({
  routes
})

export default router
