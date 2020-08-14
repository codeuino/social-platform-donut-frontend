import axios from 'axios';
import { errorHandler } from '../utils/errorHandler';
import { setRequestStatus } from '../utils/setRequestStatus';
import { GET_ALL_EVENTS, GET_EVENT_BY_ID } from './types';
import { BASE_URL } from './baseApi'
import { customErrorHandler } from '../utils/customErrorHandler';

// DELETE EVENT REQUEST 
export const deleteEvent = (eventId) => async (dispatch) => {
  try {
    const res = await axios.delete(`${BASE_URL}/event/${eventId}`)
    if(res.status === 200){
      dispatch(getAllEvents())
    }
  } catch(error) {
    const msg = {
      error: error?.response?.msg
    }
    dispatch(customErrorHandler(msg))
  }
}

// UPDATE EVENT REQUEST 
export const updateEvent = (eventId, updatedInfo) => async (dispatch) => {
  try {
    const res = await axios.patch(`${BASE_URL}/event/${eventId}`, updatedInfo);
    dispatch(setRequestStatus(false));
    if(res.status === 200){
      dispatch(setRequestStatus(true));
      dispatch(getAllEvents())
    }
  } catch(error) {
    dispatch(errorHandler(error))
  }
}

// CREATE EVENT
export const createEvent = (eventInfo, history) => async (dispatch) => {
  try {
    const res = await axios.post(`${BASE_URL}/event/`, eventInfo)
    dispatch(setRequestStatus(false))
    if(res.status === 201){
      dispatch(setRequestStatus(true))
      history.push('/events');
    }
  } catch(error) {
    dispatch(errorHandler(error))
  }
}

// GET ALL EVENTS 
export const getAllEvents = (pagination = 6, page = 1) => async (dispatch) => {
  try {
    const res = await axios.get(`${BASE_URL}/event/all?pagination=${pagination}&page=${page}`)
    dispatch(setRequestStatus(false))
    if(res.status === 200) {
      dispatch(setRequestStatus(true))
      console.log('all events ', res.data.events)
      dispatch({
        type: GET_ALL_EVENTS,
        payload: res.data.events
      })
    }
  } catch(error) {
    dispatch(errorHandler(error))
  }
}

// GET EVENT BY ID 
export const getEventById = (eventId) => async (dispatch) => {
  try {
    console.log('fetching event ', eventId)
    const res = await axios.get(`${BASE_URL}/event/${eventId}`)
    dispatch(setRequestStatus(false))
    if(res.status === 200){
      dispatch(setRequestStatus(true))
      console.log('fetching event by id ', res.data.event)
      dispatch({
        type: GET_EVENT_BY_ID,
        payload: res.data.event
      })
    }
  } catch(error) {
    dispatch(errorHandler(error))
  }
}

// RSVP FOR EVENT SECTION
export const rsvpYes = (eventId, info) => async (dispatch) => {
  try {
    const res = await axios.patch(`${BASE_URL}/event/rsvp/${eventId}`, info);
    dispatch(setRequestStatus(false))
    if(res.status === 200) {
      dispatch(setRequestStatus(true));
      console.log('Doing rsvp for the event', res.data);
      dispatch(getAllEvents());
    }
  } catch (error) {
    dispatch(errorHandler(error))
  }
}