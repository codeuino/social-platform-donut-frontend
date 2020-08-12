import axios from 'axios'
import { setRequestStatus } from '../utils/setRequestStatus'
import { errorHandler } from '../utils/errorHandler'
import { 
  GET_ORG_PROFILE, 
  UPDATE_ORG_PROFILE, 
  DEACTIVATE_ORG, 
  GET_ALL_MEMBERS, 
  TRIGGER_MAINTENANCE,
  GET_LOGIN_OPTIONS
 } from './types'

import { BASE_URL } from './baseApi'

// CREATE COMMUNITY
export const registerCommunity  = (orgInfo) => async (dispatch) => {
  try {
    const res = await axios.post(`${BASE_URL}/org/`, orgInfo)
    dispatch(setRequestStatus(false))
    if (res.status === 201) {
      dispatch(setRequestStatus(true))
      console.log('org info ', res.data)
      localStorage.setItem('orgId', res.data.org._id)
      dispatch(getOrgProfile())
    }
  } catch (error) {
    dispatch(errorHandler(error))
  }
}

// REMOVE ADMIN
export const removeAdmin = (userId) => async (dispatch) => {
  try {
    let orgId = localStorage.getItem('orgId')
    const res = await axios.patch(`${BASE_URL}/org/remove/${orgId}/${userId}`)
    dispatch(setRequestStatus(false))
    if (res.status === 200) {
      dispatch(setRequestStatus(true))
      console.log('admin removed ', userId)
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

// GET ORG INFO 
export const getOrgProfile = () => async (dispatch) => {
  try {
    let orgId = localStorage.getItem('orgId')
    const res = await axios.get(`${BASE_URL}/org/${orgId}`)
    dispatch(setRequestStatus(false))
    if(res.status === 200) {
      dispatch(setRequestStatus(true))
      dispatch({
        type: GET_ORG_PROFILE,
        payload: res.data.organization
      })
    }
  } catch(error) {
    dispatch(errorHandler(error))
  }
}

// UPDATE ORG PROFILE
export const updateOrgProfile = (updatedInfo) => async (dispatch) => {
  try {
    let orgId = localStorage.getItem('orgId')
    console.log('updatedInfo ', updatedInfo);
    const res = await axios.patch(`${BASE_URL}/org/${orgId}`, updatedInfo)
    dispatch(setRequestStatus(false));
    if(res.status === 200) {
      dispatch(setRequestStatus(true))
      console.log('org profile updated!', res.data)
      dispatch(getOrgProfile());
      // dispatch({
      //   type: UPDATE_ORG_PROFILE,
      //   payload: res.data.organization
      // })
    }
  } catch(error) {
    dispatch(errorHandler(error))
  }
}

// UPDATE ORG SETTINGS
export const updateSettings = (updatedInfo) => async (dispatch) => {
  try {
    let orgId = localStorage.getItem('orgId')
    const res = await axios.patch(`${BASE_URL}/org/${orgId}/settings/update`, updatedInfo)
    dispatch(setRequestStatus(false))
    if(res.status === 200) {
      dispatch(setRequestStatus(true))
      console.log('Updated org settings ', res.data)
      dispatch({
        type: UPDATE_ORG_PROFILE,
        payload: res.data.organization
      })
    }
  } catch(error) {
    dispatch(errorHandler(error))
  }
}

// DEACTIVATE/ARCHIVE ORG
export const deactivateOrg = () => async (dispatch) => {
  try {
    let orgId = localStorage.getItem('orgId')
    const res = await axios.patch(`${BASE_URL}/org/archive/${orgId}`);
    dispatch(setRequestStatus(false))
    if(res.status === 200) {
      dispatch(setRequestStatus(true))
      console.log('org deactivated ', res.data)
      dispatch({
        type: DEACTIVATE_ORG,
        payload: res.data.organization.isArchived
      })
      // set deactivation to the localStorage for future ref
      localStorage.setItem(
        "isDeactivated",
        JSON.stringify(res.data.organization.isArchived)
      );
    }
  } catch(error) {
    dispatch(errorHandler(error))
  }
}

// TRIGGER MAINTENANCE MODE
export const TriggerMaintenance = () => async (dispatch) => {
  try {
    const orgId = localStorage.getItem('orgId')
    const res = await axios.patch(`${BASE_URL}/org/${orgId}/maintenance`);
    dispatch(setRequestStatus(false))
    if(res.status === 200) {
      dispatch(setRequestStatus(true))
      // set maintenance to true in localStorage 
      localStorage.setItem('isMaintenance', res.data.maintenance);
      dispatch({
        type: TRIGGER_MAINTENANCE,
        payload: res.data.maintenance
      })
    }
  } catch (error) {
    dispatch(errorHandler(error))
  }
}

// GET LOGIN OPTIONS 
export const getLoginOptions = () => async (dispatch) => {
  try {
    const res = await axios.get(`${BASE_URL}/org/login/options`)
    if(res.status === 200) {
      console.log('fetched login options ', res.data)
      dispatch({
        type: GET_LOGIN_OPTIONS,
        payload: res.data.methods
      })
    }
  } catch(error) {
    dispatch(errorHandler(error))
  }
}