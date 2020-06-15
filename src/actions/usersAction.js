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