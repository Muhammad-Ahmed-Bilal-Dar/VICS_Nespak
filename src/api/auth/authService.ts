import apiClient from '../axiosConfig';

// Types
export interface LoginCredentials {
  username: string;
  password: string;
  role?: 'admin' | 'station';
}

export interface AuthUser {
  id: string;
  username: string;
  email: string;
  role: 'admin' | 'station';
  name: string;
}

// Auth Service functions
export const authService = {
  /**
   * Login user with credentials
   */
  login: async (credentials: LoginCredentials) => {
    const response = await apiClient.post<{ user: AuthUser }>('/auth/login', credentials);
    return response.data;
  },

  /**
   * Logout the current user
   */
  logout: async () => {
    const response = await apiClient.post('/auth/logout');
    return response.data;
  },

  /**
   * Get the current session user
   */
  getCurrentUser: async () => {
    const response = await apiClient.get<{ user: AuthUser }>('/auth/me');
    return response.data;
  },

  /**
   * Check if user is authenticated
   */
  checkAuth: async () => {
    try {
      const response = await apiClient.get<{ authenticated: boolean }>('/auth/check');
      return response.data.authenticated;
    } catch (error) {
      return false;
    }
  },

  /**
   * Check if user has specific role
   */
  checkRole: async (role: string) => {
    try {
      const response = await apiClient.get<{ hasRole: boolean }>(`/auth/check-role/${role}`);
      return response.data.hasRole;
    } catch (error) {
      return false;
    }
  }
};

export default authService; 