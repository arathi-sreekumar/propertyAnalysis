// @flow

import { getPropertyDetailsByAreaUrl } from './requestUrls';

// function checkStatus(response) {
// 	if (response.status >= 200 && response.status < 300) {
// 		return response;
// 	}
// 	const error = new Error(response.statusText);
// 	error.response = response;
// 	throw error;
// }

export function fetchPropertyOverview(props: { searchTerm?: string }) {
	const options = props || {};
	const { searchTerm } = options;
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
			throw Error(response.statusText);
		}
		return response.json();
	});

	// .then(res => res.json());
}

export default fetchPropertyOverview;
