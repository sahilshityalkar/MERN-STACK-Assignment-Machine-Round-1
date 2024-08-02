import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { SignedIn, SignedOut, UserButton, RedirectToSignIn, useUser, UserProfile } from '@clerk/clerk-react';
import { setAuthState, clearAuthState } from './features/auth/authSlice';
import Dashboard from './pages/Dashboard';
import './App.css';

function App() {
  const dispatch = useDispatch();
  const { user } = useUser();

  useEffect(() => {
    if (user) {
      dispatch(setAuthState({
        id: user.id,
        email: user.emailAddresses[0]?.emailAddress,
        firstName: user.firstName,
        lastName: user.lastName,
      }));
    } else {
      dispatch(clearAuthState());
    }
  }, [user, dispatch]);

  return (
    <Router>
      <h1>Hello World</h1>
      <SignedIn>
        <UserButton />
        <Routes>
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/" element={<Dashboard />} />
        </Routes>
      </SignedIn>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </Router>
  );
}

export default App;
