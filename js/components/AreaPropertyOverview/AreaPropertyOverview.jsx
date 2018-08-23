import { string, shape } from 'prop-types';
import React from 'react';
import { fetchPropertyOverview } from './apiHelper';
import AreaOverviewDetails from './AreaOverviewDetails';
import AreaPriceChart from './AreaPriceChart';
import GoogleMapWithMarker from '../common/MapWithAMarker';

const extractZedIndexChartData = data => {
	const chartData = [];

	const addToChartDataArray = (period, price) => {
		chartData.push({ x: period, y: price });
	};
	addToChartDataArray('present', parseInt(data.zed_index, 10));
	addToChartDataArray('3 months', data.zed_index_3month);
	addToChartDataArray('6 months', data.zed_index_6month);
	addToChartDataArray('1 year', data.zed_index_1year);
	addToChartDataArray('2 year', data.zed_index_2year);
	addToChartDataArray('3 year', data.zed_index_3year);
	addToChartDataArray('4 year', data.zed_index_4year);
	addToChartDataArray('5 year', data.zed_index_5year);

	return chartData.reverse();
};

const extractAreaDetails = data => {
	const { area_name, country, county, postcode, street, town, zed_index } = data;
	const areaDetails = {
		area_name,
		country,
		county,
		postcode,
		street,
		town,
		zed_index
	};
	return areaDetails;
};

class AreaPropertyOverview extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			error: null,
			isLoaded: false,
			result: null,
			search: props.search
		};
	}

	async componentDidMount() {
		await this.fetchData();
	}

	async componentDidUpdate(prevProps) {
		if (
			this.props.search.area !== prevProps.search.area ||
			this.props.search.postcode !== prevProps.search.postcode
		) {
			this.setSearchState(this.props.search);
			await this.fetchData();
		}
	}

	setStateAsync(state) {
		return new Promise(resolve => {
			this.setState(state, resolve);
		});
	}

	setSearchState(search) {
		this.setState({ search });
	}

	async fetchData() {
		if (!this.state.search || (!this.state.search.area && !this.state.search.postcode)) {
			return;
		}
		// const response = await fetchPropertyOverview(this.state.search);

		// TODO: remove hard coding and enable above line back
		const response = {
			area_url: 'https://www.zoopla.co.uk/home-values/bn10',
			street: '',
			zed_index_1year: 296335,
			town: '',
			zed_index: '295212',
			zed_index_2year: 281450,
			zed_index_3year: 260725,
			latitude: 50.7983845,
			postcode: 'BN10',
			zed_index_6month: 287006,
			country: 'England',
			longitude: 0.001313,
			area_name: ' BN10',
			zed_index_3month: 292878,
			zed_index_4year: 245716,
			county: 'East Sussex',
			zed_index_5year: 221783,
			bounding_box: {
				longitude_min: '-0.025241',
				latitude_min: '50.785809',
				longitude_max: '0.027867',
				latitude_max: '50.81096'
			}
		};

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
}

AreaPropertyOverview.propTypes = {
	search: shape({
		area: string,
		postcode: string
	})
};

AreaPropertyOverview.defaultProps = {
	search: null
};

export default AreaPropertyOverview;
