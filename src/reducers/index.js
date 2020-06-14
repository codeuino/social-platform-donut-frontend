import { combineReducers } from 'redux';
import authReducers from './authReducer';
import postReducers from './postReducer';
import userReducers from './userReducer';
import errorReducer from './errorReducer';
import requestStatus from './requestStatus';
import notificationReducer from './notificationReducer'

const rootReducer = combineReducers({
  auth: authReducers,
  post: postReducers,
  user: userReducers,
  notification: notificationReducer,
  error: errorReducer,
  status: requestStatus
});

export default rootReducer;