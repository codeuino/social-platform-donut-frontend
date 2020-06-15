import axios from 'axios'
import { errorHandler } from '../utils/errorHandler'
import { setRequestStatus } from '../utils/setRequestStatus'
import { SET_ADMIN } from './types'

export const createAdmin = (adminInfo) => async (dispatch) => {
  try {
    const res = await axios.post('/user/', adminInfo)
    setRequestStatus(false)
    if (res.status === 201) {
      setRequestStatus(true)
    }
  } catch (error) {
    dispatch(errorHandler(error))
  }
}

export const loginAdmin = (adminInfo) => async (dispatch) => {
  try {
    const res = await axios.post('/auth/login/', adminInfo)
    dispatch(setRequestStatus(false))
    if (res.status === 200) {
      dispatch(setRequestStatus(true))
      localStorage.setItem('admin', true)
      dispatch({
        type: SET_ADMIN,
        payload: true
      })
    }
  } catch (error) {
    dispatch(errorHandler(error))
  }
}