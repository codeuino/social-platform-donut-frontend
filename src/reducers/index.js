import { combineReducers } from 'redux';
import authReducers from './authReducer';
import postReducers from './postReducer';
import userReducers from './userReducer';
import errorReducer from './errorReducer';
import requestStatus from './requestStatus';
import notificationReducer from './notificationReducer'
import dashboardReducer from './dashboardReducer'
import insightReducer from './insightReducer';

const rootReducer = combineReducers({
  auth: authReducers,
  post: postReducers,
  user: userReducers,
  notification: notificationReducer,
  error: errorReducer,
  dashboard: dashboardReducer,
  insight: insightReducer,
  status: requestStatus
});

export default rootReducer;