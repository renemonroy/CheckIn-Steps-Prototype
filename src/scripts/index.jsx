import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, IndexRedirect, hashHistory } from 'react-router';
import App from './components';
import * as Scenes from './components/scenes';
import configureStore from './utils/configureStore';

const appStore = configureStore();

const routes = (
  <Route path="/" component={App}>
    <Route path="/snkr-vote" component={Scenes.SnkrVoteScene} />
    <IndexRedirect to="/snkr-vote" />
  </Route>
);

ReactDOM.render(
  <Provider store={appStore}>
    <Router history={hashHistory} routes={routes} />
  </Provider>,
  document.getElementById('app-wrapper')
);
