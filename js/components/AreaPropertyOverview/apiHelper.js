import { getPropertyDetailsByAreaUrl, getPropertyDetailsByPostCodeUrl } from './requestUrls';

// function checkStatus(response) {
// 	if (response.status >= 200 && response.status < 300) {
// 		return response;
// 	}
// 	const error = new Error(response.statusText);
// 	error.response = response;
// 	throw error;
// }

export function fetchPropertyOverview(props) {
	const options = props || {};
	const { area, postcode } = options;
	let url;

	if (area) {
		url = getPropertyDetailsByAreaUrl(area);
	} else if (postcode) {
		url = getPropertyDetailsByPostCodeUrl(postcode);
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
