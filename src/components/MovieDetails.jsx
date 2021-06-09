import './MovieDetails.css';
import './BuyButton.css';
import BuyButton from './BuyButton';
import { useLocation, useHistory } from 'react-router-dom';
import { useState, useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { actions as apiAction } from '../features/apiCall';
import { actions as cartAction } from '../features/shoppingCart';

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
    const [moviePrice, setMoviePrice] = useState();
    const [addedToCart, setAddedToCart] = useState(false);

    useEffect(() => {
        setMovieID(location.state.detail.id);
     }, [location]);

     const dispatch = useDispatch();
     
    let url = useSelector(state => state.apiCall.url);

    let shoppingCart = useSelector(state => state.shoppingCart.product);
    if (movieID != null) {
        dispatch(apiAction.getDataFromId(movieID));
    }

    const addToCart = (movie, price) => {
		dispatch(cartAction.addToCart(movie));
		dispatch(cartAction.addToTotalSum(price));
	}

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
                        );
                    setMoviePrice(data.title.length)
                }	
            } catch {
                console.log('Failed to get data');
            }
        }
    }

    let history = useHistory();
    console.log('Price: ', moviePrice)

    const handleCloseWindow = () => {
        history.push('/')
    }

    const toggleBuyButton = () => {
        let found = shoppingCart.find(cartItem => cartItem.title === movieName);
        if (!found) {
            return (
                <BuyButton text={`Buy ${moviePrice}$`} handleOnClick={() => handleBuyButton()} />
            )
        } else {
            return (
                <p className="buyButtonDisabled">✓ Added</p>
            )
        }
    }

    const handleBuyButton = () => {
        addToCart(location.state.detail, moviePrice);
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
                                {toggleBuyButton()}
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