
import React from 'react';
import { MdDelete } from "react-icons/md"


const Checkout = () => {

    return (
        <div className="checkout-wrapper">
            <header className="checkout-header">
                <h1 className="checkout-title">Your shopping cart</h1>
            </header>
            <div>
                <div className="in-shopping-cart-wrapper">
                    <img src="bla bla" alt="poster"></img>
                    <h3>title</h3>
                    <p>8$</p>
                    <MdDelete className="delete-button" size="2em" />
                </div>
                <div>
                    
                </div>
            </div>
        </div>
    )
}

export default Checkout;
