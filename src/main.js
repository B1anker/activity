// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import App from './App'
import router from './router'
import store from './store/store'
import { httpSetting, httpPlugin } from '@/api/http'
import installAllPlugins from '@/plugins'

Vue.use(httpPlugin, httpSetting(router))
Vue.use(Vuex)

installAllPlugins()

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
