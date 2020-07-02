import { combineReducers } from 'redux';
import authReducers from './authReducer';
import postReducers from './postReducer';
import userReducers from './userReducer';
import errorReducer from './errorReducer';
import requestStatus from './requestStatus';
import notificationReducer from './notificationReducer'
import dashboardReducer from './dashboardReducer'
import insightReducer from './insightReducer';
import orgReducer from './orgReducer';
import eventReducer from './eventReducer';
import projectReducer from './projectReducer';
import adminReducers from './adminReducers';
import commentReducer from './commentReducer';

const rootReducer = combineReducers({
  auth: authReducers,
  post: postReducers,
  user: userReducers,
  notification: notificationReducer,
  error: errorReducer,
  dashboard: dashboardReducer,
  insight: insightReducer,
  org: orgReducer,
  event: eventReducer,
  project: projectReducer,
  admin: adminReducers,
  comment: commentReducer,
  status: requestStatus
});

export default rootReducer;