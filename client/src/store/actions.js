export default {
  changeSettingView: ({ commit }, payload) => {
    commit('toggleSetting', payload)
  },
  LoginOrout: ({ commit }, bool) => {
    commit('toggleNav', bool)
  },
  addUser: ({ commit }, payload) => {
    commit('addUser', payload)
  },
  addToken: ({ commit }, payload) => {
    commit('addToken', payload)
  },
  updateUser: ({ commit }, payload) => {
    commit('updateUser', payload)
  }
}
