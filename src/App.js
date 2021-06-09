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
import Checkout from './components/Checkout';

const App = () => {
	const [movies, setMovies] = useState([]);
	const [searchValue, setSearchValue] = useState('');
	const [toggleShoppingCart, setToggleShoppingCart] = useState(false);

	const dispatch = useDispatch();

	let shoppingCart = useSelector(state => state.shoppingCart.product);

	const addToCart = (movie, price) => {
		let found = shoppingCart.find(cartItem => cartItem.title === movie.title);
		if (!found) {
			dispatch(cartAction.addToCart(movie));
			dispatch(cartAction.addToTotalSum(price));
		} else {
			console.log('Product already added');
		}
		
	}
	if (searchValue !== '') {
		dispatch(apiAction.getDataFromSearch(searchValue));
	}
	let url = useSelector(state => state.apiCall.url);

	const getMovieRequest = async () => {
		try {
			let response = await fetch(url);
			let json = await response.json();	
			if (json.results) {
				setMovies(json.results);
			}
			console.log('movies: ', movies);
		} catch {
			console.log('Failed to get data');
		}
		
	};

	console.log('toggle: ', toggleShoppingCart)
	useEffect(() => {
	  getMovieRequest(searchValue);
	}, [searchValue]);

	const collapseShoppingCart = () => {
		if (toggleShoppingCart) {
			setToggleShoppingCart(false);
		}
	}

	const expandShoppingCart = () => {
		if (!toggleShoppingCart) {
			setToggleShoppingCart(true);
		}
	}

	return (
		<div>
			<div className="shoppingCart" onClick={() => expandShoppingCart()}>
				<ShoppingCart toggle={toggleShoppingCart} />
			</div>
			<div className="container" onClick={() => collapseShoppingCart()}>
				<div>
					<MovieListHeading heading='Movies' />
					<SearchBox searchValue={searchValue} setSearchValue={setSearchValue} />
				</div>
				<div>
				{searchValue === '' ? 
					<NewReleaseList handleBuyClick={addToCart} />	
					:	
					<div className='row'>
					  <MovieList movies={movies} handleBuyClick={addToCart} /* cartItem={AddToCart}*//>
				  </div>
				}
			  </div>
		  </div>
	  </div>
	);
};

export default App;
