// @flow

import React from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from 'react-google-maps';
import { number, shape } from 'prop-types';
import { getApiKey } from './constants/googleMapsApiKey';

const MapWithAMarker = withScriptjs(
	withGoogleMap(props => {
		const { center, zoom } = props;
		return (
			<GoogleMap defaultZoom={zoom} defaultCenter={center}>
				<Marker position={center} />
			</GoogleMap>
		);
	})
);

MapWithAMarker.propTypes = {
	center: shape({
		lat: number,
		lng: number
	}).isRequired,
	zoom: number.isRequired
};

const GoogleMapWithMarker = (props: { center: {}, zoom: number }) => {
	const { center, zoom } = props;
	const apiKey = getApiKey();
	const googleMapURL = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&v=3.exp&libraries=geometry,drawing,places`;

	return (
		<MapWithAMarker
			googleMapURL={googleMapURL}
			loadingElement={<div style={{ height: `100%` }} />}
			containerElement={<div style={{ height: `400px` }} />}
			mapElement={<div style={{ height: `100%` }} />}
			zoom={zoom}
			center={center}
		/>
	);
};

GoogleMapWithMarker.propTypes = {
	center: shape({
		lat: number,
		lng: number
	}).isRequired,
	zoom: number.isRequired
};

export default GoogleMapWithMarker;
