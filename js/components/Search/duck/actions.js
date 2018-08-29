// @flow

import { SET_SEARCH_TERM } from './types';

// Redux: creates an action and returns it
export function setSearchTerm(searchTerm: string) {
	return { type: SET_SEARCH_TERM, payload: searchTerm };
}

export default {
	setSearchTerm
};
