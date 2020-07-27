import axios from 'axios'
import { setRequestStatus } from '../utils/setRequestStatus'
import { errorHandler } from '../utils/errorHandler'
import { GET_ALL_UPCOMING_EVENTS } from './types'
import { getAllEvents } from './eventAction'
import { getAllPosts } from './postAction'
import { getAllProjects } from './projectAction'
import { BASE_URL } from './baseApi'

// GET UPCOMING EVENTS
export const upcomingEvents = () => async (dispatch) => {
  try {
    const res = await axios.get(`${BASE_URL}/event/upcoming`)
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
    const res = await axios.post(`${BASE_URL}/post/`, postInfo)
    dispatch(setRequestStatus(false))
    if (res.status === 201) {
      dispatch(setRequestStatus(true))
      console.log('post created ', res.data)
      dispatch(getAllPosts())
    }
  } catch (error) {
    dispatch(errorHandler(error))
  }
}

// CREATE EVENT
export const createEvent = (eventInfo) => async (dispatch) => {
  try {
    const res = await axios.post(`${BASE_URL}/event/`, eventInfo)
    dispatch(setRequestStatus(false))
    if (res.status === 201) {
      dispatch(setRequestStatus(true))
      console.log('event created ', res.data)
      dispatch(getAllEvents())
    }
  } catch (error) {
    dispatch(errorHandler(error))
  }
}

// CREATE PROJECT
export const createProject = (projectInfo) => async (dispatch) => {
  try {
    console.log('projectInfo ', projectInfo)
    const res = await axios.post(`${BASE_URL}/project/`, projectInfo)
    dispatch(setRequestStatus(false))
    if (res.status === 201) {
      dispatch(setRequestStatus(true))
      console.log('project created ', res.data)
      dispatch(getAllProjects())
    }
  } catch (error) {
    dispatch(errorHandler(error))
  }
}