import React from "react";

import {
    LoginContainer,
    LoginTitle,
    LoginSubtitle,
    LoginForm,
    LoginFormInput,
    LoginButton,
    NoAccountYetMessage,
    RegisterHere,
} from './login.styles';

const Login = ({ formData, onChange, onLogin, toggleLogin, isLoading }) => {
    const { loginEmail, loginPassword } = formData;

    return (
        <LoginContainer>
            <LoginTitle>Login</LoginTitle>
            <LoginSubtitle>Enter your email and password to begin.</LoginSubtitle>
            <LoginForm onSubmit={onLogin}>
                <LoginFormInput
                    name="loginEmail"
                    type="email"
                    value={loginEmail}
                    onChange={onChange}
                    placeholder="email"
                />
                <LoginFormInput
                    name="loginPassword"
                    type="password"
                    value={loginPassword}
                    onChange={onChange}
                    placeholder="password"
                />
                <LoginButton type="submit" disabled={isLoading}>Login</LoginButton>
                <NoAccountYetMessage>Don't have an account yet? Register
                    <RegisterHere onClick={toggleLogin}>here</RegisterHere>
                </NoAccountYetMessage>
            </LoginForm>
        </LoginContainer>
    );
}

export default Login;
