import {
  GET_PLATFORM_NOTIFICATIONS,
  GET_USER_NOTIFICATIONS,
  GET_PROPOSAL_NOTIFICATIONS,
} from "../actions/types";

const initialState = {
  platformNotifications: [],
  userNotifications: [],
  proposalNotifications: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_PLATFORM_NOTIFICATIONS: {
      return {
        ...state,
        platformNotifications: [
          action.payload,
          ...state.platformNotifications,
        ][0],
      };
    }
    case GET_USER_NOTIFICATIONS: {
      return {
        ...state,
        userNotifications: [action.payload, ...state.userNotifications][0],
      };
    }
    case GET_PROPOSAL_NOTIFICATIONS: {
      return {
        ...state,
        proposalNotifications: [action.payload, ...state.userNotifications][0],
      };
    }
    default: {
      return state;
    }
  }
};
