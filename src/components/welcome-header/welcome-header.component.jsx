import React from "react";
import { connect } from "react-redux";

import { auth, signOut } from "../../firebase/firebase.utils";

import BackArrow from '../../assets/left-arrow.svg';

import {
    WelcomeHeaderContainer,
    WelcomeHeaderLink,
    BackToHomeLinkContainer,
    BackToHomeArrow,
    WelcomeHeaderLinksContainer,
} from './welcome-header.styles';

const WelcomeHeader = ({ currentUser }) => {
    return (
        <WelcomeHeaderContainer>
            <BackToHomeLinkContainer>
                {
                    currentUser ?
                    <>
                        <BackToHomeArrow src={BackArrow} alt="back arrow" />
                        <WelcomeHeaderLink to="/main/home">Back to Home</WelcomeHeaderLink>
                    </>
                    : null
                }
            </BackToHomeLinkContainer>
            <WelcomeHeaderLinksContainer>
                {
                    currentUser 
                        ?  <WelcomeHeaderLink as="div" onClick={() => signOut(auth)}>Logout</WelcomeHeaderLink>
                        

                        : <WelcomeHeaderLink to="/register">Register / Login</WelcomeHeaderLink>
                }
            </WelcomeHeaderLinksContainer>
        </WelcomeHeaderContainer>
    );
}

const mapStateToProps = ({ user }) => ({
    currentUser: user.currentUser,
});

export default connect(mapStateToProps)(WelcomeHeader);
