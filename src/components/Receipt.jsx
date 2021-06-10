import { useSelector } from "react-redux";
import BoughtMovie from "./BoughtMovie";
import './receipt.css';


const Receipt = () => {

    let shoppingCart = useSelector(state => state.shoppingCart.product);
    let totalSum = useSelector (state => state.shoppingCart.total);

    const shoppingList = shoppingCart.map((movie, index) => (
        <div key={index} className="movieContainer">
            <BoughtMovie
            title={movie ? movie.title : ''}
            poster={movie ? movie.poster_path : ''}
            price={movie.title.length}
            />
        </div>
        ));

    return (
        <div className="receipt-container">
            <h1 className="receipt-headline">Thank you for your purchase!</h1>
            <h3>Movies bought</h3>
            {shoppingList}
        </div>
    )
}

export default Receipt;