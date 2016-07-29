import { trivias as initialState } from '../constants/initialStates';
import { TriviasActionType as ActionType } from '../constants/ActionTypes';
import { fromJS } from 'immutable';

function receiveTrivias(state, trivias) {
  return state.clear().merge(fromJS(trivias));
}

function receiveTrivia(state, trivia) {
  return state.merge(fromJS(trivia));
}

function Trivias(state = initialState, action) {
  switch (action.type) {
    case ActionType.RECEIVE_TRIVIAS:
      return receiveTrivias(state, action.trivias);
    case ActionType.RECEIVE_TRIVIA:
      return receiveTrivia(state, action.trivia);
    default:
      return state;
  }
}

export default Trivias;
