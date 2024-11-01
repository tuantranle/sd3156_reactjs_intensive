// src/components/ProtectedRoute.tsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../providers/AuthProvider';

interface ProtectedRouteProps {
  children: React.ReactNode;
  adminOnly?: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, adminOnly = false }) => {
  const { user } = useAuth();

  if (!user) return <Navigate to="/login" />; // Redirect if not logged in
  if (adminOnly && !user.isAdmin) return <Navigate to="/" />; // Redirect if not an admin

  return <>{children}</>;
};

export default ProtectedRoute;
