import { SET_CURRENT_USER } from './types';
import axios from 'axios';
import { setAuthToken } from '../utils/setAuthToken';
import jwt_decode from 'jwt-decode';
import { errorHandler } from '../utils/errorHandler';
import { setRequestStatus } from '../utils/setRequestStatus';
let forgotPasswordToken = "";

// to register user 
export const registerUser = (userInfo, history) => async (dispatch) => {
  try {
    const res = await axios.post('/user', userInfo);
    dispatch(setRequestStatus(false));
    
    if(res.status === 201) { 
      dispatch(setRequestStatus(true));
      history.push('/');
    }

  } catch(error) {
      dispatch(errorHandler(error));
  }
}

// to authenticate user 
export const loginUser = (userInfo, history) => async (dispatch) => {
  try {
    
    console.log("LOGGING IN...", userInfo);
    
    const res = await axios.post('/auth/login', userInfo);
    dispatch(setRequestStatus(false));
    if(res.status === 200){

      const token = res.data.token;
      dispatch(setRequestStatus(true));
      
      localStorage.setItem("jwtToken", JSON.stringify(token));
      setAuthToken(token);
      
      // update state with user
      const decodedData = await jwt_decode(token);
      localStorage.setItem('userId', decodedData._id)
      dispatch(setCurrentUser(decodedData));
      history.push("/dashboard");

    }
  } catch(error) {
      dispatch(errorHandler(error));
  }
}

// forgot password 
export const forgotPassword = (email) => async (dispatch) => {
  try {
    const res = await axios.post('/user/password_reset', email);
    dispatch(setRequestStatus(false));
    
    if(res.status === 200){
      dispatch(setRequestStatus(true));
      console.log("Forgot password request sent!!");
      forgotPasswordToken = res.data.token;
    }

  } catch (error) {
    dispatch(errorHandler(error));
  }
}

// update password 
export const changePassword = (passObj) => async (dispatch) => {
  try {
    const res = await axios.post(`/user/password_reset/${forgotPasswordToken}`, passObj);
    dispatch(setRequestStatus(false));

    if(res.status === 200){
      dispatch(setRequestStatus(true));
      console.log("Password updated!", res.data);
      // show password updated notification from here 
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
     const res = await axios.post('/user/logout')
     if (res.status === 200) {
      // remove token from the localStorage 
      localStorage.removeItem('jwtToken');
      // remove userID 
      localStorage.removeItem('userId')
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