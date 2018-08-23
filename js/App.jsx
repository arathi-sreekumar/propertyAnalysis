import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Search from './Search';
import './App.css';

const FourOhFour = () => <h1>404</h1>;

const App = () => (
	<BrowserRouter>
		<div className="app">
			<Switch>
				<Route exact path="/" component={Search} />
				<Route component={FourOhFour} />
			</Switch>
		</div>
	</BrowserRouter>
);

export default App;

