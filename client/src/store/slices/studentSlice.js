import { createSlice } from '@reduxjs/toolkit';

const studentSlice = createSlice({
  name: 'student',
  initialState: {
    isAuthenticated: false,
    user: null
  },
  reducers: {
    login: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
    },
    updateSGPA: (state, action) => {
      // Assuming action.payload contains the updated SGPA values
      state.user.sgpa1st = action.payload.sgpa1stSem;
      state.user.sgpa2nd = action.payload.sgpa2ndSem;
    },
  },
  extraReducers: (builders)  => {

  }
});

export const { login, logout, updateSGPA } = studentSlice.actions;

export default studentSlice.reducer;
