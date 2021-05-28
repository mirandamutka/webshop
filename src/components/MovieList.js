import React from 'react';
import { useHistory } from 'react-router-dom';
import AddToCart from './AddToCart';



const MovieList = (props) => {
	
	let history = useHistory();
	console.log('movies: ', props.movies)

	return (
		<div>
			{props.movies.map((movie, index) => (
				<div key={index}>
					{movie.poster_path ? 
								<img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt='movie' onClick={() => history.push({
									pathname: '/MovieDetails',
									state: { detail: movie }
								})}></img>
								: <p onClick={() => history.push({
									pathname: '/MovieDetails',
									state: { detail: movie }
								})}>{movie.title}</p> 
					}
						
					<div onClick={() => props.handleBuyClick(movie)}>
						<AddToCart />
					</div>
				</div>
			))}
		</div>
	);
};

export default MovieList;