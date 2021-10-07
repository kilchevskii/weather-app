import { combineReducers } from 'redux';
import weatherReducer from './weatherReducer';
const rootRedicer = combineReducers({ weathers: weatherReducer });

export default rootRedicer;