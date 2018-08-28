// @flow

import React from 'react';
import { connect } from 'react-redux';
import Search from './Search/Search';
import AreaPropertyOverview from './AreaPropertyOverview/AreaPropertyOverview';

const SearchResults = (props: {}) => (
	<div>
		<h1 className="title">Property Information</h1>
		<Search {...props} />
		<h2 className="subtitle">Search Results</h2>
		<div>
			<code>{JSON.stringify(props)}</code>
		</div>
		<AreaPropertyOverview {...props} />
	</div>
);

const mapStateToProps = state => ({
	searchTerm: state.searchTerm
});

export default connect(mapStateToProps)(SearchResults);
