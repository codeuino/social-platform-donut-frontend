import {
  GET_PLATFORM_NOTIFICATIONS,
  GET_USER_NOTIFICATIONS,
  GET_PROPOSAL_NOTIFICATIONS,
} from "./types";
import axios from "axios";
import { errorHandler } from "../utils/errorHandler";
import { setRequestStatus } from "../utils/setRequestStatus";

// GET NOTIFICATIONS FOR WHOLE PLATFORM AS WELL AS FOR A USER
export const getAllNotifications = () => async (dispatch) => {
  try {
    const res = await axios.get("/notification/org/all");
    dispatch(setRequestStatus(false));
    if (res.status === 200) {
      dispatch(setRequestStatus(true));
      console.log("Whole platform notification ", res.data.notifications);

      dispatch({
        type: GET_PLATFORM_NOTIFICATIONS,
        payload: res.data.notifications,
      });
    }
  } catch (error) {
    dispatch(errorHandler(error));
  }
};

// GET NOTIFICATIONS FOR A USER
export const getUserNotification = () => async (dispatch) => {
  try {
    const res = await axios.get("/notification/user/all");
    dispatch(setRequestStatus(false));
    if (res.status === 200) {
      dispatch(setRequestStatus(true));
      console.log("User notification ", res.data.notifications);
      dispatch({
        type: GET_USER_NOTIFICATIONS,
        payload: res.data.notifications,
      });
    }
  } catch (error) {
    dispatch(errorHandler(error));
  }
};

// GET PROPOSAL NOTIFICATIONS
export const getProposalNotifications = () => async (dispatch) => {
  try {
    const res = await axios.get("/notification/proposal/all");
    dispatch(setRequestStatus(false));
    if (res.status === 200) {
      dispatch(setRequestStatus(true));
      console.log("Proposal notification ", res.data.notifications);
      dispatch({
        type: GET_PROPOSAL_NOTIFICATIONS,
        payload: res.data.notifications,
      });
    }
  } catch (error) {
    dispatch(errorHandler(error));
  }
};
