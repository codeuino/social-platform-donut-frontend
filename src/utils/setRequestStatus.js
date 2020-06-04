import { SET_STATUS } from '../actions/types';
export const setRequestStatus = (status) => {
  return {
    type: SET_STATUS,
    payload: status
  }
}