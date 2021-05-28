import React, { useState, useEffect } from 'react';

import './App.css';
import MovieList from './components/MovieList';
import MovieListHeading from './components/MovieListHeading';
import SearchBox from './components/SearchBox';

import { useDispatch, useSelector } from 'react-redux';
import { actions as apiAction } from './features/apiCall';
import { actions as cartAction } from './features/shoppingCart';
import ShoppingCart from './components/ShoppingCart';
import NewReleaseList from './components/NewReleaseList';

const App = () => {
	const [movies, setMovies] = useState([]);
	const [searchValue, setSearchValue] = useState('');

	const dispatch = useDispatch();
	const addToCart = (movie) => dispatch(cartAction.addToCart(movie))
		
	dispatch(apiAction.getDataFromSearch(searchValue));
	let url = useSelector(state => state.apiCall.url);
	let shoppingCart = useSelector(state => state.shoppingCart);  
	console.log('shoppingCart: ', shoppingCart)
	console.log('url: ', url);

	const getMovieRequest = async () => {
		try {
			let response = await fetch(url);
			let json = await response.json();	
			console.log('json: ', json)		
			if (json.results) {
				setMovies(json.results);
			}
		} catch {
			console.log('Failed to get data');
		}
		
	};

	useEffect(() => {
		getMovieRequest(searchValue);
	}, [searchValue]);

	// const addToCart = dispatch(cartAction.addToCart(movie))

	/* useEffect(() => {
		const movieInCart = JSON.parse(
			localStorage.getItem('react-movie-app-cart')
		);

		if (movieInCart) {
			setCart(movieInCart);
		}
	}, []);

	const saveToLocalStorage = (items) => {
		localStorage.setItem('react-movie-app-cart', JSON.stringify(items));
	};

	const addToCart = (movie) => {
		const newCart = [...cart, movie];
		setCart(newCart);
		saveToLocalStorage(newCart);
	};

	const removeFromCart = (movie) => {
		const newCart = cart.filter(
			(cart) => cart.imdbID !== movie.imdbID
		);

		setCart(newCart);
		saveToLocalStorage(newCart);
	};
	*/

	return (
		<div>
			<div>
				<MovieListHeading heading='Movies' />
				<SearchBox searchValue={searchValue} setSearchValue={setSearchValue} />
			</div>
      <NewReleaseList handleBuyClick={addToCart}/>
			<div className='row'>
				<MovieList
					movies={movies}
					handleBuyClick={addToCart}
					// cartItem={AddToCart}
				/>
			</div>
			<div className='row'>
				<ShoppingCart />
			</div>
		</div>
	);
};

export default App;
