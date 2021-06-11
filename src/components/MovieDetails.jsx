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
    const [movieLanguage, setMovieLanguage] = useState([]);
    const [movieCountry, setMovieCountry] = useState([]);
    const [moviePrice, setMoviePrice] = useState();
    const [addedToCart, setAddedToCart] = useState(false);

    const dispatch = useDispatch();
     
    let url = useSelector(state => state.apiCall.url);
    let shoppingCart = useSelector(state => state.shoppingCart.product);
    let movie = useSelector(state => state.movieDetails.movie);

    useEffect(() => {
        setMovieID(movie.id);
     }, []);

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
                if (movie != null) {
                    setMovieName(data.title);
                    setMoviePoster(data.poster_path);
                    setMovieRating(data.vote_average);
                    setMovieGenre(
                        ...movieGenre,
                        data.genres
                        );
                    setMoviePlot(data.overview);
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

    const handleCloseWindow = () => {
        history.push('/')
    }

    const toggleBuyButton = () => {
        let found = shoppingCart.find(cartItem => cartItem.title === movieName);
        if (!found) {
            return (
                <BuyButton text={`Buy ${moviePrice}$`} handleOnClick={ () => handleBuyButton()} />
            )
        } else {
            return (
                <p className="buyButtonDisabled">✓ Added</p>
            )
        }
    }

    const handleBuyButton = () => {
        addToCart(movie, moviePrice);
    }

    return (
        <div className="movieDetailsContainer">
            <div className="closeWindow" onClick={() => handleCloseWindow()}>✕</div>
            {movieName 
            ? (
            <>
                <section className="imgBox">
                    {moviePoster != null ?
                     <img src={`https://image.tmdb.org/t/p/w500/${moviePoster}`} className="moviePoster" alt="" />
                    : 
                    <div className="gray-box" />
                    }
                   
                </section>
                <section className="infoBox">
                    <section className="topInfo">
                        <h3>{movieName}</h3>
                        <section className="ratingGenre">
                            <div className="movieRating">{movieRating}</div> | 
                                <div className="genreContainer">
                                    {movieGenre.map((genre, index) => (
                                        <div className="movieGenre" key={index}>
                                            {genre.name}
                                        </div>
                                    ))}
                                </div>
                            
                        </section>
                        <div className="moviePlot">
                            {moviePlot}
                        </div>
                    </section>
                    <section className="bottomInfo">
                        <section className="languageCountry">
                            <div>Language 
                            {movieLanguage.map((language, index) => 
                                <b key={index}> {language.english_name}</b>
                            )
                            }</div>
                            <div>Country 
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