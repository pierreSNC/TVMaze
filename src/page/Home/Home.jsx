import React from 'react';
import BestRatingMovies from "../../components/BestRatingMovies/BestRatingMovies";
import HorrorCategoryMovies from "../../components/HorrorCategoryMovies/HorrorCategoryMovies";
import Recommendation from "../../components/Recommendation/Recommendation";
import './Home.css'

const Home = () => {

    return (
        <div>
            <div className="hero">
                <h1>Welcome to TVMaze</h1>
            </div>
            <BestRatingMovies />
        </div>
    );
};

export default Home;
