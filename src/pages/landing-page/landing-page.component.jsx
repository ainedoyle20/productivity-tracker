import React from "react";

import Welcome from "../../components/welcome/welcome.compoonent";
import Step1 from "../../components/step1/step1.component";
import Step2 from '../../components/step2/step2.component';

import './landing-page.styles.css';

const LandingPage = () => {
    return (
        <div className="landing-page">
            <Welcome />
            <Step1 />
            <Step2 />
        </div>
    );
}

export default LandingPage;
