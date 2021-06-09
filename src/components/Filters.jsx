import React, { useState, useEffect } from "react";
import '../App.css';
import './filters.css';
import { MdShoppingCart } from 'react-icons/md';

import { useHistory } from 'react-router-dom';
import axios from 'axios';


const Filters = ( props) => {
    const apiKey = '7ab73473a05278044ef701c06449633a';
    const url = 'https://api.themoviedb.org/3';
    const genreUrl = `${url}/genre/movie/list`;
    const moviesUrl = `${url}/discover/movie`;
    let history = useHistory();   
    const [genres, setGenres] = useState([]);
    const [movieByGenre, setMovieByGenre] = useState([]);
    
    const fetchGenre = async () => {
        try {
            const { data } = await axios.get(genreUrl, {
                params: {
                    api_key: apiKey,
                    language: 'en_US',
                    page: 1
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
                    page: 1,
                    with_genres: genre_id
                }
            })
            const posterUrl = 'https://image.tmdb.org/t/p/original/';
            const modifiedData = data['results'].map((m) => ({
                id: m['id'],
                backPoster: posterUrl + m['backdrop_path'],
                popularity: m['popularith'],
                title: m['title'],
                poster: posterUrl + m['poster_path'],
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
    }, []);

    const handleGenreClick = async (genre_id) => {
        setMovieByGenre(await fetchMovieByGenre(genre_id));
    };
   


    const genreList = genres.map((movie, index, props) => {
        return (
            <li className="list-inline-item" key={index}>
                <button
                    type="button"
                    className="btn btn-outline-info"

                    onClick={() => {
                        handleGenreClick(movie.id);
                    }}
                >
                    {movie.name}
                </button>
            </li>
        );
    });

   

    return (
        <div className="container">
            
            <div className="row">
                <div className="col">
                    <ul className="list-inline">{genreList}</ul>
                </div>
            </div>

            <div className="row">
                
                {movieByGenre.map((movie, index) => (
                    <div key={index} className="list-item">
                        {movie.poster_path ?
                            

                            <div className="gray-box" onClick={() => history.push({
                                pathname: '/MovieDetails',
                                state: { detail: movie }
                            })}></div>
                            :
                            <img src={`${movie.poster}`} className="list-item-image" alt='movie' onClick={() => history.push({
                                pathname: '/MovieDetails',
                                state: { detail: movie }
                            })}></img>
                        }
                        <h3 className="title">{movie.title}</h3>

                        <div className="price-wrapper">
                            <p className="price">{movie.title.length}$</p>
                            <MdShoppingCart className="shopping-cart-button" size="2em" onClick={() => props.handleBuyClick(movie, movie.title.length)} />
                        </div>
                    </div>
                ))}
            </div>


            
            

        </div>

    );
}

export default Filters;