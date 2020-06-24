import { GET_ALL_MEMBERS, GET_ORG_OVERVIEW, GET_PERSONAL_OVERVIEW, SEARCH_MEMBER, BLOCK_USER, UNBLOCK_USER } from './types'
import axios from 'axios'
import { errorHandler } from '../utils/errorHandler'
import { setRequestStatus } from '../utils/setRequestStatus'

// GET ORGANIZATIONAL OVERVIEW
export const getOrgOverview = () => async (dispatch) => {
  try {
     const res = await axios.get('/org/overview/all')
     dispatch(setRequestStatus(false))
     if (res.status === 200) {
       dispatch(setRequestStatus(true))
       console.log('getOrgOverview ', res.data)
       dispatch({
         type: GET_ORG_OVERVIEW,
         payload: res.data.orgOverView
       })
     }
  } catch (error) {
    dispatch(errorHandler(error))
  }
}

// GET PERSONAL OVERVIEW
export const getPersonalOverview = () => async (dispatch) => {
  try {
    const res = await axios.get('/user/overview')
    dispatch(setRequestStatus(false))
    if (res.status === 200) {
      dispatch(setRequestStatus(true))
      console.log('getPersonalOverview ', res.data)
      dispatch({
        type: GET_PERSONAL_OVERVIEW,
        payload: res.data.personalOverview
      })
    }
  } catch (error) {
    dispatch(errorHandler(error))
  }
}

// GET ALL MEMBERS 
export const getMembers = () => async (dispatch) => {
  try {
    const res = await axios.get('/org/members/all')
    dispatch(setRequestStatus(false))
    if (res.status === 200) {
      dispatch(setRequestStatus(true))
      console.log('getMembers ', res.data)
      dispatch({
        type: GET_ALL_MEMBERS,
        payload: res.data.members
      })
    }
  } catch (error) {
    dispatch(errorHandler(error))
  }
}

// SEARCH MEMBER BY FIRST NAME, LAST NAME, FULL NAME
export const getMember = (query) => async (dispatch) => {
  try {
    console.log('Looking for member ', query)
    const res = await axios.get(`/org/members/all?search=${query}`)
    dispatch(setRequestStatus(false))
    if (res.status === 200) {
      dispatch(setRequestStatus(true))
      console.log('getMember by name ', res.data)
      dispatch({
        type: SEARCH_MEMBER,
        payload: res.data.member
      })
    }
  } catch (error) {
    dispatch(errorHandler(error))
  }
}

// BLOCK A USER (BY ADMIN)
export const blockUser = (userId) => async (dispatch) => {
  try {
    const res = await axios.patch(`/user/block/${userId}`)
    dispatch(setRequestStatus(false))
    if (res.status === 200) {
      dispatch(setRequestStatus(true))
      console.log('user blocked!', res.data)
      dispatch({
        type: BLOCK_USER,
        payload: true
      })
    }
  } catch (error) {
    dispatch(errorHandler(error))
  }
}

// UNBLOCK A USER (BY ADMIN)
export const unBlockUser = (userId) => async (dispatch) => {
  try {
    const res = await axios.patch(`/user/unblock/${userId}`)
    dispatch(setRequestStatus(false))
    if (res.status === 200) {
      dispatch(setRequestStatus(true))
      console.log('user unblocked!', res.data)
      dispatch({
        type: UNBLOCK_USER,
        payload: false // isBlocked = false
      })
    }
  } catch (error) {
    dispatch(errorHandler(error))
  }
}
