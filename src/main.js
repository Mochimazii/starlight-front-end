import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from './api/index'
import vuetify from './plugins/vuetify'
import _ from 'lodash'
import qs from 'qs'
import dayjs from "dayjs";
import IsSameOrBefore from "dayjs/plugin/isSameOrBefore"
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

import JwChat from 'jwchat';

Vue.use(JwChat)

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
dayjs.extend(IsSameOrBefore)
Vue.prototype.dayjs = dayjs;
Vue.config.productionTip = false
require('./mock/index')


new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
