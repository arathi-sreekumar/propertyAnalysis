import React from 'react';
import { render, mount } from 'enzyme';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import store from '../store';
import { setSearchTerm } from './duck/actions';
import Search from './Search';

jest.mock('../SearchResults/SearchResults');

describe('Search', () => {
	it('renders correctly when search word is empty', () => {
		const searchWord = '';
		store.dispatch(setSearchTerm(searchWord));
		const component = render(
			<Provider store={store}>
				<MemoryRouter>
					<Search />
				</MemoryRouter>
			</Provider>
		);
		expect(component).toMatchSnapshot();
		expect(component.find('.input').attr('value')).toBe(searchWord);
	});
	it('renders correctly for a given search word "bn10"', () => {
		const searchWord = 'bn10';
		store.dispatch(setSearchTerm(searchWord));
		const component = render(
			<Provider store={store}>
				<MemoryRouter>
					<Search />
				</MemoryRouter>
			</Provider>
		);
		expect(component).toMatchSnapshot();
		expect(component.find('.input').attr('value')).toBe(searchWord);
	});
	it('submits the form with correct url', () => {
		const history = createMemoryHistory('/');
		const spyHistoryPush = jest.spyOn(history, 'push');
		const searchWord = 'bn10';
		store.dispatch(setSearchTerm(searchWord));
		const component = mount(
			<Provider store={store}>
				<MemoryRouter>
					<Search history={history} />
				</MemoryRouter>
			</Provider>
		);
		component
			.find('form.search')
			.first()
			.simulate('submit');
		expect(spyHistoryPush).toHaveBeenCalledTimes(1);
		expect(spyHistoryPush).toHaveBeenCalledWith('/searchResults/bn10');
	});
});
