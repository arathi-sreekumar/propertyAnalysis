// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
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
	searchTerm: ?string
};

class AreaPropertyOverview extends Component {
	state: FlowState;

	state = {
		error: null,
		isLoaded: false,
		result: null,
		searchTerm: ''
	};

	componentDidMount() {
		this.fetchData();
	}

	componentDidUpdate(prevProps: { searchTerm: ?string }) {
		if (this.props.searchTerm !== prevProps.searchTerm) {
			this.setSearchState(this.props.searchTerm);

			this.fetchData();
		}
	}

	setStateAsync(state: {}) {
		return new Promise(resolve => {
			this.setState(state, resolve);
		});
	}

	setSearchState(searchTerm: ?string) {
		if (searchTerm) {
			this.setState({ searchTerm });
		}
	}

	props: {
		searchTerm: ?string
	};

	async fetchData() {
		if (!this.props.searchTerm) {
			return;
		}

		const response = await fetchPropertyOverview(this.props.searchTerm);

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
				<div className="search-result">
					<AreaOverviewDetails area={areaDetails} />
					<AreaPriceChart data={chartData} />
					<GoogleMapWithMarker center={mapCenter} zoom={mapZoom} />
				</div>
			);
		}

		return <div>No search results found</div>;
	}
}

const mapStateToProps = state => ({
	searchTerm: state.searchTerm
});

export default connect(mapStateToProps)(AreaPropertyOverview);

export const Unwrapped = AreaPropertyOverview;
