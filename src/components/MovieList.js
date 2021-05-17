import React from 'react';

const MovieList = (props) => {
	const CartItem = props.cartItem;

	return (
		<>
			{props.movies.map((movie, index) => (
				<div >
					<img src={movie.Poster} alt='movie'></img>
					<div onClick={() => props.handleBuyClick(movie)}>
						<CartItem />
					</div>
				</div>
			))}
		</>
	);
};

export default MovieList;