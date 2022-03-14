import React from "react";

import { signInWithGoogle } from "../../firebase/firebase.utils";

import {
    RegisterContainer,
    RegisterTitle,
    RegisterSubtitle,
    RegisterForm,
    RegisterFormInput,
    RegisterFormButtonsContainer,
    RegisterButton,
    ContinueWithGoogleButton,
    AlreadyHaveAnAccountMessage,
    LoginHereContainer,
} from './register.styles';

const Register = ({ formData, onRegister, onChange, toggleLogin, isLoading }) => {
    const { displayName, registerEmail, registerPassword, confirmPassword } = formData;

    return (
        <RegisterContainer>
            <RegisterTitle>Register</RegisterTitle>
            <RegisterSubtitle>Don't have an account? Enter your details below to get started.</RegisterSubtitle>
            <RegisterForm onSubmit={onRegister}>
                <RegisterFormInput
                    name="displayName"
                    type="text"
                    value={displayName}
                    onChange={onChange}
                    placeholder="display name"
                />
                <RegisterFormInput
                    name="registerEmail"
                    type="email"
                    value={registerEmail}
                    onChange={onChange}
                    placeholder="email"
                />
                <RegisterFormInput
                    name="registerPassword"
                    type="password"
                    value={registerPassword}
                    onChange={onChange}
                    placeholder="password"
                />
                <RegisterFormInput
                    name="confirmPassword"
                    type="password"
                    value={confirmPassword}
                    onChange={onChange}
                    placeholder="confirm password"
                />
                <RegisterFormButtonsContainer>
                    <RegisterButton type="submit" disabled={isLoading}>
                        Register
                    </RegisterButton> 
                    <ContinueWithGoogleButton type="button" onClick={signInWithGoogle}>Continue with Google</ContinueWithGoogleButton>
                </RegisterFormButtonsContainer>
                
                <AlreadyHaveAnAccountMessage>Already have an account? Login 
                    <LoginHereContainer onClick={toggleLogin}>
                        here
                    </LoginHereContainer>
                </AlreadyHaveAnAccountMessage>
            </RegisterForm>
        </RegisterContainer>
    );
}

export default Register;
