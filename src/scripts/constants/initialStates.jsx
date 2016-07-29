import { fromJS } from 'immutable';

export const ui = fromJS({
  audioPlayer: {
    status: 0, // 0=stop, 1=play, 2=pause
    src: '',
  },
});

export const trivias = fromJS({});

export const snkrs = fromJS({});
