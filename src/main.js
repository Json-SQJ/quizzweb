// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import Axios from 'axios'
import global_ from './components/global.vue'
import md5 from 'js-md5'


Vue.config.productionTip = false

Vue.prototype.$axios = Axios
Vue.prototype.GLOBAL = global_
Vue.prototype.$md5 = md5

Vue.use(ElementUI, { size: 'small', zIndex: 3000 });

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

