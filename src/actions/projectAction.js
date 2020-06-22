import axios from 'axios';
import { errorHandler } from '../utils/errorHandler';
import { setRequestStatus } from '../utils/setRequestStatus';
import { GET_ALL_PROJECTS } from './types';

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

// GET ALL PROJECTS 
export const getAllProjects = (pagination = 10, page = 1) => async (dispatch) => {
  try {
    const res = await axios.get(`/project/?pagination=${pagination}&page=${page}`)
    dispatch(setRequestStatus(false))
    if(res.status === 200) {
      dispatch(setRequestStatus(true))
      console.log('all projects ', res.data.projects)
      dispatch({
        type: GET_ALL_PROJECTS,
        payload: res.data.projects
      })
    }
  } catch(error) {
    dispatch(errorHandler(error))
  }
}