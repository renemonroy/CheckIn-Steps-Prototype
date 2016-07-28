import { UIActionType as ActionType } from '../constants/ActionTypes';

export const navigate = (pathname) =>
  ({ type: ActionType.NAVIGATE, pathname });
