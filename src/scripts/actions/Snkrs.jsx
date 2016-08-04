import { SnkrsActionType as ActionType } from '../constants/ActionTypes';

export const fetchSnkrs = () =>
  ({ type: ActionType.FETCH_SNKRS });

export const updateSnkrs = snkrs =>
  ({ type: ActionType.UPDATE_SNKRS, snkrs });
