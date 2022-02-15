import React from 'react';
import { connect } from 'react-redux';
import { Routes, Route } from 'react-router-dom';

import { createUserProfileDocument, onAuthStateChanged, onSnapshot, auth } from './firebase/firebase.utils';
// import { useAuth } from './firebase/firebase.utils';

import { setCurrentUser } from './redux/user/user.actions';

import LandingPage from './pages/landing-page/landing-page.component';
import RegisterAndLoginPage from './pages/register-and-login-page/register-and-login-page.component';
import MainPage from './pages/main-page/main-page.component';

import './App.css';

class App extends React.Component {

  unsubscribeFromAuth = null;

  componentDidMount() {
    const { setCurrentUser } = this.props;

    this.unsubscribeFromAuth = onAuthStateChanged(auth, async userAuth => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        onSnapshot(userRef, snapShot => {
          setCurrentUser({
            id: snapShot.id,
            ...snapShot.data()
          })
        });
      } else {
        setCurrentUser(userAuth);
      }
    });
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }
  
  render() {
    const { currentUser } = this.props;
    console.log('currentUser: ', currentUser);
    return (
      <div>
        <Routes>
          <Route exact path="/" element={<LandingPage/>} />
          <Route path="/register" element={<RegisterAndLoginPage/>} />
          <Route path="/main/*" element={<MainPage />} />
        </Routes>
      </div>
    );  
  }
    
}

const mapStateToProps = ({ user }) => ({
  currentUser: user.currentUser
});

const mapDispatchToProps = dispatch => ({
  setCurrentUser: (user) => dispatch(setCurrentUser(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
