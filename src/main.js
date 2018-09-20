import Vue from 'vue'
import App from './App.vue'
import BootstrapVue from 'bootstrap-vue'
import VueResource from 'vue-resource'

Vue.use(VueResource);
Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')
