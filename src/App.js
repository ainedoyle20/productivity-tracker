import React, {useEffect} from 'react';
import { connect } from 'react-redux';
import { Routes, Route } from 'react-router-dom';

import { updateIncompletedTodos, updateCompletedTodos } from './redux/todos/todos.actions';
import { setCurrentDate } from './redux/calendar/calendar.actions';

import { createUserProfileDocument, onAuthStateChanged, onSnapshot, auth, fetchTodosForCurrentDay, firebasePercentagesCheck } from './firebase/firebase.utils';

import { setCurrentUser } from './redux/user/user.actions';

import LandingPage from './pages/landing-page/landing-page.component';
import RegisterAndLoginPage from './pages/register-and-login-page/register-and-login-page.component';
import MainPage from './pages/main-page/main-page.component';

import './App.css';

const App = ({setCurrentUser, currentUser, updateCompletedTodos, updateIncompletedTodos, setCurrentDate, todos, completedTodos}) => {

  useEffect(async () => {
    if (currentUser) {
      const currentUserId = currentUser.id;
      console.log('currentUserId: ', currentUserId);

      const dt = new Date();
      const day = dt.getDate();
      const month = dt.getMonth();
      const year = dt.getFullYear();

      const daysInMonth = new Date(year, month + 1, 0).getDate();

      const currentDate = `${day}-${month + 1}-${year}`;
      console.log('currentDate: ', currentDate);
      setCurrentDate(currentDate);

      firebasePercentagesCheck(currentUserId, currentDate, daysInMonth);

      const {firebaseTodos, firebaseCompletedTodos} = await fetchTodosForCurrentDay(currentUserId, currentDate);
      updateCompletedTodos(firebaseCompletedTodos); 
      updateIncompletedTodos(firebaseTodos);
    }
  }, [currentUser]);


  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async userAuth => {
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

    return unsub;
  }, []);

  return (
    <div>
      <Routes>
        <Route exact path="/" element={<LandingPage/>} />
        <Route path="/register" element={<RegisterAndLoginPage/>} />
        <Route path="/main/*" element={<MainPage />} />
      </Routes>
    </div>
  ); 
};

const mapStateToProps = ({ user, todos }) => ({
  currentUser: user.currentUser,
  todos: todos.todos,
  completedTodos: todos.completedTodos,
});

const mapDispatchToProps = dispatch => ({
  setCurrentUser: (user) => dispatch(setCurrentUser(user)),
  updateCompletedTodos: (completedTodosArray) => dispatch(updateCompletedTodos(completedTodosArray)),
  updateIncompletedTodos: (inCompleteTodos) => dispatch(updateIncompletedTodos(inCompleteTodos)),
  setCurrentDate: (currentDate) => dispatch(setCurrentDate(currentDate)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
