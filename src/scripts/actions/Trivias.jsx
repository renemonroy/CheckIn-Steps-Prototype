import { TriviasActionType as ActionType } from '../constants/ActionTypes';

export const fetchTrivias = () =>
  ({ type: ActionType.FETCH_TRIVIAS });

export const receiveTrivias = trivias =>
  ({ type: ActionType.RECEIVE_TRIVIAS, trivias });
