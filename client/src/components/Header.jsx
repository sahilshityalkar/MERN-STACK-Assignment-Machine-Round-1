import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useUser } from '@clerk/clerk-react';
import { loadUser } from '../features/user/userSlice';
import './Header.css'; // For styling

const Header = () => {
  const { user } = useUser();
  const dispatch = useDispatch();
  const { user: userProfile } = useSelector(state => state.user);

  React.useEffect(() => {
    if (user) {
      dispatch(loadUser());
    }
  }, [user, dispatch]);

  return (
    <header className="header">
      <div className="header__left">
        <h1>Welcome, {userProfile?.username || 'User'}!</h1>
      </div>
      <div className="header__right">
        <button onClick={() => {/* Handle My Posts */}}>My Posts</button>
        <UserButton />
      </div>
    </header>
  );
};

export default Header;
