import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { SignedIn, SignedOut, UserButton, RedirectToSignIn, UserProfile } from '@clerk/clerk-react';
import Dashboard from './pages/Dashboard';

function App() {
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
