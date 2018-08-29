// @flow

import React, { Component } from 'react';
import { fetchPropertyOverview } from './helpers/apiHelper';
import { extractZedIndexChartData, extractAreaDetails, getBoundingBox } from './helpers/dataHelper';
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

/*
 * AreaPropertyOverview component: This creates a combined view that shows the property details,
 * average price chart and selected location on a map, after fetching the data from zoopla api.
*/
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

	// This is to update the results if search string changes during a rerendering
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

	// fetchData method: Makes an api request if there is a searchTerm and handles the response
	async fetchData() {
		if (!this.props.searchTerm) {
			return;
		}

		try {
			const response = await fetchPropertyOverview(this.props.searchTerm);
			await this.setStateAsync({
				isLoaded: true,
				result: response
			});
		} catch (error) {
			this.setState({ error });
		}
	}

	render() {
		const { error, isLoaded, result } = this.state;

		if (!this.props.searchTerm) {
			return <div>You need to search for a postcode!</div>;
		}

		if (error) {
			return <div>Please enter a valid postcode! We could not find results for {this.props.searchTerm}</div>;
		}

		if (!isLoaded) {
			return <div>Loading...</div>;
		}

		if (result && Object.getOwnPropertyNames(result).length > 0) {
			const areaDetails = extractAreaDetails(result);
			const chartData = extractZedIndexChartData(result);
			const mapCenter = { lat: result.latitude, lng: result.longitude };
			const mapZoom = 11;
			const mapBounds = getBoundingBox(result.bounding_box);

			return (
				<div className="search-result">
					<AreaOverviewDetails area={areaDetails} />
					<AreaPriceChart data={chartData} />
					<GoogleMapWithMarker center={mapCenter} zoom={mapZoom} bounds={mapBounds} />
				</div>
			);
		}

		return <div>No search results found</div>;
	}
}

export default AreaPropertyOverview;
