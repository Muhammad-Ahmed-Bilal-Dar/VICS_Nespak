import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import { selectIsAuthenticated, selectCurrentUserRole } from '../features/auth/authSlice';

interface ProtectedRouteProps {
  children: JSX.Element;
  allowedRoles: Array<'admin' | 'Station'>; // Specify allowed roles
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, allowedRoles }) => {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const userRole = useSelector(selectCurrentUserRole);
  const location = useLocation();

  if (!isAuthenticated) {
    // User not logged in, redirect them to the login page
    // Pass the current location so we can redirect back after login
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (!userRole || !allowedRoles.includes(userRole)) {
    // User is logged in but does not have the required role
    // Redirect them to an unauthorized page or the login page (or a specific dashboard)
    // For simplicity, redirecting to login here, but an "Unauthorized" page might be better.
    console.warn(`User role '${userRole}' not authorized for this route.`);
    // Alternatively, navigate to a specific page based on role, or show an 'Unauthorized' component.
    return <Navigate to="/login" replace />; // Or potentially navigate(-1) or navigate('/')
  }

  // User is authenticated and has the required role, render the child component
  return children;
};

export default ProtectedRoute; 