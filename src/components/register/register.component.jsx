import React from "react";
import { connect } from "react-redux";

import { toggleLogin } from '../../redux/user/user.actions';

import './register.styles.css';

class Register extends React.Component {
    constructor() {
        super();
        this.state = {
            displayName: '',
            email: '',
            password: '',
            confirmPassword: '',
        }
    }

    // let navigate = useNavigate();
    // const goHome = () => {
    //     navigate('/home');
    // }
    

    handleSubmit = event => {
        event.preventDefault();

        const { goToMain } = this.props;

        this.setState({
            displayName: '',
            email: '',
            password: '',
            confirmPassword: '',
        }, () => goToMain());
    }

    handleChange = event => {
        const { name, value } = event.target;

        this.setState({ [name]: value });
    }

    render() {
        const { toggleLogin } = this.props;
        return (
            <div className="register">
                <h2>Register</h2>
            <span>Don't have an account? Enter your details below to get started.</span>
            <form onSubmit={this.handleSubmit} className="register-form">
                <input
                    className="form-input"
                    name="displayName"
                    type="text"
                    value={this.state.displayName}
                    onChange={this.handleChange}
                    placeholder="display name"
                />
                <input
                    className="form-input"
                    name="email"
                    type="text"
                    value={this.state.email}
                    onChange={this.handleChange}
                    placeholder="email"
                />
                <input
                    className="form-input"
                    name="password"
                    type="password"
                    value={this.state.password}
                    onChange={this.handleChange}
                    placeholder="password"
                />
                <input
                    className="form-input"
                    name="confirmPassword"
                    type="password"
                    value={this.state.confirmPassword}
                    onChange={this.handleChange}
                    placeholder="confirm password"
                />
                <div className="form-buttons">
                   <button className="register-button" type="submit">Register</button> 
                   <span>OR</span>
                   <button className="google-button" type="button">Continue with Google</button>
                </div>
                
                <span>Already have an account? Login 
                    <span className="login-here" onClick={() => toggleLogin()}>
                        here
                    </span>
                </span>
            </form>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    toggleLogin: () => dispatch(toggleLogin()),
});

export default connect(null, mapDispatchToProps)(Register);
