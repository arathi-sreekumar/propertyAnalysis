import React from 'react';
import AveragePropertyPrice from './components/AveragePropertyPrice';

const Landing = () => (
	<div className="landing">
		<input type="text" placeholder="Search" />
		<a> or Browse All</a>
		<br />
		<AveragePropertyPrice />
	</div>
);

export default Landing;
