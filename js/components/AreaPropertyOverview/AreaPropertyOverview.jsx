// @flow

import React, { Component } from 'react';
import { fetchPropertyOverview } from './helpers/apiHelper';
import { extractZedIndexChartData, extractAreaDetails } from './helpers/dataHelper';
import AreaOverviewDetails from './AreaOverviewDetails';
import AreaPriceChart from './AreaPriceChart';
import GoogleMapWithMarker from '../common/MapWithAMarker';

type FlowState = {
	error: ?{
		message: string
	},
	result: ?{
		zed_index?: string,
		zed_index_3month?: number,
		zed_index_6month?: number,
		zed_index_1year?: number,
		zed_index_2year?: number,
		zed_index_3year?: number,
		zed_index_4year?: number,
		zed_index_5year?: number,
		area_name?: string,
		country?: string,
		county?: string,
		postcode?: string,
		street?: string,
		town?: string,
		zed_index?: string,
		latitude?: number,
		longitude?: number
	},
	isLoaded: boolean,
	search: {
		area?: string,
		postcode?: string
	}
};

type FlowProps = {
	search: { area?: string, postcode?: string }
};

class AreaPropertyOverview extends Component {
	constructor(props: FlowProps) {
		super(props);
		this.state = {
			error: null,
			isLoaded: false,
			result: null,
			search: props.search
		};
	}

	state: FlowState;

	componentDidMount() {
		this.fetchData();
	}

	componentDidUpdate(prevProps: FlowProps) {
		if (
			this.props.search.area !== prevProps.search.area ||
			this.props.search.postcode !== prevProps.search.postcode
		) {
			this.setSearchState(this.props.search);
			this.fetchData();
		}
	}

	setStateAsync(state: {}) {
		return new Promise(resolve => {
			this.setState(state, resolve);
		});
	}

	setSearchState(search: {}) {
		this.setState(search);
	}

	async fetchData() {
		if (!this.state.search || (!this.state.search.area && !this.state.search.postcode)) {
			return;
		}
		const response = await fetchPropertyOverview(this.state.search);
		// const response = {
		// 	area_url: 'https://www.zoopla.co.uk/home-values/bn10',
		// 	street: '',
		// 	zed_index_1year: 296335,
		// 	town: '',
		// 	zed_index: '295212',
		// 	zed_index_2year: 281450,
		// 	zed_index_3year: 260725,
		// 	latitude: 50.7983845,
		// 	postcode: 'BN10',
		// 	zed_index_6month: 287006,
		// 	country: 'England',
		// 	longitude: 0.001313,
		// 	area_name: ' BN10',
		// 	zed_index_3month: 292878,
		// 	zed_index_4year: 245716,
		// 	county: 'East Sussex',
		// 	zed_index_5year: 221783,
		// 	bounding_box: {
		// 		longitude_min: '-0.025241',
		// 		latitude_min: '50.785809',
		// 		longitude_max: '0.027867',
		// 		latitude_max: '50.81096'
		// 	}
		// };

		await this.setStateAsync({
			isLoaded: true,
			result: response
		});
	}

	render() {
		const { error, isLoaded, result } = this.state;

		if (error) {
			return <div>Error: {error.message}</div>;
		}

		if (!isLoaded) {
			return <div>Loading...</div>;
		}

		if (result && Object.getOwnPropertyNames(result).length > 0) {
			const areaDetails = extractAreaDetails(result);
			const chartData = extractZedIndexChartData(result);
			const mapCenter = { lat: result.latitude, lng: result.longitude };
			const mapZoom = 11;

			return (
				<div>
					<AreaOverviewDetails area={areaDetails} />
					<AreaPriceChart data={chartData} />
					<GoogleMapWithMarker center={mapCenter} zoom={mapZoom} />
				</div>
			);
		}

		return <div>No search results found</div>;
	}
}

export default AreaPropertyOverview;
