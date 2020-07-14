import { GET_ALL_PROJECTS, GET_SINGLE_PROJECT } from '../actions/types'
const initialState = {
  allProjects: [],
  singleProject: {}
}

export default (state = initialState, action) => {
  switch(action.type) {
    case GET_ALL_PROJECTS: {
      return {
        ...state,
        allProjects: action.payload
      }
    }
    case GET_SINGLE_PROJECT: {
      return {
        ...state,
        singleProject: action.payload
      }
    }
    default:{
      return state
    }
  }
}