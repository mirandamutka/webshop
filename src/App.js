import React, { useState, useEffect } from 'react';

import './App.css';
import MovieList from './components/MovieList';
import MovieListHeading from './components/MovieListHeading';
import SearchBox from './components/SearchBox';
import AddToCart from './components/AddToCart';
import RemoveFromCart from './components/RemoveFromCart';

const App = () => {
	const [movies, setMovies] = useState([]);
	const [cart, setCart] = useState([]);
	const [searchValue, setSearchValue] = useState('');

	const getMovieRequest = async (searchValue) => {
		const url = `http://www.omdbapi.com/?s=${searchValue}&apikey=b7ed0243`;

		const response = await fetch(url);
		const responseJson = await response.json();

		if (responseJson.Search) {
			setMovies(responseJson.Search);
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