import React from "react";
import { connect } from 'react-redux';

import Register from "../../components/register/register.component";
import Login from '../../components/login/login.component';

import './register-and-login-page.styles.css';
import { useNavigate } from "react-router";

const RegisterAndLoginPage = ({ showLogin }) => {
    const navigate = useNavigate();
    const goToMain = () => {
        navigate('/main/home');
    }

    return (
        <div className="register-and-login-page">
            {
                showLogin ? <Login /> : <Register goToMain={goToMain}/>
            }
        </div>
    );
}

const mapStateToProps = ({ user }) => ({
    showLogin: user.showLogin
});

export default connect(mapStateToProps)(RegisterAndLoginPage);
