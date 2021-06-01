import './MovieInCart.css';
import '../App.css';
import RemoveFromCart from './RemoveFromCart';
import { actions as cartAction } from '../features/shoppingCart';
import { useDispatch } from 'react-redux';

const MovieInCart = (props) => {

    let price = props.price;

    if(props.price >= 100) {
        price = props.price.toString().substring(0, 2);
    }

    const dispatch = useDispatch();
    const removeFromCart = (movie) => dispatch(cartAction.removeFromCart(movie))

    return (
        <div className="cartItemContainer">
            <div className="row">
            <img src={`https://image.tmdb.org/t/p/w500/${props.poster}`} className="cartItemPoster" alt="" />
            <p className="cartItemTitle">{props.title}</p>
            </div>
            <div className="row rightRow">
            <p className="cartItemPrice">{price}$</p>
            <div onClick={() => removeFromCart(props.remove)}>
                <RemoveFromCart />
            </div>
            </div>
        </div>
    )
}

export default MovieInCart;