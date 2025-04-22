import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import authService, { LoginCredentials } from '../../api/auth/authService';

// Auth query keys
export const authKeys = {
  all: ['auth'] as const,
  session: () => [...authKeys.all, 'session'] as const,
  user: () => [...authKeys.all, 'user'] as const,
  role: (role: string) => [...authKeys.all, 'role', role] as const,
};

/**
 * Hook for user login functionality
 */
export const useLogin = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (credentials: LoginCredentials) => authService.login(credentials),
    onSuccess: (data) => {
      // Update user data in cache
      queryClient.setQueryData(authKeys.user(), data.user);
      
      // Invalidate auth queries to refetch if needed
      queryClient.invalidateQueries({ queryKey: authKeys.session() });
      
      // Redirect to appropriate dashboard based on role
      if (data.user.role === 'admin') {
        navigate('/admin/dashboard');
      } else {
        navigate('/station/dashboard');
      }
    },
  });
};

/**
 * Hook for user logout functionality
 */
export const useLogout = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: () => authService.logout(),
    onSuccess: () => {
      // Clear auth data from cache
      queryClient.removeQueries({ queryKey: authKeys.all });
      
      // Redirect to login
      navigate('/login');
    },
  });
};

/**
 * Hook to get current authenticated user
 */
export const useCurrentUser = () => {
  return useQuery({
    queryKey: authKeys.user(),
    queryFn: async () => {
      const data = await authService.getCurrentUser();
      return data.user;
    },
    retry: false,
    refetchOnWindowFocus: false,
  });
};

/**
 * Hook to check if user is authenticated
 */
export const useIsAuthenticated = () => {
  return useQuery({
    queryKey: authKeys.session(),
    queryFn: authService.checkAuth,
    retry: false,
    refetchOnWindowFocus: false,
  });
};

/**
 * Hook to check if user has a specific role
 */
export const useHasRole = (role: string) => {
  return useQuery({
    queryKey: authKeys.role(role),
    queryFn: () => authService.checkRole(role),
    retry: false,
    refetchOnWindowFocus: false,
  });
}; 