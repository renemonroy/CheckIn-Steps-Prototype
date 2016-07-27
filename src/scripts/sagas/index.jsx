import fetch from 'isomorphic-fetch';
import { fork, take, call, put } from 'redux-saga/effects';
import { UIActionType, TriviasActionType } from '../constants/ActionTypes';
import { TriviasActions } from '../actions';
import { config } from '../constants/Globals';

/** Services ----------------- */

function callApi(endpoint) {
  return fetch(`https://${config.API_ROOT}${endpoint}`)
    .then(response => response.json());
}


/** UI ----------------------- */

function* watchNavigate() {
  while (true) {
    const { pathname } = yield take(UIActionType.NAVIGATE);
    yield history.push(pathname);
  }
}

/** Trivias ------------------ */

function* watchFetchTriviasAction() {
  while (true) {
    yield take(TriviasActionType.FETCH_TRIVIAS);
    const trivias = yield call(callApi, '/trivias');
    yield put(TriviasActions.receiveTrivias(trivias));
  }
}

export default function* root() {
  yield [
    fork(watchNavigate),
    fork(watchFetchTriviasAction),
  ];
}
