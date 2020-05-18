import { SET_ERROR } from "../actions/types"

export const errorHandler = (error) => {
  return {
    type: SET_ERROR,
    payload: error.message
  }
}