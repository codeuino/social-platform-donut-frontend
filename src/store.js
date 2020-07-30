import { createStore, applyMiddleware, compose } from 'redux';
import thunk  from 'redux-thunk';
import rootReducer from './reducers/index';

const middleware = [thunk];
const initialState = {};

const composeEnhancers =
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) : compose;

const enhancer = composeEnhancers(
  applyMiddleware(...middleware),
);
const store = createStore(rootReducer, initialState, enhancer);

export default store;
