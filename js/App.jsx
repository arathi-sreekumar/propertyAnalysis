// @flow

import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './components/store';
import Landing from './components/Landing/Landing';
import './App.css';

const FourOhFour = () => <h1>404</h1>;

const App = () => (
	<BrowserRouter>
		<Provider store={store}>
			<Switch>
				<Route exact path="/" component={Landing} />
				<Route component={FourOhFour} />
			</Switch>
		</Provider>
	</BrowserRouter>
);

export default App;
