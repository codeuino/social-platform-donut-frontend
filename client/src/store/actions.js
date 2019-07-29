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
  },
  addPostID: ({ commit }, payload) => {
    commit('addPostID', payload)
  },
  toggleDarkMode: ({ commit }, bool) => {
    commit('toggledarkMode', bool)
  },
  addSignupData: ({ commit }, data) => {
    commit('addSignupCredentials', data)
  }
}
