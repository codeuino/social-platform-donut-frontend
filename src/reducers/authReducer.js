import { SET_CURRENT_USER, RESPONSE_MSG, SET_ADMIN, BLOCK_USER, UNBLOCK_USER, REMOVE_USER, PASSWORD_CHANGE_REQUEST_SUCCESS, PASSWORD_SUCCESSFULLY_CHANGED } from "../actions/types"

const initialState = {
  // make it false later, default is set to true so that contributors don't need to login for test
  isAuthenticated: false, // localStorage.getItem("jwtToken").length > 1
  isAdmin: false,
  isBlocked: false,
  isRemoved: false,
  resetPassReq: null,
  passUpdated: false,
  user: {},
  response_msg: "",
};

export default (state = initialState, action) => {
  switch(action.type) {
    case SET_CURRENT_USER: {
      return {
        ...state,
        isAuthenticated: action.payload.length !== 0,
        user: action.payload
      }
    }
    case PASSWORD_CHANGE_REQUEST_SUCCESS: {
      return {
        ...state,
        resetPassReq: action.payload
      }
    }
    case PASSWORD_SUCCESSFULLY_CHANGED: {
      return {
        ...state,
        passUpdated: action.payload
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
