import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { auth, signOut } from "../../firebase/firebase.utils";

import './welcome-header.styles.css';

const WelcomeHeader = ({ currentUser }) => {
    return (
        <div className="welcome-header">
            {
                currentUser 
                    ?  <div onClick={() => signOut(auth)}>Logout</div> 
                    : <Link className="welcome-header-link" to="/register">Register / Login</Link>
            }
            
        </div>
    );
}

const mapStateToProps = ({ user }) => ({
    currentUser: user.currentUser,
});

export default connect(mapStateToProps)(WelcomeHeader);
