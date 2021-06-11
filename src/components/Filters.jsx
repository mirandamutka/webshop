import React, { useState, useEffect } from "react";
import '../App.css';
import './filters.css';
import './MovieDetails.css';
import { MdShoppingCart, MdCheckCircle } from "react-icons/md";
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { actions as movieAction } from '../features/movieDetails';
import axios from 'axios';
import Pagination from './Pagination';


const Filters = (props) => {
    const apiKey = '7ab73473a05278044ef701c06449633a';
    const url = 'https://api.themoviedb.org/3';
    const genreUrl = `${url}/genre/movie/list`;
    const moviesUrl = `${url}/discover/movie`;
    const dispatch = useDispatch();
    let history = useHistory();   
    const [genres, setGenres] = useState([]);
    const [movieByGenre, setMovieByGenre] = useState([]);
    const [displayGenreList, setDisplayGenreList] = useState(false);
    const [page, setPage] = useState(1);
    const [headLine, setHeadLine] = useState('');

    const fetchGenre = async () => {
        try {
            const { data } = await axios.get(genreUrl, {
                params: {
                    api_key: apiKey,
                    language: 'en_US',
                    page: page
                }
            })
            const modifiedData = data['genres'].map((g) => ({
                id: g['id'],
                name: g['name']
            }))
            return modifiedData;
        } catch (error) { }
    }

    const fetchMovieByGenre = async (genre_id) => {
        try {
            const { data } = await axios.get(moviesUrl, {
                params: {
                    api_key: apiKey,
                    language: 'en_US',
                    page: page,
                    with_genres: genre_id
                }
            })
            const posterUrl = 'https://image.tmdb.org/t/p/original/';
            const modifiedData = data['results'].map((m) => ({
                id: m['id'],
                backPoster: posterUrl + m['backdrop_path'],
                popularity: m['popularith'],
                title: m['title'],
                poster_path: posterUrl + m['poster_path'],
                overview: m['overview'],
                rating: m['vote_average'],
                genre: m['genre_ids'],
            }))

            return modifiedData;
        } catch (error) { }
    }


    useEffect(() => {
        const fetchAPI = async () => {
            setGenres(await fetchGenre());
            setMovieByGenre(await fetchMovieByGenre(28));
        };
        
        fetchAPI();
    }, [page]);

    const handleGenreClick = async (genre_id) => {
        setMovieByGenre(await fetchMovieByGenre(genre_id));
        props.setGenreActive(true);
    };
   


    const genreList = genres.map((movie, index, props) => {
        return (
            <li className="list-inline-item" key={index}>
                <button
                    type="button"
                    className="btn btn-outline-info"

                    onClick={() => {
                        handleGenreClick(movie.id);
                        setHeadLine(movie.name);
                    }}
                >
                    {movie.name}
                </button>
            </li>
        );
    });

    const toggleGenreList = () => {
        setDisplayGenreList(!displayGenreList);
    };

    const toggleBuyButton = (movie) => {
        let found = props.shoppingCart.find(cartItem => cartItem.title === movie.title);
        if (!found) {
            return (
                <div className="price-wrapper">
                    <p className="price">{movie.title.length}$</p> <MdShoppingCart className="shopping-cart-button small-display" size="2em" onClick={() => props.handleBuyClick(movie, movie.title.length)} />
                </div>
            )
        } else {
            return (
                <div className="price-wrapper">
                    <p className="price">{movie.title.length}$</p> <MdCheckCircle className="shopping-cart-button small-display" size="2em" />
                </div>
            )
        }
    }

    const goToMovieDetails = (movie) => {
		history.push({pathname: '/MovieDetails'});
		dispatch(movieAction.getMovieDetails(movie));
	}
   

    return (
        <div className="container">
            <div className="row">
                <div className="col" onClick={() => toggleGenreList()}><div className="list-item-header">
                    {headLine != '' ?
                    <p className="list-item-header-title">{headLine}</p> :  <p className="list-item-header-title">Genre</p>}
                    <p className="list-item-header-arrow">▼</p></div>
                {displayGenreList ?
                 <ul className="list-inline">{genreList}</ul>
                : null
                }
                   
                </div>
            </div>
            
                {props.genreActive ?
                <div>
                    <div className="row">
                        {movieByGenre.map((movie, index) => (
                            <div key={index} className="list-item">
                                {movie.poster_path === 'https://image.tmdb.org/t/p/original/null' ?
                                    <div className="gray-box" onClick={() => goToMovieDetails(movie)}></div>
                                    :
                                    <img src={`${movie.poster_path}`}
                                        className="list-item-image"
                                        alt='movie'
                                        onClick={() => goToMovieDetails(movie)}></img>
                                }
                                <h3 className="title">{movie.title}</h3>

                                <div className="price-wrapper">
                                    
                                    {toggleBuyButton(movie)}
                                </div>
                            </div>
                        ))}
                    </div>
                    <Pagination
                        page={page}
                        setPage={setPage}    
                    />
                </div>
                :
                null
            }
        </div>

    );
}

export default Filters;
