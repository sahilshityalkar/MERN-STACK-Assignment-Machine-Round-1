import React, { useEffect, useState } from 'react';
import { useClerk, SignedIn, ClerkLoading, UserButton, RedirectToSignIn } from '@clerk/clerk-react';
import { useDispatch } from 'react-redux';
import { setUser, saveUserData } from './features/user/userSlice'; // Correct path for userSlice.js
import './index.css'; // Importing index.css
import './App.css';   // Importing App.css

const Header = () => {
  const { user } = useClerk();
  const dispatch = useDispatch();
  const [username, setUsername] = useState(user?.username || ''); // local state to store username

  useEffect(() => {
    const interval = setInterval(() => {
      if (user) {
        const userId = user.id;
        const email = user.primaryEmailAddress?.emailAddress;
        const newUsername = user.username || '';

        // Update the local state with new username
        setUsername(newUsername);

        // Update Redux store and backend
        dispatch(setUser({ userId, email, username: newUsername }));
        dispatch(saveUserData({ userId, email }));
      }
    }, 5000); // Poll every 5 seconds

    // Cleanup interval on unmount
    return () => clearInterval(interval);
  }, [user, dispatch]);

  return (
    <header className="header">
      <div className="header-content">
        <div className="left-section">
          <button className="my-posts-btn">My Posts</button>
          <span className="welcome-message">Welcome, {username || 'User'}</span>
        </div>
        <div className="right-section">
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </div>
    </header>
  );
};

const App = () => {
  const { user } = useClerk();

  if (!user) {
    return <RedirectToSignIn />;
  }

  return (
    <div>
      <Header />
      <main>
        <ClerkLoading>
          <div>Loading...</div>
        </ClerkLoading>
      </main>
    </div>
  );
};

export default App;
