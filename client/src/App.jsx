import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { SignedIn, SignedOut, UserButton, RedirectToSignIn, UserProfile, useUser } from '@clerk/clerk-react';
import Dashboard from './components/Dashboard';
import Header from './components/Header';

function App() {
  const { user, isLoaded } = useUser();
  const userName = isLoaded && user ? user.username || 'User' : 'Loading...';

  return (
    <Router>
      <SignedIn>
        <Header userName={userName} />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/profile" element={<UserProfile />} />
        </Routes>
      </SignedIn>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </Router>
  );
}

export default App;