import './listItem.css'
import React from 'react';
import { MdShoppingCart } from "react-icons/md"


const ListItem = () => {


    return (
        <div className="list-item">
            <img className="list-item-image" src="https://m.media-amazon.com/images/M/MV5BNjM0NTc0NzItM2FlYS00YzEwLWE0YmUtNTA2ZWIzODc2OTgxXkEyXkFqcGdeQXVyNTgwNzIyNzg@._V1_SX300.jpg" alt="movie poster"></img>
            <h3 className="title">Titel</h3>
            <p className="genre">(Genre)</p>
            <p className="director">By Renny Harlin</p>
            <div className="price-wrapper">
                <p className="price">8$</p>
                <MdShoppingCart className="shopping-cart-button" size="2em" />
            </div>
        </div>
    )
}

export default ListItem;