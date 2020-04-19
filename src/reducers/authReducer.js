import { SET_CURRENT_USER, RESPONSE_MSG } from "../actions/types"

const initialState = {
  // make it false later, default is set to true so that contributors don't need to login for test
  isAuthenticated: true,
  user: {},
  response_msg: ""
}

export default (state = initialState, action) => {
  switch(action.type) {
    case SET_CURRENT_USER: {
      return {
        ...state,
        isAuthenticated: Boolean(typeof action.payload === 'object' && Object.keys(action.payload).length !== 0),
        user: action.payload
      }
    }
    case RESPONSE_MSG: {
      return {
        ...state,
        response_msg: action.payload
      }
    }
    default: {
      return state
    }
  }
}