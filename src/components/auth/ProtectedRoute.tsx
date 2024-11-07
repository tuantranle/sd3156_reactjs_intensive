// src/components/ProtectedRoute.tsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../providers/AuthProvider';

interface ProtectedRouteProps {
  children: React.ReactNode;
  adminOnly?: boolean;
  redirectPath?: string; // Optional custom redirect path if not authorized
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, adminOnly = false, redirectPath = "/" }) => {
  const { user } = useAuth();

  if (!user) {
    // Redirect to login if not logged in
    return <Navigate to="/login" />;
  }

  if (adminOnly && !user.isAdmin) {
    // Redirect to specified path if not an admin
    return <Navigate to={redirectPath} />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
