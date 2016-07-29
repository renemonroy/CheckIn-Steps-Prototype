import { combineReducers } from 'redux';
import { default as ui } from './UI';
import { default as snkrs } from './Snkrs';
import { default as trivias } from './Trivias';

const CombinedReducers = combineReducers({ ui, snkrs, trivias });
export default CombinedReducers;
