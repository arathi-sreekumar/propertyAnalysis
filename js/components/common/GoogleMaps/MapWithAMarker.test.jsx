import React from 'react';
import { shallow } from 'enzyme';
import GoogleMapWithMarker from './MapWithAMarker';

const MAP_CENTER = {
	lat: 50.7983845,
	lng: 0.001313
};
const ZOOM = 11;

describe('GoogleMapWithMarker', () => {
	it('renders correctly', () => {
		const component = shallow(<GoogleMapWithMarker center={MAP_CENTER} zoom={ZOOM} />);
		expect(component).toMatchSnapshot();
	});
});
