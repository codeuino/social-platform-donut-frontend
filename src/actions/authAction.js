import { SET_CURRENT_USER, GET_USER_PROFILE, PASSWORD_SUCCESSFULLY_CHANGED, PASSWORD_CHANGE_REQUEST_SUCCESS, SET_ADMIN } from './types';
import axios from 'axios';
import { setAuthToken } from '../utils/setAuthToken';
import { errorHandler } from '../utils/errorHandler';
import { setRequestStatus } from '../utils/setRequestStatus';
import { BASE_URL } from './baseApi';
import { customErrorHandler } from '../utils/customErrorHandler'
let forgotPasswordToken = "";

export const loadUser = () => async(dispatch) => {
  try {
    const res = await axios.get(`${BASE_URL}/user/load_user`);

    if(res.status === 200){
      dispatch(setRequestStatus(true));
      localStorage.setItem('userId', res.data.user._id)

      dispatch(setCurrentUser(res.data.user._id))

      // Update user name, role, orgId in localStorage
      localStorage.setItem('username', `${res.data.user.name.firstName} ${res.data.user.name.lastName}`)
      localStorage.setItem('admin', res.data.user.isAdmin)
      localStorage.setItem('ticketModerator', res.data.user.isTicketsModerator)
      localStorage.setItem('orgId', res.data.user.orgId)

      // if user is admin update admin in store 
      dispatch({
        type: SET_ADMIN,
        payload: res.data.user.isAdmin
      })
    }
  } catch(error) {
    console.log('error while loading user from localstorage', error)
    dispatch(errorHandler(error));
}
}

// to register user 
export const registerUser = (userInfo, history) => async (dispatch) => {
  try {
    const res = await axios.post(`${BASE_URL}/user`, userInfo);
    dispatch(setRequestStatus(false));
    
    if(res.status === 201) { 
      dispatch(setRequestStatus(true));
      dispatch({
        type: GET_USER_PROFILE,
        payload: res.data.user
      })
      history.push('/');
    }

  } catch(error) {
      console.log('register error ', error)
      dispatch(errorHandler(error));
  }
}

// to authenticate user 
export const loginUser = (userInfo, history) => async (dispatch) => {
  try {
    
    console.log("LOGGING IN...", userInfo);
    console.log('base url ', BASE_URL);
    const res = await axios.post(`${BASE_URL}/auth/login`, userInfo);
    dispatch(setRequestStatus(false));
    if(res.status === 200){

      dispatch(setRequestStatus(true));
      localStorage.setItem('userId', res.data.user._id)
      dispatch(setCurrentUser(res.data.user._id));

      // Update user name, role, orgId in localStorage
      localStorage.setItem('username', `${res.data.user.name.firstName} ${res.data.user.name.lastName}`)
      localStorage.setItem('admin', res.data.user.isAdmin)
      localStorage.setItem('ticketModerator', res.data.user.isTicketsModerator)
      localStorage.setItem('orgId', res.data.user.orgId);

      // if user is admin update admin in store 
      dispatch({
        type: SET_ADMIN,
        payload: res.data.user.isAdmin
      })
      history.push("/dashboard");
    }
  } catch(error) {
      console.log('login error ', error?.response)
      dispatch(customErrorHandler(error?.response?.data || ""));
  }
}

// forgot password 
export const forgotPassword = (email) => async (dispatch) => {
  try {
    const res = await axios.patch(`${BASE_URL}/user/password_reset/request/`, email);
    dispatch(setRequestStatus(false));
    
    if(res.status === 200){
      dispatch(setRequestStatus(true));
      console.log("Forgot password request sent!!");
      forgotPasswordToken = res.data.token;
      dispatch({
        type: PASSWORD_CHANGE_REQUEST_SUCCESS,
        payload: res.data.token
      })
    }

  } catch (error) {
    dispatch(errorHandler(error));
  }
}

// update password 
export const changePassword = (passObj) => async (dispatch) => {
  try {
    const res = await axios.patch(
      `${BASE_URL}/user/password_reset/${forgotPasswordToken}`,
      passObj
    );
    dispatch(setRequestStatus(false));

    if(res.status === 200){
      dispatch(setRequestStatus(true));
      console.log("Password updated!", res.data);
      // show password updated notification from here 
      dispatch({
        type: PASSWORD_SUCCESSFULLY_CHANGED,
        payload: res.data.updated
      })
    }
    
  } catch(error) {
    dispatch(errorHandler(error));
  }
}


// to logout user 
export const logoutUser = () => async (dispatch) => {
  try { 
     console.log('Logging out!!')
     // clear token from backend 
     const res = await axios.post(`${BASE_URL}/user/logout`)
     if (res.status === 200) {
      // remove all keys from the localStorage except the orgId
      const orgId = localStorage.getItem('orgId');
      localStorage.clear()
      localStorage.setItem('orgId', orgId)
      // delete authorization from the header 
      setAuthToken(false);
      // set user to {}
      setCurrentUser({});
      // move to home 
      window.location.href = "/";
     }
  } catch (error) {
    dispatch(errorHandler(error))
  }
}

export const setCurrentUser = (decodedData) => {
  return {
    type: SET_CURRENT_USER,
    payload: decodedData
  }
}
