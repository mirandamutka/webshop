import './MovieInCart.css';

const MovieInCart = (props) => {
    return (
        <div className="cartItemContainer">
            <img src={props.poster} className="cartItemPoster" />
            <p>{props.title}</p>
        </div>
    )
}

export default MovieInCart;