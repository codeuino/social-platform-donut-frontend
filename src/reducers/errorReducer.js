import { GET_ERRORS, SET_ERROR } from "../actions/types";

const initialState = {
  msg: "",
};

export default (state = initialState, action) => {
  switch(action.type) {
    case GET_ERRORS: {
      return action.payload
    }
    case SET_ERROR: {
      return {
        ...state,
        msg: action.payload
      }
    }
    default: {
      return state
    }
  }
}