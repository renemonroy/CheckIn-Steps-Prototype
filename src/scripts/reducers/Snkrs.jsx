import { snkrs as initialState } from '../constants/initialStates';
import { SnkrsActionType as ActionType } from '../constants/ActionTypes';
import { fromJS } from 'immutable';

function updateSnkrs(state, snkrs) {
  return state.clear().merge(fromJS(snkrs));
}

function Snkrs(state = initialState, action) {
  switch (action.type) {
    case ActionType.UPDATE_SNKRS:
      return updateSnkrs(state, action.snkrs);
    default:
      return state;
  }
}

export default Snkrs;
