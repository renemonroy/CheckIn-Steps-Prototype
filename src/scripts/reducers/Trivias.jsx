import { trivias as initialState } from '../constants/initialStates';
import { TriviasActionType as ActionType } from '../constants/ActionTypes';
import { fromJS } from 'immutable';

function updateTrivias(state, trivias) {
  return state.clear().merge(fromJS(trivias));
}

function updateTrivia(state, trivia) {
  return state.merge(fromJS(trivia));
}

function Trivias(state = initialState, action) {
  switch (action.type) {
    case ActionType.UPDATE_TRIVIAS:
      return updateTrivias(state, action.trivias);
    case ActionType.UPDATE_TRIVIA:
      return updateTrivia(state, action.trivia);
    default:
      return state;
  }
}

export default Trivias;
