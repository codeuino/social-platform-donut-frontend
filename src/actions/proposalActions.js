import axios from "axios";
import { errorHandler } from "../utils/errorHandler";
import { setRequestStatus } from "../utils/setRequestStatus";
import {
  CREATE_PROPOSAL,
  GET_PROPOSAL,
  GET_USER_PROPOSAL_NOTIFICATIONS,
  GET_ALL_PROPOSALS,
  GET_USER_PROPOSALS,
} from "../actions/types";

// CREATE PROPOSAL
export const createProposal = (proposalInfo) => async (dispatch) => {
  try {
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

// SAVE PROPOSAL DATA
export const saveProposal = (proposalData) => async (dispatch) => {
  try {
    const res = await axios.patch(
      "/proposal/" + proposalData.proposalId,
      proposalData
    );
    dispatch(setRequestStatus(false));
    if (res.status === 200) {
      dispatch(setRequestStatus(true));
    }
  } catch (error) {
    dispatch(errorHandler(error));
  }
};

// SUBMIT PROPOSAL
export const submitProposal = (proposalData) => async (dispatch) => {
  console.log(proposalData);
  try {
    const res = await axios.patch(
      "/proposal/change/" + proposalData.proposalId,
      proposalData
    );
    dispatch(setRequestStatus(false));
    if (res.status === 200) {
      dispatch(setRequestStatus(true));
    }
  } catch (error) {
    dispatch(errorHandler(error));
  }
};

// DELETE PROPOSAL
export const deleteProposal = (proposalId) => async (dispatch) => {
  try {
    const res = await axios.delete("/proposal", {
      headers: {},
      data: { proposalId: proposalId },
    });
    dispatch(setRequestStatus(false));
    if (res.status === 200) {
      dispatch(setRequestStatus(true));
    }
  } catch (error) {
    dispatch(errorHandler(error));
  }
};

// COMMENT ON PROPOSAL
export const commentProposal = (commentData) => async (dispatch) => {
  try {
    const res = await axios.post("/proposal/comment", commentData);
    dispatch(setRequestStatus(false));
    if (res.status === 200) {
      dispatch(setRequestStatus(true));
    }
  } catch (error) {
    dispatch(errorHandler(error));
  }
};

// GET USER RELATED PROPOSAL NOTIFICATIONS
export const getUserProposalNotifications = (data) => async (dispatch) => {
  try {
    const res = await axios.post("/proposal/notifications", data);
    console.log(res);
    if (res.status === 200) {
      dispatch(setRequestStatus(true));
      dispatch({
        type: GET_USER_PROPOSAL_NOTIFICATIONS,
        payload: res.data.proposal || res.data.msg,
      });
    }
  } catch (error) {
    dispatch(errorHandler(error));
  }
};

// GET ALL PROPOSALS
export const getAllProposals = () => async (dispatch) => {
  try {
    const res = await axios.post("/proposal/all");
    dispatch(setRequestStatus(false));
    if (res.status === 200) {
      dispatch(setRequestStatus(true));
      dispatch({
        type: GET_ALL_PROPOSALS,
        payload: res.data.proposals || res.data.msg,
      });
    }
  } catch (error) {
    dispatch(errorHandler(error));
  }
};

// GET PROPOSALS BY USER ID
export const getProposalsByUser = (userId) => async (dispatch) => {
  try {
    const res = await axios.get(`/proposal/user/${userId}`);
    dispatch(setRequestStatus(false));
    if (res.status === 200) {
      dispatch(setRequestStatus(true));
      dispatch({
        type: GET_USER_PROPOSALS,
        payload: res.data.proposal || res.data.msg,
      });
    }
  } catch (error) {
    dispatch(errorHandler(error));
  }
};
