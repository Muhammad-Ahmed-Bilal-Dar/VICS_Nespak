import { Routes, Route, Navigate } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import ProtectedRoute from '../components/auth/ProtectedRoute';
import LoadingScreen from '../components/common/LoadingScreen';

// Lazy-loaded components
const LoginPage = lazy(() => import('../pages/auth/LoginPage'));
const AdminDashboard = lazy(() => import('../pages/admin/Dashboard'));
const StationDashboard = lazy(() => import('../pages/station/Dashboard'));
const NotFoundPage = lazy(() => import('../pages/NotFoundPage'));
const UnauthorizedPage = lazy(() => import('../pages/UnauthorizedPage'));

/**
 * Application routes component
 * Defines all routes and their access requirements
 */
const AppRoutes = () => {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <Routes>
        {/* Public routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/unauthorized" element={<UnauthorizedPage />} />
        
        {/* Admin routes */}
        <Route 
          path="/admin/dashboard" 
          element={
            <ProtectedRoute requiredRoles={['admin']}>
              <AdminDashboard />
            </ProtectedRoute>
          } 
        />
        
        {/* Station routes */}
        <Route 
          path="/station/dashboard" 
          element={
            <ProtectedRoute requiredRoles={['station']}>
              <StationDashboard />
            </ProtectedRoute>
          } 
        />
        
        {/* Redirect root to login */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        
        {/* Catch all route */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes; 