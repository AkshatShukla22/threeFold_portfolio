import { createSlice } from '@reduxjs/toolkit';

/* ── Helper: decode JWT payload without a library ── */
const decodeToken = (token) => {
  try {
    const base64 = token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/');
    return JSON.parse(atob(base64));
  } catch {
    return null;
  }
};

/* ── Helper: check if token is valid and not expired ── */
const isTokenValid = (token) => {
  if (!token) return false;
  const payload = decodeToken(token);
  if (!payload) return false;
  // exp is in seconds, Date.now() in ms — add 10s buffer
  return payload.exp * 1000 > Date.now() + 10000;
};

const storedToken = localStorage.getItem('admin_token');
const tokenValid  = isTokenValid(storedToken);

// If token exists but is already expired, clear it immediately
if (storedToken && !tokenValid) {
  localStorage.removeItem('admin_token');
}

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token:           tokenValid ? storedToken : null,
    admin:           null,
    isAuthenticated: tokenValid,
  },
  reducers: {
    loginSuccess: (state, action) => {
      state.token           = action.payload.token;
      state.admin           = action.payload.admin;
      state.isAuthenticated = true;
      localStorage.setItem('admin_token', action.payload.token);
    },
    logout: (state) => {
      state.token           = null;
      state.admin           = null;
      state.isAuthenticated = false;
      localStorage.removeItem('admin_token');
    },
    tokenExpired: (state) => {
      state.token           = null;
      state.admin           = null;
      state.isAuthenticated = false;
      localStorage.removeItem('admin_token');
    },
  },
});

export const { loginSuccess, logout, tokenExpired } = authSlice.actions;
export { isTokenValid };
export default authSlice.reducer;
