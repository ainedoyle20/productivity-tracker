import React, {useEffect, useState} from "react";

import WelcomeHeader from '../../components/welcome-header/welcome-header.component'; 
import Welcome from "../../components/welcome/welcome.compoonent";
import InstructionStep from "../../components/instruction-step/instruction-step.component";

import UpArrow from '../../assets/up-arrow.svg';

import { LandingPageContainer, BackToTopContainer } from './landing-page.styles.jsx';

const LandingPage = () => {
    const [ showScrollButton, setShowScrollButton ] = useState(false);

    const toggleVisibility = () => {
        if (window.pageYOffset > 400) {
            setShowScrollButton(true);

        } else {
            setShowScrollButton(false);
        }
    }

    useEffect(() => {
        window.addEventListener('scroll', toggleVisibility);

        return () => {
            window.removeEventListener('scroll', toggleVisibility);
        }

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
        <LandingPageContainer>
            <WelcomeHeader/>
            <Welcome />
            {
                Object.keys(instructions).map(key => {
                    return <InstructionStep key={key} title={key} text={instructions[key]} />
                })
            }
            {
                showScrollButton && (
                    <BackToTopContainer onClick={scrollToTop}>
                        <img src={UpArrow} alt="up arrow"  />
                    </BackToTopContainer>
                )
            }
        </LandingPageContainer>
    );
}

export default LandingPage;
