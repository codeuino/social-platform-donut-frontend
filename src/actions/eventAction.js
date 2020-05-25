import axios from 'axios';
import { errorHandler } from '../utils/errorHandler';
import { setRequestStatus } from '../utils/setRequestStatus';

// DELETE EVENT REQUEST 
export const deleteEvent = (eventId) => async (dispatch) => {
  try {
    const res = await axios.delete(`/event/${eventId}`)
    dispatch(setRequestStatus(false));
    if(res.status === 200){
      dispatch(setRequestStatus(true));
    }
  } catch(error) {
    dispatch(errorHandler(error))
  }
}

// UPDATE EVENT REQUEST 
export const updateEvent = (eventId, updatedInfo) => async (dispatch) => {
  try {
    const res = await axios.patch(`/event/${eventId}`, updatedInfo);
    dispatch(setRequestStatus(false));
    if(res.status === 200){
      dispatch(setRequestStatus(true));
    }
  } catch(error) {
    dispatch(errorHandler(error))
  }
}

// CREATE EVENT
export const createEvent = (eventInfo, history) => async (dispatch) => {
  try {
    const res = await axios.post('/event/', eventInfo)
    dispatch(setRequestStatus(false))
    if(res.status === 201){
      dispatch(setRequestStatus(true))
      history.push('/events');
    }
  } catch(error) {
    dispatch(errorHandler(error))
  }
}
