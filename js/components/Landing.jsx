// @flow

import React from 'react';
import { connect } from 'react-redux';
import Search from './Search/Search';

// Landing component: displays a search component
const Landing = (props: {}) => (
    <div className="landing">
		  <Search {...props} />
    </div>
);

const mapStateToProps = state => ({
	searchTerm: state.searchTerm
});

export default connect(mapStateToProps)(Landing);
