import React from "react";
import { connect } from 'react-redux';

import Register from "../../components/register/register.component";
import Login from '../../components/login/login.component';

import './register-and-login-page.styles.css';

const RegisterAndLoginPage = ({ showLogin }) => {
    return (
        <div className="register-and-login-page">
            {
                showLogin ? <Login /> : <Register />
            }
        </div>
    );
}

const mapStateToProps = ({ user }) => ({
    showLogin: user.showLogin
});

export default connect(mapStateToProps)(RegisterAndLoginPage);
