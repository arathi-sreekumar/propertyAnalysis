import { SET_SEARCH_TERM } from './types';

const DEFAULT_STATE = {
	searchTerm: ''
};

const setSearchTerm = (state, action) => Object.assign({}, state, { searchTerm: action.payload });

const searchReducer = (state = DEFAULT_STATE, action) => {
	switch (action.type) {
		case SET_SEARCH_TERM:
			return setSearchTerm(state, action);
		default:
			return state;
	}
};

export default searchReducer;
