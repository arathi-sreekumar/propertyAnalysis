// @flow

import React from 'react';
import { connect } from 'react-redux';
import type { RouterHistory } from 'react-router-dom';
import { setSearchTerm } from './duck/actions';
import './Search.css';

class Search extends React.Component {
	props: {
		searchTerm: string,
		handleSearchTermChange: Function,
		history: RouterHistory
	};

	goToSearchResults = (event: SyntheticEvent) => {
		event.preventDefault();
		this.props.history.push('/searchResults');
	};

	render() {
		return (
			<form className="search field has-addons" onSubmit={this.goToSearchResults}>
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
