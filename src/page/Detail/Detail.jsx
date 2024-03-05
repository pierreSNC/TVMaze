import React, {useState} from 'react';
import { useLocation } from 'react-router-dom';
import './Detail.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons';

const Detail = () => {
    const location = useLocation();
    const movie = location.state.movie;
    const [favoriteMovies, setFavoriteMovies] = useState([]);

    function addToFavorites(movie) {
        const isFavorite = favoriteMovies.some((favMovie) => favMovie.id === movie.id);
        let updatedFavorites = [];

        if (isFavorite) {
            updatedFavorites = favoriteMovies.filter((favMovie) => favMovie.id !== movie.id);
        } else {
            updatedFavorites = [...favoriteMovies, movie];
        }

        setFavoriteMovies(updatedFavorites);
        localStorage.setItem('favoriteMovies', JSON.stringify(updatedFavorites));
    }


    return (
        <div className="detail__container">
            <div className="movieTitle">
                <h2>{movie.name}</h2>
            </div>
            <div className="detail__information">
                <div className="detail__genres">{movie.genres.join(', ')}</div>
                <div>
                    <p className="detail__recommendation">Recommandé à { (movie.rating.average * 10)} %</p>
                </div>
                <div>
                    <p>Beggining: {movie.premiered}</p>
                </div>
            </div>
            <div className="detail__wrapper">
                <img src={movie.image.original} alt=""/>
                <div dangerouslySetInnerHTML={{ __html: movie.summary }}></div>

            </div>
        </div>
    );
};

export default Detail;
