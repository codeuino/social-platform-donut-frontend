import { CREATE_PROPOSAL, GET_PROPOSAL } from "../actions/types";

const initialState = {
  createdProposal: {},
  fetchedProposal: {},
  proposalIsFetched: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case CREATE_PROPOSAL: {
      console.log("in reducer CREATE_PROPOSAL switch case");
      return {
        ...state,
        createdProposal: action.payload,
      };
    }
    case GET_PROPOSAL: {
      console.log("in reducer");
      return {
        ...state,
        fetchedProposal: action.payload,
      };
    }
    default: {
      return state;
    }
  }
};
