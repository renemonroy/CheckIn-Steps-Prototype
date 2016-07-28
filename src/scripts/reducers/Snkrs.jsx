import { snkrs as initialState } from '../constants/initialStates';
import { SnkrsActionType as ActionType } from '../constants/ActionTypes';
import { fromJS } from 'immutable';

function receiveSnkrs(state, snkrs) {
  return state.clear().merge(fromJS(snkrs));
}

function Snkrs(state = initialState, action) {
  switch (action.type) {
    case ActionType.RECEIVE_SNKRS:
      return receiveSnkrs(state, action.snkrs);
    default:
      return state;
  }
}

export default Snkrs;
