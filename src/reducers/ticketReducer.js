import { GET_TICKETs } from "../actions/types";
const initialState = {
  tickets: "",
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_TICKETs: {
      console.log(`Action Recieved in reducer! ${action.type}`);
      console.log(action.payload);
      return {
        ...state,
        tickets: action.payload,
      };
    }
    default: {
      return state;
    }
  }
};
