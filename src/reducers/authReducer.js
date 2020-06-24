import { SET_CURRENT_USER, RESPONSE_MSG, SET_ADMIN, BLOCK_USER, UNBLOCK_USER, REMOVE_USER } from "../actions/types"

const initialState = {
  // make it false later, default is set to true so that contributors don't need to login for test
  isAuthenticated: true,
  isAdmin: false,
  isBlocked: false,
  isRemoved: false,
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
    case BLOCK_USER: {
      return {
        ...state,
        isBlocked: action.payload
      }
    }
    case UNBLOCK_USER: {
      return {
        ...state,
        isBlocked: action.payload
      }
    }
    case REMOVE_USER: {
      return {
        ...state,
        isRemoved: action.payload
      }
    }
    case RESPONSE_MSG: {
      return {
        ...state,
        response_msg: action.payload
      }
    }
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