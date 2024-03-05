import React, {useEffect, useRef, useState} from 'react';
import MovieCard from "../../components/MovieCard/MovieCard";
import {useNavigate} from "react-router-dom";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import './Movies.css'
import SwiperCore, {  Navigation } from 'swiper';
import 'swiper/swiper.min.css';
import 'swiper/swiper-bundle.min.css';
import Swiper from 'swiper';

SwiperCore.use([Navigation]);

const Movies = () => {
    const [allMovies, setAllMovies] = useState([]);
    const [searchMovie, setSearchMovie] = useState([]);
    const [recentlyMovie, setRecentlyMovie] = useState([]);
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(1);
    const [moviesPerPage] = useState(12);
    const [favoriteMovies, setFavoriteMovies] = useState([]);
    const swiperRef = useRef(null);

    useEffect(() => {

        const fetchAllMovies = async () => {
            const storedFavorites = JSON.parse(localStorage.getItem('favoriteMovies'));
            if (storedFavorites) {
                setFavoriteMovies(storedFavorites);
            }
            try {
                const response = await fetch(`https://api.tvmaze.com/shows?page=${currentPage}&pageSize=${moviesPerPage}`);
                const data = await response.json();
                setAllMovies(data);
            } catch (error) {
                console.error(error);
            }
        };

        const fetchRecentlyMovies = async () => {
            try {
                const response = await fetch(`https://api.tvmaze.com/shows`);
                const _data = await response.json();
                const recentlyMovieData = _data
                    .filter((movie) => movie.premiered !== null)
                    .sort((a, b) => new Date(b.premiered) - new Date(a.premiered))
                    .slice(0, 20);
                setRecentlyMovie(recentlyMovieData);
            } catch (error) {
                console.error(error);
            }
        }

        fetchAllMovies();
        fetchRecentlyMovies();
    }, [currentPage]);

    useEffect(() => {
        const swiper = new Swiper(swiperRef.current, {
            slidesPerView: 4,
            spaceBetween: 16,
            navigation: {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
            },
            breakpoints: {
                540: {
                    slidesPerView: 1,
                },
                768: {
                    slidesPerView: 2,
                },
                1024: {
                    slidesPerView: 3,
                },
                1280: {
                    slidesPerView: 4,
                }
            }
        });

        return () => {
            swiper.destroy();
        };
    }, []);

    function goToPreviousPage() {
        setCurrentPage(currentPage - 1);
    }

    function goToNextPage() {
        setCurrentPage(currentPage + 1);
    }
    function searchMovieFunction(movie)
    {
        let query = movie.target.value

        if (query !== '') {
            const fetchSearchMovies = async () => {
                try {
                    const response = await fetch('https://api.tvmaze.com/search/shows?q=' + query);
                    const data = await response.json();
                    const movies = data.map((result) => result.show);
                    setSearchMovie(movies);
                } catch (error) {
                    console.error(error);
                }
            };

            fetchSearchMovies()

        }
        console.log(query)
    }

    function navigateToDetail(movie) {
        navigate(`/detail`, { state: { movie } });
    }

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

    const addToFavoriteIcon = (
        <FontAwesomeIcon icon={faThumbsUp} className="addToFavorite" />
    );

    const removeToFavoriteIcon = (
        <FontAwesomeIcon icon={faThumbsUp} className="removeToFavorite" />
    );


    return (
        <div>
            <div className="movies__hero">
                <h2>All our films</h2>
            </div>
            <div style={{width: "90%", margin: '0 auto'}} >

                <input className="input__search" type="text" placeholder={'search a movies ...'} onChange={searchMovieFunction}/>

                <div className='allMovies__wrapper'>
                    {searchMovie.length > 0 ? (
                        searchMovie.map((movie) => (
                            <div className={'div'}>
                                <MovieCard
                                    key={movie.id}
                                    title={movie.name}
                                    genres={movie.genres ? movie.genres.join(', ') : ''}
                                    rating={movie.rating ? movie.rating.average : ''}
                                    navigateToDetail={() => navigateToDetail(movie)}
                                    thumbnail={movie.image ? movie.image.original : 'https://via.placeholder.com/100'}
                                    addToFavorite={() => addToFavorites(movie)}
                                    isFavorite={favoriteMovies.some((favMovie) => favMovie.id === movie.id) ? addToFavoriteIcon : removeToFavoriteIcon}
                                />
                            </div>
                        ))
                    ) : (
                        ''
                    )}
                </div>

                <div className='allMovies__wrapper'>
                    {allMovies
                        .slice((currentPage - 1) * moviesPerPage, currentPage * moviesPerPage)
                        .map((movie) => (
                            <MovieCard
                                key={movie.id}
                                title={movie.name}
                                genres={movie.genres ? movie.genres.join(', ') : ''}
                                rating={movie.rating ? movie.rating.average : ''}
                                navigateToDetail={() => navigateToDetail(movie)}
                                thumbnail={movie.image ? movie.image.original : 'https://via.placeholder.com/100'}
                                addToFavorite={() => addToFavorites(movie)}
                                isFavorite={favoriteMovies.some((favMovie) => favMovie.id === movie.id) ? addToFavoriteIcon : removeToFavoriteIcon}


                            />
                        ))}
                </div>
                <div className="allMovies__navigation">
                    <button onClick={goToPreviousPage} disabled={currentPage === 1}><i className="fa-solid fa-arrow-left"></i> Previous Page</button>
                    <button onClick={goToNextPage}>Next Page <i className="fa-solid fa-arrow-right"></i></button>
                </div>

                <div>
                    <div className="movieTitle">
                        <h2>Recently Movies</h2>
                    </div>
                    <div className="swiper mySwiper" ref={swiperRef} >
                        <div className="swiper-wrapper">
                            {recentlyMovie.map((movie) => (
                                <div className="swiper-slide" key={movie.id}>
                                    <MovieCard
                                        title={movie.name}
                                        genres={movie.genres.join(', ')}
                                        rating={movie.rating.average}
                                        thumbnail={movie.image.original}
                                        navigateToDetail={() => navigateToDetail(movie)}
                                        addToFavorite={() => addToFavorites(movie)}
                                        isFavorite={favoriteMovies.some((favMovie) => favMovie.id === movie.id) ? addToFavoriteIcon : removeToFavoriteIcon}
                                    />
                                </div>
                            ))}
                        </div>

                        <div className="swiper-button-next"></div>
                        <div className="swiper-button-prev"></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Movies;
