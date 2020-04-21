import { combineReducers } from 'redux';
import authReducers from './authReducer';
import postReducers from './postReducer';
import userReducers from './userReducer';
import errorReducer from './errorReducer';

const rootReducer = combineReducers({
  auth: authReducers,
  post: postReducers,
  user: userReducers,
  error: errorReducer
});

export default rootReducer;