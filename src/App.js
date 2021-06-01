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
	const [toggleShoppingCart, setToggleShoppingCart] = useState(false);

	const dispatch = useDispatch();
	const addToCart = (movie) => dispatch(cartAction.addToCart(movie))
	
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
			console.log('movies: ', movies)
		} catch {
			console.log('Failed to get data');
		}
		
	};

	console.log('Toggle: ', toggleShoppingCart)
	useEffect(() => {
		getMovieRequest(searchValue);
	}, [searchValue]);

	return (
		<div className="container">
			<div>
				<MovieListHeading heading='Movies' />
				<SearchBox searchValue={searchValue} setSearchValue={setSearchValue} />
				<div className="shoppingCart" onClick={() => setToggleShoppingCart(prevToggle => !prevToggle)}>
					<ShoppingCart toggle={toggleShoppingCart} />
				</div>
			</div>
			<div>
			{searchValue === '' ? 
				<NewReleaseList handleBuyClick={addToCart}/>	
				:	
				<div className='row'>
				<MovieList
				movies={movies}
				handleBuyClick={addToCart}
				// cartItem={AddToCart}
				/>
				</div>
			}
			</div>
		</div>
	);
};

export default App;
