import React from 'react';
import { shallow } from 'enzyme';
import AreaPriceChart from './AreaPriceChart';

const CHART_DATA = [
	{ x: 'present', y: 2100500 },
	{ x: '3 months', y: 2120500 },
	{ x: '6 months', y: 2150000 },
	{ x: '1 year', y: 2000200 }
];

describe('AreaPriceChart', () => {
	it('renders correctly', () => {
		const component = shallow(<AreaPriceChart data={CHART_DATA} />);
		expect(component).toMatchSnapshot();
	});
});
