import React from "react";
import { connect } from "react-redux";

import { auth, signInWithEmailAndPassword } from "../../firebase/firebase.utils";

import { toggleLogin } from "../../redux/user/user.actions";

import './login.styles.css';

class Login extends React.Component {
    constructor() {
        super();
        this.state = {
            email: '',
            password: '',
        }
    }

    handleSubmit = async event => {
        event.preventDefault();

        const { email, password } = this.state;

        try {
            await signInWithEmailAndPassword(auth, email, password);
            this.setState({
                email: '',
                password: '',
            });
        } catch (error) {
            console.log('error signing in: ', error.message);
        }
    }

    handleChange = event => {
        const { name, value } = event.target;

        this.setState({ [name]: value });
    }

    render() {
        const { toggleLogin } = this.props;
        const { email, password } = this.state;
        return (
            <div className="login">
                <h2>Login</h2>
                <span>Enter your email and password to begin.</span>
                <form onSubmit={this.handleSubmit} className="login-form">
                    <input
                        className="form-input"
                        name="email"
                        type="text"
                        value={email}
                        onChange={this.handleChange}
                        placeholder="email"
                    />
                    <input
                        className="form-input"
                        name="password"
                        type="password"
                        value={password}
                        onChange={this.handleChange}
                        placeholder="password"
                    />
                    <button type="submit">Login</button>
                    <span>Don't have an account yet? Register
                        <span className="login-here" onClick={() => toggleLogin()}>here</span>
                    </span>
                </form>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    toggleLogin: () => dispatch(toggleLogin()),
});

export default connect(null, mapDispatchToProps)(Login);
