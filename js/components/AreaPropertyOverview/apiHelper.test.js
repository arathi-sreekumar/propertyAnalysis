import { fetchPropertyOverview } from './apiHelper';
import { getPropertyDetailsByAreaUrl, getPropertyDetailsByPostCodeUrl } from './requestUrls';

jest.mock('./requestUrls', () => ({
	getPropertyDetailsByAreaUrl: jest.fn(),
	getPropertyDetailsByPostCodeUrl: jest.fn()
}));

const AREA = { area: 'BN10' };
const POSTCODE = { postcode: 'BN10' };
const ENDPOINT = `https://cors-anywhere.herokuapp.com/https://api.zoopla.co.uk/api/v1/zed_index.js?area=${
	AREA.area
}&output_type=outcode&api_key=nnkuseks2pp3ut5je382p2r3`;

describe('api helper', () => {
	beforeEach(() => {
		jest.clearAllMocks();
		fetch.resetMocks();
	});

	describe('fetch area property overview', () => {
		describe('resolves', () => {
			describe('url', () => {
				beforeEach(() => {
					fetch.mockResponseOnce(JSON.stringify({ data: '12345' }));
					getPropertyDetailsByAreaUrl.mockImplementationOnce(() => ENDPOINT);
				});

				it('takes area to construct area url', async () => {
					await fetchPropertyOverview(AREA).then(() =>
						expect(getPropertyDetailsByAreaUrl).toHaveBeenCalledWith(AREA.area)
					);
				});

				it('takes postcode to construct postcode url', async () => {
					await fetchPropertyOverview(POSTCODE).then(() =>
						expect(getPropertyDetailsByPostCodeUrl).toHaveBeenCalledWith(POSTCODE.postcode)
					);
				});

				it('throws an error when no property is passed', async () => {
					const error = new Error('Need to provide area or postcode');
					expect(() => {
						fetchPropertyOverview();
					}).toThrow(error);
				});
			});
		});
	});
});
