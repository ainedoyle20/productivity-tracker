import React from "react";

import WelcomeHeader from "../welcome-header/welcome-header.component";

import './welcome.styles.css';

const Welcome = () => {
    return (
        <div className="welcome">
            <WelcomeHeader />
            <h1>Boost Your Productivity</h1>
        </div>
    );
}

export default Welcome;
