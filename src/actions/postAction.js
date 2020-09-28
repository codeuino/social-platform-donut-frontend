import axios from "axios";
import { errorHandler } from "../utils/errorHandler";
import { setRequestStatus } from "../utils/setRequestStatus";
import { GET_ALL_POSTS, GET_ALL_PINNED_POSTS, GET_SINGLE_POST } from "./types";
import { BASE_URL } from "./baseApi";

// GET ALL POSTS
export const getAllPosts = (pagination = 10, page = 1) => async (dispatch) => {
  try {
    const res = await axios.get(
      `${BASE_URL}/post/all_posts?pagination=${pagination}&page=${page}`
    );
    dispatch(setRequestStatus(false));
    if (res.status === 200) {
      dispatch(setRequestStatus(true));
      console.log("all posts ", res.data.posts);
      dispatch({
        type: GET_ALL_POSTS,
        payload: res.data.posts,
      });
    }
  } catch (error) {
    dispatch(errorHandler(error));
  }
};

// GET ALL PINNED POSTS
export const getAllPinnedPosts = (pagination = 10, page = 1) => async (
  dispatch
) => {
  try {
    const res = await axios.get(
      `${BASE_URL}/post/all/pinned?pagination=${pagination}&page=${page}`
    );
    dispatch(setRequestStatus(false));
    if (res.status === 200) {
      dispatch(setRequestStatus(true));
      console.log("fetching all pinned posts ", res.data.pinnedPost);
      dispatch({
        type: GET_ALL_PINNED_POSTS,
        payload: res.data.pinnedPost,
      });
    }
  } catch (error) {
    dispatch(errorHandler(error));
  }
};

// UPVOTE POST
export const upVotePost = (postId, type) => async (dispatch) => {
  try {
    const res = await axios.patch(`${BASE_URL}/post/upvote/${postId}`, type);
    if (res.status === 200) {
      console.log("successfully upvoted post ", res.data);
      dispatch(getAllPosts());
    }
  } catch (error) {
    dispatch(errorHandler(error));
  }
};

// GET POST BY ID
export const getPostById = (postId) => async (dispatch) => {
  try {
    console.log("postId from action ", postId);
    const res = await axios.get(`${BASE_URL}/post/${postId}`);
    if (res.status === 200) {
      dispatch({
        type: GET_SINGLE_POST,
        payload: res.data.post,
      });
    }
  } catch (error) {
    dispatch(errorHandler(error));
  }
};

// UPDATE POST
export const updatePost = (postId, updatedInfo) => async (dispatch) => {
  try {
    console.log("updatedPostInfo ", updatedInfo);
    const res = await axios.patch(`${BASE_URL}/post/${postId}`, updatedInfo);
    if (res.status === 200) {
      dispatch(getAllPosts());
    }
  } catch (error) {
    dispatch(errorHandler(error));
  }
};

// DELETE POST
export const deletePost = (postId) => async (dispatch) => {
  try {
    const res = await axios.delete(`${BASE_URL}/post/${postId}`);
    if (res.status === 200) {
      dispatch(getAllPosts());
    }
  } catch (error) {
    dispatch(errorHandler(error));
  }
};

// REMOVE REACTION
export const removeReaction = (postId, type) => async (dispatch) => {
  try {
    const res = await axios.patch(
      `${BASE_URL}/post/removereaction/${postId}`,
      type
    );
    if (res.status === 200) {
      dispatch(getAllPosts());
    }
  } catch (error) {
    dispatch(errorHandler(error));
  }
};

// PIN POST BY ID
export const pinPost = (postId) => async (dispatch) => {
  try {
    const res = await axios.patch(`${BASE_URL}/post/pin/${postId}`)
    if (res.status === 200) {
      console.log('post pinned ', res.data.post)
      dispatch(getAllPinnedPosts(10, 1));
    }
  } catch(error) {
    dispatch(errorHandler(error))
  }
}
