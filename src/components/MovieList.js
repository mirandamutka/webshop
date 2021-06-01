import React, { useState, useEffect } from 'react';
import './listItem.css';
import '../App.css';
import { useHistory } from 'react-router-dom';
import { MdShoppingCart } from 'react-icons/md';



const MovieList = (props) => {

	const [genres, setGenres] = useState([]);
	
	let history = useHistory();

	let url = 'https://api.themoviedb.org/3/genre/movie/list?api_key=7ab73473a05278044ef701c06449633a'

	const findGenre = async () => {
		try {
			let response = await fetch(url);
			let json = await response.json();	
			if (json.genres) {
				setGenres(...genres, json.genres);
			}
		} catch {
			console.log('Failed to get data');
		}
		
	};

	useEffect(() => {
		findGenre();
	}, []);

	return (
		<div className="row">
			{props.movies.map((movie, index) => (
				<div key={index} className="list-item">
					{movie.poster_path ? 
							<img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} className="list-item-image" alt='movie' onClick={() => history.push({
								pathname: '/MovieDetails',
								state: { detail: movie }
							})}></img>
							: 
							<div className="gray-box" onClick={() => history.push({
								pathname: '/MovieDetails',
								state: { detail: movie }
							})}></div>
							}
							<h3 className="title">{movie.title}</h3>
							<div className="genre-container">
							{movie.genre_ids.map((genreId, index) => {
  								let genre = genres.find(genre => genre.id === genreId);  
								if (!genre) return null;
 								return (
                                    <div className="genre" key={index}>
                                        {genre.name}
                                    </div>
								)}
							)}
							</div>
						
						<div className="price-wrapper">
									<p className="price">{movie.genre_ids[0] >= 100 ? movie.genre_ids[0].toString().substring(0, 2) : movie.genre_ids[0]}$</p>
									<MdShoppingCart className="shopping-cart-button" size="2em" onClick={() => props.handleBuyClick(movie)} />
						</div>
				</div>
			))}
		</div>
	);
};

export default MovieList;