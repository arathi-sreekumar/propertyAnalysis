// @flow

import React, { Component } from 'react';
import { fetchPropertyOverview } from './helpers/apiHelper';
import { extractZedIndexChartData, extractAreaDetails } from './helpers/dataHelper';
import AreaOverviewDetails from './AreaOverviewDetails';
import AreaPriceChart from './AreaPriceChart';
import GoogleMapWithMarker from '../common/GoogleMaps/MapWithAMarker';

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
		searchTerm?: string
	}
};

type FlowProps = {
	search: { searchTerm?: string }
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
		console.log(prevProps, this.props, 'In areaproperty did update fn');
		if (this.props.search.searchTerm !== prevProps.search.searchTerm) {
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
		this.setState({ search });
	}

	async fetchData() {
		if (!this.state.search || !this.state.search.searchTerm) {
			return;
		}

		const response = await fetchPropertyOverview(this.state.search);

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
