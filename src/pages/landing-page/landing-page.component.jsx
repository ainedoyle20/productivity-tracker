import React, {useState, useEffect} from "react";

import WelcomeHeader from '../../components/welcome-header/welcome-header.component'; 
import Welcome from "../../components/welcome/welcome.compoonent";
import InstructionStep from "../../components/instruction-step/instruction-step.component";

import UpArrow from '../../assets/up-arrow.svg';

import { BackToTopContainer } from './landing-page.styles.jsx';

const LandingPage = () => {
    const [showButton, setShowButton] = useState(false);

    useEffect(() => {
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                setShowButton(true);
            } else {
                setShowButton(false);
            }
        });
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    const instructions = {
        'Step 1': 'Register or Login to access your data.',
        'Step 2': 'Add and Complete your todos at Home. Or schedule future todos at Calendar.',
        'Step 3': 'Track your productivity at Progress.'
    }

    return (
        <div>
            <WelcomeHeader />
            <Welcome />
            {
                Object.keys(instructions).map(key => {
                    return <InstructionStep key={key} title={key} text={instructions[key]} />
                })
            }
            {
                showButton && (
                    <BackToTopContainer onClick={scrollToTop}>
                        <img src={UpArrow} alt="up arrow"  />
                    </BackToTopContainer>
                )
            }
        </div>
    );
}

export default LandingPage;
