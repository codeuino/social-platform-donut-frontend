import { GET_ALL_EVENTS, GET_EVENT_BY_ID } from '../actions/types'
const initialState = {
  allEvents: [],
  event: {}
}

export default (state = initialState, action) => {
  switch(action.type) {
    case GET_ALL_EVENTS: {
      return {
        ...state,
        allEvents: action.payload
      }
    }
    case GET_EVENT_BY_ID: {
      return {
        ...state,
        event: action.payload
      }
    }
    default:{
      return state
    }
  }
}