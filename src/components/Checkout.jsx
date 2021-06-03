import './checkout.css'
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
        <div className="checkout-page">
            <h1 className="strikearound">Your Shopping Cart</h1>
            <div className="shopping-cart">
                {shoppingList} 
            </div>
            <h1 className="strikearound">Select payment method</h1>
            <div className="paymethod">
                <img className="payment-img" src="https://cdn0.iconfinder.com/data/icons/credit-card-debit-card-payment-PNG/128/Mastercard-Curved.png" alt=""></img> 
                <img className="payment-img" src="https://cdn0.iconfinder.com/data/icons/credit-card-debit-card-payment-PNG/128/Discover-Curved.png" alt=""></img>
                <img className="payment-img" src="https://cdn0.iconfinder.com/data/icons/credit-card-debit-card-payment-PNG/128/Paypal-Curved.png" alt=""></img> 
                <img className="payment-img" src="https://cdn0.iconfinder.com/data/icons/credit-card-debit-card-payment-PNG/128/American-Express-Curved.png" alt=""></img> 
            </div>
            <h1 className="strikearound">Your information</h1>
            <div className="costumer-info">
                <form>
                    <input type="text" placeholder="First name"></input><br/>
                    <input type="text" placeholder="Last name"></input><br/>
                    <input type="email" id="email" name="email" placeholder="E-mail" required></input><br/>
                    <input type="submit" value="DSDF"></input>
                </form>
            </div>
            

        </div> 
    )
}

export default Checkout;
