import { createSlice } from '@reduxjs/toolkit';

const token = localStorage.getItem('admin_token');

const authSlice = createSlice({
  name: 'auth',
  initialState: { token: token || null, admin: null, isAuthenticated: !!token },
  reducers: {
    loginSuccess: (state, action) => {
      state.token = action.payload.token;
      state.admin = action.payload.admin;
      state.isAuthenticated = true;
      localStorage.setItem('admin_token', action.payload.token);
    },
    logout: (state) => {
      state.token = null;
      state.admin = null;
      state.isAuthenticated = false;
      localStorage.removeItem('admin_token');
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
