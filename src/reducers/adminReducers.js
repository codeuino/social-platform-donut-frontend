import { SET_ADMIN } from '../actions/types'
const initialState = {
  isAdmin: false,
  admin: {}
}

export default (state = initialState, action) => {
  switch(action.type) {
    case SET_ADMIN: {
      return {
        ...state,
        isAdmin: action.payload
      }
    }
    default: {
      return state
    }
  }
}