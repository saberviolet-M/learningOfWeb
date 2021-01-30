import Vue from 'vue'
import App from './App.vue'
import './assets/css/bootstrap.css'

Vue.config.productionTip = false

Vue.filter("keepTwoDecimals", val => '¥' + val.toFixed(2))
new Vue({
  render: h => h(App),
}).$mount('#app')
