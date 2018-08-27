// @flow

type FlowChartData = {
	zed_index?: string,
	zed_index_3month?: number,
	zed_index_6month?: number,
	zed_index_1year?: number,
	zed_index_2year?: number,
	zed_index_3year?: number,
	zed_index_4year?: number,
	zed_index_5year?: number
};

type FlowAreaDetails = {
	area_name?: string,
	country?: string,
	county?: string,
	postcode?: string,
	street?: string,
	town?: string,
	zed_index?: string
};

export const extractZedIndexChartData = (data?: FlowChartData) => {
	if (!data) {
		return [];
	}

	const chartData = [];

	const addToChartDataArray = (period, price) => {
		if (price) {
			chartData.push({ x: period, y: price });
		}
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

export const extractAreaDetails = (data: FlowAreaDetails) => {
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
