import { GET_COMMENTS_OF_A_POST, RESET_COMMENTS } from "./types";
import { errorHandler } from "../utils/errorHandler";
import axios from "axios";
import { setRequestStatus } from "../utils/setRequestStatus";
import { BASE_URL } from './baseApi'

// CREATE COMMENT ON A PARTICULAR POST
export const createComment = (postId, comment) => async (dispatch) => {
  try {
    const res = await axios.post(`${BASE_URL}/comment/${postId}`, comment)
    dispatch(setRequestStatus(false));
    if(res.status === 201) {
      dispatch(setRequestStatus(true))
      console.log('created comment ', res.data.comment)
      dispatch(getAllCommentsOfPost(postId));
    }
  } catch (error) {
    dispatch(errorHandler(error));
  }
};

// GET ALL COMMENTS OF A POST
export const getAllCommentsOfPost = (postId) => async (dispatch) => {
  try {
    const res = await axios.get(`${BASE_URL}/comment/${postId}`)
    dispatch(setRequestStatus(false))
    if(res.status === 200) {
      dispatch(setRequestStatus(true));
      console.log("fetching comments of ", postId, res.data.comments);
      dispatch({
        type: GET_COMMENTS_OF_A_POST,
        payload: res.data.comments,
      });
    }
  } catch (error) {
    dispatch(errorHandler(error));
  }
};

// UPDATE COMMENT OF A POST
export const updateComment = (commentId, updatedComment) => async (
  dispatch
) => {
  try {
    const res = await axios.patch(`${BASE_URL}/comment/${commentId}`, updatedComment)
    dispatch(setRequestStatus(false))
    if(res.status === 200) {
      dispatch(setRequestStatus(true))
      console.log('comment updated ', res.data.comment)
      dispatch(getAllCommentsOfPost())
    }
  } catch (error) {
    errorHandler(error);
  }
};

// DELETE COMMENT
export const deleteComment = (commentId) => async (dispatch) => {
  try {
    const res = await axios.delete(`${BASE_URL}/comment/${commentId}`)
    dispatch(setRequestStatus(false))
    if(res.status === 200) {
      dispatch(setRequestStatus(true));
      console.log("comment deleted ", res.data);
      dispatch(getAllCommentsOfPost());
    }
  } catch (error) {
    dispatch(errorHandler(error));
  }
};

export const resetComments = () => async (dispatch) => {
  dispatch({ type: RESET_COMMENTS });
};
