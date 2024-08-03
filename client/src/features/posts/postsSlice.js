import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchPosts, createPost, updatePost, deletePost } from './postsAPI';

const initialState = {
  posts: [],
  status: 'idle',
  error: null,
};

export const loadPosts = createAsyncThunk('posts/loadPosts', async () => {
  const response = await fetchPosts();
  return response.data;
});

export const addPost = createAsyncThunk('posts/addPost', async (post) => {
  const response = await createPost(post);
  return response.data;
});

export const modifyPost = createAsyncThunk('posts/modifyPost', async (post) => {
  const response = await updatePost(post);
  return response.data;
});

export const removePost = createAsyncThunk('posts/removePost', async (id) => {
  await deletePost(id);
  return id;
});

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadPosts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(loadPosts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.posts = action.payload;
      })
      .addCase(loadPosts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addPost.fulfilled, (state, action) => {
        state.posts.push(action.payload);
      })
      .addCase(modifyPost.fulfilled, (state, action) => {
        const index = state.posts.findIndex(post => post.id === action.payload.id);
        if (index >= 0) {
          state.posts[index] = action.payload;
        }
      })
      .addCase(removePost.fulfilled, (state, action) => {
        state.posts = state.posts.filter(post => post.id !== action.payload);
      });
  },
});

export default postsSlice.reducer;
