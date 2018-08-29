// @flow

import { getApiKey } from '../../common/constants/zooplaApiKey';

const apiKey = getApiKey();

// This is used by the apiHelper to get zoopla api data for a area in postcode format
export const getPropertyDetailsByAreaUrl = (area: string) =>
	`https://CORS-Anywhere.HerokuApp.com/https://api.zoopla.co.uk/api/v1/zed_index.js?area=${area}&output_type=outcode&api_key=${apiKey}`;

// This is currently not used anywhere
export const getPropertyDetailsByPostCodeUrl = (postcode: string) =>
	`https://CORS-Anywhere.HerokuApp.com/https://api.zoopla.co.uk/api/v1/zed_index.js?postcode=${postcode}&output_type=outcode&api_key=${apiKey}`;

