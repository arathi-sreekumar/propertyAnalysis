import React from 'react';
import { shallow } from 'enzyme';
import AreaOverviewDetails from './AreaOverviewDetails';

const AREA_DATA = {
	street: '',
	town: '',
	zed_index: '295212',
	postcode: 'BN10',
	country: 'England',
	area_name: ' BN10',
	county: 'East Sussex'
};

describe('AreaOverviewDetails', () => {
	it('renders correctly', () => {
		const component = shallow(<AreaOverviewDetails area={AREA_DATA} />);
		expect(component).toMatchSnapshot();
	});
});
