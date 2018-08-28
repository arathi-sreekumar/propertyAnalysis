// @flow

import { combineReducers } from 'redux';
import searchReducer from './Search/duck/reducers';

const rootReducer = combineReducers({
	search: searchReducer
});

export default rootReducer;
