import { GET_ALL_UPCOMING_EVENTS } from '../actions/types'

const initialState = {
  isLoading: true,
  upcomingEvents: []
}

export default (state = initialState, action) => {
  switch(action.type) {
    case GET_ALL_UPCOMING_EVENTS: {
      return {
        ...state,
        upcomingEvents: [action.payload, ...state.upcomingEvents][0],
        isLoading: false 
      }
    }
    default: {
      return state
    }
  }
}