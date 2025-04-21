import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Define a service using a base URL and expected endpoints
export const apiSlice = createApi({
  reducerPath: 'api', // The name of the slice in the Redux store
  baseQuery: fetchBaseQuery({ 
    baseUrl: 'http://localhost:5000/api', // Replace with your actual API base URL
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    prepareHeaders: (headers, { getState }) => {
        // If we have a token set in state, let's assume it should be passed
        // const token = (getState() as RootState).auth.token; // Example: Get token from auth slice
        // if (token) {
        return headers;
      },
  }),
  tagTypes: ['Auth', 'User', 'StationData'], // Define tag types for caching
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  endpoints: (builder) => ({}), // Endpoints will be injected here
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
// export const { useLoginMutation, useGetUserQuery } = apiSlice; // Example placeholders 