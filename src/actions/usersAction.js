import { GET_USER_PROFILE, GET_ALL_MEMBERS, UPDATE_USER_PROFILE, GET_USER_EVENTS, GET_USER_PROJECTS, GET_USER_POSTS, GET_INVITE_LINK, PROCESS_INVITE_LINK, SET_ADMIN } from './types'
import { errorHandler } from '../utils/errorHandler'
import axios from 'axios'
import { setRequestStatus } from '../utils/setRequestStatus'

// GET USER PROFILE
export const getProfile = () => async (dispatch)=> {
  try {
    const res = await axios.get('/user/me')
    dispatch(setRequestStatus(false))
    if (res.status === 200) {
      setRequestStatus(true)
      console.log('user profile ', res.data)
      dispatch({
        type: GET_USER_PROFILE,
        payload: res.data.user
      })
      // if user is admin
      if(res.data.user.isAdmin === true) {
        dispatch({
          type: SET_ADMIN,
          payload: true
        })
      }
    }
  } catch(error) {
    dispatch(errorHandler(error))
  }
}

// FOLLOW USER
export const followUser = (userId) => async (dispatch) => {
  try {
    let followObj = {
      followId: userId
    }
    console.log('followObj ', followObj)
    const res = await axios.patch('/user/follow', followObj)
    dispatch(setRequestStatus(false))
    if (res.status === 200) {
      dispatch(setRequestStatus(true))
      console.log('started following ', followObj)
      dispatch({
        type: GET_USER_PROFILE,
        payload: res.data.user,
      });
    }
  } catch(error) {
    dispatch(errorHandler(error))
  }
}

// UnFOLLOW USER
export const unFollowUser = (userId) => async (dispatch) => {
  try {
    let unFollowObj = {
      followId: userId
    }
    console.log('unfollowObj ', unFollowObj)
    const res = await axios.patch('/user/unfollow', unFollowObj)
    dispatch(setRequestStatus(false))
    if (res.status === 200) {
      dispatch(setRequestStatus(true))
      console.log('unfollowed ', unFollowObj)
      dispatch({
        type: GET_USER_PROFILE,
        payload: res.data.user,
      });
    }
  } catch(error) {
    dispatch(errorHandler(error))
  }
}

// REMOVE USER
export const removeUser = (userId) => async (dispatch) => {
  try {
    const res = await axios.patch(`/user/remove/${userId}`)
    dispatch(setRequestStatus(false))
    if(res.status === 200) {
      dispatch(setRequestStatus(true))
      console.log('user removed ', userId)
      const response = await axios.get('/org/members/all')
      if (response.status === 200) {
        dispatch({
          type: GET_ALL_MEMBERS,
          payload: response.data.members
        });
      }
    }
  } catch (error) {
    dispatch(errorHandler(error))
  }
}

// UPDATE USER PROFILE 
export const updateProfile = (updatedInfo) => async (dispatch) => {
  try {
    console.log('updating ', updatedInfo)
    const res = await axios.patch('/user/me', updatedInfo)
    dispatch(setRequestStatus(false))
    if(res.status === 200) {
      dispatch(setRequestStatus(true))
      console.log('user profile updated ', res.data)
      dispatch({
        type: UPDATE_USER_PROFILE,
        payload: res.data.data
      })
    }
  } catch(error) {
    dispatch(errorHandler(error))
  }
}

// GET EVENTS CREATED BY USER 
export const getEventsCreatedByUser = (pagination = 10, page = 1) => async (dispatch) => {
  try { 
    const res = await axios.get(`event/me/all?pagination=${pagination}&page=${page}`);
    dispatch(setRequestStatus(false))
    if(res.status === 200) {
      dispatch(setRequestStatus(true))
      console.log('fetching all events created by user ', res.data.events)
      dispatch({
        type: GET_USER_EVENTS,
        payload: res.data.events
      })
    }
  } catch (error) {
    dispatch(errorHandler(error))
  }
}

// GET ALL PROJECT CREATED BY A USER 
export const getProjectCreatedByUser = (pagination = 10, page = 1) => async (dispatch) => {
  try { 
    const res = await axios.get(`/project/me/all?pagination=${pagination}&page=${page}`);
    dispatch(setRequestStatus(false))
    if(res.status === 200) {
      dispatch(setRequestStatus(true))
      console.log('fetching all projects created by user ', res.data.projects)
      dispatch({
        type: GET_USER_PROJECTS,
        payload: res.data.projects
      });
    }
  } catch (error) {
    dispatch(errorHandler(error))
  }
}

// GET POSTS CREATED BY USER 
export const getPostsCreatedByUser = (pagination = 10, page = 1) => async (dispatch) => {
  try { 
    const res = await axios.get(`/post/me/all?pagination=${pagination}&page=${page}`);
    dispatch(setRequestStatus(false))
    if(res.status === 200) {
      dispatch(setRequestStatus(true))
      console.log('fetching all posts created by user ', res.data.posts)
      dispatch({
        type: GET_USER_POSTS,
        payload: res.data.posts
      })
    }
  } catch (error) {
    dispatch(errorHandler(error))
  }
}

// GET INVITE LINK 
export const getInviteLink = (role) => async (dispatch) => {
  try {
    const res = await axios.get(`/user/invite?role=${role}`)
    dispatch(setRequestStatus(false));
    if(res.status === 200) {
      dispatch(setRequestStatus(true));
      console.log('Fetching invite link ', res.data.inviteLink)
      dispatch({
        type: GET_INVITE_LINK,
        payload: res.data.inviteLink
      })
    }
  } catch (error) {
    dispatch(errorHandler(error))
  }
}

// PROCESS INVITE LINK 
export const processInviteToken = (token) => async (dispatch) => {
  try {
    const res = await axios.get(`/user/invite/${token}`)
    dispatch(setRequestStatus(false));
    if(res.status === 200) {
      dispatch(setRequestStatus(true))
      console.log('Processing the invite link ', res.data);
      dispatch({
        type: PROCESS_INVITE_LINK,
        payload: res.data.redirectTo || res.data.msg
      })
    }
  } catch(error) {
    dispatch(errorHandler(error));
  }
}