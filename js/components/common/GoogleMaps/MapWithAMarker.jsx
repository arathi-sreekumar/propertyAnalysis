// @flow

import React from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker, Rectangle } from 'react-google-maps';

import { number, shape } from 'prop-types';
import { getApiKey } from '../constants/googleMapsApiKey';

/*
 * MapWithAMarker component: Create a google map component showing selected location
 * with a marker and bounding area if available
*/
const MapWithAMarker = withScriptjs(
	withGoogleMap(props => {
		const { center, zoom } = props;
		let bounds;

		// Google maps globals are only available here, hence this computation needs to happen here
		if (props.bounds) {
			const sw = new window.google.maps.LatLng(props.bounds.sw.lat, props.bounds.sw.lng);
			const ne = new window.google.maps.LatLng(props.bounds.ne.lat, props.bounds.ne.lng);
			bounds = new window.google.maps.LatLngBounds(sw, ne);
		}
		return (
			<GoogleMap defaultZoom={zoom} defaultCenter={center}>
				<Marker position={center} />
				{props.bounds && <Rectangle editable={false} bounds={bounds} />}
			</GoogleMap>
		);
	})
);

MapWithAMarker.propTypes = {
	center: shape({
		lat: number,
		lng: number
	}).isRequired,
	zoom: number.isRequired,
	bounds: shape({
		sw: shape({ lat: number, lng: number }),
		ne: shape({ lat: number, lng: number })
	})
};

/*
 * GoogleMapWithMarker: Wrapper component for above component to attach the api url
*/
const GoogleMapWithMarker = (props: { center: {}, zoom: number, bounds: mixed }) => {
	const { center, zoom, bounds } = props;
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
			bounds={bounds}
		/>
	);
};

GoogleMapWithMarker.propTypes = {
	center: shape({
		lat: number,
		lng: number
	}).isRequired,
	zoom: number.isRequired,
	bounds: shape({
		sw: shape({ lat: number, lng: number }),
		ne: shape({ lat: number, lng: number })
	})
};

GoogleMapWithMarker.defaultProps = {
	bounds: null
};

export default GoogleMapWithMarker;
