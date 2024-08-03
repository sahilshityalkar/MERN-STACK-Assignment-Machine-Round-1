import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchUser, updateUser } from './userAPI';

const initialState = {
  user: null,
  status: 'idle',
  error: null,
};

export const loadUser = createAsyncThunk('user/loadUser', async () => {
  const response = await fetchUser();
  return response.data;
});

export const updateUserProfile = createAsyncThunk('user/updateUserProfile', async (user) => {
  const response = await updateUser(user);
  return response.data;
});

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(loadUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload;
      })
      .addCase(loadUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.user = action.payload;
      });
  },
});

export default userSlice.reducer;
