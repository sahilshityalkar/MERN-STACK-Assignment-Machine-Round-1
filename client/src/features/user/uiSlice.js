import { createSlice } from '@reduxjs/toolkit';

const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    showForm: false,
  },
  reducers: {
    toggleShowForm(state) {
      state.showForm = !state.showForm;
    },
  },
});

export const { toggleShowForm } = uiSlice.actions;
export default uiSlice.reducer;
