// @flow

import { combineReducers } from 'redux';
import searchReducer from './Search/duck/reducers';

const rootReducer = combineReducers({
	searchTerm: searchReducer
});

export default rootReducer;
