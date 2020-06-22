import axios from 'axios';
import { errorHandler } from '../utils/errorHandler';
import { setRequestStatus } from '../utils/setRequestStatus';
import { GET_ALL_POSTS } from './types';

// GET ALL POSTS
export const getAllPosts = (pagination = 10, page = 1) => async (dispatch) => {
  try {
    const res = await axios.get(`/post/all_posts?pagination=${pagination}&page=${page}`)
    dispatch(setRequestStatus(false))
    if(res.status === 200) {
      dispatch(setRequestStatus(true))
      console.log('all posts ', res.data.posts)
      dispatch({
        type: GET_ALL_POSTS,
        payload: res.data.posts
      })
    }
  } catch(error) {
    dispatch(errorHandler(error))
  }
}

