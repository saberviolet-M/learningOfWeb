import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import http from './utils/http'
import 'amfe-flexible'
import '@/utils/vant-ui.js'
import '@/styles/index.scss'
import { Lazyload } from 'vant'
import { getRelativeTime } from '@/utils/date-time'

Vue.filter('relative', getRelativeTime)
Vue.use(Lazyload)
Vue.config.productionTip = false
Vue.prototype.$http = http

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
