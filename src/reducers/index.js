import { combineReducers } from "redux";
import authReducers from "./authReducer";
import postReducers from "./postReducer";
import userReducers from "./userReducer";
import errorReducer from "./errorReducer";
import requestStatus from "./requestStatus";
import notificationReducer from "./notificationReducer";
import dashboardReducer from "./dashboardReducer";
import insightReducer from "./insightReducer";
import orgReducer from "./orgReducer";
import eventReducer from "./eventReducer";
import projectReducer from "./projectReducer";
import proposalReducer from "./proposalReducer";
import adminReducers from "./adminReducers";
import commentReducer from "./commentReducer";
import analyticsReducer from './analyticsReducer';
import wikisReducer from './wikisReducer';

const rootReducer = combineReducers({
  auth: authReducers,
  post: postReducers,
  user: userReducers,
  notification: notificationReducer,
  error: errorReducer,
  dashboard: dashboardReducer,
  wikis: wikisReducer,
  insight: insightReducer,
  org: orgReducer,
  event: eventReducer,
  project: projectReducer,
  status: requestStatus,
  proposal: proposalReducer,
  admin: adminReducers,
  comment: commentReducer,
  analytics: analyticsReducer
});

export default rootReducer;
