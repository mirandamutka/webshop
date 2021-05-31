import React, { useState, useEffect } from "react";
import '../App.css';
import './newReleaseList.css';

import { useHistory } from 'react-router-dom';


import axios from 'axios';

const apiKey = '7ab73473a05278044ef701c06449633a';
const url = 'https://api.themoviedb.org/3';
const nowPlayingUrl = `${url}/movie/now_playing`;
const topratedUrl = `${url}/movie/top_rated`;
const movieUrl = `${url}/movie`;
const genreUrl = `${url}/genre/movie/list`;
const moviesUrl = `${url}/discover/movie`;
const personUrl = `${url}/trending/person/week`;
	
export function NewReleaseList() {

    let history = useHistory();

    const [nowPlaying, setNowPlaying] = useState([]);
    const [genres, setGenres] = useState([]);
    const [movieByGenre, setMovieByGenre] = useState([]);
    const [persons, setPersons] = useState([]);
    const [topRated, setTopRated] = useState([]);

    const fetchMovies = async () => {
        try {
            const { data } = await axios.get(nowPlayingUrl, {
                params: {
                    api_key: apiKey,
                    language: 'en_US',
                    page: 1
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
            }))

            return modifiedData;
        } catch (error) { }
    }

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
            }))

            return modifiedData;
        } catch (error) { }
    }

    const fetchPersons = async () => {
        try {
            const { data } = await axios.get(personUrl, {
                params: {
                    api_key: apiKey
                }
            })
            const modifiedData = data['results'].map((p) => ({
                id: p['id'],
                popularity: p['popularity'],
                name: p['name'],
                profileImg: 'https://image.tmdb.org/t/p/w200' + p['profile_path'],
                known: p['known_for_department']
            }))
            return modifiedData;
        } catch (error) { }
    }

    const fetchTopratedMovie = async () => {
        try {
            const { data } = await axios.get(topratedUrl, {
                params: {
                    api_key: apiKey,
                    language: 'en_US',
                    page: 1
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
            }))

            return modifiedData;
        } catch (error) {

        }
    }




    useEffect(() => {
        const fetchAPI = async () => {
            setNowPlaying(await fetchMovies());
            setGenres(await fetchGenre());
            setMovieByGenre(await fetchMovieByGenre(28));
            setPersons(await fetchPersons());
            setTopRated(await fetchTopratedMovie());
        };

        fetchAPI();
    }, []);

    const handleGenreClick = async (genre_id) => {
        setMovieByGenre(await fetchMovieByGenre(genre_id));
    };



    const movies = nowPlaying.slice(0, 5).map((movie, index) => {


        return (
            <div className="firstLine" >
                <div className="card">
                    <img src={movie.backPoster} alt={movie.title}
                        onClick={() => history.push({
                            pathname: '/MovieDetails',
                            state: { detail: movie }
                        })}></img>



                    <div className="text">

                        {movie.title}
                    </div>
                </div>
            </div>
        );
    });


    const genreList = genres.map((movie, index) => {
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

    const movieList = movieByGenre.slice(0, 4).map((movie, index) => {
        return (
            <div className="movies">
                <div className="card">

                    <img className="img-fluid" src={movie.poster} alt={movie.title}
                        onClick={() => history.push({
                            pathname: '/MovieDetails',
                            state: { detail: movie }
                        })}></img>

                </div>
                <div className="mt-3">
                    <p style={{ fontWeight: "bolder" }}>{movie.title}</p>
                    <p>Rated: {movie.rating}</p>

                </div>
            </div>
        );
    });



    const topRatedList = topRated.slice(0, 4).map((movie, index) => {
        return (
            <div className="col-md-3" key={index}>
                <div className="card">

                    <img className="img-fluid" src={movie.poster} alt={movie.title}
                        onClick={() => history.push({
                            pathname: '/MovieDetails',
                            state: { detail: movie }
                        })}>
                    </img>

                </div>
                <div className="mt-3">
                    <p style={{ fontWeight: "bolder" }}>{movie.title}</p>
                    <p>Rated: {movie.rating}</p>

                </div>
            </div>
        );
    });

    return (
        <div className="container">

           

                <div className="row">
                    <div className="col">
                        <ul className="list-inline">{genreList}</ul>
                    </div>
            </div>

            <div className="row mt-2">
                <div className="col">

                    {movies}

                </div>
            </div>

                
                <div className="row">
                    <div className="col">
                        <div className="float-right">
                            <i className="far fa-arrow-alt-circle-right"></i>
                        </div>
                    </div>
                </div>
                <div className="row">{movieList}</div>
                
            

                <div className="row mt-3">
                    <div className="col">
                        <p className="font-weight-bold" style={{ color: "#5a606b" }}>
                            TOP RATED MOVIES
          </p>
                    </div>
                </div>
            
                <div className="row mt-3">
                    <div className="col">
                        <div className="float-right">
                            <i className="far fa-arrow-alt-circle-right"></i>
                        </div>
                    </div>
                </div>
                <div className="row mt-3">{topRatedList}</div>

                <hr className="mt-5" style={{ borderTop: "1px solid #5a606b" }}></hr>

            </div>
            
        );
    }