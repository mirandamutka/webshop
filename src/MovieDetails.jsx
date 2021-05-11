import './MovieDetails.css';

const MovieDetails = () => {
    return (
        <div className="movieDetailsContainer">
            <div className="closeWindow">✕</div>
            <section className="imgBox">
                <img src="https://upload.wikimedia.org/wikipedia/en/thumb/1/11/MisfitsTeaserPoster.jpg/220px-MisfitsTeaserPoster.jpg" className="moviePoster" />
            </section>
            <section className="infoBox">
                <section className="topInfo">
                    <h3>The Misfits</h3>
                    <section className="ratingGenre">
                        <div className="movieRating">R</div> | 
                        <div className="movieGenre">Action, Adventure, Thriller</div>
                    </section>
                    <div className="starRating">★★★★☆</div>
                    <div className="moviePlot">
                    After being recruited by a group of unconventional thieves, renowned criminal Richard Pace finds himself caught up in an elaborate gold heist that promises to have far-reaching implications on his life and the lives of countless others.
                    </div>
                    <div className="directorName">Director <b>Renny Harlin</b></div>
                    <div className="actorsList">Actors <b>Jamie Chung, Pierce Brosnan, Tim Roth, Nick Cannon</b></div>
                </section>
                <section className="bottomInfo">
                    <section className="languageCountry">
                        <div className="movieLanguage">Language <b>English</b></div>
                        <div className="movieCountry">Country <b>USA</b></div>
                    </section>
                    {/* Skapa en separat knapp komponent som kan återanvändas */}
                    <button className="buyButton">Buy 10$</button>
                </section>
            </section>
        </div>
    )
}

export default MovieDetails;