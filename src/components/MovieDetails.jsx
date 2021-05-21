import './MovieDetails.css';
import { useLocation, useHistory } from 'react-router-dom';
import { useState, useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { actions } from '../features/apiCall';

const MovieDetails = (props) => {

    const location = useLocation();

    const [movieID, setMovieID] = useState();
    const [movieName, setMovieName] = useState();
    const [moviePoster, setMoviePoster] = useState();
    const [movieRating, setMovieRating] = useState();
    const [movieGenre, setMovieGenre] = useState();
    const [moviePlot, setMoviePlot] = useState();
    const [movieDirector, setMovieDirector] = useState();
    const [movieActors, setMovieActors] = useState();
    const [movieLanguage, setMovieLanguage] = useState();
    const [movieCountry, setMovieCountry] = useState();

    useEffect(() => {
        setMovieID(location.state.detail.imdbID);
     }, [location]);

     const dispatch = useDispatch();
     const url = useSelector(state => state.apiCall.url);
     console.log('url: ', url);
     dispatch(actions.getDataFromId(movieID));

    useEffect(() => {
        getSelectedMovie();
    }, [movieID]);

    const getSelectedMovie = async () => {
        if (movieID) {
            try {
                let response = await fetch(url);
                let data = await response.json();	
                console.log('data: ', data)	
                if (data != null) {
                    setMovieName(data.Title);
                    setMoviePoster(data.Poster);
                    setMovieRating(data.Rated);
                    setMovieGenre(data.Genre);
                    setMoviePlot(data.Plot);
                    setMovieDirector(data.Director);
                    setMovieActors(data.Actors);
                    setMovieLanguage(data.Language);
                    setMovieCountry(data.Country);
                }	
            } catch {
                console.log('Failed to get data');
            }
        }
    }

    let history = useHistory();

    const handleCloseWindow = () => {
        history.push('/')
    }

    return (
        <div className="movieDetailsContainer">
            <div className="closeWindow" onClick={() => handleCloseWindow()}>✕</div>
            {movieName 
            ? (
            <>
                <section className="imgBox">
                    <img src={moviePoster} className="moviePoster" alt="" />
                </section>
                <section className="infoBox">
                    <section className="topInfo">
                        <h3>{movieName}</h3>
                        <section className="ratingGenre">
                            <div className="movieRating">{movieRating}</div> | 
                            <div className="movieGenre">{movieGenre}</div>
                        </section>
                        <div className="starRating">★★★★☆</div>
                        <div className="moviePlot">
                            {moviePlot}
                        </div>
                        <div className="directorName">Director <b>{movieDirector}</b></div>
                        <div className="actorsList">Actors <b>{movieActors}</b></div>
                    </section>
                    <section className="bottomInfo">
                        <section className="languageCountry">
                            <div className="movieLanguage">Language <b>{movieLanguage}</b></div>
                            <div className="movieCountry">Country <b>{movieCountry}</b></div>
                        </section>
                        {/* Skapa en separat knapp komponent som kan återanvändas */}
                        <button className="buyButton">Buy 10$</button>
                    </section>
                </section>
            </>
            )
            : <h3>Loading...</h3>
            }
        </div>
    )
}

export default MovieDetails;