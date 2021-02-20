import Vue from 'vue'
import App from './App.vue'
import router from './router'
import '@/style/base.less'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import instance from '@/utils/request'

Vue.use(ElementUI)
Vue.prototype.$axios = instance
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
