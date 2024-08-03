import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { SignedIn, SignedOut, UserButton, RedirectToSignIn, UserProfile, useUser } from '@clerk/clerk-react';
import Dashboard from './pages/Dashboard';

function App() {
  const { user, isLoaded } = useUser();
  const [userName, setUserName] = useState('Loading...');

  useEffect(() => {
    if (isLoaded && user) {
      setUserName(user.username || 'User');
    }
  }, [isLoaded, user]);

  return (
    <Router>
      <SignedIn>
        <div>
          <h1>Welcome {userName}</h1>
          <UserButton />
          <Routes>
            <Route path="/profile" element={<UserProfile />} />
            <Route path="/" element={<Dashboard />} />
          </Routes>
        </div>
      </SignedIn>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </Router>
  );
}

export default App;
