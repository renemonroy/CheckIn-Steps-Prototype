import { ui as initialState } from '../constants/initialStates';
import { UIActionType as ActionType } from '../constants/ActionTypes';
import { fromJS } from 'immutable';

function playAudio(state, src) {
  return state.mergeIn(['audioPlayer'], fromJS({ status: 1, src }));
}

function UI(state = initialState, action) {
  switch (action.type) {
    case ActionType.PLAY_AUDIO:
      return playAudio(state, action.src);
    default:
      return state;
  }
}

export default UI;
