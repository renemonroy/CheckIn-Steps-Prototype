import { combineReducers } from 'redux';
import { default as snkrs } from './Snkrs';
import { default as trivias } from './Trivias';

const CombinedReducers = combineReducers({ snkrs, trivias });
export default CombinedReducers;
