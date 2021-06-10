import './boughtMovie.css';
import '../App.css';
import './listItem.css';

const BoughtMovie = (props) => {

    return (
        <div className="list-item">
            <img src={`https://image.tmdb.org/t/p/w500/${props.poster}`} className="bought-item-poster" alt="" />
            <h3 className="bought-item-title">{props.title}</h3>
        </div>
    )
}

export default BoughtMovie;