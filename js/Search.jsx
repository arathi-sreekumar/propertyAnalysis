import React from 'react';
import AreaPropertyOverview from './components/AreaPropertyOverview/AreaPropertyOverview';
import './Search.css';

class Search extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			search: { area: 'bn10' },
			area: null,
			postcode: null
		};
		this.getSearchResult = this.getSearchResult.bind(this);
		this.handleAreaChange = this.handleAreaChange.bind(this);
		this.handlePostcodeChange = this.handlePostcodeChange.bind(this);
	}

	getSearchResult() {
		const search = {};
		if (this.state.area) {
			search.area = this.state.area;
		}
		if (this.state.postcode) {
			search.postcode = this.state.postcode;
		}
		this.setState({ search });
	}

	handleAreaChange(event) {
		this.setState({ area: event.target.value });
	}

	handlePostcodeChange(event) {
		this.setState({ postcode: event.target.value });
	}

	render() {
		return (
			<div className="section">
				<div className="search">
					<input
						type="text"
						className="input is-primary"
						placeholder="Search area"
						value={this.state.area}
						onChange={this.handleAreaChange}
					/>
					<span className="separator-text"> or </span>
					<input
						type="text"
						className="input is-primary"
						placeholder="Search postcode"
						value={this.state.postcode}
						onChange={this.handlePostcodeChange}
					/>
					<button className="button is-primary" onClick={this.getSearchResult}>
						Search
					</button>
				</div>
				<div className="search-result">
					<AreaPropertyOverview search={this.state.search} />
				</div>
			</div>
		);
	}
}

export default Search;
