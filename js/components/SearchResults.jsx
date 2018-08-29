// @flow

import React from 'react';
import { connect } from 'react-redux';
import Search from './Search/Search';
import AreaPropertyOverview from './AreaPropertyOverview/AreaPropertyOverview';

/*
 * SearchResults component: shows search and area property details components
 * Connects to redux store to use searchTerm property from store
*/
const SearchResults = (props: { search: string }) => {
	const search = props.search || '';
	return (
		<div>
			<h1 className="title">Property Information</h1>
			<Search {...props} />
			<h2 className="subtitle">Search Results</h2>
			<AreaPropertyOverview searchTerm={search} />
		</div>
	);
};

const mapStateToProps = state => ({
	searchTerm: state.searchTerm
});

export default connect(mapStateToProps)(SearchResults);
