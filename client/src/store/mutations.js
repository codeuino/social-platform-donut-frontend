export default {
  toggleSetting: (state, newSetting) => {
    state.SettingState = newSetting
  },
  toggleNav: (state, bool) => {
    state.isLogged = bool
  },
  addUser: (state, payload) => {
    state.userDetails = payload
  },
  addToken: (state, payload) => {
    state.token = payload
  },
  updateUser: (state, payload) => {
    state.userDetails.name = payload.name
    state.userDetails.dob = payload.dob
    state.userDetails.profilePicture = payload.image
    state.userDetails.location = payload.location
    state.userDetails.bio = payload.bio
  },
  addPostID: (state, payload) => {
    state.IDofShare = payload
  },
  toggledarkMode: (state, bool) => {
    state.darkMode = bool
  },
  addSignupCredentials: (state, data) => {
    state.temp = data
  }
}
