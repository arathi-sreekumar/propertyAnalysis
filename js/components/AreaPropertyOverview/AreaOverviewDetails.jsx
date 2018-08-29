// @flow

import React from 'react';
import { string, shape } from 'prop-types';

type FlowAreaData = {
	area: {
		area_name?: string,
		country?: string,
		county?: string,
		postcode?: string,
		street?: string,
		town?: string,
		zed_index?: string
	}
};

/*
  * AreaOverviewDetails component displays basic details regarding an area
*/
const AreaOverviewDetails = (props: FlowAreaData) => {
	const county = props.area.county;
	const postcode = props.area.postcode;
	const street = props.area.street;
	const town = props.area.town;
	const country = props.area.country;
	const zedIndex = props.area.zed_index;
	const areaName = props.area.area_name;

	return (
		<ul>
			{areaName && <li>Area: {areaName}</li>}
			<li>Country: {country}</li>
			<li>County: {county}</li>
			{postcode && <li>PostCode: {postcode}</li>}
			{street && <li>Street: {street}</li>}
			{town && <li>Town: {town}</li>}
			<li> Average property price: £{zedIndex} </li>
		</ul>
	);
};

AreaOverviewDetails.propTypes = {
	area: shape({
		area_name: string,
		country: string,
		county: string,
		postcode: string,
		street: string,
		town: string,
		zed_index: string
	}).isRequired
};

AreaOverviewDetails.defaultProps = {
	area: {
		area_name: '-',
		country: '-',
		county: '-',
		postcode: '-',
		street: '-',
		town: '-',
		zed_index: '-'
	}
};

export default AreaOverviewDetails;
