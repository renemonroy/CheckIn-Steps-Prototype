import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, IndexRedirect, hashHistory } from 'react-router';
import App from './components';
import * as scenes from './components/scenes';
import configureStore from './utils/configureStore';
import rootSaga from './sagas';

const appStore = configureStore();
appStore.runSaga(rootSaga);

const routes = (
  <Route path="/" component={App}>
    <Route path="/trivias/:triviaId" component={scenes.TriviaScene} />
    <Route path="/snkrs/:snkrId" component={scenes.SnkrScene} />
    <IndexRedirect to="/trivias/1" />
  </Route>
);

ReactDOM.render(
  <Provider store={appStore}>
    <Router history={hashHistory} routes={routes} />
  </Provider>,
  document.getElementById('app-wrapper')
);
