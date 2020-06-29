import { GET_ALL_POSTS, GET_ALL_PINNED_POSTS } from '../actions/types'
const initialState = {
  allPosts: [],
  pinnedPosts: []
}

export default (state = initialState, action) => {
  switch(action.type) {
    case GET_ALL_POSTS: {
      return {
        ...state,
        allPosts: action.payload
      }
    }
    case GET_ALL_PINNED_POSTS: {
      return {
        ...state,
        pinnedPosts: action.payload
      }
    }
    default:{
      return state
    }
  }
}