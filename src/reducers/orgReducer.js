import { GET_ORG_PROFILE, UPDATE_ORG_PROFILE, DEACTIVATE_ORG, TRIGGER_MAINTENANCE } from '../actions/types'
const initialState = {
  isDeactivated: false,
  isMaintenance: false,
  org: {}
}

export default (state = initialState, action) => {
  switch(action.type) {
    case GET_ORG_PROFILE: {
      return {
        ...state,
        org: action.payload
      }
    }
    case UPDATE_ORG_PROFILE: {
      return {
        ...state,
        org: action.payload
      }
    }
    case TRIGGER_MAINTENANCE: {
      return {
        ...state,
        isMaintenance: action.payload
      }
    }
    case DEACTIVATE_ORG : {
      return {
        ...state,
        isDeactivated: action.payload
      }
    }
    default: {
      return state
    }
  }
}