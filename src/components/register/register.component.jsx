import React from "react";
import { connect } from "react-redux";

import { registerWithEmailAndPassword, createUserProfileDocument, signInWithGoogle } from "../../firebase/firebase.utils";

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
            isLoading: false,
        }
    }

    // let navigate = useNavigate();
    // const goHome = () => {
    //     navigate('/home');
    // }

    // export function* signUp({ payload: { displayName, email, password }}) {
    //     try {
    //       const {user} = yield auth.createUserWithEmailAndPassword(email, password);
    //       const userRef = yield call(createUserProfileDocument, user, { displayName });
    //       const snapshot = yield userRef.get();
    //       yield put(signUpSuccess({ id: snapshot.id, ...snapshot.data() }));
    //     } catch (error) {
    //       yield put(signUpFailure(error));
    //     }
    // }
    

    handleSubmit = async event => {
        event.preventDefault();
        this.setState({ isLoading: true });

        const { displayName, email, password } = this.state;
        const { redirectToHome } = this.props;

        try {
            const {user} = await registerWithEmailAndPassword(email, password); 
            await createUserProfileDocument(user, {displayName});
            this.setState({
                displayName: '',
                email: '',
                password: '',
                confirmPassword: '',
                isLoading: false,
            }, () => redirectToHome());
        } catch (error) {
            alert('This email is already in use.');
            this.setState({ isLoading: false});
            return;
        }
        
        // const { goToMain } = this.props;

        // this.setState({
        //     displayName: '',
        //     email: '',
        //     password: '',
        //     confirmPassword: '',
        //     isLoading: false,
        // }, () => goToMain());
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
                   <button className="register-button" type="submit" disabled={this.state.isLoading}>
                       Register
                    </button> 
                   <span>OR</span>
                   <button className="google-button" type="button" onClick={signInWithGoogle}>Continue with Google</button>
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
