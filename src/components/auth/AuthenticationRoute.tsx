// src/components/auth/AuthenticationRoute.tsx
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../providers/AuthProvider';

interface AuthenticationRouteProps {
  children: JSX.Element;
  adminOnly?: boolean;
}

const AuthenticationRoute = ({ children, adminOnly = false }: AuthenticationRouteProps) => {
  const { user } = useAuth();

  // Check if `user` is null and handle redirection if necessary
  if (!user) {
    return <Navigate to="/login" />;
  }

  // Only allow access if the user is an admin when `adminOnly` is true
  if (adminOnly && !user.isAdmin) {
    return <Navigate to="/" />;
  }

  return children;
};

export default AuthenticationRoute;
