import { createStore, applyMiddleware, compose } from 'redux';
import thunk  from 'redux-thunk';
import rootReducer from './reducers/index';

const middleware = [thunk];
const initialState = {};
let composeEnhancers;
let enhancer;

if(process.env.NODE_ENV === "development") {
  composeEnhancers =
    typeof window === 'object' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) : compose;

  enhancer = composeEnhancers(
    applyMiddleware(...middleware),
  );
}
const store = createStore(rootReducer, initialState, enhancer);

export default store;
