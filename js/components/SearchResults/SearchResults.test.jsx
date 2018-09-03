import React from 'react';
import { render } from 'enzyme';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import store from '../store';
import SearchResults from './SearchResults';

describe('SearchResults', () => {
	it('renders correctly for empty search', () => {
		const search = '';
		const component = render(
			<Provider store={store}>
				<MemoryRouter>
					<SearchResults search={search} />
				</MemoryRouter>
			</Provider>
		);
		expect(component).toMatchSnapshot();
	});

	it('renders correctly for given search = bn10', () => {
		const search = 'bn10';
		const component = render(
			<Provider store={store}>
				<MemoryRouter>
					<SearchResults search={search} />
				</MemoryRouter>
			</Provider>
		);
		expect(component).toMatchSnapshot();
	});
});
