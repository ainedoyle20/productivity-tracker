import React, {useEffect, Suspense} from 'react';
import { connect } from 'react-redux';
import { Routes, Route } from 'react-router-dom';

import { updateIncompletedTodos, updateCompletedTodos } from './redux/todos/todos.actions';
import { setCurrentDate } from './redux/calendar/calendar.actions';

import { createUserProfileDocument, onAuthStateChanged, onSnapshot, auth, fetchTodosForCurrentDay, firebasePercentagesCheck } from './firebase/firebase.utils';

import { setCurrentUser } from './redux/user/user.actions';

import ErrorBoundary from './components/error-boundary/error-boundary.component';

import { GlobalStyle } from './global.styles.jsx';

const LandingPage = React.lazy(() => import('./pages/landing-page/landing-page.component'));
const RegisterAndLoginPage = React.lazy(() => import('./pages/register-and-login-page/register-and-login-page.component'));
const MainPage = React.lazy(() => import('./pages/main-page/main-page.component'));

const App = ({setCurrentUser, currentUser, updateCompletedTodos, updateIncompletedTodos, setCurrentDate, }) => {

  useEffect(() => {
    if (currentUser) {
      const currentUserId = currentUser.id;
      console.log('currentUserId: ', currentUserId);

      const dt = new Date();
      const day = dt.getDate();
      const month = dt.getMonth();
      const year = dt.getFullYear();

      const daysInMonth = new Date(year, month + 1, 0).getDate();

      const currentDate = `${day}-${month + 1}-${year}`;
      setCurrentDate(currentDate);

      firebasePercentagesCheck(currentUserId, currentDate, daysInMonth);

      const fetchFirebaseTodos = async () => {
        const {firebaseTodos, firebaseCompletedTodos} = await fetchTodosForCurrentDay(currentUserId, currentDate);
        updateCompletedTodos(firebaseCompletedTodos); 
        updateIncompletedTodos(firebaseTodos);
      }

      fetchFirebaseTodos();
    }
  }, [currentUser, setCurrentDate, updateCompletedTodos, updateIncompletedTodos]);

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
  }, [setCurrentUser]);

  return (
    <div>
      <GlobalStyle/>
      <ErrorBoundary>
        <Suspense fallback={<h2>Loading...</h2>}>
          <Routes>
            <Route exact path="/" element={<LandingPage/>} />
            <Route path="/register" element={<RegisterAndLoginPage/>} />
            <Route path="/main/*" element={<MainPage />} />
          </Routes>
        </Suspense>
      </ErrorBoundary>
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
