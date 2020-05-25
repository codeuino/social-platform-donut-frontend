import { SET_STATUS } from '../actions/types';

const initialState = {
  isLoading: false,
  success: false
}

export default function (state = initialState, action) {
  switch(action.type) {
    case SET_STATUS : {
      return {
        ...state,
        success: action.payload
      }
    }
    default: {
      return state
    }
  }
}