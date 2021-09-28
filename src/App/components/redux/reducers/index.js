import { combineReducers } from 'redux';
import weatherReducer from './weatherReducer';
import cityReducer from './cityReducer';
const rootRedicer = combineReducers({ weathers: weatherReducer, cities: cityReducer });

export default rootRedicer;