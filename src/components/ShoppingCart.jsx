import './ShoppingCart.css';
import './listItem.css';
import BuyButton from './BuyButton';
import { useSelector } from 'react-redux';
import MovieInCart from './MovieInCart';
import { MdShoppingCart } from 'react-icons/md';


const ShoppingCart = (props) => {

    let shoppingCart = useSelector(state => state.shoppingCart.product);
    
    if(props.toggle) {
        if (shoppingCart !== []) {
        const shoppingList = shoppingCart.map((movie, index) => {
            return (
                <div key={index} className="movieContainer">
                    <MovieInCart
                        title={movie ? movie.title : ''}
                        poster={movie ? movie.poster_path : ''}
                        price={movie.genre_ids[0] ? movie.genre_ids[0] : 8}
                        remove={movie}
                    />
                </div>
            )
        })
            return (
                <div className="shoppingCartContainer">
                    <MdShoppingCart className="shopping-cart-button flexEnd" size="3em" />
                    <div className="cartItemsContainer">
                        {shoppingList}
                    </div>
                    {shoppingList != '' ?   
                        <div className="buyButtonShoppingCart">
                        <div className="lineBreak" />
                        <div className="totalSumContainer">
                        <p>Total: </p>
                        <p>50$</p>
                        </div>
                            <BuyButton text={"Buy"} />
                        </div>
                    : ""}
                </div> 
            )
        } else {
            return (
                <div>
                    <p>Empty</p>
                </div>
            )
        }
    } else {
        return (
            <div className="shoppingCartContainer flexCenter">
                    <MdShoppingCart className="shopping-cart-button" size="3em" />
                {shoppingCart.length > 0 ? <p>500$ ({shoppingCart.length})</p> : ""}
            </div>
        )
    }
}

export default ShoppingCart;