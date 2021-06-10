import './checkout.css'
import React, { useState } from 'react';
import MovieInCart from './MovieInCart';
import MovieListHeading from './MovieListHeading';
import BuyButton from './BuyButton';
import { useHistory } from 'react-router';
import { useSelector } from 'react-redux';

const Checkout = () => {

    let shoppingCart = useSelector(state => state.shoppingCart.product);
    let totalSum = useSelector(state => state.shoppingCart.total);
    let history = useHistory();

    const [payment, setPayment] = useState("")
    const [name, setName] = useState("")

    const goToReceipt = (event) => {
        console.log("namn:", name);
        if(payment != "") {
            if(shoppingCart.length != 0) {
                history.push('/Receipt')
          }
        }
        event.preventDefault();
    }

    const handlePayment = (selected) => {
        setPayment(selected);
    }

    
    const shoppingList = shoppingCart.map((movie, index) => (
        <div key={index} className="movieContainer">
            <MovieInCart 
                title={movie ? movie.title : ''}
                poster={movie ? movie.poster_path : ''}
                price={movie.title.length}
                remove={movie}/>
        </div>
    ));


    return (
        <div className="checkout-page">
            <MovieListHeading heading="Your Shopping Cart" />
            <div className="shopping-cart">
                {shoppingList} 
                <div className="lineBreak" />
                <div className="totalSumContainer">
                    <p>Total: </p>
                    <p>{totalSum}$</p>
                </div>
            </div>
            <MovieListHeading heading="Select Payment Method" />
            <div className="paymethod">
                <button className="payment-button" onClick={() => handlePayment("mastercard")}>
                    <img
                    className="payment-img"
                    src="https://cdn0.iconfinder.com/data/icons/credit-card-debit-card-payment-PNG/128/Mastercard-Curved.png" 
                    alt="" />
                </button>
                <button className="payment-button" onClick={() => handlePayment("discover")}>
                    <img 
                    className="payment-img" 
                    src="https://cdn0.iconfinder.com/data/icons/credit-card-debit-card-payment-PNG/128/Discover-Curved.png" 
                    alt="" />
                </button>
                <button className="payment-button" onClick={() => handlePayment("paypal")}>
                    <img 
                    className="payment-img" 
                    src="https://cdn0.iconfinder.com/data/icons/credit-card-debit-card-payment-PNG/128/Paypal-Curved.png" 
                    alt="" />
                </button>
                <button className="payment-button" onClick={() => handlePayment("amex")}>
                    <img 
                    className="payment-img" 
                    src="https://cdn0.iconfinder.com/data/icons/credit-card-debit-card-payment-PNG/128/American-Express-Curved.png" 
                    alt="" /> 
                </button>
            </div>
            <MovieListHeading heading="Your Information" />
            <form onSubmit={goToReceipt}>
                <div className="costumer-info">
                    <input type="text" placeholder="First name" value={name} onChange={(event) =>{ console.log("onchage", name); setName(event.target.value)}} required></input>
                    <br/>
                    <input type="text" placeholder="Last name" required></input>
                    <br/>
                    <input type="email" id="email" name="email" placeholder="E-mail" required></input>
                    <br/>
                </div>
                
                <BuyButton type="submit" text="Buy" />
            </form>
        </div> 
    )
}

export default Checkout;
