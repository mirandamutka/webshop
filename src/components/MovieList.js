import React from 'react';
import { useHistory } from 'react-router-dom';

const MovieList = (props) => {
	const CartItem = props.cartItem;
	let history = useHistory();
	return (
		<>
			{props.movies.map((movie, index) => (
				<div key={index}>
					<img src={movie.Poster} alt='movie' onClick={() => history.push({
						pathname: '/MovieDetails',
						state: { detail: movie }
					})}></img>
					<div onClick={() => props.handleBuyClick(movie)}>
						<CartItem />
					</div>
				</div>
			))}
		</>
	);
};

export default MovieList;