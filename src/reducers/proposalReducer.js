import {
  CREATE_PROPOSAL,
  GET_PROPOSAL,
  EXIT,
  GET_USER_PROPOSAL_NOTIFICATIONS,
  GET_ALL_PROPOSALS,
  GET_USER_PROPOSALS,
} from "../actions/types";

const initialState = {
  createdProposal: {},
  fetchedProposal: {},
  proposalIsFetched: false,
  userNotifications: [],
  allProposals: [],
  userProposals: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case CREATE_PROPOSAL: {
      return {
        ...state,
        createdProposal: action.payload,
      };
    }
    case GET_PROPOSAL: {
      return {
        ...state,
        fetchedProposal: action.payload,
      };
    }
    case GET_USER_PROPOSAL_NOTIFICATIONS: {
      return {
        ...state,
        userNotification: action.payload,
      };
    }
    case GET_ALL_PROPOSALS: {
      return {
        ...state,
        allProposals: action.payload,
      };
    }
    case GET_USER_PROPOSALS: {
      return {
        ...state,
        userProposals: action.payload,
      };
    }
    case EXIT: {
      return {
        ...state,
        createdProposal: {},
        fetchedProposal: {},
      };
    }
    default: {
      return state;
    }
  }
};
