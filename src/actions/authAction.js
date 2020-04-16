import { SET_CURRENT_USER } from './types';
import axios from 'axios';
import { setAuthToken } from '../utils/setAuthToken';
import jwt_decode from 'jwt-decode';
import { errorHandler } from '../utils/errorHandler';

// to register user 
export const registerUser = (userInfo, history) => async (dispatch) => {
  try {
    const res = await axios.post('/user', userInfo);
    if(res.status === 201) {
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
    if(res.status === 200){
      const token = res.data.token;
      localStorage.setItem("jwtToken", JSON.stringify(token));
      setAuthToken(token);
      // update state with user
      const decodedData = await jwt_decode(token);
      dispatch(setCurrentUser(decodedData));
      history.push("/dashboard");
    }
  } catch(error) {
      dispatch(errorHandler(error));
  }
}

// to logout user 
export const logoutUser = () => {
  // remove token from the localStorage 
  localStorage.removeItem('jwtToken');
  // delete authorization from the header 
  setAuthToken(false);
  // set user to {}
  setCurrentUser({});
  // move to home 
  window.location.href = "/";
}

export const setCurrentUser = (decodedData) => {
  return {
    type: SET_CURRENT_USER,
    payload: decodedData
  }
}