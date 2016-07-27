import { TriviasActionType as ActionType } from '../constants/ActionTypes';

export const fetchTrivias = () =>
  ({ type: ActionType.FETCH_TRIVIAS });

export const receiveTrivias = trivias =>
  ({ type: ActionType.RECEIVE_TRIVIAS, trivias });


// export const getTriviasList = () =>
//   ({ type: ActionType.GET_TRIVIAS_LIST });
//
// export const selectTriviaOption = (triviaId, optionId) =>
//   ({ type: ActionType.SELECT_TRIVIA_OPTION, triviaId, optionId });
