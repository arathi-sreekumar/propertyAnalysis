// @flow

import { combineReducers } from 'redux';
import searchReducer from './Search/duck/reducers';

// Root reducer: combines all other reducers in the project
const rootReducer = combineReducers({
	searchTerm: searchReducer
});

export default rootReducer;
