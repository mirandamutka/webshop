
import './listItem.css'
import './newReleasesList.css'
import { MdShoppingCart } from "react-icons/md"
import React, { useEffect, useState } from 'react'

const NewReleaseList = (props) => {

    const [movieList, setMovieList] = useState([]);

    useEffect(() => {
        fetch('http://www.omdbapi.com/?i=tt3896198&apikey=b7ed0243')
        .then((response) => response.json())
        .then((data) => setMovieList([...movieList, data]));
        
    }, []); 


    let listContent = movieList.map((movie)=> {

        console.log(movieList)
        return ([
            <div className="list-item">
                <img className="list-item-image" src={movie.Poster} alt="movie poster"></img>
                <h3 className="title">{movie.Title}</h3>
                <p className="genre">{movie.Genre}</p>
                <p className="director">{movie.Director}</p>
                <div className="price-wrapper">
                    <p className="price">8$</p>
                    <MdShoppingCart className="shopping-cart-button" size="2em" onClick={() => props.handleBuyClick(movie)} />
                </div>
            </div>
        ]);   
        
    })

    return ([
        <header className="new-releases-header">
            <h1 className="new-releases-headline">New releases:</h1>
        </header>,
        <main key="list" className="new-releases-conentent">
            {listContent}
        </main>
    ])
}

export default NewReleaseList;