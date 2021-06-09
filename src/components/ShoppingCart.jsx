import './ShoppingCart.css';
import './listItem.css';
import BuyButton from './BuyButton';
import { useSelector } from 'react-redux';
import MovieInCart from './MovieInCart';
import { MdShoppingCart } from 'react-icons/md';


const ShoppingCart = (props) => {

    let shoppingCart = useSelector(state => state.shoppingCart.product);
    let totalSum = useSelector(state => state.shoppingCart.total);
    
    if(props.toggle) {
        if (shoppingCart !== []) {
        const shoppingList = shoppingCart.map((movie, index) => {
            return (
                <div key={index} className="movieContainer">
                    <MovieInCart
                        title={movie ? movie.title : ''}
                        poster={movie ? movie.poster_path : ''}
                        price={movie.title.length}
                        remove={movie}
                    />
                </div>
            )
        })
            return (
                
                <div className={shoppingCart.length != 0 ? `shoppingCartContainer  expanded` : `shoppingCartContainer`}>
                    <MdShoppingCart className="shopping-cart-button flexEnd" size="3em" />
                    <div className={shoppingCart.length != 0 ? `cartItemsContainer  minimized` : `cartItemsContainer`}>
                        {shoppingList}
                    </div>
                    {shoppingList != '' ?   
                        <div className="buyButtonShoppingCart">
                        <div className="lineBreak" />
                        <div className="totalSumContainer">
                        <p>Total: </p>
                        <p>{totalSum}$</p>
                        </div>
                            <BuyButton text={"Buy"} />
                        </div>
                    : <div className="buyButtonShoppingCart"></div>}
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
                {shoppingCart.length > 0 ? <div className="row flexBetween"><p>{totalSum}$</p> <p className="cartItemAmount">({shoppingCart.length})</p></div> : ""}
            </div>
        )
    }
}

export default ShoppingCart;