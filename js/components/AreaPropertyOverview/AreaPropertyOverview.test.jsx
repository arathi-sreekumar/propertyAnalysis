import React from 'react';
import { mount, render } from 'enzyme';
import { fetchPropertyOverview } from './helpers/apiHelper';
import AreaPropertyOverview from './AreaPropertyOverview';

jest.mock('./helpers/apiHelper');

const ZED_INDEX_RESPONSE = {
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

describe('AreaPropertyOverview', () => {
	describe('renders', () => {
		it('correctly for empty search', () => {
			const component = mount(<AreaPropertyOverview searchTerm="" />);
			expect(component).toMatchSnapshot();
		});
		it('correctly for search "bn10"', () => {
			const component = mount(<AreaPropertyOverview searchTerm="bn10" />);
			expect(component).toMatchSnapshot();
		});
	});
	describe('search receiving valid data', () => {
		beforeEach(() => {
			fetchPropertyOverview.mockImplementation(() => Promise.resolve({ ZED_INDEX_RESPONSE }));
		});

		test('fetchPropertyOverview is called', async () => {
			const searchTerm = 'bn10';
			const wrapper = mount(<AreaPropertyOverview searchTerm={searchTerm} />);
			await wrapper.instance().componentDidMount();
			expect(fetchPropertyOverview).toBeCalled();
		});
	});

	describe('search updates data correctly', async () => {
		beforeEach(() => {
			fetchPropertyOverview.mockImplementation(() => Promise.resolve({ ZED_INDEX_RESPONSE }));
		});
		test('updates correctly', async () => {
			const searchTerm = 'bn10';
			const newSearchTerm = 'bn11';
			const wrapper = mount(<AreaPropertyOverview searchTerm={searchTerm} />);
			await wrapper.instance().componentDidMount();
			expect(fetchPropertyOverview).toBeCalledWith(searchTerm);
			wrapper.setProps({ searchTerm: newSearchTerm });
			await wrapper.instance().componentDidMount();
			expect(fetchPropertyOverview).toBeCalledWith(newSearchTerm);
			expect(wrapper).toMatchSnapshot();
		});
	});

	describe('search receiving empty data', () => {
		beforeEach(() => {
			fetchPropertyOverview.mockImplementation(() => Promise.resolve({}));
		});

		test('renders correctly', async () => {
			const searchTerm = 'bn10';
			const wrapper = mount(<AreaPropertyOverview searchTerm={searchTerm} />);
			await wrapper.instance().componentDidMount();
			expect(wrapper).toMatchSnapshot();
		});
	});

	describe('search receiving null as data', () => {
		beforeEach(() => {
			fetchPropertyOverview.mockImplementation(() => Promise.resolve(null));
		});

		test('renders correctly', async () => {
			const searchTerm = 'bn10';
			const wrapper = mount(<AreaPropertyOverview searchTerm={searchTerm} />);
			await wrapper.instance().componentDidMount();
			expect(wrapper).toMatchSnapshot();
		});
	});

	describe('search with failed api call', () => {
		beforeEach(() => {
			fetchPropertyOverview.mockImplementation(() => {
				throw new Error('Invalid search');
			});
		});

		test('renders correctly', async () => {
			const searchTerm = 'peacehaven';
			const wrapper = mount(<AreaPropertyOverview searchTerm={searchTerm} />);
			await wrapper.instance().componentDidMount();
			expect(wrapper).toMatchSnapshot();
		});
	});

	// To do error handling
});
