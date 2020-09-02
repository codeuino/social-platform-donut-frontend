import axios from "axios";
import { GET_TICKETs } from "./types";
import { BASE_URL } from "./baseApi";
import { errorHandler } from "../utils/errorHandler";

export const getTickets = () => async (dispatch) => {
  try {
    const res = await axios.get(`${BASE_URL}/ticket`);
    dispatch({
      type: GET_TICKETs,
      payload: res.data.tickets,
    });
  } catch (error) {
    dispatch(errorHandler(error));
  }
};
