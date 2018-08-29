// @flow

import { setSearchTerm } from './actions';

test('setSearchTerm', () => {
	expect(setSearchTerm('New York')).toMatchSnapshot();
});
