import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import store from './store'
require('./plugins/axios')
require('./plugins/googleOauth2')
require('./plugins/cookie')

Vue.config.productionTip = false

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
