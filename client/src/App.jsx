import React, { useState } from 'react';
import { useClerk, SignedIn, ClerkLoading, UserButton, RedirectToSignIn } from '@clerk/clerk-react';
import './index.css';
import './App.css';
import PostForm from './components/PostForm';
import PostSection from './components/PostSection';
import { useDispatch } from 'react-redux';
import { setUser, saveUserData } from './features/user/userSlice';

const Header = ({ onMyPostsClick, onMyDashboardClick }) => {
  const { user } = useClerk();
  const [username, setUsername] = useState(user?.username || '');
  const dispatch = useDispatch();

  React.useEffect(() => {
    const interval = setInterval(() => {
      if (user) {
        const userId = user.id;
        const email = user.primaryEmailAddress?.emailAddress;
        const newUsername = user.username || '';

        setUsername(newUsername);
        dispatch(setUser({ userId, email, username: newUsername }));
        dispatch(saveUserData({ userId, email }));
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [user, dispatch]);

  return (
    <header className="header">
      <div className="header-content">
        <div className="left-section">
          <button className="my-posts-btn" onClick={onMyPostsClick}>My Posts</button>
          <button className="my-dashboard-btn" onClick={onMyDashboardClick}>My Dashboard</button>
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
  const [showPostForm, setShowPostForm] = useState(false);
  const [showPostSection, setShowPostSection] = useState(false);

  const handleMyPostsClick = () => {
    setShowPostForm(true);
    setShowPostSection(true);
  };

  const handleMyDashboardClick = () => {
    setShowPostForm(false);
    setShowPostSection(false);
  };

  if (!user) {
    return <RedirectToSignIn />;
  }

  return (
    <div>
      <Header onMyPostsClick={handleMyPostsClick} onMyDashboardClick={handleMyDashboardClick} />
      <main>
        <ClerkLoading>
          <div>Loading...</div>
        </ClerkLoading>
        {showPostForm && <PostForm />}
        {showPostSection && <PostSection />}
      </main>
    </div>
  );
};

export default App;
