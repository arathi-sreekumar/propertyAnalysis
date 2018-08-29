// @flow

import { SET_SEARCH_TERM } from './types';

declare type ActionType = 'SET_SEARCH_TERM';

declare type ActionT<A: ActionType, P> = {|
	type: A,
	payload: P
|};

type Action = ActionT<'SET_SEARCH_TERM', string>;

/*
	searchReducer: Redux reducer function to store search term
*/
const searchReducer = (state: string = '', action: Action) => {
	switch (action.type) {
		case SET_SEARCH_TERM:
			return action.payload;
		default:
			return state;
	}
};

export default searchReducer;
