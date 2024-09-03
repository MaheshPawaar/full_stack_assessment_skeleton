import { createSlice } from '@reduxjs/toolkit';

const selectedHomeSlice = createSlice({
  name: 'selectedHome',
  initialState: {
    home: null,
    currentHomeUsers: [],
  },
  reducers: {
    selectHome: (state, action) => {
      state.home = action.payload.home;
      state.currentHomeUsers = action.payload.currentHomeUsers;
    },
    clearSelection: (state) => {
      state.home = null;
      state.currentHomeUsers = [];
    },
  },
});

export const { selectHome, clearSelection } = selectedHomeSlice.actions;

export const getSelectedHome = (state) => state.selectedHome.home;
export const getCurrentHomeUsers = (state) => state.selectedHome.currentHomeUsers;

export default selectedHomeSlice.reducer;
