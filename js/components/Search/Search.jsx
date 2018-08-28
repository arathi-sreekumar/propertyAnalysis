// @flow

import React from 'react';
import { connect } from 'react-redux';
import { object } from 'prop-types';
import AreaPropertyOverview from '../AreaPropertyOverview/AreaPropertyOverview';
import { setSearchTerm } from './duck/actions';
import './Search.css';

class Search extends React.Component {
	static contextTypes = {
		history: object
	};

	constructor(props: mixed) {
		super(props);
		this.state = {
			search: { searchTerm: '' }
		};
		(this: any).getSearchResult = this.getSearchResult.bind(this);
	}

	state = {
		search: {
			searchTerm: ''
		}
	};

	getSearchResult() {
		console.log(this.props.searchTerm, this.props);
		const search = {};
		if (this.props.searchTerm) {
			search.searchTerm = this.props.searchTerm;
		}
		this.setState({ search });
	}

	props: {
		searchTerm: string,
		handleSearchTermChange: Function
	};

	render() {
		return (
			<div className="section">
				<div className="search field has-addons">
					<div className="control is-expanded">
						<input
							type="text"
							className="input is-primary"
							placeholder="Search"
							value={this.props.searchTerm}
							onChange={this.props.handleSearchTermChange}
						/>
					</div>
					<div className="control">
						<button className="button is-primary" onClick={this.getSearchResult}>
							Search
						</button>
					</div>
				</div>
				<div className="search-result">
					<AreaPropertyOverview search={this.state.search} />
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	searchTerm: state.searchTerm
});

const mapDispatchToProps = (dispatch: Function) => ({
	handleSearchTermChange(event) {
		dispatch(setSearchTerm(event.target.value));
	}
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Search);
