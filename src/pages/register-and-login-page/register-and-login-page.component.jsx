import React, {useEffect, useState} from "react";
import { connect } from 'react-redux';
import { useNavigate } from "react-router";

import { registerWithEmailAndPassword, createUserProfileDocument, auth, signInWithEmailAndPassword } from "../../firebase/firebase.utils";

import Register from "../../components/register/register.component";
import Login from '../../components/login/login.component';

import { RegisterAndLoginPageContainer } from './register-and-login-page.styles';

const RegisterAndLoginPage = ({ currentUser }) => {
    const [formData, setFormData] = useState({
        displayName: '',
        registerEmail: '',
        registerPassword: '',
        loginEmail: '',
        loginPassword: '',
        confirmPassword: '',
    });
    const [showLogin, setShowLogin] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();
    const redirectToHome = () => {
        navigate('/main/home');
    }

    useEffect(() => {
        if(currentUser) {
            redirectToHome();
        }
    }, [currentUser]);

    const toggleLogin = () => {
        setShowLogin(!showLogin);
    }

    const onChange = e => {
        const { value, name } = e.target;

        setFormData({...formData, [name]: value });
    }

    const onRegister = async e => {
        e.preventDefault();
        setIsLoading(true);

        const { displayName, registerEmail, registerPassword, confirmPassword } = formData;

        if (registerPassword !== confirmPassword) {
            alert('passwords do not match');
            setIsLoading(false);
            return;
        }

        try {
            const {user} = await registerWithEmailAndPassword(registerEmail, registerPassword); 
            setIsLoading(false);
            setFormData({
                displayName: '',
                registerEmail: '',
                registerPassword: '',
                loginEmail: '',
                loginPassword: '',
                confirmPassword: '',
            });
            await createUserProfileDocument(user, {displayName});
        } catch (error) {
            alert('This email is already in use.');
            setIsLoading(false);
            return;
        }
    }

    const onLogin = async e => {
        e.preventDefault();
        setIsLoading(true);

        const { loginEmail, loginPassword } = formData;

        try {
            await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
            setIsLoading(false);
            setFormData({
                displayName: '',
                registerEmail: '',
                registerPassword: '',
                loginEmail: '',
                loginPassword: '',
                confirmPassword: '',
            });
        } catch (error) {
            console.log('error: ', error);
            alert('Wrong password try again.');
            setIsLoading(false);
            return;
        }
    }

    return (
        <RegisterAndLoginPageContainer>
            {
                showLogin 
                ? <Login formData={formData} onLogin={onLogin} onChange={onChange} toggleLogin={toggleLogin} isLoading={isLoading}/> 
                : <Register onRegister={onRegister} onChange={onChange} formData={formData} toggleLogin={toggleLogin} isLoading={isLoading}/>
            }
        </RegisterAndLoginPageContainer>
    );
}

const mapStateToProps = ({ user }) => ({
    currentUser: user.currentUser,
});

export default connect(mapStateToProps)(RegisterAndLoginPage);
