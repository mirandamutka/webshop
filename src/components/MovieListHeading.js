import React from 'react';
import './movieListHeading.css';


const MovieListHeading = (props) => {
	return (
		<div className="list">
			<h1 className="list-heading">{props.heading}</h1>
		</div>
	);
};

export default MovieListHeading;