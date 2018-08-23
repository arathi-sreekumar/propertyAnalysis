import React from 'react';
import { string, shape } from 'prop-types';

const AreaOverviewDetails = props => {
	const { country, county, postcode, street, town } = props.area;
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
