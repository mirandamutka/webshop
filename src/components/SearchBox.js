
import React from 'react';
import ReactDOM from 'react-dom';
import './searchBox.css';

const SearchBox = (props) => {
	return (
		<div className="SearchBox">
			<input type="search"
				value={props.value}
				onChange={(event) => props.setSearchValue(event.target.value)}
				placeholder='Search here...'
			></input>

		</div>
	);
};

export default SearchBox;