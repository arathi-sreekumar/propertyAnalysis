// @flow

import reducers from './reducers';

test('verify that root reducers sets the state correctly when a child reducer is invoked', () => {
	const state = reducers({ searchTerm: '' }, { type: 'SET_SEARCH_TERM', payload: 'black' });
	expect(state).toEqual({ searchTerm: 'black' });
});
