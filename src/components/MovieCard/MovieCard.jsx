import React from 'react';
import './MovieCard.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons';

const MovieCard = ({ title, genres, rating, thumbnail, navigateToDetail, addToFavorite, isFavorite }) => {

    const addToFavoriteIcon = (
        <FontAwesomeIcon icon={faThumbsUp} className="addToFavorite" />
    );

    return (
        <div className={'movieCard__container'}>
            <div className={'movieCard__wrapper'}>
                <div className={'movieCard__item movieCard__top'}>
                    <img src={thumbnail} alt="" className={'movieCard__thumbnail'} />
                </div>
                <div className={'movieCard__item movieCard__bottom'}>
                    <h2 className={'movieCard__title'}>{title}</h2>
                    <div className="information__wrapper">
                        <div className="thumb"  onClick={() => { addToFavorite(); }}>
                            {isFavorite ? isFavorite : addToFavoriteIcon}
                        </div>
                        <div className="information" onClick={navigateToDetail}>
                            <i className="fa-solid fa-info"></i>
                        </div>
                    </div>
                    <div className="detail__wrapper">
                        <p className="recommendation">Recommandé à { (rating * 10)} %</p>
                        <div className="movieCard__genres">{genres}</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

MovieCard.defaultProps = {
    isFavorite: 'add',
};

export default MovieCard;
