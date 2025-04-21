import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

// Define the shape of the auth state
interface AuthState {
  user: { username: string; role: 'admin' | 'Station' | null } | null;
  token: string | null;
}

// Define the initial state
const initialState: AuthState = {
  user: null,
  token: localStorage.getItem('authToken'), // Initialize token from localStorage for session persistence
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Action to set credentials after login
    setCredentials: (
      state,
      action: PayloadAction<{ user: { username: string; role: 'admin' | 'Station' }; token: string }>
    ) => {
      const { user, token } = action.payload;
      state.user = user;
      state.token = token;
      // Store token in localStorage for session persistence
      localStorage.setItem('authToken', token);
    },
    // Action to clear credentials on logout
    logOut: (state) => {
      state.user = null;
      state.token = null;
      // Remove token from localStorage
      localStorage.removeItem('authToken');
      // Potentially clear other related state or trigger API cache invalidation here
    },
    // Action to potentially load user info if token exists but user info is missing (e.g., on refresh)
    loadUser: (state, action: PayloadAction<{ user: { username: string; role: 'admin' | 'Station' } }>) => {
      state.user = action.payload.user;
    }
  },
});

export const { setCredentials, logOut, loadUser } = authSlice.actions;

export default authSlice.reducer;

// Selectors to easily access auth state
export const selectCurrentUser = (state: RootState) => state.auth.user;
export const selectCurrentToken = (state: RootState) => state.auth.token;
export const selectIsAuthenticated = (state: RootState) => !!state.auth.token;
export const selectCurrentUserRole = (state: RootState) => state.auth.user?.role;
