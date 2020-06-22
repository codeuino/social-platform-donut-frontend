import { GET_ALL_EVENTS } from '../actions/types'
const initialState = {
  allEvents: []
}

export default (state = initialState, action) => {
  switch(action.type) {
    case GET_ALL_EVENTS: {
      return {
        ...state,
        allEvents: action.payload
      }
    }
    default:{
      return state
    }
  }
}