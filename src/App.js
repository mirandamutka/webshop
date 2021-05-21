import React, { useState, useEffect } from 'react';

import './App.css';
import MovieList from './components/MovieList';
import MovieListHeading from './components/MovieListHeading';
import SearchBox from './components/SearchBox';
import AddToCart from './components/AddToCart';
import RemoveFromCart from './components/RemoveFromCart';

import { useDispatch, useSelector } from 'react-redux';
import { actions } from './features/apiCall';

const App = () => {
	const [movies, setMovies] = useState([]);
	const [cart, setCart] = useState([]);
	const [searchValue, setSearchValue] = useState('');

	const dispatch = useDispatch();
	const url = useSelector(state => state.apiCall.url);
	console.log('url: ', url)
	dispatch(actions.getDataFromSearch(searchValue));

	const getMovieRequest = async () => {
		try {
			let response = await fetch(url);
			let json = await response.json();	
			console.log('json: ', json)		
			if (json.Search) {
				setMovies(json.Search);
			}
		} catch {
			console.log('Failed to get data');
		}
		
	};

	useEffect(() => {
		getMovieRequest(searchValue);
	}, [searchValue]);

	useEffect(() => {
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

	return (
		<div>
			<div>
				<MovieListHeading heading='Movies' />
				<SearchBox searchValue={searchValue} setSearchValue={setSearchValue} />
			</div>
			<div className='row'>
				<MovieList
					movies={movies}
					handleBuyClick={addToCart}
					cartItem={AddToCart}
				/>
			</div>
			<div>
				<MovieListHeading heading='Shopping Cart' />
			</div>
			<div className='row'>
				<MovieList
					movies={cart}
					handleBuyClick={removeFromCart}
					cartItem={RemoveFromCart}
				/>
			</div>
		</div>
	);
};

export default App;
