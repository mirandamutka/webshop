import './BuyButton.css';

const BuyButton = (props) => {
    return (
        <button className="buyButton" onClick={props.handleOnClick}>{props.text}</button>
    )
}

export default BuyButton;