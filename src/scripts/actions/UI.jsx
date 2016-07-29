import { UIActionType as ActionType } from '../constants/ActionTypes';

export const navigate = (pathname) =>
  ({ type: ActionType.NAVIGATE, pathname });

export const playAudio = (src) =>
  ({ type: ActionType.PLAY_AUDIO, src });
