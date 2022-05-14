import React, {useEffect, Suspense} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Routes, Route } from 'react-router-dom';

import { selectCurrentUser } from './redux/user/user.selectors';

import { setCurrentUser } from './redux/user/user.actions';
import { setCurrentDate } from './redux/calendar/calendar.actions';

import { createUserProfileDocument, onAuthStateChanged, onSnapshot, auth, firebasePercentagesCheck } from './firebase/firebase.utils';

import ErrorBoundary from './components/error-boundary/error-boundary.component';

import { GlobalStyle } from './global.styles.jsx';

const LandingPage = React.lazy(() => import('./pages/landing-page/landing-page.component'));
const RegisterAndLoginPage = React.lazy(() => import('./pages/register-and-login-page/register-and-login-page.component'));
const MainPage = React.lazy(() => import('./pages/main-page/main-page.component'));

const App = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUser);

  useEffect(() => {
    if (currentUser) {
      const currentUserId = currentUser.id;

      const dt = new Date();
      const day = dt.getDate();
      const month = dt.getMonth();
      const year = dt.getFullYear();

      const daysInMonth = new Date(year, month + 1, 0).getDate();

      const currentDate = `${day}-${month + 1}-${year}`;
      dispatch(setCurrentDate(currentDate));

      firebasePercentagesCheck(currentUserId, currentDate, daysInMonth);

    }
  }, [currentUser]);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async userAuth => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        onSnapshot(userRef, snapShot => {
          dispatch(setCurrentUser({
            id: snapShot.id,
            ...snapShot.data()
          }))
        });

      } else {
        dispatch(setCurrentUser(userAuth));
      }
    });
    
    return unsub;

  }, []);

  return (
    <div>
      <GlobalStyle/>
      <ErrorBoundary>
        <Suspense fallback={<h2>Loading...</h2>}>
          <Routes>
              <Route path="/" element={<LandingPage/>} />
              <Route path="register" element={<RegisterAndLoginPage/>} />
              <Route path="main/*" element={<MainPage />} />
              <Route path="*" element={<LandingPage/>} />
          </Routes>
        </Suspense>
      </ErrorBoundary>
    </div>
  ); 
};

export default App;
