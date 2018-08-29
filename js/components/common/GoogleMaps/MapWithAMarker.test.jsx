import React from 'react';
import { shallow } from 'enzyme';
import GoogleMapWithMarker from './MapWithAMarker';

const MAP_CENTER = {
	lat: 50.7983845,
	lng: 0.001313
};
const ZOOM = 11;
const BOUNDS = { sw: { lat: 50.785809, lng: -0.025241 }, ne: { lat: 50.81096, lng: 0.027867 } };

describe('GoogleMapWithMarker', () => {
	it('renders correctly', () => {
		const component = shallow(<GoogleMapWithMarker center={MAP_CENTER} zoom={ZOOM} bounds={BOUNDS} />);
		expect(component).toMatchSnapshot();
	});
});
