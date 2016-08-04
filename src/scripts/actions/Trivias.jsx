import { TriviasActionType as ActionType } from '../constants/ActionTypes';

export const fetchTrivias = () =>
  ({ type: ActionType.FETCH_TRIVIAS });

export const updateTrivias = trivias =>
  ({ type: ActionType.UPDATE_TRIVIAS, trivias });

export const updateTrivia = trivia =>
  ({ type: ActionType.UPDATE_TRIVIA, trivia });

export const voteFor = (triviaId, choiceId) =>
  ({ type: ActionType.VOTE_FOR, triviaId, choiceId });
