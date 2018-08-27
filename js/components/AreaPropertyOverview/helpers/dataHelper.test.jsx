import { extractZedIndexChartData, extractAreaDetails } from './dataHelper';

const DATA = {
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

const AREA_OUTPUT = {
	area_name: ' BN10',
	country: 'England',
	county: 'East Sussex',
	postcode: 'BN10',
	street: '',
	town: '',
	zed_index: '295212'
};

const CHART_DATA_OUTPUT = [
	{ x: '5 year', y: 221783 },
	{ x: '4 year', y: 245716 },
	{ x: '3 year', y: 260725 },
	{ x: '2 year', y: 281450 },
	{ x: '1 year', y: 296335 },
	{ x: '6 months', y: 287006 },
	{ x: '3 months', y: 292878 },
	{ x: 'present', y: 295212 }
];

const DEFAULT_AREA_OUTPUT = {
	area_name: undefined,
	country: undefined,
	county: undefined,
	postcode: undefined,
	street: undefined,
	town: undefined,
	zed_index: undefined
};

describe('dataHelper', () => {
	describe('extractZedIndexChartData method', () => {
		it('returns expected output for a given complete input', () => {
			const result = extractZedIndexChartData(DATA);
			expect(result).toEqual(CHART_DATA_OUTPUT);
		});

		it('returns empty [] if passed null', () => {
			const result = extractZedIndexChartData(null);
			expect(result).toEqual([]);
		});
	});

	describe('extractAreaDetails method', () => {
		it('returns expected output for a given complete input', () => {
			const result = extractAreaDetails(DATA);
			expect(result).toEqual(AREA_OUTPUT);
		});

		it('returns default value undefined for all params if passed an empty object', () => {
			const result = extractAreaDetails({});
			expect(result).toEqual(DEFAULT_AREA_OUTPUT);
		});
	});
});
