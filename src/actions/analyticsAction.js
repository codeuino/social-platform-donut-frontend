import axios from "axios";
import { errorHandler } from "../utils/errorHandler";
import { setRequestStatus } from "../utils/setRequestStatus";
import {
  GET_BROWSER_ANALYTICS,
  GET_COUNTRY_ANALYTICS,
  GET_DEVICE_ANALYTICS,
  GET_MOSTVIEWED_ANALYTICS,
  GET_PROPOSALVIEW_ANALYTICS
} from "../actions/types";
import moment from "moment";

// GET BROWSER ANALYTICS
export const getBrowserAnalytics = (
  startingDate,
  endingDate,
  proposalId
) => async (dispatch) => {
  try {
    let data = {
      startDate: moment(startingDate).format("YYYY-MM-DD"),
      endDate: moment(endingDate).format("YYYY-MM-DD"),
      proposalId: proposalId,
    };
    const res = await axios.post("/analytics/browser", data);
    dispatch(setRequestStatus(false));
    if (res.status === 200) {
      dispatch(setRequestStatus(true));
      dispatch({
        type: GET_BROWSER_ANALYTICS,
        payload: res.data.analytics || res.data.msg,
      });
    }
  } catch (error) {
    dispatch(errorHandler(error));
  }
};

// GET MOSTVIEWED ANALYTICS
export const getMostViewedAnalytics = (startingDate, endingDate) => async (
  dispatch
) => {
  try {
    let data = {
      startDate: moment(startingDate).format("YYYY-MM-DD"),
      endDate: moment(endingDate).format("YYYY-MM-DD"),
    };
    const res = await axios.post("/analytics/mostviewed", data);
    dispatch(setRequestStatus(false));
    if (res.status === 200) {
      dispatch(setRequestStatus(true));
      dispatch({
        type: GET_MOSTVIEWED_ANALYTICS,
        payload: res.data.analytics || res.data.msg,
      });
    }
  } catch (error) {
    dispatch(errorHandler(error));
  }
};

// GET PROPOSAL VIEW ANALYTICS
export const getProposalviewAnalytics = (
    startingDate,
    endingDate,
    proposalId
  ) => async (dispatch) => {
    try {
      let data = {
        startDate: moment(startingDate).format("YYYY-MM-DD"),
        endDate: moment(endingDate).format("YYYY-MM-DD"),
        proposalId: proposalId,
      };
      const res = await axios.post("/analytics/views", data);
      dispatch(setRequestStatus(false));
      if (res.status === 200) {
        dispatch(setRequestStatus(true));
        console.log(res.data.analytics)
        dispatch({
          type: GET_PROPOSALVIEW_ANALYTICS,
          payload: res.data.analytics || res.data.msg,
        });
      }
    } catch (error) {
      dispatch(errorHandler(error));
    }
  };

// GET COUNTRIES ANALYTICS
export const getCountryAnalytics = (
  startingDate,
  endingDate,
  proposalId
) => async (dispatch) => {
  try {
    let data = {
      startDate: moment(startingDate).format("YYYY-MM-DD"),
      endDate: moment(endingDate).format("YYYY-MM-DD"),
      proposalId: proposalId,
    };
    const res = await axios.post("/analytics/countries", data);
    dispatch(setRequestStatus(false));
    if (res.status === 200) {
      dispatch(setRequestStatus(true));
      dispatch({
        type: GET_COUNTRY_ANALYTICS,
        payload: res.data.analytics || res.data.msg,
      });
    }
  } catch (error) {
    dispatch(errorHandler(error));
  }
};

// GET DEVICE ANALYTICS
export const getDeviceAnalytics = (
  startingDate,
  endingDate,
  proposalId
) => async (dispatch) => {
  try {
    let data = {
      startDate: moment(startingDate).format("YYYY-MM-DD"),
      endDate: moment(endingDate).format("YYYY-MM-DD"),
      proposalId: proposalId,
    };
    const res = await axios.post("/analytics/device", data);
    dispatch(setRequestStatus(false));
    if (res.status === 200) {
      dispatch(setRequestStatus(true));
      dispatch({
        type: GET_DEVICE_ANALYTICS,
        payload: res.data.analytics || res.data.msg,
      });
    }
  } catch (error) {
    dispatch(errorHandler(error));
  }
};
