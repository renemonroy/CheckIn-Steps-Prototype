import fetch from 'isomorphic-fetch';
import { delay } from 'redux-saga';
import { fork, take, call, put } from 'redux-saga/effects';
import { config } from '../constants/Globals';
import { hashHistory } from 'react-router';
import { UIActions, TriviasActions, SnkrsActions } from '../actions';
import { UIActionType, TriviasActionType, SnkrsActionType } from '../constants/ActionTypes';

/** Services ----------------- */

const fullUrl = endpoint => `https://${config.API_ROOT}${endpoint}`;

function apiGet(endpoint) {
  return fetch(fullUrl(endpoint)).then(res => res.json());
}

function apiPost(endpoint, args) {
  return fetch(fullUrl(endpoint), {
    method: 'POST',
    mode: 'cors',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(args),
  })
  .then(res => res.json())
  .catch(err => console.log(err));
}


/** UI ----------------------- */

function* watchNavigate() {
  while (true) {
    const { pathname } = yield take(UIActionType.NAVIGATE);
    yield hashHistory.push(pathname);
  }
}

/** Trivias ------------------ */

function* watchFetchTriviasAction() {
  while (true) {
    yield take(TriviasActionType.FETCH_TRIVIAS);
    const trivias = yield call(apiGet, '/trivias');
    yield put(TriviasActions.receiveTrivias(trivias));
  }
}

function* watchVoteFor() {
  while (true) {
    const { triviaId, choiceId } = yield take(TriviasActionType.VOTE_FOR);
    const res = yield call(apiPost, '/trivias/vote-for', {
      triviaId: parseInt(triviaId, 10),
      choiceId: parseInt(choiceId, 10),
    });
    yield put(SnkrsActions.fetchSnkrs());
    yield put(UIActions.playAudio(res.trivia[triviaId].choices[choiceId].assets.audio));
    yield put(TriviasActions.receiveTrivia(res.trivia));
    yield delay(2500);
    yield put(UIActions.navigate(`/snkrs/${res.snkrId}`));
  }
}

/** Snkrs -------------------- */

function* watchFetchSnkrsAction() {
  while (true) {
    yield take(SnkrsActionType.FETCH_SNKRS);
    const snkrs = yield call(apiGet, '/snkrs');
    yield put(SnkrsActions.receiveSnkrs(snkrs));
  }
}


/** Initializer -------------- */

function* startSaga() {
  yield delay(1000);
  yield put(TriviasActions.fetchTrivias());
}

export default function* root() {
  yield [
    fork(watchNavigate),
    fork(watchFetchTriviasAction),
    fork(watchVoteFor),
    fork(watchFetchSnkrsAction),
    fork(startSaga),
  ];
}
