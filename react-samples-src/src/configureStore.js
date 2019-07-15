import {
  applyMiddleware,
  combineReducers,
  // compose,
  createStore,
} from 'redux';
import { routerMiddleware } from 'react-router-redux';
import { connectRouter } from 'connected-react-router';

const middleware = [];

if (process.env.NODE_ENV !== 'production') {
  // eslint-disable-next-line global-require, import/no-extraneous-dependencies
  const reduxLogger = require('redux-logger');
  middleware.push(reduxLogger.createLogger());
}

export default function configureStore(initialState, reducers, history) {
  middleware.push(routerMiddleware(history));

  if (history) {
    middleware.push(routerMiddleware(history));
  }
  return createStore(
    combineReducers({ ...reducers, router: connectRouter(history) }),
    initialState,
    applyMiddleware(...middleware),
  );
}
