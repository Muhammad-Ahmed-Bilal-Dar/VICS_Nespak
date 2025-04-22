import axios, { AxiosInstance, InternalAxiosRequestConfig, AxiosError, AxiosResponse } from 'axios';

// Create base axios instance
const apiClient: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // Important for cookies/session authentication
});

// Request interceptor for adding auth token
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // Get token from storage if needed (for JWT auth)
    // const token = localStorage.getItem('token');
    // if (token && config.headers) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    return config;
  },
  (error: AxiosError) => Promise.reject(error)
);

// Response interceptor for handling errors
apiClient.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };
    
    // Handle session expiration (401 unauthorized)
    if (error.response?.status === 401 && !originalRequest._retry) {
      // Handle session refresh or redirect to login
      window.location.href = '/login';
    }
    
    // Handle forbidden access (403)
    if (error.response?.status === 403) {
      // Redirect to unauthorized page or display message
      console.error('Access forbidden');
    }
    
    return Promise.reject(error);
  }
);

export default apiClient; 