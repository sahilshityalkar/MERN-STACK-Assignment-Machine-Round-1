import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk to save user data
export const saveUserData = createAsyncThunk(
  'user/saveUserData',
  async (userData) => {
    const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/users/saveUserData`, userData);
    return response.data;
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState: {
    userId: '',
    email: '',
    username: '',
    status: 'idle',
    error: null
  },
  reducers: {
    setUser(state, action) {
      const { userId, email, username } = action.payload;
      state.userId = userId;
      state.email = email;
      state.username = username;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(saveUserData.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(saveUserData.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.userId = action.payload.userId;
        state.email = action.payload.email;
      })
      .addCase(saveUserData.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  }
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
