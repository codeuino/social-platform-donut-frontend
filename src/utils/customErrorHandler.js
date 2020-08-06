import { SET_ERROR } from "../actions/types"

export const customErrorHandler = (data) => {
  return {
    type: SET_ERROR,
    payload: data?.error
  }
}