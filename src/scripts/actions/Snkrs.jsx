import { SnkrsActionType as ActionType } from '../constants/ActionTypes';

export const fetchSnkrs = () =>
  ({ type: ActionType.FETCH_SNKRS });

export const receiveSnkrs = snkrs =>
  ({ type: ActionType.RECEIVE_SNKRS, snkrs });
