import React, { useEffect } from 'react';
import { useClerk, SignedIn, ClerkLoading, UserButton, RedirectToSignIn } from '@clerk/clerk-react';
import { useDispatch } from 'react-redux';
import { setUser, saveUserData } from './features/user/userSlice'; // Correct path for userSlice.js

const Header = () => {
  const { user } = useClerk();
  const dispatch = useDispatch();
  const userId = user?.id;
  const email = user?.primaryEmailAddress?.emailAddress;
  const username = user?.username || '';

  useEffect(() => {
    if (user) {
      const userData = { userId, email };
      dispatch(setUser({ userId, email, username }));
      dispatch(saveUserData(userData)); // Call to save user data to the backend
    }
  }, [user, dispatch, userId, email, username]);

  return (
    <header>
      <div>
        <SignedIn>
          <span>Welcome, {username || 'User'}</span>
        </SignedIn>
      </div>
      <div>
        <SignedIn>
          <UserButton />
        </SignedIn>
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
