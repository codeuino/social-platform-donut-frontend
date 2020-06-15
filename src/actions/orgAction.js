import axios from 'axios'
import { setRequestStatus } from '../utils/setRequestStatus'
import { errorHandler } from '../utils/errorHandler'

// CREATE COMMUNITY
export const registerCommunity  = (orgInfo) => async (dispatch) => {
  try {
    const res = await axios.post('/org/', orgInfo)
    dispatch(setRequestStatus(false))
    if (res.status === 201) {
      dispatch(setRequestStatus(true))
    }
  } catch (error) {
    dispatch(errorHandler(error))
  }
}
