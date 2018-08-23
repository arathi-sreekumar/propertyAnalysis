import React from 'react';
import { shallow } from 'enzyme';
import AreaPropertyOverview from './AreaPropertyOverview';

describe('AreaPropertyOverview', () => {
	it('renders correctly', () => {
		const component = shallow(<AreaPropertyOverview />);
		expect(component).toMatchSnapshot();
	});
});
