import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from '../pages/LoginPage'; // Import the LoginPage component
import DashboardPage from '../pages/DashboardPage'; // Import DashboardPage
import ProtectedRoute from './ProtectedRoute'; // Import ProtectedRoute
import { useSelector } from 'react-redux';
import { selectIsAuthenticated } from '../features/auth/authSlice';
// Import page components here when created
// import DashboardPage from '../pages/DashboardPage';
// import ProtectedRoute from './ProtectedRoute'; // We will create this later for role-based access

const AppRoutes: React.FC = () => {
  const isAuthenticated = useSelector(selectIsAuthenticated);

  return (
    <Routes>
      {/* Public Route */}
      <Route path="/login" element={!isAuthenticated ? <LoginPage /> : <Navigate to="/dashboard" replace />} /> 

      {/* Protected Route */} 
      <Route 
        path="/dashboard"
        element={
          <ProtectedRoute allowedRoles={['admin', 'Station']}> 
            <DashboardPage />
          </ProtectedRoute>
        }
      />
      {/* Remove the old placeholder dashboard route */}
      {/* <Route path="/dashboard" element={<div>Dashboard Placeholder</div>} /> */}

      {/* Default route: redirect based on auth status */}
      <Route 
        path="*" 
        element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} replace />} 
      /> 
    </Routes>
  );
};

export default AppRoutes; 