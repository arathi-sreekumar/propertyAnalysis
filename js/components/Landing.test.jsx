import React from 'react';
import { render } from 'enzyme';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import store from './store';
import Landing from './Landing';

describe('Landing', () => {
	it('renders correctly', () => {
		const component = render(
			<Provider store={store}>
				<MemoryRouter>
					<Landing />
				</MemoryRouter>
			</Provider>
		);
		expect(component).toMatchSnapshot();
	});
});
