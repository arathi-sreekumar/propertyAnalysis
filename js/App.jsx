// @flow

import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './components/store';
import Landing from './components/Landing';
import SearchResults from './components/SearchResults';
import './App.css';

const FourOhFour = () => <h1>404</h1>;

/*
 * All application routing is handled here
*/
const App = () => (
	<BrowserRouter>
		<Provider store={store}>
			<Switch>
				<Route exact path="/" component={Landing} />
				<Route
					path="/searchResults/:searchTerm?"
					component={(props: { match: Match }) => (
						<SearchResults search={props.match.params.searchTerm || ''} {...props} />
					)}
				/>
				<Route component={FourOhFour} />
			</Switch>
		</Provider>
	</BrowserRouter>
);

export default App;
