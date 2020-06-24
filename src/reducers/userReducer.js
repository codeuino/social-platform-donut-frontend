import { GET_USER_PROFILE, UPDATE_USER_PROFILE, GET_USER_EVENTS, GET_USER_PROJECTS, GET_USER_POSTS } from '../actions/types'
const initialState = {
  userProfile: {},
  userEvents: [],
  userProjects: [],
  userPosts: []
}

export default (state = initialState, action) => {
  switch(action.type) {
    case GET_USER_PROFILE: {
      return {
        ...state,
        userProfile: action.payload
      };
    }
    case GET_USER_EVENTS: {
      return {
        ...state,
        userEvents: [...action.payload],
      };
    }
    case GET_USER_PROJECTS: {
      return {
        ...state,
        userProjects: [...action.payload]
      }
    }
    case GET_USER_POSTS: {
      return {
        ...state,
        userPosts: action.payload
      }
    }
    case UPDATE_USER_PROFILE: {
      return {
        ...state,
        userProfile: action.payload
      }
    }
    default: {
      return state
    }
  }
}