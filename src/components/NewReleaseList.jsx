import './listItem.css';
import './newReleasesList.css';
import { MdShoppingCart, MdCheckCircle } from 'react-icons/md';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { useDispatch } from 'react-redux';
import { actions as movieAction } from '../features/movieDetails';
import MovieListHeading from './MovieListHeading';

const NewReleaseList = (props) => {

    const [movieList, setMovieList] = useState([]);
    const [genres, setGenres] = useState([]);

    const dispatch = useDispatch();

    let history = useHistory();
    let url = 'https://api.themoviedb.org/3/genre/movie/list?api_key=7ab73473a05278044ef701c06449633a';

    const findGenre = async () => {
        try {
            let response = await fetch(url);
            let json = await response.json();
            if (json.genres) {
                setGenres(json.genres);
            }
        } catch {
            console.log('Failed to get data');
        }

    };

    const goToMovieDetails = (movie) => {
		history.push({pathname: '/MovieDetails'});
		dispatch(movieAction.getMovieDetails(movie));
	}

    useEffect(() => {
        fetch('https://api.themoviedb.org/3/trending/movie/week?api_key=7ab73473a05278044ef701c06449633a')
            .then((response) => response.json())
            .then((data) => setMovieList(...movieList, data.results));

        findGenre();
    }, []);

    const toggleBuyButton = (movie) => {
        let found = props.shoppingCart.find(cartItem => cartItem.title === movie.title);
		if (!found) {
            return (
                <div className="price-wrapper">
                    <p className="price">{movie.title.length}$</p> <MdShoppingCart className="shopping-cart-button" size="2em" onClick={() => props.handleBuyClick(movie, movie.title.length)} />
                </div>
            )
        } else {
            return (
                <div className="price-wrapper">
                    <p className="price">{movie.title.length}$</p> <MdCheckCircle className="shopping-cart-button" size="2em" />
                </div>
            )
        }
}

    return (
        <div>
            <MovieListHeading heading='New Releases' />
            <div className="row">
                {movieList.slice(0, 8).map((movie, index) => (
                    <div key={index} className="list-item">
                        {movie.poster_path ?
                            <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} className="list-item-image" alt='movie' onClick={() => goToMovieDetails(movie)}></img>
                            :
                            <div className="gray-box" onClick={() => goToMovieDetails(movie)}></div>
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
                                )
                            }
                            )}
                        </div>
                        {toggleBuyButton(movie)}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default NewReleaseList;