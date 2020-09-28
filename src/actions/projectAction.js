import axios from 'axios';
import { errorHandler } from '../utils/errorHandler';
import { setRequestStatus } from '../utils/setRequestStatus';
import { GET_ALL_PROJECTS, GET_SINGLE_PROJECT } from './types';
import { BASE_URL } from './baseApi'

// CREATE PROJECT
export const createProject = (projectInfo) => async (dispatch) => {
  try {
    console.log('projectInfo ', projectInfo)
    const res = await axios.post(`${BASE_URL}/project/`, projectInfo)
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
export const getAllProjects = (pagination = 6, page = 1) => async (dispatch) => {
  try {
    const res = await axios.get(`${BASE_URL}/project/?pagination=${pagination}&page=${page}`)
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

// GET PROJECT BY ID 
export const getProjectById = (projectId) => async (dispatch) => {
  try {
    const res = await axios.get(`${BASE_URL}/project/${projectId}`)
    dispatch(setRequestStatus(false))
    if(res.status === 200) {
      dispatch(setRequestStatus(true));
      dispatch({
        type: GET_SINGLE_PROJECT,
        payload: res.data.project
      })
    }
  } catch(error) {
    dispatch(errorHandler(error))
  }
}

// UPDATE PROJECT 
export const updateProject = (projectId, updatedInfo) => async (dispatch) => {
  try {
    const res = await axios.patch(`${BASE_URL}/project/${projectId}`, updatedInfo)
    dispatch(setRequestStatus(false))
    if(res.status === 200) {
      dispatch(setRequestStatus(true));
      console.log('updated project info ', res.data)
      dispatch({
        type: GET_SINGLE_PROJECT,
        payload: res.data.project
      })
    }
  } catch(error) {
    dispatch(errorHandler(error))
  }
}

// DELETE PROJECT BY ID
export const deleteProjectById = (projectId, history) => async (dispatch) => {
  try {
    const res = await axios.delete(`${BASE_URL}/project/${projectId}`)
    dispatch(setRequestStatus(false))
    if(res.status === 200) {
      dispatch(setRequestStatus(true))
      console.log('Project deleted', res.data.msg);
      // window.location.href = '/projects'
      // dispatch(getAllProjects())
      history.push('/projects');
    }
  } catch(error) {
    dispatch(errorHandler(error))
  }
}
