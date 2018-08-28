import React from 'react';
import { shallow, mount } from 'enzyme';
import { fetchPropertyOverview } from './helpers/apiHelper';
import AreaPropertyOverview, { Unwrapped as UnwrappedAreaPropertyOverview } from './AreaPropertyOverview';

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
	it('renders correctly', () => {
		const component = shallow(<UnwrappedAreaPropertyOverview />);
		expect(component).toMatchSnapshot();
	});
	describe('search receiving valid data', () => {
		beforeEach(() => {
			fetchPropertyOverview.mockImplementation(() => Promise.resolve({ ZED_INDEX_RESPONSE }));
		});

		test('fetchPropertyOverview is called', async () => {
			const searchTerm = 'bn10';
			const wrapper = mount(<UnwrappedAreaPropertyOverview searchTerm={searchTerm} />);
			await wrapper.instance().componentDidMount();
			expect(fetchPropertyOverview).toBeCalled();
		});

		test('renders correctly', async () => {
			const searchTerm = 'bn10';
			const wrapper = mount(<UnwrappedAreaPropertyOverview searchTerm={searchTerm} />);
			await wrapper.instance().componentDidMount();
			expect(wrapper).toMatchSnapshot();
		});
	});

	describe('search receiving empty data', () => {
		beforeEach(() => {
			fetchPropertyOverview.mockImplementation(() => Promise.resolve({}));
		});

		test('renders correctly', async () => {
			const searchTerm = 'bn10';
			const wrapper = mount(<UnwrappedAreaPropertyOverview search={searchTerm} />);
			await wrapper.instance().componentDidMount();
			expect(wrapper).toMatchSnapshot();
		});
	});

	describe('search receiving empty data', () => {
		beforeEach(() => {
			fetchPropertyOverview.mockImplementation(() => Promise.resolve(null));
		});

		test('renders correctly', async () => {
			const searchTerm = 'bn10';
			const wrapper = mount(<UnwrappedAreaPropertyOverview search={searchTerm} />);
			await wrapper.instance().componentDidMount();
			expect(wrapper).toMatchSnapshot();
		});
	});

	describe('search receiving empty data', () => {
		beforeEach(() => {
			fetchPropertyOverview.mockImplementation(() => Promise.reject({ error: 'Failed!' }));
		});

		test('renders correctly', async () => {
			const searchTerm = 'bn10';
			const wrapper = mount(<UnwrappedAreaPropertyOverview search={searchTerm} />);
			await wrapper.instance().componentDidMount();
			expect(wrapper).toMatchSnapshot();
		});
	});
});
