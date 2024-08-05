import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/user/userSlice';
import uiReducer from '../features/user/uiSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    ui: uiReducer,
  },
});

export default store;
