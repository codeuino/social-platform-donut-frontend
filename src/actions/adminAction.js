import axios from 'axios'
import { errorHandler } from '../utils/errorHandler'
import { setRequestStatus } from '../utils/setRequestStatus'
import { SET_ADMIN, GET_ADMIN } from './types'
import { setAuthToken } from '../utils/setAuthToken'
import jwt_decode from 'jwt-decode';
import { setCurrentUser } from './authAction'


export const createAdmin = (adminInfo) => async (dispatch) => {
  try {
    const res = await axios.post('/user/', adminInfo)
    setRequestStatus(false)
    if (res.status === 201) {
      setRequestStatus(true)
      dispatch({
        type: GET_ADMIN,
        payload: res.data.user
      })
    }
  } catch (error) {
    dispatch(errorHandler(error))
  }
}

export const loginAdmin = (adminInfo, history) => async (dispatch) => {
  try {
    const res = await axios.post('/auth/login/', adminInfo)
   dispatch(setRequestStatus(false));
   if (res.status === 200) {

     const token = res.data.token;
     dispatch(setRequestStatus(true));

     localStorage.setItem("jwtToken", JSON.stringify(token));
     setAuthToken(token);

     // update state with user
     const decodedData = await jwt_decode(token);
     localStorage.setItem('userId', decodedData._id)
     dispatch(setCurrentUser(decodedData));

     // update localStorage with admin status 
     localStorage.setItem('admin', true)

     dispatch({
       type: SET_ADMIN,
       payload: true
     })
     
     history.push("/dashboard");
   }
  } catch (error) {
    dispatch(errorHandler(error))
  }
}