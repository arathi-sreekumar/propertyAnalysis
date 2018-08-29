// @flow

import { createStore, compose } from 'redux';
import rootReducer from './reducers';

// Redux store to keep all redux parameters
const store = createStore(
	rootReducer,

	/* Adding redux Devtool support */
	compose(
		typeof window === 'object' && typeof window.devToolsExtension !== 'undefined'
			? window.devToolsExtension()
			: f => f
	)
);

export default store;
