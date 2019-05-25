import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions'
import mutation from './mutation'
import state from './state'
import getters from './getters'
Vue.use(Vuex)

export default new Vuex.Store({
  state,
  mutation,
  actions,
  getters
})
