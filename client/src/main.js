import Vue from 'vue'
import VuePlaceAutocomplete from 'vue-place-autocomplete'
import BootstrapVue from 'bootstrap-vue'
import Vuetify from 'vuetify'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from './store/index'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import '@mdi/font/css/materialdesignicons.css'
import './registerServiceWorker'
import '@fortawesome/fontawesome-free/css/all.css'
Vue.use(VuePlaceAutocomplete)
Vue.use(Vuetify, {
  iconfront: 'mdi' || 'fa' || 'fa4'
})
Vue.use(BootstrapVue)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
