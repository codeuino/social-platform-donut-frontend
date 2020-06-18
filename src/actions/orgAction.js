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
      localStorage.setItem('orgId', JSON.stringify(res.data.org._id))
    }
  } catch (error) {
    dispatch(errorHandler(error))
  }
}

// REMOVE ADMIN
export const removeAdmin = (userId) => async (dispatch) => {
  try {
    let orgId = localStorage.getItem('orgId')
    const res = await axios.patch(`/org/remove/${orgId}/${userId}`)
    dispatch(setRequestStatus(false))
    if (res.status === 200) {
      dispatch(setRequestStatus(true))
      console.log('admin removed ', userId)
    }
  } catch (error) {
    dispatch(errorHandler(error))
  }
}
