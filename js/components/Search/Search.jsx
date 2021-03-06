// @flow

import React from 'react';
import { connect } from 'react-redux';
import type { RouterHistory } from 'react-router-dom';
import { setSearchTerm } from './duck/actions';
import './Search.css';

/*
 * Search component:
  * - Renders a search component
  * - redirects to search results when submitting a search
  * - Stores search term in redux store
*/
class Search extends React.Component {
	props: {
		searchTerm: string,
		handleSearchTermChange: Function,
		history: RouterHistory
	};

	goToSearchResults = (event: SyntheticEvent) => {
		event.preventDefault();
		this.props.history.push(`/searchResults/${this.props.searchTerm}`);
	};

	render() {
		return (
			<form className="search field has-addons" onSubmit={this.goToSearchResults}>
				<div className="control is-expanded">
          <label className="screen-reader-only" htmlFor="search">Search for a full or part postCode</label>
					<input
            id="search"
						type="text"
						className="input is-primary"
						placeholder="Search"
						value={this.props.searchTerm}
						onChange={this.props.handleSearchTermChange}
					/>
				</div>
				<div className="control">
					<button className="button is-primary" type="submit">
						Search
					</button>
				</div>
			</form>
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
