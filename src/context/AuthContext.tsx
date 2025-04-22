import { createContext, useContext, ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useCurrentUser, useIsAuthenticated } from '../hooks/auth/useAuth';
import { AuthUser } from '../api/auth/authService';

// Create a client for React Query
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      refetchOnWindowFocus: false,
    },
  },
});

// Define the auth context type
interface AuthContextType {
  user: AuthUser | undefined;
  isLoading: boolean;
  isAuthenticated: boolean;
  isAuthLoading: boolean;
}

// Create the auth context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Auth context provider props
interface AuthProviderProps {
  children: ReactNode;
}

/**
 * Auth Provider component to wrap the app
 */
export const AuthProvider = ({ children }: AuthProviderProps) => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthStateProvider>
        {children}
      </AuthStateProvider>
    </QueryClientProvider>
  );
};

/**
 * Internal provider that manages and provides auth state
 */
const AuthStateProvider = ({ children }: AuthProviderProps) => {
  // Get authentication state using React Query hooks
  const { data: user, isLoading } = useCurrentUser();
  const { data: isAuthenticated = false, isLoading: isAuthLoading } = useIsAuthenticated();

  // Provide auth state to all children
  return (
    <AuthContext.Provider value={{ user, isLoading, isAuthenticated, isAuthLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

/**
 * Custom hook to use the auth context
 */
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}; 