import { apiSlice } from '../api/apiSlice';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { setCredentials } from './authSlice';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { RootState } from '../../app/store'; // Import RootState if needed for prepareHeaders

// Define the expected response structure from the login endpoint
interface LoginResponse {
  token: string;
  user: { 
    username: string;
    role: 'admin' | 'Station'; 
  };
}

// Define the arguments expected by the login mutation
interface LoginRequest {
  username: string;
  password: string;
}

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: credentials => ({
        url: '/auth/login', // Your backend login endpoint
        method: 'POST',
        body: { ...credentials },
      }),
      // We can invalidate tags here if needed upon login (e.g., invalidate user data queries)
      // invalidatesTags: [{ type: 'Auth', id: 'LIST' }],
    }),
    // Optional: Add a query to get user info if needed separately
    // getUserInfo: builder.query<{ user: { username: string; role: 'admin' | 'Station' } }, void>({
    //   query: () => '/auth/me', // Your backend endpoint to get current user info
    //   providesTags: ['User'], // Cache based on User tag
    //   async onQueryStarted(arg, { dispatch, queryFulfilled }) {
    //     try {
    //       const { data } = await queryFulfilled;
    //       // If user info is fetched successfully, dispatch loadUser to update state
    //       // This is useful if the page reloads and we only have the token initially
    //       dispatch(loadUser({ user: data.user })); 
    //     } catch (err) {
    //       console.error('Failed to fetch user info', err);
    //       // Optionally dispatch logOut if token is invalid
    //       // dispatch(logOut());
    //     }
    //   },
    // }),
  }),
  // We might override existing endpoints if necessary, but usually it's not needed.
  // overrideExisting: false,
});

// Export the auto-generated hook for the login mutation
export const { useLoginMutation } = authApiSlice;

// Optional: Export the hook for getUserInfo if you added that endpoint
// export const { useGetUserInfoQuery } = authApiSlice; 