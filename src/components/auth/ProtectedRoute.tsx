import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../../hooks/hooks';

interface ProtectedRouteProps {
  children: React.ReactNode;
  adminOnly?: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, adminOnly = false }) => {
  const user = useAppSelector((state) => state.auth.user);

  if (!user) {
    // Redirect to login if the user is not authenticated
    return <Navigate to="/login" />;
  }

  if (adminOnly && !user.isAdmin) {
    // Redirect to the home page or an unauthorized page if admin access is required and the user is not an admin
    return <Navigate to="/" />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
