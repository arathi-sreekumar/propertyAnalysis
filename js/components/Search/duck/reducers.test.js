// @flow

import reducers from './reducers';

test('SET_SEARCH_TERM', () => {
	const state = reducers('', { type: 'SET_SEARCH_TERM', payload: 'black' });
	expect(state).toEqual('black');
});
