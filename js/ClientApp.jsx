// @flow

import React from 'react';
import { render } from 'react-dom';
import App from './App';

// declare var module: {
// 	hot: {
// 		accept(path: string, callback: () => void): void
// 	}
// };

const renderApp = () => {
	render(<App />, document.getElementById('app'));
};
renderApp();

if (module.hot) {
	module.hot.accept('./App', () => {
		renderApp();
	});
}
