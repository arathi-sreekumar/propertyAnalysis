import { fetchPropertyOverview } from './apiHelper';
import { getPropertyDetailsByAreaUrl } from './requestUrls';

jest.mock('./requestUrls', () => ({
	getPropertyDetailsByAreaUrl: jest.fn()
}));

const SEARCH_TERM = 'BN10';
const ENDPOINT = `https://cors-anywhere.herokuapp.com/https://api.zoopla.co.uk/api/v1/zed_index.js?area=${SEARCH_TERM}&output_type=outcode&api_key=nnkuseks2pp3ut5je382p2r3`;

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

				it('takes search to construct area url', async () => {
					await fetchPropertyOverview(SEARCH_TERM).then(() =>
						expect(getPropertyDetailsByAreaUrl).toHaveBeenCalledWith(SEARCH_TERM)
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
