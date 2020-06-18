import { GET_USER_PROFILE } from './types'
import { errorHandler } from '../utils/errorHandler'
import axios from 'axios'
import { setRequestStatus } from '../utils/setRequestStatus'

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
    }
  } catch(error) {
    dispatch(errorHandler(error))
  }
}

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
      // dispatch({
      //   type: GET_USER_PROFILE,
      //   payload: res.data.user,
      // });
    }
  } catch(error) {
    dispatch(errorHandler(error))
  }
}

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
      // dispatch({
      //   type: GET_USER_PROFILE,
      //   payload: res.data.user,
      // });
    }
  } catch(error) {
    dispatch(errorHandler(error))
  }
}

export const removeUser = (userId) => async (dispatch) => {
  try {
    const res = await axios.patch(`/user/remove/${userId}`)
    dispatch(setRequestStatus(false))
    if(res.status === 200) {
      dispatch(setRequestStatus(true))
      console.log('user removed ', userId)
    }
  } catch (error) {
    dispatch(errorHandler(error))
  }
}