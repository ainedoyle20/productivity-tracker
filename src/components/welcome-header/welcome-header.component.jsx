import React from "react";
import { Link } from "react-router-dom";

import './welcome-header.styles.css';

const WelcomeHeader = () => {
    return (
        <div className="welcome-header">
            <Link className="welcome-header-link" to="/register">Register / Login</Link>
        </div>
    );
}

export default WelcomeHeader;
