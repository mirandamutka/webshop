import './ShoppingCart.css';
import './listItem.css';
import BuyButton from './BuyButton';
import { useSelector } from 'react-redux';
import MovieInCart from './MovieInCart';
import { MdShoppingCart } from 'react-icons/md';
import { useHistory } from 'react-router';


const ShoppingCart = (props) => {

    let shoppingCart = useSelector(state => state.shoppingCart.product);
    let totalSum = useSelector(state => state.shoppingCart.total);
    let history = useHistory();

    console.log('total sum: ', totalSum);

    const goToCheckout = () => {
        history.push('/Checkout')
    }
    
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
                        <p>{totalSum}$</p>
                        </div>
                            <BuyButton text={"Buy"} handleOnClick={() => goToCheckout()} />
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
                {shoppingCart.length > 0 ? <p>{totalSum}$ ({shoppingCart.length})</p> : ""}
            </div>
        )
    }
}

export default ShoppingCart;