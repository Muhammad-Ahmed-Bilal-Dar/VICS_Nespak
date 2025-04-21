import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { apiSlice } from '../features/api/apiSlice'; // Import the apiSlice
import authReducer from '../features/auth/authSlice'; // Import the auth reducer
// Import regular slices here when created
// import authReducer from '../features/auth/authSlice'; // Example placeholder

export const store = configureStore({
  reducer: {
    // Add the generated reducer as a specific top-level slice
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer, // Add the auth reducer
    // auth: authReducer, // Example placeholder
  },
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
