import React from 'react';
import { useHistory } from 'react-router-dom';
import AddToCart from './AddToCart';

import { useDispatch, useSelector } from 'react-redux';
import { actions as cartAction } from '../features/shoppingCart';

const MovieList = (props) => {
	
	let history = useHistory();
	const dispatch = useDispatch();
	const addToCart = (movie) => dispatch(cartAction.addToCart(movie))

	return (
		<>
			{props.movies.map((movie, index) => (
				<div key={index}>
					<img src={movie.Poster} alt='movie' onClick={() => history.push({
						pathname: '/MovieDetails',
						state: { detail: movie }
					})}></img>
					<div onClick={() => addToCart(movie)}>
						<AddToCart />
					</div>
				</div>
			))}
		</>
	);
};

export default MovieList;