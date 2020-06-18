import { GET_ALL_MEMBERS, GET_PERSONAL_OVERVIEW, GET_ORG_OVERVIEW, SEARCH_MEMBER } from "../actions/types"

const initialState = {
  allMembers: [],
  personalOverview: {},
  orgOverview: {},
  member: {}
}

export default (state = initialState, action) => {
  switch(action.type) {
    case GET_ALL_MEMBERS: {
      return {
        ...state,
        allMembers: [action.payload, ...state.allMembers][0]
      }
    }
    case GET_ORG_OVERVIEW: {
      return {
        ...state,
        orgOverview: action.payload
      }
    }
    case GET_PERSONAL_OVERVIEW: {
      return {
        ...state,
        personalOverview: action.payload
      }
    }
    case SEARCH_MEMBER: {
      return {
        ...state,
        member: action.payload
      }
    }
    default: {
      return state
    }
  }
}