import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from './api/index'
import vuetify from './plugins/vuetify'
import _ from 'lodash'
import qs from 'qs'

axios.defaults.baseURL = process.env.VUE_APP_BASE_URL
axios.interceptors.request.use(config => {
  let token = sessionStorage.getItem("token")
  if(token) {
    config.headers.token = `${token}`
  }
  return config
})
Vue.prototype.$_ = _;
Vue.prototype.$axios = axios;
Vue.prototype.$qs = qs;
Vue.config.productionTip = false
require('./mock/index')


new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
