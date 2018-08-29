// @flow

import { getPropertyDetailsByAreaUrl } from './requestUrls';

/*
  * Function that gets Property details from Zoopla Api
  * @params props - an object that should contain 'searchTerm' which will be a PostCode
*/
export function fetchPropertyOverview(props: ?string) {
	const searchTerm = props;
	let url;

	if (searchTerm) {
		url = getPropertyDetailsByAreaUrl(searchTerm);
	} else {
		const error = new Error('Need to provide area or postcode');
		throw error;
	}

	return fetch(url, {
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json'
		},
		method: 'GET'
	}).then(response => {
		if (!response.ok) {
			throw new Error(response.statusText);
		}
		return response.json();
	});
}

export default fetchPropertyOverview;
