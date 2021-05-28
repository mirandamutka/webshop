import './ShoppingCart.css';
import BuyButton from './BuyButton';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actions as cartAction } from '../features/shoppingCart';
import MovieInCart from './MovieInCart';
import RemoveFromCart from './RemoveFromCart';
import MovieListHeading from './MovieListHeading';


const ShoppingCart = () => {

    let shoppingCart = useSelector(state => state.shoppingCart.product);

    const [itemInShoppingList, setItemInShoppingList] = useState(false);

    const dispatch = useDispatch();
	const removeFromCart = (movie) => dispatch(cartAction.removeFromCart(movie))
    

    if (shoppingCart !== []) {
    const shoppingList = shoppingCart.map((movie, index) => (
            <div key={index} className="movieContainer">
                <MovieInCart
                    title={movie ? movie.title : ''}
                    poster={movie ? movie.poster_path : ''}
                />
                <div onClick={() => removeFromCart(movie)} className="removeCart">
                    <RemoveFromCart />
                </div>
            </div>
        ))
        return (
            <div>
                <MovieListHeading heading='Shopping Cart' />
                {shoppingList}
                {shoppingList != ''
                ?   <div className="buyButtonShoppingCart">
                        <BuyButton text={"Buy"} />
                    </div>
                : ""
                }
                
            </div> 
        )
    } else {
        return (
            <div>
                <p>Empty</p>
            </div>
        )
    }
}

export default ShoppingCart;