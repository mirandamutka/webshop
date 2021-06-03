
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actions as cartAction } from '../features/shoppingCart';
import MovieInCart from './MovieInCart';
import RemoveFromCart from './RemoveFromCart';
import MovieListHeading from './MovieListHeading';

const Checkout = () => {

    let shoppingCart = useSelector(state => state.shoppingCart.product);

    const dispatch = useDispatch();
	const removeFromCart = (movie) => dispatch(cartAction.removeFromCart(movie))

    const shoppingList = shoppingCart.map((movie, index) => (
        <div key={index} className="movieContainer">
            <MovieInCart title={movie ? movie.title : ''} poster={movie ? movie.poster_path : ''}/>
            <div onClick={() => removeFromCart(movie)} className="removeCart">
                <RemoveFromCart />
            </div>
        </div>
    ));

    return (
        <div>
            <div className="checkout-shopping-cart">
                <MovieListHeading heading='Your Shopping Cart' />
                {shoppingList} 
            </div>

        </div> 
    )
}

export default Checkout;
