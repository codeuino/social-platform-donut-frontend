import { GET_USER_PROFILE, GET_ALL_MEMBERS, UPDATE_USER_PROFILE, GET_USER_EVENTS, GET_USER_PROJECTS, GET_USER_POSTS, GET_INVITE_LINK, PROCESS_INVITE_LINK, SET_ADMIN, CLEAR_INVITE_LINK } from './types'
import { errorHandler } from '../utils/errorHandler'
import axios from 'axios'
import { setRequestStatus } from '../utils/setRequestStatus'
import { BASE_URL } from './baseApi'
const userId = localStorage.getItem('userId')

// GET USER PROFILE
export const getProfile = (id) => async (dispatch)=> {
  try {
    console.log('getProfile userId ',id)
    const res = await axios.get(`${BASE_URL}/user/${id}`)
    if (res.status === 200) {
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
    console.log('followuser ', userId)
    const res = await axios.patch(`${BASE_URL}/user/follow/${userId}`)
    dispatch(setRequestStatus(false))
    if (res.status === 200) {
      dispatch(setRequestStatus(true))
      console.log('started following ', userId)
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
    console.log('unfollowObj ', userId)
    const res = await axios.patch(`${BASE_URL}/user/unfollow/${userId}`)
    dispatch(setRequestStatus(false))
    if (res.status === 200) {
      dispatch(setRequestStatus(true))
      console.log('unfollowed ', userId)
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
    const res = await axios.patch(`${BASE_URL}/user/remove/${userId}`)
    dispatch(setRequestStatus(false))
    if(res.status === 200) {
      dispatch(setRequestStatus(true))
      console.log('user removed ', userId)
      const response = await axios.get(`${BASE_URL}/org/members/all`)
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
export const updateProfile = (userId, updatedInfo) => async (dispatch) => {
  try {
    console.log('updateProfile userId ', userId)
    console.log('updating ', updatedInfo)
    const res = await axios.patch(`${BASE_URL}/user/${userId}`, updatedInfo)
    if(res.status === 200) {
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
export const getEventsCreatedByUser = (id = userId, pagination = 10, page = 1) => async (dispatch) => {
  try { 
    console.log('getEvents userId ', id)
    const res = await axios
      .get(`${BASE_URL}/event/${id}/all?pagination=${pagination}&page=${page}`);
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
export const getProjectCreatedByUser = (id = userId, pagination = 10, page = 1) => async (dispatch) => {
  try { 
    console.log('getProjects userId ', id)
    const res = await axios
      .get(`${BASE_URL}/project/${id}/all?pagination=${pagination}&page=${page}`);
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
export const getPostsCreatedByUser = (id = userId, pagination = 10, page = 1) => async (dispatch) => {
  try { 
    console.log('getPosts userId ', id)
    const res = await axios
      .get(`${BASE_URL}/post/${id}/all?pagination=${pagination}&page=${page}`);
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
    const res = await axios.get(`${BASE_URL}/user/link/invite?role=${role}`)
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
    const res = await axios.get(`${BASE_URL}/user/invite/${token}`)
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

// CLEAR INVITE LINK 
export const clearInviteLink = () => async (dispatch) => {
  dispatch({
    type: CLEAR_INVITE_LINK,
    payload: ''
  })
}

// ACTIVATE DEACTIVATE TOGGLER 
export const activateDeactivateToggler = () => async (dispatch) => {
  try {
    const res = await axios.patch(`${BASE_URL}/user/deactivate/toggler`)
    if (res.status === 200) {
      console.log('Deactivation toggler', res.data);
      dispatch(getProfile(userId));
    }
  } catch (error) {
    dispatch(errorHandler(error))
  }
}

// GET USER'S ACTIVITY
