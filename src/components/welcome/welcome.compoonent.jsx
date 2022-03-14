import React from "react";

// import WelcomeHeader from "../welcome-header/welcome-header.component";

import {
    WelcomeContainer,
    WelcomeSubtitle,
} from './welcome.styles';

const Welcome = () => {
    return (
        <WelcomeContainer>
            {/* <WelcomeHeader /> */}
            <h1>Boost Your Productivity</h1>
            <WelcomeSubtitle>Scroll down for set up instructions</WelcomeSubtitle>
        </WelcomeContainer>
    );
}

export default Welcome;
