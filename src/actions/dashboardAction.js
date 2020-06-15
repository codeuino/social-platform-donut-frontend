import axios from 'axios'
import { setRequestStatus } from '../utils/setRequestStatus'
import { errorHandler } from '../utils/errorHandler'
import { GET_ALL_UPCOMING_EVENTS } from './types'

// GET UPCOMING EVENTS
export const upcomingEvents = () => async (dispatch) => {
  try {
    const res = await axios.get('/event/upcoming')
    dispatch(setRequestStatus(false))
    if (res.status === 200) {
      dispatch(setRequestStatus(true))
      console.log('upcoming events called!', res.data)
      dispatch({
        type: GET_ALL_UPCOMING_EVENTS,
        payload: res.data.events || res.data.msg
      })
    }
  } catch (error) {
    dispatch(errorHandler(error))
  }
}

// CREATE POST
export const createPost = (postInfo) => async (dispatch) => {
  try {
    const res = await axios.post('/post/', postInfo)
    dispatch(setRequestStatus(false))
    if (res.status === 201) {
      dispatch(setRequestStatus(true))
      console.log('post created ', res.data)
    }
  } catch (error) {
    dispatch(errorHandler(error))
  }
}

// CREATE EVENT
export const createEvent = (eventInfo) => async (dispatch) => {
  try {
    const res = await axios.post('/event/', eventInfo)
    dispatch(setRequestStatus(false))
    if (res.status === 201) {
      dispatch(setRequestStatus(true))
      console.log('event created ', res.data)
    }
  } catch (error) {
    dispatch(errorHandler(error))
  }
}

// CREATE PROJECT
export const createProject = (projectInfo) => async (dispatch) => {
  try {
    console.log('projectInfo ', projectInfo)
    const res = await axios.post('/project/', projectInfo)
    dispatch(setRequestStatus(false))
    if (res.status === 201) {
      dispatch(setRequestStatus(true))
      console.log('project created ', res.data)
    }
  } catch (error) {
    dispatch(errorHandler(error))
  }
}