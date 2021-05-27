import './MovieInCart.css';

const MovieInCart = (props) => {
    return (
        <div className="cartItemContainer">
            <img src={`https://image.tmdb.org/t/p/w500/${props.poster}`} className="cartItemPoster" />
            <p>{props.title}</p>
        </div>
    )
}

export default MovieInCart;