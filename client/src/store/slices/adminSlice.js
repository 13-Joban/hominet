import { createSlice } from '@reduxjs/toolkit';

const adminSlice = createSlice({
  name: 'admin',
  initialState: {
    isAuthenticated: false,
    user: null
  },
  reducers: {
    adminlogin: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    adminlogout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
    }
  }
});

export const { adminlogin, adminlogout } = adminSlice.actions;

export default adminSlice.reducer;