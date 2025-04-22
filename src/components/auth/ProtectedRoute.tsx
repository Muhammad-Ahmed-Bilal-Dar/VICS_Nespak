import { Navigate, useLocation } from 'react-router-dom';
import { ReactNode } from 'react';
import { useAuth } from '../../context/AuthContext';
import LoadingScreen from '../common/LoadingScreen';

interface ProtectedRouteProps {
  children: ReactNode;
  requiredRoles?: Array<'admin' | 'station'>;
}

/**
 * ProtectedRoute component that restricts access based on authentication 
 * and optional role requirements
 */
const ProtectedRoute = ({ children, requiredRoles }: ProtectedRouteProps) => {
  const location = useLocation();
  const { isAuthenticated, isAuthLoading, user } = useAuth();

  // If authentication is still loading, show loading screen
  if (isAuthLoading) {
    return <LoadingScreen />;
  }

  // If not authenticated, redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If roles are required, check if user has any of the required roles
  if (requiredRoles && requiredRoles.length > 0 && user) {
    const hasRequiredRole = requiredRoles.includes(user.role);
    
    if (!hasRequiredRole) {
      // Redirect to unauthorized page if role requirements not met
      return <Navigate to="/unauthorized" replace />;
    }
  }

  // User is authenticated and meets role requirements
  return <>{children}</>;
};

export default ProtectedRoute; 