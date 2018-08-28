import { SET_SEARCH_TERM } from './types';

export function setSearchTerm(searchTerm) {
	return { type: SET_SEARCH_TERM, payload: searchTerm };
}

export default {
	setSearchTerm
};
