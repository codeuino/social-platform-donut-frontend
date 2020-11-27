import axios from 'axios'
import { errorHandler } from '../utils/errorHandler'
import { setRequestStatus } from '../utils/setRequestStatus'
import { SET_ADMIN, GET_ADMIN } from './types'
import jwt_decode from 'jwt-decode';
import { setCurrentUser } from './authAction'
import { BASE_URL } from './baseApi'


export const createAdmin = (adminInfo) => async (dispatch) => {
  try {
    const res = await axios.post(`${BASE_URL}/user/`, adminInfo)
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
    const res = await axios.post(`${BASE_URL}/auth/login/`, adminInfo)
    dispatch(setRequestStatus(false));
    if (res.status === 200) {
      dispatch(setRequestStatus(true));

      // update state with user
      localStorage.setItem('userId', res.data.user)
      dispatch(setCurrentUser(res.data.user._id));

      // update localStorage with admin status 
      localStorage.setItem('username', `${res.data.user.name.firstName} ${res.data.user.name.lastName}`)
      localStorage.setItem('admin', res.data.user.isAdmin)
      localStorage.setItem('ticketModerator', res.data.user.isTicketsModerator)
      localStorage.setItem('orgId', res.data.user.orgId);

      dispatch({
        type: SET_ADMIN,
        payload: res.data.user.isAdmin
      })
    history.push("/dashboard");
   }
  } catch (error) {
    dispatch(errorHandler(error))
  }
}
