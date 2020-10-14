import { GET_WIKIS } from "../actions/types";
const initialState = {
  wikis: "",
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_WIKIS: {
      console.log(`Action Recieved in reducer! ${action.type}`);
      console.log(action.payload);
      return {
        ...state,
        wikis: action.payload,
      };
    }
    default: {
      return state;
    }
  }
};
