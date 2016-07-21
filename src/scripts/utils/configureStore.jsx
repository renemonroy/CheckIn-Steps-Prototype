import { createStore, applyMiddleware } from 'redux';
import createLogger from 'redux-logger';
import CombineReducers from '../reducers';

export default function configureStore() {
  const loggerMiddleware = createLogger();
  const middlewares = applyMiddleware(loggerMiddleware);
  return createStore(CombineReducers, middlewares);
}
