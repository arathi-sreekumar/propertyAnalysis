// @flow

import React from 'react';
import { render } from 'react-dom';
import App from './App';

const renderApp = () => {
	render(<App />, document.getElementById('app'));
};
renderApp();

// Uses hot module rendering to re-render only changed branches
if (module.hot) {
	module.hot.accept('./App', () => {
		renderApp();
	});
}
