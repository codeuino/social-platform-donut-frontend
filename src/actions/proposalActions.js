import axios from "axios";
import { errorHandler } from "../utils/errorHandler";
import { setRequestStatus } from "../utils/setRequestStatus";
import { CREATE_PROPOSAL, GET_PROPOSAL } from "../actions/types";

// CREATE PROPOSAL
export const createProposal = (proposalInfo) => async (dispatch) => {
  try {
    console.log("proposalInfo", proposalInfo);
    const res = await axios.post("/proposal", proposalInfo);
    dispatch(setRequestStatus(false));
    if (res.status === 201) {
      dispatch(setRequestStatus(true));
      console.log("proposal created in ACTION", res.data);
      dispatch({
        type: CREATE_PROPOSAL,
        payload: res.data.proposal || res.data.msg,
      });
    }
  } catch (error) {
    dispatch(errorHandler(error));
  }
};

// GET PROPOSAL DATA
export const getProposal = (proposalId) => async (dispatch) => {
  try {
    const res = await axios.get("/proposal/" + proposalId);
    dispatch(setRequestStatus(false));
    if (res.status === 200) {
      dispatch(setRequestStatus(true));
      console.log("proposal data fetched in action", res.data);
      dispatch({
        type: GET_PROPOSAL,
        payload: res.data.proposal || res.data.msg,
      });
    }
  } catch (error) {
    dispatch(errorHandler(error));
  }
};
