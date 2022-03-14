import React, { useState } from "react";
import { NavLink } from "react-router-dom";

import Menu from '../../assets/menu.svg';

import './navbar.styles.css';

const NavBar = () => {
    const [showNavbar, setShowNavbar] = useState(false);

    const closeNavbar = () => {
        setShowNavbar(false);
    }

    const openNavbar = () => {
        setShowNavbar(true);
    }

    return (
        <div>
            <button className="open-navbar-button" onClick={() => openNavbar()}>
                <img src={Menu} alt="Menu" />
            </button>
            <div className={`navbar ${showNavbar ? '' : 'hide-navbar'}`}>
                <div className="close-navbar-button-container">
                    <button className="close-navbar" onClick={() => closeNavbar()}>
                        <img src={Menu} alt="Menu" />
                    </button>
                </div>

                <div className="navbar-pages-links-container">
                    <NavLink className="navbar-page-link" to="/main/home">
                        <span className="page-link-text">Home</span>
                    </NavLink>
                    <NavLink className="navbar-page-link" to="/main/schedule">
                        <span className="page-link-text">Calendar</span>
                    </NavLink>
                    <NavLink className="navbar-page-link" to="/main/progress">
                        <span className="page-link-text">Progress Chart</span>
                    </NavLink>
                </div>

                <div className="navbar-setup-page-link-container">
                    <NavLink className="navbar-page-link" to="/">
                        <span className="page-link-text">Set Up</span>
                    </NavLink>
                </div>
                
            </div>
        </div>
    );
}

export default NavBar;
