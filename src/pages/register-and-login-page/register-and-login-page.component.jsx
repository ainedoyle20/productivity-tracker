import React, {useEffect, useState} from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

import { registerWithEmailAndPassword, createUserProfileDocument, auth, signInWithEmailAndPassword } from "../../firebase/firebase.utils";

import { selectCurrentUser } from '../../redux/user/user.selectors';

import Register from "../../components/register/register.component";
import Login from '../../components/login/login.component';

import BackArrow from '../../assets/left-arrow.svg';

import { RegisterAndLoginPageContainer, BackToSetupLinkContainer } from './register-and-login-page.styles';

const RegisterAndLoginPage = () => {
    const currentUser = useSelector(selectCurrentUser);

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
    });

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
            <BackToSetupLinkContainer>
                <img src={BackArrow} alt="back arrow" />
                <Link to='/'>Back to Setup</Link>
            </BackToSetupLinkContainer>
            {
                showLogin 
                ? <Login formData={formData} onLogin={onLogin} onChange={onChange} toggleLogin={toggleLogin} isLoading={isLoading}/> 
                : <Register onRegister={onRegister} onChange={onChange} formData={formData} toggleLogin={toggleLogin} isLoading={isLoading}/>
            }
        </RegisterAndLoginPageContainer>
    );
}

export default RegisterAndLoginPage;
