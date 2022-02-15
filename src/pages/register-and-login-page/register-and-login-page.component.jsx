import React from "react";
import { connect } from 'react-redux';
import { useNavigate } from "react-router";

import Register from "../../components/register/register.component";
import Login from '../../components/login/login.component';

import './register-and-login-page.styles.css';

const RegisterAndLoginPage = ({ showLogin }) => {
    const navigate = useNavigate();
    const redirectToHome = () => {
        navigate('/main/home');
    }

    return (
        <div className="register-and-login-page">
            {
                showLogin ? <Login redirectToHome={redirectToHome} /> : <Register redirectToHome={redirectToHome}/>
            }
        </div>
    );
}

const mapStateToProps = ({ user }) => ({
    showLogin: user.showLogin,
});

export default connect(mapStateToProps)(RegisterAndLoginPage);
