import { trivias as initialState } from '../constants/initialStates';
import { TriviasActionType as ActionType } from '../constants/ActionTypes';
import { fromJS } from 'immutable';

function receiveTrivias(state, trivias) {
  return state.clear().merge(fromJS(trivias));
}

function Trivias(state = initialState, action) {
  switch (action.type) {
    case ActionType.RECEIVE_TRIVIAS:
      return receiveTrivias(state, action.trivias);
    default:
      return state;
  }
}

export default Trivias;
