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
    const [movieGenre, setMovieGenre] = useState([]);
    const [moviePlot, setMoviePlot] = useState();
    const [movieDirector, setMovieDirector] = useState();
    const [movieActors, setMovieActors] = useState();
    const [movieLanguage, setMovieLanguage] = useState([]);
    const [movieCountry, setMovieCountry] = useState([]);

    useEffect(() => {
        setMovieID(location.state.detail.id);
     }, [location]);

     const dispatch = useDispatch();
     
    let url = useSelector(state => state.apiCall.url);
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
                    setMovieName(data.title);
                    setMoviePoster(data.poster_path);
                    setMovieRating(data.vote_average);
                    setMovieGenre(
                        ...movieGenre,
                        data.genres
                        );
                    setMoviePlot(data.overview);
                    setMovieDirector(data.Director);
                    setMovieActors(data.Actors);
                    setMovieLanguage(
                        ...movieLanguage,
                        data.spoken_languages
                        );
                    setMovieCountry(
                        ...movieCountry,
                        data.production_countries
                        );;
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
                    <img src={`https://image.tmdb.org/t/p/w500/${moviePoster}`} className="moviePoster" alt="" />
                </section>
                <section className="infoBox">
                    <section className="topInfo">
                        <h3>{movieName}</h3>
                        <section className="ratingGenre">
                            <div className="movieRating">{movieRating}</div> | 
                                {movieGenre.map((genre, index) => (
                                    <div className="movieGenre" key={index}>
                                        {genre.name}
                                    </div>
                                ))}
                            
                        </section>
                        <div className="moviePlot">
                            {moviePlot}
                        </div>
                        <div className="directorName">Director <b>{movieDirector}</b></div>
                        <div className="actorsList">Actors <b>{movieActors}</b></div>
                    </section>
                    <section className="bottomInfo">
                        <section className="languageCountry">
                            <div className="movieLanguage">Language 
                            {movieLanguage.map((language, index) => 
                                <b key={index}> {language.english_name}</b>
                            )
                            }</div>
                            <div className="movieCountry">Country 
                            {movieCountry.map((country, index) => 
                                <b key={index}> {country.name}</b>
                            )
                            }</div>
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