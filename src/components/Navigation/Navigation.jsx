import React from 'react';
import {NavLink} from "react-router-dom";
import './Navigation.css'

const Navigation = () => {
    return (
        <div className="navigation__wrapper">
            <div className="navigation__item">
                <img src="https://upload.wikimedia.org/wikipedia/commons/7/7a/Logonetflix.png" alt="" width="150px"/>
                <ul>
                    <NavLink to="/">
                        <li>Home</li>
                    </NavLink>
                    <NavLink to="/favorite">
                        <li>Favorite</li>
                    </NavLink>
                    <NavLink to="/movies">
                        <li>Movies</li>
                    </NavLink>
                </ul>
            </div>
        </div>
    );
};

export default Navigation;