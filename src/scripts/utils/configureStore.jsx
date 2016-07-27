import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import createLogger from 'redux-logger';
import CombineReducers from '../reducers';

export default function configureStore() {
  const sagaMiddleware = createSagaMiddleware();
  const loggerMiddleware = createLogger();
  const middlewares = applyMiddleware(sagaMiddleware, loggerMiddleware);
  const store = createStore(CombineReducers, middlewares);
  store.runSaga = sagaMiddleware.run;
  return store;
}
