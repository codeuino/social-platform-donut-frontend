import { GET_COMMENTS_OF_A_POST } from '../actions/types'

const initialState = {
  allComments: []
}

export default (state = initialState, action) => {
  switch(action.type) {
    case GET_COMMENTS_OF_A_POST: {
      return {
        ...state,
        allComments: action.payload
      }
    }
    default: {
      return state
    }
  }
}