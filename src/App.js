import React, { useState, useEffect } from 'react';

import './App.css';
import MovieList from './components/MovieList';
import MovieListHeading from './components/MovieListHeading';
import SearchBox from './components/SearchBox';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { actions as cartAction } from './features/shoppingCart';
import ShoppingCart from './components/ShoppingCart';
import NewReleaseList from './components/NewReleaseList';
import Filters from "./components/Filters";
import Checkout from './components/Checkout';

const App = () => {
	const [movies, setMovies] = useState([]);
	const [searchValue, setSearchValue] = useState('');
	const [toggleShoppingCart, setToggleShoppingCart] = useState(false);
	const [genreActive, setGenreActive] = useState(false);
	const [page, setPage] = useState(1);
	const [url, setUrl] = useState();

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

	const getMovieRequest = async () => {
		try {
            const { data } = await axios.get(url, {
                params: {
					query: searchValue,
                    page: page
                }
            })
            return setMovies(data.results);
        } catch (error) {
			console.log('Failed to get data: ', error);
		 }	
	};

	useEffect(() => {		
		setUrl(`https://api.themoviedb.org/3/search/movie?api_key=7ab73473a05278044ef701c06449633a&query=${searchValue}`)
		getMovieRequest();
	}, [searchValue, page]);

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
		<div className="App">
			<div className="shoppingCart" onClick={() => expandShoppingCart()}>
				<ShoppingCart toggle={toggleShoppingCart} />
			</div>
			<div className="container" onClick={() => collapseShoppingCart()}>				
				<SearchBox 
					searchValue={searchValue} 
					setSearchValue={setSearchValue} 
				/>				
				<div>
					{searchValue === '' ? 	
					<Filters 
						handleBuyClick={addToCart} 
						shoppingCart={shoppingCart} 
						setGenreActive={setGenreActive}
						genreActive={genreActive}
					/>
					:	
						<MovieList
							movies={movies}
							page={page}
							setPage={setPage}
							handleBuyClick={addToCart}
							shoppingCart={shoppingCart}
						/>
					}	
					{!genreActive && searchValue === '' ?
					<NewReleaseList 
						handleBuyClick={addToCart} 
						shoppingCart={shoppingCart} 
					/>					
					:
					<div />	
					}
				</div>
			</div>
		</div>
	);
};

export default App;
