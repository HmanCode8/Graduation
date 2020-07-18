import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '../plugins/vant'
import '../plugins/element'
import '../plugins/axios'
import '../css/base.css'
import './directive/focus'
import Base64 from '../plugins/base64'
Vue.config.productionTip = false;
Vue.prototype.$Base64 = Base64;//在vue实例的原型链上增加$Base64
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');

